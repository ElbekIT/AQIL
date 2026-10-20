/**
 * AQIL — Aqlli Uy va Oilalar Uchun Kompleks Xizmatlar Tizimi
 * Firebase Konfiguratsiyasi va Initsializatsiyasi
 * 
 * Loyiha: aqll-uy-boshqaruvi
 * Realtime Database: https://aqll-uy-boshqaruvi-default-rtdb.firebaseio.com
 */

const firebaseConfig = {
  apiKey: "AIzaSyDnucdVIwq7NwmtoIutwcyAU-losBlh21M",
  authDomain: "aqll-uy-boshqaruvi.firebaseapp.com",
  databaseURL: "https://aqll-uy-boshqaruvi-default-rtdb.firebaseio.com",
  projectId: "aqll-uy-boshqaruvi",
  storageBucket: "aqll-uy-boshqaruvi.firebasestorage.app",
  messagingSenderId: "572465136619",
  appId: "1:572465136619:web:0322dca25d5e9a7c164fae",
  measurementId: "G-MMRX5GWW8L"
};

// Global Firebase obyektlari
window.aqilFirebase = {
  config: firebaseConfig,
  app: null,
  auth: null,
  database: null,
  googleProvider: null,
  isOnline: navigator.onLine,
  isInitialized: false
};

// Tarmoq holatini kuzatish
window.addEventListener("online", () => {
  window.aqilFirebase.isOnline = true;
  console.log("🌐 Internet aloqasi tiklandi. Firebase sinxronizatsiyasi faol.");
  if (window.authManager) window.authManager.syncWithCloud();
});

window.addEventListener("offline", () => {
  window.aqilFirebase.isOnline = false;
  console.log("📡 Qurilma oflayn rejimda. Mahalliy ma'lumotlar ombori ishlatilmoqda.");
});

function initFirebaseApp() {
  try {
    if (typeof firebase !== "undefined" && firebase.initializeApp) {
      if (!firebase.apps || !firebase.apps.length) {
        window.aqilFirebase.app = firebase.initializeApp(firebaseConfig);
      } else {
        window.aqilFirebase.app = firebase.app();
      }

      // Auth va Google Provayder
      if (firebase.auth) {
        window.aqilFirebase.auth = firebase.auth();
        window.aqilFirebase.googleProvider = new firebase.auth.GoogleAuthProvider();
        window.aqilFirebase.googleProvider.setCustomParameters({
          prompt: "select_account"
        });
      }

      // Realtime Database
      if (firebase.database) {
        window.aqilFirebase.database = firebase.database();
      }

      window.aqilFirebase.isInitialized = true;
      console.log("✅ Firebase muvaffaqiyatli initsializatsiya qilindi:", firebaseConfig.projectId);
    } else {
      console.warn("⚠️ Firebase SDK yuklanmadi (oflayn yoki bloklangan). Standalone rejim faol.");
    }
  } catch (error) {
    console.warn("⚠️ Firebase initsializatsiyasida ogohlantirish:", error.message);
  }
}

// Boshlang'ich initsializatsiya
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFirebaseApp);
} else {
  initFirebaseApp();
}
