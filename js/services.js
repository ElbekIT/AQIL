/**
 * Xizmatlar Katalogi va Buyurtma Berish Moduli
 * Bolalar taksisi, Enaga, Maishiy ta'mir, Avto SOS, Ro'zg'or ustalari.
 */

class ServicesManager {
  constructor() {
    this.currentService = null;
  }

  openOrderModal(serviceType) {
    if (window.soundFX) window.soundFX.playTap();
    this.currentService = serviceType;
    const overlay = document.getElementById("order-modal-overlay");
    const container = document.getElementById("order-form-container");
    if (!overlay || !container) return;

    let title = "Xizmatga buyurtma berish";
    let formHtml = "";

    if (serviceType === "kids_transport") {
      title = "🚸 Bolalarni xavfsiz tashish (Maktab / Bog'cha)";
      formHtml = `
        <div class="sheet-title">${title}</div>
        <p class="sheet-subtitle">Maxsus 4 xonali PIN kod, tekshirilgan haydovchi va xavfsizlik o'rindig'i bilan.</p>

        <form id="service-order-form" onsubmit="window.services.submitOrder(event)">
          <input type="hidden" name="service_type" value="kids_transport">
          <input type="hidden" name="price" value="45000">
          <input type="hidden" name="title" value="Bolalarni xavfsiz tashish">

          <div class="form-group">
            <label class="form-label">Farzandingiz ismi va yoshi:</label>
            <input type="text" name="child_name" class="form-input" placeholder="Masalan: Madinaxon, 7 yosh" required>
          </div>

          <div class="form-group">
            <label class="form-label">Qayerdan olib ketiladi (Maktab/Bog'cha/To'garak):</label>
            <input type="text" name="pickup_location" class="form-input" value="2-sonli umumta'lim maktabi, Al-Farg'oniy ko'chasi" required>
          </div>

          <div class="form-group">
            <label class="form-label">Yetkazish manzili (Uy yoki to'garak):</label>
            <input type="text" name="dropoff_location" class="form-input" value="B.Marg'inoniy ko'chasi, 14-uy" required>
          </div>

          <div class="form-group">
            <label class="form-label">Ishonchli haydovchi tanlang:</label>
            <select name="assigned_to" class="form-select">
              <option value="Otabek Qodirov (Cobalt 40 A 777 BA)">Otabek Qodirov (Cobalt 40 A 777 BA) — ⭐ 4.98</option>
              <option value="Dilshod Usmonov (Gentra 40 B 555 AA)">Dilshod Usmonov (Gentra 40 B 555 AA) — ⭐ 4.95</option>
              <option value="Malika Karimova (Tracker 40 C 333 CA)">Malika Karimova (Tracker 40 C 333 CA, Ayol) — ⭐ 5.0</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Ota-ona telefon raqami:</label>
            <input type="tel" name="phone" class="form-input" value="+998 90 123-45-67" required>
          </div>

          <div class="pin-display-card" style="margin-bottom: 14px;">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-main);">Standart xizmat narxi (5 km gacha):</div>
              <div style="font-size: 11px; color: var(--text-muted);">Yoqilg'i, haydovchi va buyurtma nazorati kiradi</div>
            </div>
            <div style="font-size: 16px; font-weight: 800; color: var(--primary);">45 000 so'm</div>
          </div>

          <button type="submit" class="btn-primary">
            <span>🛡️ Buyurtma berish va PIN kod olish</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </form>
      `;
    } else if (serviceType === "weekend_daycare") {
      title = "🧸 Dam olish kunlari bolalarni nazorat qilish";
      formHtml = `
        <div class="sheet-title">${title}</div>
        <p class="sheet-subtitle">Pedagog-tarbiyachi nazorati, ijodiy o'yinlar, uy vazifasi va sog'lom taom.</p>

        <form id="service-order-form" onsubmit="window.services.submitOrder(event)">
          <input type="hidden" name="service_type" value="weekend_group_daycare">
          <input type="hidden" name="title" value="Dam olish kuni bolalar nazorati">

          <div class="form-group">
            <label class="form-label">Xizmat shakli:</label>
            <select name="format" class="form-select" onchange="window.services.updateDaycarePrice(this.value)">
              <option value="group">Markazda guruh bo'lib (4 soat) — 60 000 so'm/bola</option>
              <option value="home">Uyda yakka tartibda (4 soat) — 180 000 so'm</option>
            </select>
          </div>

          <input type="hidden" id="daycare-price-input" name="price" value="60000">

          <div class="form-group">
            <label class="form-label">Farzandingiz ismi va yoshi:</label>
            <input type="text" name="child_name" class="form-input" placeholder="Masalan: Umarbek, 5 yosh" required>
          </div>

          <div class="form-group">
            <label class="form-label">Mashg'ulot kuni va vaqti:</label>
            <select name="pickup_location" class="form-select">
              <option value="Shanba (09:00 - 13:00)">Shanba kuni (09:00 - 13:00)</option>
              <option value="Shanba (14:00 - 18:00)">Shanba kuni (14:00 - 18:00)</option>
              <option value="Yakshanba (09:00 - 13:00)">Yakshanba kuni (09:00 - 13:00)</option>
              <option value="Yakshanba (14:00 - 18:00)">Yakshanba kuni (14:00 - 18:00)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Malakali tarbiyachi tanlang:</label>
            <select name="assigned_to" class="form-select">
              <option value="Nargiza Ergasheva (Pedagog)">Nargiza Ergasheva (Boshlang'ich ta'lim, rasm, shaxmat) — ⭐ 4.99</option>
              <option value="Gulnoza Rahimova (Psixolog)">Gulnoza Rahimova (Psixolog, mantiqiy o'yinlar) — ⭐ 4.96</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Ota-ona telefon raqami:</label>
            <input type="tel" name="phone" class="form-input" value="+998 91 333-44-55" required>
          </div>

          <button type="submit" class="btn-primary">
            <span>✨ Xizmatni band qilish</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </form>
      `;
    } else if (serviceType === "appliance_repair") {
      title = "🔧 Maishiy texnika kafolatli ta'miri";
      formHtml = `
        <div class="sheet-title">${title}</div>
        <p class="sheet-subtitle">Kir yuvish, muzlatgich, televizor va elektr jihozlarini xonadonga borib ta'mirlash.</p>

        <form id="service-order-form" onsubmit="window.services.submitOrder(event)">
          <input type="hidden" name="service_type" value="appliance_repair">
          <input type="hidden" name="price" value="120000">

          <div class="form-group">
            <label class="form-label">Nosoz texnika turi:</label>
            <select name="title" class="form-select">
              <option value="Kir yuvish mashinasi ta'miri">Kir yuvish mashinasi (Aylanmayapti, suv chiqarmayapti)</option>
              <option value="Muzlatgich va sovitkich ta'miri">Muzlatgich va sovitkich (Sovutmayapti, ovoz chiqaryapti)</option>
              <option value="Televizor va monitor ta'miri">Televizor / Monitor (Ekran yonmayapti, pult ishlamayapti)</option>
              <option value="Changyutgich va mayda maishiy texnika">Changyutgich, mikroto'lqinli pech, elektr plita</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Xonadon manzili (Farg'ona shahri):</label>
            <input type="text" name="pickup_location" class="form-input" placeholder="Ko'cha nomi va xonadon raqami" value="Sayilgoh ko'chasi, 28-uy" required>
          </div>

          <div class="form-group">
            <label class="form-label">Malakali usta:</label>
            <select name="assigned_to" class="form-select">
              <option value="Rustam Aliyev (Katta usta)">Rustam Aliyev (11 yil tajriba, 6 oy kafolat) — ⭐ 4.94</option>
              <option value="Jasurbek To'xtasinov (Elektronika ustasi)">Jasurbek To'xtasinov (Elektronika, plitalar) — ⭐ 4.92</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Telefon raqamingiz:</label>
            <input type="tel" name="phone" class="form-input" value="+998 93 555-66-77" required>
          </div>

          <div class="pin-display-card" style="margin-bottom: 14px;">
            <div>
              <div style="font-size: 11px; font-weight: 700;">Diagnostika va dastlabki ta'mir:</div>
              <div style="font-size: 11px; color: var(--text-muted);">Usta borishi + diagnostika + ta'mirlash</div>
            </div>
            <div style="font-size: 16px; font-weight: 800; color: var(--primary);">120 000 so'm</div>
          </div>

          <button type="submit" class="btn-primary">
            <span>👨‍🔧 Ustani chaqirish</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </form>
      `;
    } else if (serviceType === "roadside_sos") {
      title = "🚨 Avto SOS: Yo'lda tezkor texnik yordam";
      formHtml = `
        <div class="sheet-title">${title}</div>
        <p class="sheet-subtitle">Akkumulyator quvvatlash, g'ildirak almashtirish, avtoelektrik yoki evakuator.</p>

        <form id="service-order-form" onsubmit="window.services.submitOrder(event)">
          <input type="hidden" name="service_type" value="roadside_sos">
          <input type="hidden" name="price" value="170000">

          <div class="form-group">
            <label class="form-label">Kerakli yordam turi:</label>
            <select name="title" class="form-select">
              <option value="Akkumulyatorni quvvatlash (Prikurivanie)">Akkumulyator 'prikurivanie' va zaryadlash</option>
              <option value="G'ildirak ta'miri va almashtirish">G'ildirak teshilishi / Zapaska o'rnatish</option>
              <option value="Yo'lda avtoelektrik diagnostikasi">Avtoelektrik (O't olmayapti, signalizatsiya bloklangan)</option>
              <option value="Tezkor evakuator chaqirish">Evakuator (Eng yaqin servis markaziga)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Avtomobil joylashgan manzil:</label>
            <input type="text" name="pickup_location" class="form-input" value="Farg'ona sh., Al-Farg'oniy va Sayilgoh chorrahasi" required>
          </div>

          <div class="form-group">
            <label class="form-label">Tezkor SOS brigadasi:</label>
            <select name="assigned_to" class="form-select">
              <option value="Farg'ona Avto SOS Brigadasi #1">Farg'ona Avto SOS Brigadasi #1 (Yetib borish: 10-15 daqiqa)</option>
              <option value="Evakuator Farg'ona 24/7">Evakuator Farg'ona 24/7 (Katta evakuator)</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Haydovchi telefon raqami:</label>
            <input type="tel" name="phone" class="form-input" value="+998 90 999-88-77" required>
          </div>

          <div class="pin-display-card" style="margin-bottom: 14px;">
            <div>
              <div style="font-size: 11px; font-weight: 700;">Standart SOS xizmat narxi:</div>
              <div style="font-size: 11px; color: var(--text-muted);">Tezkor yetib borish va texnik tuzatish</div>
            </div>
            <div style="font-size: 16px; font-weight: 800; color: var(--danger);">170 000 so'm</div>
          </div>

          <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
            <span>🚀 Tezkor yordam chaqirish</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </form>
      `;
    } else {
      // Home services / Courier
      title = "🏠 Ro'zg'or ustalari va yetkazib berish";
      formHtml = `
        <div class="sheet-title">${title}</div>
        <p class="sheet-subtitle">Santexnik, elektrik, uyni tozalash, zarur dori va mahsulot yetkazish.</p>

        <form id="service-order-form" onsubmit="window.services.submitOrder(event)">
          <input type="hidden" name="service_type" value="home_service">
          <input type="hidden" name="price" value="80000">

          <div class="form-group">
            <label class="form-label">Xizmat yo'nalishi:</label>
            <select name="title" class="form-select">
              <option value="Santexnik xizmati (Kran, truba, unitaz)">Santexnik (Kran almashtirish, oqishni to'xtatish)</option>
              <option value="Elektrik xizmati (Rozetka, lyustra, avtomat)">Elektrik (Rozetka o'rnatish, qisqa tutashuv)</option>
              <option value="Uyni tozalash (General tozalash)">Uyni tozalash (Cleaning)</option>
              <option value="Zarur dori-darmon yoki ro'zg'or yetkazish">Ekspress dori-darmon va mahsulot yetkazish</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Manzil:</label>
            <input type="text" name="pickup_location" class="form-input" value="Farg'ona shahri, Shifokorlar ko'chasi" required>
          </div>

          <div class="form-group">
            <label class="form-label">Telefon:</label>
            <input type="tel" name="phone" class="form-input" value="+998 90 777-66-55" required>
          </div>

          <button type="submit" class="btn-primary">
            <span>✅ Buyurtmani tasdiqlash</span>
          </button>
          <button type="button" class="btn-secondary" onclick="window.services.closeModal()">Bekor qilish</button>
        </form>
      `;
    }

    container.innerHTML = formHtml;
    overlay.classList.add("active");
  }

  updateDaycarePrice(format) {
    const priceInput = document.getElementById("daycare-price-input");
    if (priceInput) {
      priceInput.value = format === "group" ? 60000 : 180000;
    }
  }

  closeModal() {
    const overlay = document.getElementById("order-modal-overlay");
    if (overlay) overlay.classList.remove("active");
  }

  async submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (window.soundFX) window.soundFX.playSuccess();

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      
      this.closeModal();
      window.app.showToast(`✅ Buyurtma qabul qilindi! PIN: ${result.order.pin_code}`);
      
      // Update active order on UI
      window.app.setActiveOrder(result.order);
      if (window.dispatcher) window.dispatcher.loadOrders();
    } catch (err) {
      // Fallback for standalone offline execution
      const demoPin = Math.floor(1000 + Math.random() * 9000);
      const demoOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        title: data.title || "Yangi xizmat buyurtmasi",
        pin_code: demoPin,
        assigned_to: data.assigned_to || "Navbatchi mutaxassis",
        eta: "10-15 daqiqa",
        status: "in_progress",
        status_label: "Mutaxassis yo'lga chiqdi",
        price: data.price || 45000
      };
      this.closeModal();
      window.app.showToast(`✅ Buyurtma qabul qilindi! PIN: ${demoPin}`);
      window.app.setActiveOrder(demoOrder);
    }
  }
}

window.services = new ServicesManager();
