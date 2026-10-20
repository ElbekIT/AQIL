/**
 * “AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
 * Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)
 * Muallif: Sharofiddinova Nozima Egamberdi qizi (1-bosqich)
 * Yil: 2026
 */

class AqilApp {
  constructor() {
    this.currentTab = "home";
    this.theme = "light";
    this.isFullscreen = false;
    this.activeOrder = null;
    this.mapSim = null;
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Initial load
    this.switchTab("home");
    window.smartHome.loadDevices();
    window.dispatcher.loadOrders();

    // Init map simulator
    setTimeout(() => {
      this.mapSim = new FerganaMapSimulator("live-map-canvas");
    }, 300);

    // Dynamic Island interaction
    const island = document.getElementById("dynamic-island");
    if (island) {
      island.addEventListener("click", () => {
        island.classList.toggle("expanded");
        if (island.classList.contains("expanded")) {
          island.innerHTML = `
            <span style="font-size: 13px;">🚸 Madinaxon (Cobalt)</span>
            <span style="color: #4ade80; font-weight: 700;">8 daqiqa</span>
          `;
        } else {
          island.innerHTML = `<span>🚕</span><span>Cobalt • 8 daq</span>`;
        }
      });
    }

    // Default active order
    this.activeOrder = {
      id: "ORD-8821",
      child_name: "Madinaxon (7 yosh)",
      pin_code: "4892",
      assigned_to: "Otabek Qodirov (Cobalt 40 A 777 BA)",
      eta: "8 daqiqa",
      pickup_location: "2-sonli maktab, Al-Farg'oniy ko'chasi"
    };
  }

  updateClock() {
    const clockEl = document.getElementById("status-clock");
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}`;
  }

  toggleTheme() {
    if (window.soundFX) window.soundFX.playTap();
    this.theme = this.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", this.theme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.innerHTML = this.theme === "light" ? "🌙" : "☀️";
    }
    this.showToast(this.theme === "light" ? "Yorug' mavzu yoqildi" : "Tungi mavzu yoqildi");
  }

  togglePhoneFrame() {
    if (window.soundFX) window.soundFX.playTap();
    const wrapper = document.querySelector(".phone-wrapper");
    const btn = document.getElementById("frame-toggle-btn");
    this.isFullscreen = !this.isFullscreen;
    if (this.isFullscreen) {
      wrapper.classList.add("fullscreen-mode");
      if (btn) btn.innerHTML = "📱 Telefon ramkasi";
    } else {
      wrapper.classList.remove("fullscreen-mode");
      if (btn) btn.innerHTML = "🖥️ To'liq ekran";
    }
  }

  showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.innerHTML = `<span>🔔</span> <span>${message}</span>`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  switchTab(tabName) {
    if (window.soundFX) window.soundFX.playTap();
    this.currentTab = tabName;

    // Update bottom nav active state
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.getAttribute("data-tab") === tabName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Hide all tab views
    document.querySelectorAll(".tab-view").forEach(view => {
      view.style.display = "none";
    });

    // Show current tab view
    const currentView = document.getElementById(`tab-${tabName}`);
    if (currentView) {
      currentView.style.display = "block";
    }

    // Scroll to top
    const appBody = document.querySelector(".app-body");
    if (appBody) appBody.scrollTop = 0;

    // Trigger tab specific renders
    if (tabName === "smarthome") {
      window.smartHome.render();
    } else if (tabName === "finance") {
      window.finance.render();
    } else if (tabName === "dispatcher") {
      window.dispatcher.render();
    } else if (tabName === "home" && this.mapSim) {
      setTimeout(() => this.mapSim.resize(), 100);
    }
  }

  setActiveOrder(order) {
    this.activeOrder = order;
    const pinEl = document.getElementById("active-order-pin");
    const driverEl = document.getElementById("active-order-driver");
    const etaEl = document.getElementById("active-order-eta");
    const trackerCard = document.getElementById("live-tracker-card");

    if (trackerCard) trackerCard.style.display = "block";
    if (pinEl && order.pin_code) pinEl.textContent = order.pin_code;
    if (driverEl && order.assigned_to) driverEl.textContent = order.assigned_to;
    if (etaEl && order.eta) etaEl.textContent = order.eta;

    // Scroll to tracker
    this.switchTab("home");
  }

  copyPinCode() {
    if (window.soundFX) window.soundFX.playTap();
    if (this.activeOrder && this.activeOrder.pin_code) {
      navigator.clipboard.writeText(this.activeOrder.pin_code).catch(() => {});
      this.showToast(`PIN kod nusxalandi: ${this.activeOrder.pin_code}`);
    }
  }

  printReport() {
    if (window.soundFX) window.soundFX.playTap();
    window.print();
  }
}

window.app = new AqilApp();

document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
