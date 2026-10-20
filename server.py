#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
“AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)
Muallif: Sharofiddinova Nozima Egamberdi qizi (1-bosqich)
Yil: 2026
"""

import http.server
import socketserver
import json
import os
import sys
import sqlite3
import urllib.parse
from datetime import datetime

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "aqil.db")
DATA_PATH = os.path.join(BASE_DIR, "data", "initial-data.json")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Orders table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            service_type TEXT,
            title TEXT,
            client_name TEXT,
            child_name TEXT,
            phone TEXT,
            pickup_location TEXT,
            dropoff_location TEXT,
            assigned_to TEXT,
            pin_code TEXT,
            price INTEGER,
            status TEXT,
            status_label TEXT,
            eta TEXT,
            created_at TEXT
        )
    ''')
    
    # Smart home devices state table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS smarthome_devices (
            id TEXT PRIMARY KEY,
            name TEXT,
            room TEXT,
            type TEXT,
            state INTEGER,
            extra_json TEXT
        )
    ''')
    
    # Populate initial orders if empty
    cur.execute('SELECT COUNT(*) FROM orders')
    if cur.fetchone()[0] == 0 and os.path.exists(DATA_PATH):
        try:
            with open(DATA_PATH, 'r', encoding='utf-8') as f:
                d = json.load(f)
                for ord_item in d.get('demo_orders', []):
                    cur.execute('''
                        INSERT OR REPLACE INTO orders 
                        (id, service_type, title, client_name, child_name, phone, pickup_location, dropoff_location, assigned_to, pin_code, price, status, status_label, eta, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        ord_item.get('id'),
                        ord_item.get('service_type'),
                        ord_item.get('title'),
                        ord_item.get('client_name'),
                        ord_item.get('child_name', ''),
                        ord_item.get('phone'),
                        ord_item.get('pickup_location'),
                        ord_item.get('dropoff_location', ''),
                        ord_item.get('assigned_to', 'Biriktirilmagan'),
                        ord_item.get('pin_code', '1234'),
                        ord_item.get('price', 0),
                        ord_item.get('status', 'pending'),
                        ord_item.get('status_label', 'Yangi'),
                        ord_item.get('eta', '15 daq'),
                        ord_item.get('timestamp', datetime.now().strftime("%Y-%m-%d %H:%M"))
                    ))
                for dev in d.get('smart_home_devices', []):
                    cur.execute('''
                        INSERT OR REPLACE INTO smarthome_devices (id, name, room, type, state, extra_json)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ''', (
                        dev['id'],
                        dev['name'],
                        dev['room'],
                        dev['type'],
                        1 if dev.get('state') is True or dev.get('state') == 'normal' else 0,
                        json.dumps(dev, ensure_ascii=False)
                    ))
        except Exception as e:
            print(f"Boshlang'ich ma'lumotlarni yuklashda xatolik: {e}")
            
    conn.commit()
    conn.close()

class AqilRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        if path == '/api/info':
            self.send_json({
                "university": "Toshkent Menejment va Iqtisodiyot Instituti",
                "campus": "Farg'ona kampusi",
                "faculty": "Iqtisodiyot va menejment",
                "stage": "1-bosqich talabasi",
                "author": "Sharofiddinova Nozima Egamberdi qizi",
                "project": "“AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI",
                "region": "Farg'ona shahri",
                "year": 2026,
                "version": "2.0.0 Pro Mobile"
            })
            return
            
        elif path == '/api/initial-data':
            if os.path.exists(DATA_PATH):
                with open(DATA_PATH, 'r', encoding='utf-8') as f:
                    self.send_json(json.load(f))
            else:
                self.send_json({"error": "Fayl topilmadi"}, status=404)
            return

        elif path == '/api/orders':
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute('SELECT * FROM orders ORDER BY created_at DESC')
            rows = [dict(r) for r in cur.fetchall()]
            conn.close()
            self.send_json({"orders": rows})
            return
            
        elif path == '/api/smarthome':
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute('SELECT * FROM smarthome_devices')
            rows = []
            for r in cur.fetchall():
                dev_data = json.loads(r['extra_json'])
                dev_data['state'] = bool(r['state']) if r['type'] != 'sensor' else ('normal' if r['state'] == 1 else 'alert')
                rows.append(dev_data)
            conn.close()
            self.send_json({"devices": rows})
            return

        elif path == '/api/finance':
            if os.path.exists(DATA_PATH):
                with open(DATA_PATH, 'r', encoding='utf-8') as f:
                    d = json.load(f)
                    self.send_json(d.get("financial_model", {}))
            else:
                self.send_json({"error": "Moliya ma'lumotlari topilmadi"}, status=404)
            return

        # Fallback to static file server
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode('utf-8')
        data = json.loads(body) if body else {}

        if path == '/api/orders':
            # Create a new order
            import random
            order_id = f"ORD-{random.randint(1000, 9999)}"
            pin_code = str(random.randint(1000, 9999))
            
            service_type = data.get("service_type", "general")
            title = data.get("title", "Yangi buyurtma")
            client_name = data.get("client_name", "Hurmatli Mijoz")
            child_name = data.get("child_name", "")
            phone = data.get("phone", "+998 90 000-00-00")
            pickup_location = data.get("pickup_location", "Farg'ona shahri")
            dropoff_location = data.get("dropoff_location", "")
            assigned_to = data.get("assigned_to", "Avtomatik biriktirilmoqda...")
            price = int(data.get("price", 45000))
            status = "in_progress"
            status_label = "Qabul qilindi va mutaxassis biriktirildi"
            eta = "12-15 daqiqa"
            created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('''
                INSERT INTO orders (id, service_type, title, client_name, child_name, phone, pickup_location, dropoff_location, assigned_to, pin_code, price, status, status_label, eta, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (order_id, service_type, title, client_name, child_name, phone, pickup_location, dropoff_location, assigned_to, pin_code, price, status, status_label, eta, created_at))
            conn.commit()
            conn.close()

            self.send_json({
                "success": True,
                "message": "Buyurtma muvaffaqiyatli qabul qilindi!",
                "order": {
                    "id": order_id,
                    "pin_code": pin_code,
                    "title": title,
                    "assigned_to": assigned_to,
                    "eta": eta,
                    "status": status,
                    "status_label": status_label,
                    "price": price
                }
            })
            return

        elif path == '/api/orders/update-status':
            order_id = data.get("order_id")
            new_status = data.get("status")
            status_label = data.get("status_label", "Yangilandi")
            
            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('UPDATE orders SET status = ?, status_label = ? WHERE id = ?', (new_status, status_label, order_id))
            conn.commit()
            conn.close()
            
            self.send_json({"success": True, "order_id": order_id, "status": new_status})
            return

        elif path == '/api/smarthome/toggle':
            dev_id = data.get("device_id")
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute('SELECT * FROM smarthome_devices WHERE id = ?', (dev_id,))
            row = cur.fetchone()
            if row:
                current_state = row['state']
                new_state = 0 if current_state == 1 else 1
                cur.execute('UPDATE smarthome_devices SET state = ? WHERE id = ?', (new_state, dev_id))
                conn.commit()
                conn.close()
                self.send_json({"success": True, "device_id": dev_id, "new_state": bool(new_state)})
            else:
                conn.close()
                self.send_json({"error": "Qurilma topilmadi"}, status=404)
            return

        elif path == '/api/finance/calculate':
            # Dynamic calculation of monthly revenue, expenses, and profit
            transport_qty = int(data.get("transport_qty", 100))
            repair_qty = int(data.get("repair_qty", 40))
            sos_qty = int(data.get("sos_qty", 20))
            daycare_qty = int(data.get("daycare_qty", 16))
            
            fixed_costs = 18500000
            
            # Margins per unit from Nozima's calculations
            diff_transport = transport_qty * 7000
            diff_repair = repair_qty * 20000
            diff_sos = sos_qty * 40000
            diff_daycare = daycare_qty * 80000
            
            total_margin = diff_transport + diff_repair + diff_sos + diff_daycare
            total_orders = transport_qty + repair_qty + sos_qty + (daycare_qty * 5) # in daycare 5 kids per group
            
            net_operating_result = total_margin - fixed_costs
            is_profitable = net_operating_result >= 0
            
            # Break-even target: 740 average orders or ~18.5M margin
            coverage_percent = round((total_margin / fixed_costs) * 100, 1)
            
            self.send_json({
                "transport": {"qty": transport_qty, "margin": diff_transport},
                "repair": {"qty": repair_qty, "margin": diff_repair},
                "sos": {"qty": sos_qty, "margin": diff_sos},
                "daycare": {"qty": daycare_qty, "margin": diff_daycare},
                "total_orders": total_orders,
                "total_margin": total_margin,
                "monthly_fixed_costs": fixed_costs,
                "net_result": net_operating_result,
                "is_profitable": is_profitable,
                "coverage_percent": coverage_percent,
                "break_even_orders": 740
            })
            return

        self.send_json({"error": "Noma'lum so'rov"}, status=404)

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

def get_local_ip():
    import socket
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

if __name__ == '__main__':
    init_db()
    local_ip = get_local_ip()
    print("=" * 65)
    print("  🚀 TOSHKENT MENEJMENT VA IQTISODIYOT INSTITUTI (FARG'ONA)")
    print("  📱 “AQLLI UY VA OILALAR UCHUN KOMPLEKS XIZMATLAR” PLATFORMASI")
    print("  👤 Muallif: Sharofiddinova Nozima Egamberdi qizi (1-bosqich)")
    print("=" * 65)
    print(f"  🌐 Kompyuterda ochish:   http://localhost:{PORT}")
    print(f"  📱 Telefondan ochish:     http://{local_ip}:{PORT}")
    print("=" * 65)
    print("  Server faol holatda. To'xtatish uchun: Ctrl + C")
    
    server_address = ('0.0.0.0', PORT)
    httpd = socketserver.TCPServer(server_address, AqilRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer to'xtatildi.")
        httpd.server_close()
