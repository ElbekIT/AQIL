/**
 * AQIL — Foydalanuvchi Shaxsiy Kabineti va Profil Moduli
 * Taqdimot darajasidagi zamonaviy interfeys, bio tahrirlash va Firebase RTDB boshqaruvi
 */

class ProfileManager {
  constructor() {
    this.containerId = "tab-profile";
    this.activeSubView = "profile"; // "profile" yoki "titul"
  }

  init() {
    if (window.authManager) {
      window.authManager.subscribe((user) => {
        this.render();
      });
    }
  }

  switchSubView(view) {
    if (window.soundFX) window.soundFX.playTap();
    this.activeSubView = view;
    this.render();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const user = window.authManager ? window.authManager.currentUser : {};
    const isLoggedIn = user && user.isLoggedIn;
    const isGoogle = user && user.provider === "google";

    // Agar Titul varag'i tanlangan bo'lsa
    if (this.activeSubView === "titul") {
      container.innerHTML = this.renderTitulView();
      return;
    }

    // Profil ko'rinishi
    container.innerHTML = `
      <!-- SUB NAV: Profil vs Titul -->
      <div class="profile-subnav">
        <button class="profile-tab-btn active" onclick="window.profileManager.switchSubView('profile')">
          👤 Shaxsiy Profil
        </button>
        <button class="profile-tab-btn" onclick="window.profileManager.switchSubView('titul')">
          🏛️ TMII Titul Varag'i
        </button>
      </div>

      <!-- GOOGLE AUTH BANNER -->
      <div class="auth-action-banner ${isLoggedIn ? 'logged-in' : 'guest'}">
        ${!isLoggedIn ? `
          <div class="auth-banner-content">
            <div class="auth-banner-text">
              <h4>Google orqali tizimga kiring</h4>
              <p>Aqlli uy, buyurtmalar tarixi va profil sozlamalarini bulutda saqlang.</p>
            </div>
            <button class="google-signin-btn" onclick="window.authManager.loginWithGoogle()">
              <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google orqali kirish</span>
            </button>
            <button class="demo-login-link" onclick="window.authManager.loginAsDemo()">
              🎓 Taqdimotchi rejimi (Nozima Sharofiddinova)
            </button>
          </div>
        ` : `
          <div class="auth-banner-logged">
            <div class="auth-status-info">
              <span class="auth-online-dot"></span>
              <div>
                <div style="font-size: 12px; font-weight: 700; color: var(--text-main);">
                  ${isGoogle ? 'Google hisobi orqali ulangan' : 'Taqdimotchi hisobi faol'}
                </div>
                <div style="font-size: 11px; color: var(--text-muted);">${user.email}</div>
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-logout" onclick="window.authManager.logout()" title="Hisobdan chiqish">
                🚪 Chiqish
              </button>
            </div>
          </div>
        `}
      </div>

      <!-- MAIN PROFILE HERO CARD -->
      <div class="profile-hero-card">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar-large">
            ${user.photoURL ? 
              `<img src="${user.photoURL}" alt="avatar" class="avatar-img-lg">` : 
              `<span class="avatar-emoji-lg">${user.avatarEmoji || '👩🏻‍💼'}</span>`
            }
          </div>
          <button class="avatar-edit-badge" onclick="window.profileManager.openAvatarPicker()" title="Suratni o'zgartirish">
            📷
          </button>
        </div>

        <div class="profile-hero-info">
          <div class="profile-name-row">
            <h3>${user.displayName || 'Nozima Sharofiddinova'}</h3>
            <span class="verified-check" title="Tasdiqlangan shaxs">✓</span>
          </div>
          <div class="profile-role-tag">${user.role || "Xonadon boshqaruvchisi • VIP"}</div>
          
          <div class="profile-bio-box">
            <p>“${user.bio || "TMII 1-bosqich talabasi • Innovatsion loyihalar tadqiqotchisi"}”</p>
          </div>

          <div class="profile-actions-row">
            <button class="btn-edit-profile" onclick="window.profileManager.openEditModal()">
              <span>✏️ Profilni tahrirlash</span>
            </button>
            <button class="btn-share-profile" onclick="window.profileManager.copyShareLink()">
              <span>🔗 Ulashish</span>
            </button>
          </div>
        </div>
      </div>

      <!-- WALLET & QUICK STATS -->
      <div class="profile-stats-grid">
        <div class="pstat-card stat-balance">
          <div class="pstat-top">
            <span class="pstat-icon">💳</span>
            <span class="pstat-tag">Hamyon</span>
          </div>
          <div class="pstat-val">${(user.balance || 250000).toLocaleString('uz-UZ')} so'm</div>
          <div class="pstat-sub">+ ${(user.cashback || 18500).toLocaleString('uz-UZ')} so'm keshbek</div>
        </div>

        <div class="pstat-card stat-devices">
          <div class="pstat-top">
            <span class="pstat-icon">💡</span>
            <span class="pstat-tag">Aqlli Uy</span>
          </div>
          <div class="pstat-val">6 ta qurilma</div>
          <div class="pstat-sub">Barchasi onlayn va faol</div>
        </div>
      </div>

      <!-- USER DETAILS CARD -->
      <div class="profile-details-card">
        <div class="card-section-title">
          <span>📋 Shaxsiy va Oila ma'lumotlari</span>
          <button class="btn-link-edit" onclick="window.profileManager.openEditModal()">O'zgartirish</button>
        </div>

        <div class="profile-detail-item">
          <span class="detail-icon">📱</span>
          <div class="detail-content">
            <div class="detail-label">Telefon raqami</div>
            <div class="detail-val">${user.phone || '+998 90 123 45 67'}</div>
          </div>
        </div>

        <div class="profile-detail-item">
          <span class="detail-icon">📍</span>
          <div class="detail-content">
            <div class="detail-label">Yashash manzili</div>
            <div class="detail-val">${user.address || "Farg'ona shahri, Al-Farg'oniy ko'chasi 14-uy"}</div>
          </div>
        </div>

        <div class="profile-detail-item">
          <span class="detail-icon">🚸</span>
          <div class="detail-content">
            <div class="detail-label">Farzandlar (Taksi va Bog'cha uchun)</div>
            <div class="detail-val">${user.children || "Madinaxon (7 yosh), Behruz (4 yosh)"}</div>
          </div>
        </div>

        <div class="profile-detail-item">
          <span class="detail-icon">🛡️</span>
          <div class="detail-content">
            <div class="detail-label">Bolani topshirish xavfsizlik PIN kodi</div>
            <div class="detail-val" style="display: flex; align-items: center; gap: 8px;">
              <span class="pin-badge-lg">${user.familyPin || '4892'}</span>
              <span style="font-size: 11px; color: var(--text-muted);">(Haydovchiga faqat shu kod aytiladi)</span>
            </div>
          </div>
        </div>

        <div class="profile-detail-item">
          <span class="detail-icon">☁️</span>
          <div class="detail-content">
            <div class="detail-label">Firebase Bulut Sinxronizatsiyasi</div>
            <div class="detail-val" style="color: var(--accent); font-weight: 600;">
              🟢 Realtime Database ulangan (aqll-uy-boshqaruvi)
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER PRESENTATION BADGE -->
      <div class="presentation-mini-card" onclick="window.profileManager.switchSubView('titul')">
        <div style="font-size: 24px;">🏛️</div>
        <div>
          <div style="font-size: 12px; font-weight: 700; color: var(--text-main);">Toshkent Menejment va Iqtisodiyot Instituti</div>
          <div style="font-size: 11px; color: var(--text-muted);">Muallif: Sharofiddinova Nozima (1-bosqich) • Titul varag'i ›</div>
        </div>
      </div>
    `;
  }

  renderTitulView() {
    return `
      <!-- SUB NAV -->
      <div class="profile-subnav">
        <button class="profile-tab-btn" onclick="window.profileManager.switchSubView('profile')">
          👤 Shaxsiy Profil
        </button>
        <button class="profile-tab-btn active" onclick="window.profileManager.switchSubView('titul')">
          🏛️ TMII Titul Varag'i
        </button>
      </div>

      <!-- Rasmiy Titul Card -->
      <div class="titul-card">
        <div class="titul-emblem">🏛️</div>
        <div class="titul-title">Toshkent Menejment va Iqtisodiyot Instituti</div>
        <div class="titul-sub">Farg'ona kampusi • Iqtisodiyot va menejment yo'nalishi</div>
        
        <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
          1-bosqich talabasi innovatsion loyihasi
        </div>

        <div class="titul-project">
          “AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
        </div>

        <div class="titul-author-box">
          <div>👤 <b>Loyiha muallifi:</b> Sharofiddinova Nozima Egamberdi qizi</div>
          <div>🎓 <b>Ta'lim muassasasi:</b> Toshkent menejment va iqtisodiyot instituti Farg'ona filiali</div>
          <div>📚 <b>Bosqich:</b> 1-bosqich talabasi</div>
          <div>💼 <b>Loyiha turi:</b> Xizmat ko'rsatish va raqamli tadbirkorlik loyihasi</div>
          <div>📍 <b>Hudud:</b> Farg'ona shahri (keyinchalik viloyat va respublika)</div>
          <div>📅 <b>Yil:</b> 2026-yil</div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
          <button class="btn-primary" onclick="if(window.presentation) window.presentation.openPitchDeck()">
            🏆 Hakamlar uchun Taqdimot (Pitch Deck)
          </button>
          <button class="btn-primary" style="background: #64748b;" onclick="window.app.printReport()">
            🖨️ Titul varag'ini chop etish (PDF)
          </button>
        </div>
      </div>

      <!-- LOYIHANI O'RGANISH VA ILMIY ASOSLARI -->
      <div class="finance-metric-card" style="margin-top: 14px;">
        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">
          🎯 Loyihaning dolzarbligi va asosiy maqsadi
        </h4>
        <p style="font-size: 11px; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
          Bugungi kunda oilalarda ota-onalar ish bilan band bo'lib, bolalarni maktabdan olib kelish, dam olish kunlari nazorat qilish, maishiy texnika buzilganda usta topish yoki yo'lda avtomobil buzilganda texnik yordam olishga ko'p vaqt sarflanadi.
        </p>
        <p style="font-size: 11px; color: var(--text-muted); line-height: 1.5;">
          Ushbu platforma oilalarga vaqtni tejash, ishonchli xodimlardan foydalanish hamda aqlli uy qurilmalari orqali xonadon xavfsizligini bitta qulay mobil ilova orqali boshqarish imkoniyatini taqdim etadi.
        </p>
      </div>

      <!-- XAVFSIZLIK KAFOLATLARI -->
      <div class="finance-metric-card" style="margin-top: 14px;">
        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--accent);">
          🛡️ Bolalar xavfsizligi va Raqamli PIN tizimi
        </h4>
        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.5;">
          ✅ <b>Haydovchilar:</b> Hujjatlari, tajribasi va sudlanmaganligi qat'iy tekshiriladi.<br>
          ✅ <b>Bolalar kreslosi:</b> Yoshiga mos ISOFIX o'rindiqlar va xavfsizlik kamari majburiy.<br>
          ✅ <b>Maxsus 4 xonali PIN:</b> Bola faqat ota-ona tomonidan tasdiqlangan PIN-kod orqali qabul qilinadi va topshiriladi.<br>
          ✅ <b>GPS jonli kuzatuv:</b> Harakat yo'nalishi real vaqtda ota-onaning telefonida aks etadi.
        </div>
      </div>
    `;
  }

  /**
   * Profilni tahrirlash modalini ochish
   */
  openEditModal() {
    if (window.soundFX) window.soundFX.playTap();
    const user = window.authManager ? window.authManager.currentUser : {};

    const overlay = document.getElementById("order-modal-overlay");
    const container = document.getElementById("order-form-container");
    if (!overlay || !container) return;

    container.innerHTML = `
      <div class="sheet-title">✏️ Profilni Tahrirlash</div>
      <p class="sheet-subtitle">Ismingiz, bio va oilaviy ma'lumotlaringizni yangilang.</p>

      <form id="profile-edit-form" onsubmit="window.profileManager.saveProfileForm(event)">
        <div style="display: flex; gap: 10px;">
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Ism:</label>
            <input type="text" name="firstName" class="form-input" value="${user.firstName || ''}" required>
          </div>
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Familiya:</label>
            <input type="text" name="lastName" class="form-input" value="${user.lastName || ''}" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Bio (O'zingiz haqida qisqacha / Kasbingiz):</label>
          <textarea name="bio" class="form-input" rows="2" style="resize: none;" placeholder="Masalan: TMII 1-bosqich talabasi, tadbirkor">${user.bio || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Telefon raqami:</label>
          <input type="tel" name="phone" class="form-input" value="${user.phone || '+998 90 123 45 67'}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Yashash manzili (Shaharcha / Ko'cha / Uy):</label>
          <input type="text" name="address" class="form-input" value="${user.address || "Farg'ona shahri, Al-Farg'oniy ko'chasi 14-uy"}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Farzandlar ismi va yoshi (Xizmatlar uchun):</label>
          <input type="text" name="children" class="form-input" value="${user.children || ''}" placeholder="Masalan: Madina (7 yosh), Behruz (4 yosh)">
        </div>

        <div class="form-group">
          <label class="form-label">Bolani topshirish 4 xonali PIN kodi:</label>
          <input type="number" name="familyPin" class="form-input" maxlength="4" value="${user.familyPin || '4892'}" required>
        </div>

        <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
          <button type="submit" class="btn-primary">
            <span>💾 O'zgarishlarni saqlash</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </div>
      </form>
    `;

    overlay.classList.add("active");
  }

  async saveProfileForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (window.authManager) {
      await window.authManager.updateProfile(data);
    }

    if (window.services) {
      window.services.closeModal();
    }
  }

  /**
   * Avatar / Surat tanlash dialogi
   */
  openAvatarPicker() {
    if (window.soundFX) window.soundFX.playTap();
    const overlay = document.getElementById("order-modal-overlay");
    const container = document.getElementById("order-form-container");
    if (!overlay || !container) return;

    const emojis = ["👩🏻‍💼", "🧕🏻", "👩🏻‍🏫", "👩🏻‍⚕️", "👨🏻‍💼", "🧔🏻", "👨🏻‍💻", "🏡", "⭐", "💎"];

    container.innerHTML = `
      <div class="sheet-title">📷 Profil Avatarini Tanlash</div>
      <p class="sheet-subtitle">O'zingizga yoqqan rasmni yoki emojini tanlang:</p>

      <div class="avatar-picker-grid">
        ${emojis.map(em => `
          <button class="avatar-emoji-btn" onclick="window.profileManager.selectAvatarEmoji('${em}')">
            ${em}
          </button>
        `).join('')}
      </div>

      <div style="margin: 16px 0 10px;">
        <label class="form-label">Yoki rasm URL manzilini kiriting:</label>
        <input type="url" id="custom-photo-url-input" class="form-input" placeholder="https://example.com/photo.jpg">
      </div>

      <button class="btn-primary" onclick="window.profileManager.saveCustomPhotoUrl()">
        <span>Yuklash</span>
      </button>
      <button type="button" class="btn-secondary" style="margin-top: 8px;" onclick="window.services.closeModal()">
        Yopish
      </button>
    `;

    overlay.classList.add("active");
  }

  selectAvatarEmoji(emoji) {
    if (window.soundFX) window.soundFX.playTap();
    if (window.authManager) {
      window.authManager.updateAvatar(emoji);
    }
    if (window.services) {
      window.services.closeModal();
    }
  }

  saveCustomPhotoUrl() {
    const input = document.getElementById("custom-photo-url-input");
    if (input && input.value.trim()) {
      if (window.authManager) {
        window.authManager.updateAvatar(input.value.trim());
      }
      if (window.services) {
        window.services.closeModal();
      }
    }
  }

  copyShareLink() {
    if (window.soundFX) window.soundFX.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (window.app) window.app.showToast("🔗 Havola nusxalandi!");
    }
  }
}

window.profileManager = new ProfileManager();

document.addEventListener("DOMContentLoaded", () => {
  window.profileManager.init();
});
