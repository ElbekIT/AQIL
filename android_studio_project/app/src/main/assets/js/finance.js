/**
 * Iqtisodiy-Moliyaviy Hisob-Kitob va Zararsizlik Modeli
 * Toshkent Menejment va Iqtisodiyot Instituti
 * Muallif: Sharofiddinova Nozima Egamberdi qizi
 */

class FinanceManager {
  constructor() {
    this.containerId = "finance-container";
    this.fixedCostMonthly = 18500000;
    
    // Sliders state
    this.transportQty = 100;
    this.repairQty = 40;
    this.sosQty = 20;
    this.daycareQty = 16;
  }

  setPreset(type) {
    if (window.soundFX) window.soundFX.playTap();
    if (type === "initial_sample") {
      // 11-banddagi 176 ta buyurtma misoli (-14.92 mln zarar)
      this.transportQty = 100;
      this.repairQty = 40;
      this.sosQty = 20;
      this.daycareQty = 16;
      window.app.showToast("Dastlabki 1-oy sinov ko'rsatkichlari yuklandi (Operatsion zarar holati)");
    } else if (type === "breakeven") {
      // Zararsizlik nuqtasi (18.5 mln marjani to'liq qoplash)
      this.transportQty = 450;
      this.repairQty = 180;
      this.sosQty = 120;
      this.daycareQty = 85;
      window.app.showToast("Zararsizlik nuqtasi (Break-even: 100% xarajat qoplandi)");
    } else if (type === "growth") {
      // Foydali o'sish bosqichi (+25 mln sof foyda)
      this.transportQty = 800;
      this.repairQty = 350;
      this.sosQty = 220;
      this.daycareQty = 150;
      window.app.showToast("Foydali kengayish bosqichi (+25 mln sof oylik foyda)");
    }
    this.render();
  }

  onSliderChange(name, val) {
    this[name] = parseInt(val, 10);
    this.render();
  }

  calculate() {
    const marginTransport = this.transportQty * 7000;
    const marginRepair = this.repairQty * 20000;
    const marginSos = this.sosQty * 40000;
    const marginDaycare = this.daycareQty * 80000;

    const totalMargin = marginTransport + marginRepair + marginSos + marginDaycare;
    const netResult = totalMargin - this.fixedCostMonthly;
    const coverage = Math.min(Math.round((totalMargin / this.fixedCostMonthly) * 100), 300);
    const totalClients = this.transportQty + this.repairQty + this.sosQty + (this.daycareQty * 5);

    return {
      marginTransport,
      marginRepair,
      marginSos,
      marginDaycare,
      totalMargin,
      netResult,
      coverage,
      totalClients,
      isProfitable: netResult >= 0
    };
  }

  formatMoney(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  }

  render() {
    const cont = document.getElementById(this.containerId);
    if (!cont) return;

    const res = this.calculate();

    let html = `
      <!-- PRESET BUTTONS -->
      <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 4px;">
        <button class="hero-btn" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); font-size: 11px;" onclick="window.finance.setPreset('initial_sample')">
          📉 1-oy sinov (Zarar)
        </button>
        <button class="hero-btn" style="background: rgba(37, 99, 235, 0.1); color: var(--primary); font-size: 11px;" onclick="window.finance.setPreset('breakeven')">
          ⚖️ Zararsizlik nuqtasi
        </button>
        <button class="hero-btn" style="background: rgba(16, 185, 129, 0.1); color: var(--accent); font-size: 11px;" onclick="window.finance.setPreset('growth')">
          🚀 O'sish va Foyda
        </button>
      </div>

      <!-- NET PROFIT / LOSS SUMMARY CARD -->
      <div class="hero-card" style="background: ${res.isProfitable ? 'var(--accent-gradient)' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'};">
        <div class="hero-tag">${res.isProfitable ? 'SOF OPERATSION FOYDA' : 'OPERATSION ZARAR HOLATI'}</div>
        <div class="hero-title" style="font-size: 24px; font-weight: 800;">
          ${res.netResult >= 0 ? '+' : ''}${this.formatMoney(res.netResult)}
        </div>
        <div class="hero-desc">
          Oylik marja: <b>${this.formatMoney(res.totalMargin)}</b> | Doimiy xarajat: <b>${this.formatMoney(this.fixedCostMonthly)}</b>
        </div>
        
        <div style="margin-top: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700;">
            <span>Xarajatlarni qoplash darajasi:</span>
            <span>${res.coverage}%</span>
          </div>
          <div class="progress-bar-bg" style="background: rgba(255, 255, 255, 0.3); height: 8px;">
            <div class="progress-bar-fill" style="width: ${Math.min(res.coverage, 100)}%; background: #fff;"></div>
          </div>
        </div>
      </div>

      <!-- INTERACTIVE SLIDERS SECTION -->
      <div class="finance-metric-card">
        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
          🎛️ Oylik buyurtmalar simulyatori (Zararsizlik modeli)
        </h4>

        <!-- Slider 1 -->
        <div class="slider-container">
          <div class="slider-label">
            <span>🚸 Bolalar taksisi (Marja: 7 000 so'm):</span>
            <span style="color: var(--primary); font-weight: 700;">${this.transportQty} ta (${this.formatMoney(res.marginTransport)})</span>
          </div>
          <input type="range" class="range-slider" min="0" max="1000" step="10" value="${this.transportQty}" oninput="window.finance.onSliderChange('transportQty', this.value)">
        </div>

        <!-- Slider 2 -->
        <div class="slider-container">
          <div class="slider-label">
            <span>🔧 Maishiy ta'mir (Marja: 20 000 so'm):</span>
            <span style="color: var(--primary); font-weight: 700;">${this.repairQty} ta (${this.formatMoney(res.marginRepair)})</span>
          </div>
          <input type="range" class="range-slider" min="0" max="500" step="5" value="${this.repairQty}" oninput="window.finance.onSliderChange('repairQty', this.value)">
        </div>

        <!-- Slider 3 -->
        <div class="slider-container">
          <div class="slider-label">
            <span>🚨 Avto SOS (Marja: 40 000 so'm):</span>
            <span style="color: var(--primary); font-weight: 700;">${this.sosQty} ta (${this.formatMoney(res.marginSos)})</span>
          </div>
          <input type="range" class="range-slider" min="0" max="300" step="5" value="${this.sosQty}" oninput="window.finance.onSliderChange('sosQty', this.value)">
        </div>

        <!-- Slider 4 -->
        <div class="slider-container">
          <div class="slider-label">
            <span>🧸 Dam olish guruhi (Marja: 80 000 so'm):</span>
            <span style="color: var(--primary); font-weight: 700;">${this.daycareQty} ta (${this.formatMoney(res.marginDaycare)})</span>
          </div>
          <input type="range" class="range-slider" min="0" max="200" step="2" value="${this.daycareQty}" oninput="window.finance.onSliderChange('daycareQty', this.value)">
        </div>
      </div>

      <!-- INITIAL BUDGET BREAKDOWN (Nozima Sharofiddinova 9.1-band) -->
      <div class="finance-metric-card">
        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">
          💼 Dastlabki boshlash xarajatlari (Jami: 76 mln so'm)
        </h4>
        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>🌐 Veb-sayt va buyurtma tizimi:</span>
            <b>30 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>⚖️ Tashkiliy-huquqiy ishlar va ruxsatlar:</span>
            <b>5 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>📢 Dastlabki reklama va targ'ibot:</span>
            <b>10 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>🛡️ Bolalar xavfsizlik jihozlari (kreslolar):</span>
            <b>8 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>🛠️ Avto yordam asbob-uskunalari:</span>
            <b>8 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>👕 Xodimlar formasi va brending:</span>
            <b>3 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--card-border); padding: 4px 0;">
            <span>📱 Dispetcher telefonlari va jihozlari:</span>
            <b>4 000 000 so'm</b>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>💰 Kutilmagan xarajatlar zaxirasi:</span>
            <b>8 000 000 so'm</b>
          </div>
        </div>
      </div>

      <!-- 3-MONTH BUDGET SUMMARY (9.5-band) -->
      <div class="finance-metric-card" style="background: rgba(37, 99, 235, 0.04); border-color: rgba(37, 99, 235, 0.2);">
        <h4 style="font-size: 13px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
          📊 3 oylik umumiy talab etiladigan budjet
        </h4>
        <div style="font-size: 11px; line-height: 1.5; color: var(--text-main);">
          • Dastlabki tashkil etish: <b>76 000 000 so'm</b><br>
          • 3 oylik doimiy xarajatlar (18.5 mln × 3): <b>55 500 000 so'm</b><br>
          • Aylanma mablag' zaxirasi: <b>15 000 000 so'm</b><br>
          <div style="margin-top: 6px; font-size: 13px; font-weight: 800; color: var(--primary);">
            Jami zaruriy investitsiya: 146 500 000 so'm
          </div>
        </div>
      </div>
    `;

    cont.innerHTML = html;
  }
}

window.finance = new FinanceManager();
