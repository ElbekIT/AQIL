#!/bin/bash
# “AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
# Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)
# Muallif: Sharofiddinova Nozima Egamberdi qizi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "================================================================="
echo "  🚀 TOSHKENT MENEJMENT VA IQTISODIYOT INSTITUTI (FARG'ONA)"
echo "  📱 “AQLLI UY VA OILALAR UCHUN KOMPLEKS XIZMATLAR” PLATFORMASI"
echo "  👤 Muallif: Sharofiddinova Nozima Egamberdi qizi (1-bosqich)"
echo "  📅 Yil: 2026"
echo "================================================================="

# Start Python server
python3 server.py &
SERVER_PID=$!

sleep 1

# If firefox exists, open in browser
if which firefox > /dev/null 2>&1; then
    firefox http://localhost:8080 &
fi

wait $SERVER_PID
