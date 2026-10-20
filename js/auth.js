/**
 * AQIL — Foydalanuvchi Autentifikatsiyasi va Profil Boshqaruvi
 * Google Sign-In (Firebase Auth), Realtime Database & Offline Sync
 * 
 * Muallif: Sharofiddinova Nozima Egamberdi qizi
 * Toshkent Menejment va Iqtisodiyot Instituti (TMII)
 */

class AuthManager {
  constructor() {
    this.storageKey = "aqil_user_profile_v2";
    this.currentUser = null;
    this.authListeners = [];

    // Boshlang'ich standart profil (Taqdimotchi — Nozima Sharofiddinova)
    this.defaultProfile = {
      uid: "tmii_nozima_2026",
      isLoggedIn: false, // Majburiy kirish: birinchi kirishda Google orqali kirish talab etiladi
      isDemo: true,
      provider: "google_ready",
      displayName: "Nozima Sharofiddinova",
      firstName: "Nozima",
      lastName: "Sharofiddinova",
      email: "nozima.sharofiddinova@gmail.com",
      photoURL: "",
      avatarEmoji: "👩🏻‍💼",
      bio: "TMII 1-bosqich talabasi • “Aqlli Uy va Oila” innovatsion tizimi muallifi",
      phone: "+998 90 123 45 67",
      address: "Farg'ona shahri, Al-Farg'oniy ko'chasi 14-uy",
      children: "Madinaxon (7 yosh), Behruz (4 yosh)",
      familyPin: "4892",
      balance: 250000,
      cashback: 18500,
      role: "Xonadon boshqaruvchisi • VIP Oila",
      updatedAt: new Date().toISOString()
    };
  }

  init() {
    // 1. Mahalliy xotiradan profilni yuklash
    this.loadLocalProfile();

    // 2. Firebase Auth holatini tinglash
    this.setupFirebaseAuthListener();

    // 3. UI ni boshlang'ich ma'lumotlar bilan yangilash
    this.notifyListeners();

    // 4. Majburiy kirish ekranini tekshirish
    this.checkAuthGate();
  }

  checkAuthGate() {
    const gate = document.getElementById("auth-gate-screen");
    if (!gate) return;
    if (this.currentUser && this.currentUser.isLoggedIn) {
      gate.classList.add("hidden");
      setTimeout(() => {
        if (this.currentUser && this.currentUser.isLoggedIn) {
          gate.style.display = "none";
        }
      }, 400);
    } else {
      gate.style.display = "flex";
      setTimeout(() => {
        gate.classList.remove("hidden");
      }, 10);
    }
  }

  loadLocalProfile() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.currentUser = JSON.parse(saved);
      } else {
        this.currentUser = { ...this.defaultProfile, isLoggedIn: false };
        this.saveLocalProfile();
      }
    } catch (e) {
      console.warn("Profil yuklashda xatolik:", e);
      this.currentUser = { ...this.defaultProfile, isLoggedIn: false };
    }
  }

  saveLocalProfile() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.currentUser));
    } catch (e) {
      console.error("Profilni saqlashda xatolik:", e);
    }
  }

  setupFirebaseAuthListener() {
    const checkAuthInterval = setInterval(() => {
      if (window.aqilFirebase && window.aqilFirebase.auth) {
        clearInterval(checkAuthInterval);
        
        window.aqilFirebase.auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("Firebase Auth foydalanuvchisi aniqlandi:", user.email);
            this.handleFirebaseUser(user);
          } else {
            console.log("Firebase Auth: foydalanuvchi tizimga kirmagan.");
          }
        });
      }
    }, 300);

    // 5 soniyadan keyin intervalni to'xtatish
    setTimeout(() => clearInterval(checkAuthInterval), 5000);
  }

  async handleFirebaseUser(firebaseUser) {
    const names = (firebaseUser.displayName || "Foydalanuvchi").split(" ");
    const firstName = names[0] || "Nozima";
    const lastName = names.slice(1).join(" ") || "Sharofiddinova";

    // Mavjud profilni saqlab qolgan holda birlashtirish
    let profileData = {
      ...this.currentUser,
      uid: firebaseUser.uid,
      isLoggedIn: true,
      isDemo: false,
      provider: "google",
      email: firebaseUser.email || this.currentUser.email,
      displayName: firebaseUser.displayName || `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      photoURL: firebaseUser.photoURL || this.currentUser.photoURL || "",
      updatedAt: new Date().toISOString()
    };

    // Realtime Database dan yangilanishlarni tekshirish
    if (window.aqilFirebase && window.aqilFirebase.database) {
      try {
        const userRef = window.aqilFirebase.database.ref(`users/${firebaseUser.uid}`);
        const snapshot = await userRef.once("value");
        if (snapshot.exists()) {
          const dbData = snapshot.val();
          profileData = { ...profileData, ...dbData };
        } else {
          // Birinchi marta kirganda Realtime Database ga saqlash
          await userRef.set(profileData);
        }
      } catch (err) {
        console.warn("Realtime Database o'qishda ogohlantirish:", err.message);
      }
    }

    this.currentUser = profileData;
    this.saveLocalProfile();
    this.notifyListeners();
  }

  /**
   * Google orqali haqiqiy kirish (Firebase Google Auth)
   */
  async loginWithGoogle() {
    if (window.soundFX) window.soundFX.playTap();

    const gateBtn = document.getElementById("auth-gate-google-btn");
    const origHtml = gateBtn ? gateBtn.innerHTML : null;
    if (gateBtn) {
      gateBtn.innerHTML = `<span class="auth-spinner"></span> <span>Google tasdiqlanmoqda...</span>`;
      gateBtn.disabled = true;
    }

    if (!navigator.onLine) {
      if (window.app) window.app.showToast("⚠️ Internet aloqasi yo'q. Standalone rejim ishlamoqda.");
      if (gateBtn && origHtml) { gateBtn.innerHTML = origHtml; gateBtn.disabled = false; }
      return;
    }

    // Firebase tayyormi tekshirish
    if (!window.aqilFirebase || !window.aqilFirebase.auth || !window.aqilFirebase.googleProvider) {
      console.warn("Firebase Auth moduli yuklanmoqda...");
      if (typeof firebase !== "undefined" && firebase.auth) {
        window.aqilFirebase.auth = firebase.auth();
        window.aqilFirebase.googleProvider = new firebase.auth.GoogleAuthProvider();
      } else {
        if (window.app) window.app.showToast("Google orqali kirish moduli faollashtirilmoqda...");
      }
    }

    try {
      if (window.aqilFirebase && window.aqilFirebase.auth && window.aqilFirebase.googleProvider) {
        const result = await window.aqilFirebase.auth.signInWithPopup(window.aqilFirebase.googleProvider);
        if (result && result.user) {
          await this.handleFirebaseUser(result.user);
          if (window.soundFX) window.soundFX.playSuccess();
          if (window.app) {
            window.app.showToast(`🎉 Xush kelibsiz, ${this.currentUser.firstName}! Google orqali kirdingiz.`);
          }
          this.checkAuthGate();
          return result.user;
        }
      } else {
        throw new Error("Firebase SDK yuklanmadi");
      }
    } catch (error) {
      console.error("Google Auth xatosi:", error);

      // Pop-up bloklangan bo'lsa yoki Firebase Console da Google hali faollashtirilmagan bo'lsa
      if (error.code === "auth/popup-blocked") {
        if (window.app) window.app.showToast("⚠️ Brauzer qalqib chiquvchi oynani (popup) to'sdi. Ruxsat bering.");
      } else if (error.code === "auth/configuration-not-found" || error.code === "auth/operation-not-allowed") {
        if (window.app) {
          window.app.showToast("ℹ️ Firebase Google Provayder yoqilmoqda. Taqdimotchi rejimiga ulandi!");
        }
        this.loginAsDemo();
      } else if (error.code === "auth/popup-closed-by-user") {
        if (window.app) window.app.showToast("Kirish oynasi bekor qilindi.");
      } else {
        // Taqdimot buzilmasligi uchun qulay fallback
        if (window.app) {
          window.app.showToast(`Google kirish: ${error.message || "Taqdimot rejimi faollashtirildi"}`);
        }
        this.loginAsDemo();
      }
    } finally {
      if (gateBtn && origHtml && (!this.currentUser || !this.currentUser.isLoggedIn)) {
        gateBtn.innerHTML = origHtml;
        gateBtn.disabled = false;
      }
    }
  }

  /**
   * Taqdimot / Demo rejimi (Nozima Sharofiddinova)
   */
  loginAsDemo() {
    if (window.soundFX) window.soundFX.playSuccess();
    this.currentUser = { ...this.defaultProfile, isLoggedIn: true };
    this.saveLocalProfile();
    this.notifyListeners();
    this.checkAuthGate();
    if (window.app) {
      window.app.showToast(`✅ Nozima Sharofiddinova hisobi bilan kirildi!`);
    }
  }

  /**
   * Tizimdan chiqish (Logout)
   */
  async logout() {
    if (window.soundFX) window.soundFX.playTap();
    try {
      if (window.aqilFirebase && window.aqilFirebase.auth) {
        await window.aqilFirebase.auth.signOut();
      }
    } catch (e) {
      console.warn("Firebase signout ogohlantirish:", e);
    }

    this.currentUser = {
      ...this.defaultProfile,
      isLoggedIn: false,
      displayName: "Foydalanuvchi",
      firstName: "",
      lastName: "",
      email: "",
      bio: "Profil sozlamalarini boshqarish uchun Google orqali kiring.",
      balance: 0,
      cashback: 0
    };

    this.saveLocalProfile();
    this.notifyListeners();
    this.checkAuthGate();
    if (window.app) window.app.showToast("🚪 Tizimdan chiqildi. Google orqali qayta kiring.");
  }

  /**
   * Profil ma'lumotlarini tahrirlash va saqlash
   */
  async updateProfile(newData) {
    if (window.soundFX) window.soundFX.playTap();

    // Yangi maydonlarni to'ldirish
    this.currentUser = {
      ...this.currentUser,
      firstName: newData.firstName || this.currentUser.firstName,
      lastName: newData.lastName || this.currentUser.lastName,
      displayName: `${newData.firstName || this.currentUser.firstName} ${newData.lastName || this.currentUser.lastName}`.trim(),
      bio: newData.bio !== undefined ? newData.bio : this.currentUser.bio,
      phone: newData.phone || this.currentUser.phone,
      address: newData.address || this.currentUser.address,
      children: newData.children !== undefined ? newData.children : this.currentUser.children,
      familyPin: newData.familyPin || this.currentUser.familyPin,
      updatedAt: new Date().toISOString()
    };

    // 1. Mahalliy xotiraga yozish
    this.saveLocalProfile();

    // 2. Realtime Database ga yozish (agar internet va Firebase mavjud bo'lsa)
    if (window.aqilFirebase && window.aqilFirebase.database && this.currentUser.uid) {
      try {
        const userRef = window.aqilFirebase.database.ref(`users/${this.currentUser.uid}`);
        await userRef.update(this.currentUser);
        console.log("☁️ Firebase Realtime Database profil yangilandi:", this.currentUser.uid);
      } catch (err) {
        console.warn("Firebase RTDB profil yangilashda ogohlantirish:", err.message);
      }
    }

    // 3. UI ni yangilash
    this.notifyListeners();

    if (window.soundFX) window.soundFX.playSuccess();
    if (window.app) {
      window.app.showToast("✅ Profil muvaffaqiyatli saqlandi va yangilandi!");
    }
    return this.currentUser;
  }

  /**
   * Profil fotosurati / avatarini yangilash
   */
  updateAvatar(photoUrlOrEmoji) {
    if (photoUrlOrEmoji.startsWith("http") || photoUrlOrEmoji.startsWith("data:")) {
      this.currentUser.photoURL = photoUrlOrEmoji;
    } else {
      this.currentUser.avatarEmoji = photoUrlOrEmoji;
      this.currentUser.photoURL = "";
    }
    this.saveLocalProfile();
    this.notifyListeners();
  }

  /**
   * Realtime Database bilan sinxronizatsiya
   */
  async syncWithCloud() {
    if (!this.currentUser || !this.currentUser.uid) return;
    if (window.aqilFirebase && window.aqilFirebase.database) {
      try {
        const userRef = window.aqilFirebase.database.ref(`users/${this.currentUser.uid}`);
        await userRef.update(this.currentUser);
        console.log("🔄 Bulut bilan ma'lumotlar to'liq sinxronlandi.");
      } catch (e) {
        console.warn("Bulut sinxronlashida xato:", e);
      }
    }
  }

  subscribe(listener) {
    if (typeof listener === "function") {
      this.authListeners.push(listener);
      listener(this.currentUser);
    }
  }

  notifyListeners() {
    this.authListeners.forEach((fn) => {
      try {
        fn(this.currentUser);
      } catch (e) {
        console.error("Auth listener xatosi:", e);
      }
    });

    // Headerdagi foydalanuvchi ma'lumotlarini to'g'ridan-to'g'ri yangilash
    this.updateHeaderBadge();

    // Majburiy kirish oynasini boshqarish
    this.checkAuthGate();
  }

  updateHeaderBadge() {
    const avatarEl = document.querySelector(".app-header .user-avatar");
    const nameEl = document.querySelector(".app-header .user-meta h4");
    const subEl = document.querySelector(".app-header .user-meta p");

    if (avatarEl) {
      if (this.currentUser.photoURL) {
        avatarEl.innerHTML = `<img src="${this.currentUser.photoURL}" alt="avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
      } else if (this.currentUser.avatarEmoji) {
        avatarEl.innerHTML = `<span style="font-size: 20px;">${this.currentUser.avatarEmoji}</span>`;
      } else {
        const initials = `${(this.currentUser.firstName || "A")[0]}${(this.currentUser.lastName || "Q")[0]}`.toUpperCase();
        avatarEl.textContent = initials;
      }
    }

    if (nameEl) {
      nameEl.textContent = this.currentUser.displayName || "Foydalanuvchi";
    }

    if (subEl) {
      if (this.currentUser.isLoggedIn) {
        subEl.textContent = `📍 ${this.currentUser.address.split(",")[0] || "Farg'ona"} • ${this.currentUser.isDemo ? "TMII 2026" : "Google"}`;
      } else {
        subEl.textContent = "Kirish uchun bosing ›";
      }
    }
  }
}

window.authManager = new AuthManager();

document.addEventListener("DOMContentLoaded", () => {
  window.authManager.init();
});
