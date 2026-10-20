/**
 * Aqlli Uy (Smart Home Hub) Boshqaruv Moduli
 * Chiroqlar, Aqlli qulf, Termostat, Gaz va suv datchiklari.
 */

class SmartHomeManager {
  constructor() {
    this.devices = [];
    this.containerId = "smart-home-container";
  }

  async loadDevices() {
    try {
      const res = await fetch("/api/smarthome");
      if (res.ok) {
        const data = await res.json();
        this.devices = data.devices;
      } else {
        throw new Error("Offline rejim");
      }
    } catch (e) {
      // Local fallback
      this.devices = [
        { id: "light_living", name: "Mehmonxona yoritgichi", room: "Mehmonxona", type: "light", state: true },
        { id: "light_kids", name: "Bolalar xonasi chirog'i", room: "Bolalar xonasi", type: "light", state: true },
        { id: "door_lock", name: "Asosiy eshik aqlli qulfi (Smart Lock)", room: "Dahliz", type: "lock", state: true, battery: 94 },
        { id: "climate_ac", name: "Iqlim nazorati (Konditsioner)", room: "Umumiy", type: "climate", state: true, current_temp: 23, target_temp: 22.5 },
        { id: "sensor_gas", name: "Gaz sizib chiqish datchigi", room: "Oshxona", type: "sensor", state: "normal", value: "0.01% (Xavfsiz)" },
        { id: "cam_hallway", name: "Kirish videokamerasi", room: "Kirish", type: "camera", state: true, resolution: "2K" }
      ];
    }
    this.render();
  }

  async toggleDevice(id) {
    if (window.soundFX) window.soundFX.playSwitch();
    const dev = this.devices.find(d => d.id === id);
    if (!dev) return;

    if (dev.type === "sensor") {
      window.app.showToast("Datchik avtomatik rejimda ishlaydi (Ko'rsatkich me'yorda)");
      return;
    }

    dev.state = !dev.state;
    this.render();

    try {
      await fetch("/api/smarthome/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: id })
      });
    } catch (e) {
      console.log("Offline rejimda holat yangilandi");
    }

    if (id === "door_lock") {
      const statusText = dev.state ? "Eshik qulflandi 🔒" : "Eshik masofadan ochildi 🔓";
      window.app.showToast(statusText);
    } else {
      window.app.showToast(`${dev.name}: ${dev.state ? "Yoqildi" : "O'chirildi"}`);
    }
  }

  setScenario(type) {
    if (window.soundFX) window.soundFX.playTap();
    if (type === "leave") {
      this.devices.forEach(d => {
        if (d.type === "light") d.state = false;
        if (d.type === "lock") d.state = true;
      });
      window.app.showToast("🏠 'Uydan chiqish' ssenariysi: Barcha chiroqlar o'chirildi, eshik qulflandi.");
    } else if (type === "home") {
      this.devices.forEach(d => {
        if (d.type === "light") d.state = true;
        if (d.type === "lock") d.state = false;
      });
      window.app.showToast("👋 'Uyga kelish' ssenariysi: Chiroqlar yoqildi, eshik ochildi!");
    } else if (type === "night") {
      this.devices.forEach(d => {
        if (d.id === "light_living") d.state = false;
        if (d.id === "light_kids") d.state = true; // tungi yumshoq chiroq
        if (d.type === "lock") d.state = true;
      });
      window.app.showToast("🌙 'Tungi xotirjamlik' ssenariysi faollashtirildi.");
    }
    this.render();
  }

  changeTemp(delta) {
    const climate = this.devices.find(d => d.type === "climate");
    if (!climate) return;
    climate.target_temp = Math.round((climate.target_temp + delta) * 10) / 10;
    if (window.soundFX) window.soundFX.playTap();
    this.render();
    window.app.showToast(`Iqlim harorati belgilandi: ${climate.target_temp}°C`);
  }

  render() {
    const cont = document.getElementById(this.containerId);
    if (!cont) return;

    let html = `
      <div style="display: flex; gap: 8px; margin-bottom: 14px; overflow-x: auto; padding-bottom: 4px;">
        <button class="hero-btn" style="background: rgba(37, 99, 235, 0.1); color: var(--primary); font-size: 11px;" onclick="window.smartHome.setScenario('home')">
          👋 Uyga kelish
        </button>
        <button class="hero-btn" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); font-size: 11px;" onclick="window.smartHome.setScenario('leave')">
          🚪 Uydan chiqish
        </button>
        <button class="hero-btn" style="background: rgba(139, 92, 246, 0.1); color: var(--purple); font-size: 11px;" onclick="window.smartHome.setScenario('night')">
          🌙 Tungi rejim
        </button>
      </div>

      <div class="smart-home-grid">
    `;

    this.devices.forEach(dev => {
      let icon = "💡";
      if (dev.type === "lock") icon = dev.state ? "🔒" : "🔓";
      if (dev.type === "climate") icon = "❄️";
      if (dev.type === "sensor") icon = "🚨";
      if (dev.type === "camera") icon = "📹";

      const isActive = dev.state === true || dev.state === "normal";
      const statusLabel = dev.type === "lock" 
        ? (dev.state ? "Qulflangan" : "Ochiq")
        : (dev.type === "sensor" ? dev.value : (dev.state ? "Yoqilgan" : "O'chirilgan"));

      html += `
        <div class="smart-tile ${isActive ? 'active' : ''}" onclick="window.smartHome.toggleDevice('${dev.id}')">
          <div class="tile-top">
            <span class="tile-icon">${icon}</span>
            <div class="toggle-switch"></div>
          </div>
          <div class="tile-info">
            <h5>${dev.name}</h5>
            <p>${dev.room} • ${statusLabel}</p>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    // Climate widget
    const climate = this.devices.find(d => d.type === "climate");
    if (climate) {
      html += `
        <div class="finance-metric-card" style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 2px;">🌡️ Xona harorati boshqaruvi</h4>
            <p style="font-size: 11px; color: var(--text-muted);">Joriy harorat: ${climate.current_temp || 23}°C | Maqsad: ${climate.target_temp || 22.5}°C</p>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="icon-btn" style="width: 32px; height: 32px;" onclick="window.smartHome.changeTemp(-0.5)">-</button>
            <span style="font-weight: 800; font-size: 15px; color: var(--primary);">${climate.target_temp || 22.5}°C</span>
            <button class="icon-btn" style="width: 32px; height: 32px;" onclick="window.smartHome.changeTemp(0.5)">+</button>
          </div>
        </div>
      `;
    }

    cont.innerHTML = html;
  }
}

window.smartHome = new SmartHomeManager();
