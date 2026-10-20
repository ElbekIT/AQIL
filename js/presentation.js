/**
 * Taqdimot va Pitch Deck Moduli (Taqdimotda 100% G'olib Bo'lish Uchun)
 * Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)
 * Muallif: Sharofiddinova Nozima Egamberdi qizi
 */

class PresentationManager {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 6;
    this.slides = [
      {
        tag: "1-SLAYD: MUQADDIMA VA MUALLIF",
        title: "“AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR",
        subtitle: "Toshkent Menejment va Iqtisodiyot Instituti Farg'ona kampusi",
        content: `
          <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 50px; margin-bottom: 10px;">🏛️</div>
            <h2 style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
              Toshkent Menejment va Iqtisodiyot Instituti
            </h2>
            <div style="display: inline-block; background: #e0f2fe; color: #0284c7; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 12px; margin-bottom: 16px;">
              Farg'ona kampusi • 1-bosqich talabasi loyihasi
            </div>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; text-align: left; font-size: 12px; line-height: 1.8;">
              <div>👤 <b>Loyiha muallifi:</b> Sharofiddinova Nozima Egamberdi qizi</div>
              <div>💼 <b>Loyiha yo'nalishi:</b> Ijtimoiy tadbirkorlik, menejment, aqlli texnologiyalar va raqamli xizmatlar</div>
              <div>📍 <b>Dastlabki hudud:</b> Farg'ona shahri (keyinchalik O'zbekiston bo'ylab)</div>
              <div>📅 <b>Yil:</b> 2026-yil</div>
            </div>
          </div>
        `
      },
      {
        tag: "2-SLAYD: BOZOR MUAMMOSI VA DOLZARBLIK",
        title: "Zamonaviy Oilalar Qanday Qiyinchiliklarga Duch Kelmoqda?",
        subtitle: "Farg'ona shahridagi 10 000+ oilalar misolida tahlil",
        content: `
          <div style="display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 14px;">
            <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 10px 14px; border-radius: 8px;">
              <b style="color: #b91c1c; font-size: 13px;">1. Vaqt yetishmovchiligi va bandlik</b>
              <p style="font-size: 11px; color: #475569; margin-top: 4px;">Ota-onalar ish bilan band bo'lib, farzandlarini maktab/bog'chadan o'z vaqtida olib kelish va to'garaklarga yetkazishda qiynaladilar.</p>
            </div>

            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 10px 14px; border-radius: 8px;">
              <b style="color: #b45309; font-size: 13px;">2. Bolalar xavfsizligidan xavotir</b>
              <p style="font-size: 11px; color: #475569; margin-top: 4px;">Oddiy taksi yoki begona haydovchilarga farzandni ishonib topshirish xavfli; nazorat va tasdiq kodi mavjud emas.</p>
            </div>

            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 10px 14px; border-radius: 8px;">
              <b style="color: #047857; font-size: 13px;">3. Xizmatlarning tarqoqligi</b>
              <p style="font-size: 11px; color: #475569; margin-top: 4px;">Maishiy texnika buzilsa usta izlash, yo'lda avtomobil to'xtasa evakuator topish va dam olish kunlari enaga topish bitta qulay platformada yo'q edi.</p>
            </div>
          </div>
        `
      },
      {
        tag: "3-SLAYD: BIZNING INNOVATSION YECHIM",
        title: "AQIL: Yagona Raqamli Ekotizim",
        subtitle: "5 ta kompleks xizmat + Aqlli Uy IoT boshqaruvi",
        content: `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;">
            <div style="background: #eff6ff; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 24px;">🚸</div>
              <b style="font-size: 12px; color: #1e40af;">Bolalar Taksisi</b>
              <p style="font-size: 10px; color: #64748b; margin-top: 2px;">ISOFIX o'rindiq, 4 xonali PIN kod, jonli GPS</p>
            </div>

            <div style="background: #faf5ff; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 24px;">🧸</div>
              <b style="font-size: 12px; color: #7e22ce;">Dam Olish Enagasi</b>
              <p style="font-size: 10px; color: #64748b; margin-top: 2px;">Shanba-yakshanba pedagog nazorati va o'yinlar</p>
            </div>

            <div style="background: #f0fdf4; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 24px;">🔧</div>
              <b style="font-size: 12px; color: #15803d;">Maishiy Ta'mir</b>
              <p style="font-size: 10px; color: #64748b; margin-top: 2px;">Kir yuvish, muzlatgich, 6 oy rasmiy kafolat</p>
            </div>

            <div style="background: #fef2f2; padding: 12px; border-radius: 12px; text-align: center;">
              <div style="font-size: 24px;">🚨</div>
              <b style="font-size: 12px; color: #b91c1c;">Avto SOS Yordam</b>
              <p style="font-size: 10px; color: #64748b; margin-top: 2px;">10-15 daqiqada akkumulyator, shina, evakuator</p>
            </div>
          </div>

          <div style="background: #f1f5f9; padding: 10px; border-radius: 10px; margin-top: 10px; text-align: center;">
            <span style="font-size: 11px; font-weight: 700; color: #0f172a;">
              💡 + Aqlli Uy Boshqaruvi: Masofaviy eshik qulfi, chiroqlar, konditsioner va gaz datchiklari!
            </span>
          </div>
        `
      },
      {
        tag: "4-SLAYD: NOYOB XAVFSIZLIK MEXANIZMI",
        title: "Bolalar Xavfsizligi — Loyihaning Oliy Qadriyati",
        subtitle: "Hech qanday analogga ega bo'lmagan ko'p bosqichli nazorat",
        content: `
          <div style="background: #ffffff; border: 2px solid #2563eb; border-radius: 16px; padding: 16px; margin-top: 12px; text-align: center;">
            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Topshirish xavfsizlik kodi:</div>
            <div style="font-size: 28px; font-weight: 900; letter-spacing: 6px; color: #2563eb; margin: 6px 0;">4 8 9 2</div>
            <p style="font-size: 11px; color: #475569;">Bola faqat ota-ona tomonidan tasdiqlangan maxsus dinamik PIN-kod orqali qabul qilinadi va topshiriladi!</p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; font-size: 11px;">
              <b>📍 Real-vaqtli GPS:</b> Ota-ona mashina harakatini o'z telefonida xaritada jonli ko'radi.
            </div>
            <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; border-radius: 10px; font-size: 11px;">
              <b>🔓 Masofaviy Qulf:</b> Bola uyga kelganda ota-ona telefon orqali aqlli eshikni ochib beradi.
            </div>
          </div>
        `
      },
      {
        tag: "5-SLAYD: IQTISODIY MODEL VA ZARARSIZLIK",
        title: "Moliyaviy Hisob-Kitoblar (Nozima Sharofiddinova Modeli)",
        subtitle: "1-bosqich talabasi tomonidan ishlab chiqilgan iqtisodiy asos",
        content: `
          <div style="background: #f8fafc; border-radius: 12px; padding: 12px; border: 1px solid #e2e8f0; margin-top: 10px; font-size: 11px; line-height: 1.6;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding: 4px 0;">
              <span>💼 Dastlabki kapital (Veb, jihozlar, reklama):</span>
              <b>76 000 000 so'm</b>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding: 4px 0;">
              <span>🏢 Oylik doimiy xarajatlar (Maosh, IT, ijara):</span>
              <b>18 500 000 so'm</b>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed #cbd5e1; padding: 4px 0;">
              <span>📊 3 oylik umumiy budjet (zaxira bilan):</span>
              <b style="color: #2563eb;">146 500 000 so'm</b>
            </div>
          </div>

          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 12px; margin-top: 10px; text-align: center;">
            <div style="font-size: 11px; font-weight: 700; color: #047857;">ZARARSIZLIK NUQTASI (BREAK-EVEN POINT):</div>
            <div style="font-size: 22px; font-weight: 900; color: #059669; margin: 4px 0;">740 ta buyurtma / oy</div>
            <div style="font-size: 10px; color: #065f46;">
              Oyiga 740 ta buyurtmadan oshgach, loyiha 100% xarajatlarni qoplaydi va sof foyda bera boshlaydi!
            </div>
          </div>
        `
      },
      {
        tag: "6-SLAYD: STRATEGIK REJA VA KENGAYISH",
        title: "Kelajak Istiqbollari: Farg'onadan Butun Respublikaga",
        subtitle: "Loyiha kengayishi va kutilayotgan ijtimoiy-iqtisodiy samara",
        content: `
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px; font-size: 11px;">
            <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="background: #2563eb; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
              <div><b>1-bosqich (2026):</b> Farg'ona shahrida to'liq sinov va dastlabki 500 ta doimiy oilaga xizmat ko'rsatish.</div>
            </div>

            <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="background: #2563eb; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
              <div><b>2-bosqich (2026-2027):</b> Marg'ilon, Qo'qon va butun Farg'ona vodiysiga kengayish, 50+ yangi ish o'rni yaratish.</div>
            </div>

            <div style="background: #f1f5f9; padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; gap: 10px;">
              <span style="background: #2563eb; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
              <div><b>3-bosqich (2027+):</b> Toshkent shahri va barcha viloyatlar markazlarida milliy oilaviy xizmatlar brendiga aylanish!</div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 16px;">
            <button class="hero-btn" style="background: var(--primary-gradient); color: #fff; font-size: 13px; padding: 10px 24px;" onclick="window.presentation.closePitchDeck(); window.app.switchTab('home');">
              🚀 Jonli Dastur Ko'rgazmasi (Live Demo) ›
            </button>
          </div>
        `
      }
    ];
  }

  openPitchDeck() {
    if (window.soundFX) window.soundFX.playSuccess();
    const modal = document.getElementById("pitch-deck-modal");
    if (modal) {
      modal.classList.add("active");
      this.currentSlide = 0;
      this.renderSlide();
    }
  }

  closePitchDeck() {
    if (window.soundFX) window.soundFX.playTap();
    const modal = document.getElementById("pitch-deck-modal");
    if (modal) modal.classList.remove("active");
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      if (window.soundFX) window.soundFX.playTap();
      this.currentSlide++;
      this.renderSlide();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      if (window.soundFX) window.soundFX.playTap();
      this.currentSlide--;
      this.renderSlide();
    }
  }

  renderSlide() {
    const slide = this.slides[this.currentSlide];
    const container = document.getElementById("pitch-slide-container");
    const progressEl = document.getElementById("pitch-slide-progress");
    const prevBtn = document.getElementById("pitch-prev-btn");
    const nextBtn = document.getElementById("pitch-next-btn");

    if (progressEl) {
      progressEl.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }

    if (prevBtn) prevBtn.disabled = (this.currentSlide === 0);
    if (nextBtn) {
      if (this.currentSlide === this.totalSlides - 1) {
        nextBtn.innerHTML = "Tugatish ✅";
        nextBtn.onclick = () => this.closePitchDeck();
      } else {
        nextBtn.innerHTML = "Keyingi ›";
        nextBtn.onclick = () => this.nextSlide();
      }
    }

    if (container) {
      container.innerHTML = `
        <div style="margin-bottom: 10px;">
          <span class="hero-tag" style="background: rgba(37,99,235,0.1); color: var(--primary);">${slide.tag}</span>
          <h2 style="font-size: 17px; font-weight: 800; color: var(--text-main); margin: 6px 0 2px;">${slide.title}</h2>
          <p style="font-size: 11px; color: var(--text-muted);">${slide.subtitle}</p>
        </div>
        <div>
          ${slide.content}
        </div>
      `;
    }
  }
}

window.presentation = new PresentationManager();
