/**
 * Dispetcher / Operator Boshqaruv Moduli
 * Buyurtmalarni qabul qilish, xodim biriktirish va holatni yangilash.
 */

class DispatcherManager {
  constructor() {
    this.containerId = "dispatcher-container";
    this.orders = [];
  }

  async loadOrders() {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        this.orders = data.orders || [];
      } else {
        throw new Error("Offline");
      }
    } catch (e) {
      // Fallback
      this.orders = [
        {
          id: "ORD-8821",
          service_type: "kids_transport",
          title: "Maktabdan uyga olib kelish",
          client_name: "Azizbek Rahimov (Ota)",
          child_name: "Madinaxon (7 yosh)",
          phone: "+998 90 111-22-33",
          pickup_location: "2-sonli maktab, Al-Farg'oniy",
          assigned_to: "Otabek Qodirov (Cobalt)",
          pin_code: "4892",
          price: 45000,
          status: "in_progress",
          status_label: "Harakatlanmoqda",
          created_at: "Bugun 14:15"
        },
        {
          id: "ORD-8819",
          service_type: "weekend_group_daycare",
          title: "Shanbalik bolalar guruhi",
          client_name: "Nargiza Karimova (Ona)",
          child_name: "Umarbek (5 yosh)",
          phone: "+998 91 333-44-55",
          pickup_location: "Markaz",
          assigned_to: "Nargiza Ergasheva (Pedagog)",
          pin_code: "7731",
          price: 60000,
          status: "scheduled",
          status_label: "Shanbaga rejalashtirilgan",
          created_at: "Bugun 11:20"
        }
      ];
    }
    this.render();
  }

  async updateStatus(orderId, newStatus, label) {
    if (window.soundFX) window.soundFX.playTap();
    const ord = this.orders.find(o => o.id === orderId);
    if (ord) {
      ord.status = newStatus;
      ord.status_label = label;
      this.render();
      window.app.showToast(`Buyurtma #${orderId} holati: ${label}`);
    }

    try {
      await fetch("/api/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: newStatus, status_label: label })
      });
    } catch (e) {}
  }

  render() {
    const cont = document.getElementById(this.containerId);
    if (!cont) return;

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main);">
          📋 Dispetcher nazorat jurnali (${this.orders.length} ta buyurtma)
        </h4>
        <button class="hero-btn" style="padding: 4px 10px; font-size: 11px;" onclick="window.dispatcher.loadOrders()">
          🔄 Yangilash
        </button>
      </div>
    `;

    if (this.orders.length === 0) {
      html += `<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">Hozircha buyurtmalar yo'q.</p>`;
    } else {
      this.orders.forEach(ord => {
        const isDone = ord.status === "completed";
        html += `
          <div class="finance-metric-card" style="margin-bottom: 10px; border-left: 4px solid ${isDone ? 'var(--accent)' : 'var(--primary)'};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-size: 10px; font-weight: 700; color: var(--primary); background: rgba(37, 99, 235, 0.1); padding: 2px 6px; border-radius: 4px;">#${ord.id}</span>
                <b style="font-size: 13px; margin-left: 6px; color: var(--text-main);">${ord.title}</b>
              </div>
              <span style="font-size: 11px; font-weight: 700; color: ${isDone ? 'var(--accent)' : 'var(--warning)'};">
                ${ord.status_label || ord.status}
              </span>
            </div>

            <div style="font-size: 11px; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
              ${ord.child_name ? `<div>👶 Bola: <b>${ord.child_name}</b> | PIN: <span class="pin-code-badge" style="font-size: 12px; padding: 1px 4px;">${ord.pin_code}</span></div>` : ''}
              <div>📍 Manzil: ${ord.pickup_location}</div>
              <div>👤 Ijrochi: <b>${ord.assigned_to}</b></div>
              <div>📞 Tel: ${ord.phone} | To'lov: <b>${ord.price ? ord.price.toLocaleString() : '45 000'} so'm</b></div>
            </div>

            ${!isDone ? `
              <div style="display: flex; gap: 6px; margin-top: 8px;">
                <button class="hero-btn" style="background: rgba(37, 99, 235, 0.1); color: var(--primary); font-size: 10px; padding: 4px 8px;" onclick="window.dispatcher.updateStatus('${ord.id}', 'arrived', 'Yetib keldi')">
                  📍 Yetib keldi
                </button>
                <button class="hero-btn" style="background: rgba(16, 185, 129, 0.1); color: var(--accent); font-size: 10px; padding: 4px 8px;" onclick="window.dispatcher.updateStatus('${ord.id}', 'completed', 'Muvaffaqiyatli topshirildi')">
                  ✅ Yakunlash
                </button>
              </div>
            ` : ''}
          </div>
        `;
      });
    }

    cont.innerHTML = html;
  }
}

window.dispatcher = new DispatcherManager();
