# 📱 AQIL SMART LIFE — ANDROID TELEFONGA APK O‘RNATISH VA QAYTA YIG‘ISH QO‘LLANMASI

**Toshkent Menejment va Iqtisodiyot Instituti (Farg‘ona kampusi)**  
**Muallif:** 1-bosqich talabasi Sharofiddinova Nozima Egamberdi qizi  
**Yil:** 2026-yil | **Dastlabki hudud:** Farg‘ona shahri

---

## 🎉 Siz uchun tayyor APK fayl yaratildi!
Fayl manzili:
👉 **`/home/kali/Desktop/AQIL/AQIL_Smart_Life.apk`**

Ushbu APK fayl to‘liq kompilyatsiya qilingan, raqamli kalit bilan imzolangan (Signed Release) va har qanday Android smartfonda (Android 5.0 dan boshlab Android 14+ gacha) 100% mustaqil, offline rejimda ishlaydi.

---

## 📲 1-USUL: Tayyor APK faylni telefonga o‘rnatish

Faylni telefoningizga o‘tkazishning 4 ta eng oson yo‘li:

### 1. Telegram orqali (Eng qulay):
1. Kompyuteringizdagi Telegram orqali **"Saqlangan xabarlar" (Saved Messages)** ga `/home/kali/Desktop/AQIL/AQIL_Smart_Life.apk` faylini yuboring.
2. Telefoningizdagi Telegramdan faylni yuklab oling va ustiga bosing.
3. **"O‘rnatish" (Установить / Install)** tugmasini bosing.
4. *(Agar telefon "Noma'lum manbalardan o'rnatish"ni so‘rasa, "Ruxsat berish"ni yoqing).*

### 2. USB kabeli orqali:
1. Telefoningizni kompyuterga USB kabel bilan ulang ("Fayllarni uzatish" rejimida).
2. `AQIL_Smart_Life.apk` faylini telefon xotirasidagi `Download` papkasiga nusxalang.
3. Telefonda "Mening fayllarim" (Fayl menejeri) ilovasiga kirib, APK fayl ustiga bosing va o‘rnating.

### 3. Google Drive yoki Bluetooth orqali:
- Faylni Google Drive-ga yuklab, telefondan yuklab olishingiz yoki to‘g‘ridan-to‘g‘ri Bluetooth orqali telefoningizga jo‘natishingiz mumkin.

---

## 🔨 2-USUL: Loyihani o‘zgartirgandan keyin yangi APK yig‘ish

Agar siz kodga (matnlar, narxlar, xodimlar yoki dizaynga) o‘zgartirish kiritsangiz, yangi APK faylni bitta buyruq bilan osongina yig‘ishingiz mumkin:

```bash
cd /home/kali/Desktop/AQIL
./build_apk.sh
```

Skript avtomatik ravishda:
- Barcha yangi HTML/CSS/JS fayllarni yig‘adi;
- Android piktogrammalarini (App Icon) yaratadi;
- `classes.dex` va `AndroidManifest.xml` ni yangilaydi;
- Yangi `AQIL_Smart_Life.apk` faylini yaratib, raqamli imzolaydi.

---

## 💻 3-USUL: Android Studio orqali ochish va tahrirlash

Loyiha ichida to‘liq Android Studio loyihasi ham tayyorlandi:
👉 **`/home/kali/Desktop/AQIL/android_studio_project`**

1. Kompyuteringizda **Android Studio** dasturini oching.
2. **Open** tugmasini bosing va `/home/kali/Desktop/AQIL/android_studio_project` papkasini tanlang.
3. Yuqori menyudan **Build > Build Bundle(s) / APK(s) > Build APK(s)** tugmasini bosing.
4. Google Play Store-ga chiqarish uchun **Generate Signed Bundle / APK** opsiyasidan foydalanishingiz mumkin.

---

## 🌐 4-USUL: APK o‘rnatmasdan PWA sifatida o‘rnatish (Eng tezkor)

Agar do‘stlaringizga yoki institut komissiyasiga ko‘rsatmoqchi bo‘lsangiz, APK o‘rnatmasdan ham telefon ekraniga ilova sifatida qo‘shish mumkin:

1. Kompyuterda serverni yoqing:
   ```bash
   cd /home/kali/Desktop/AQIL && ./run.sh
   ```
2. Terminalda ko‘rsatilgan manzilni (masalan: `http://192.168.1.15:8080`) telefoningiz brauzerida (Chrome yoki Safari) oching.
3. Brauzer menyusidan **"Bosh ekranga qo‘shish" (Добавить на главный экран / Add to Home Screen)** tugmasini bosing.
4. Ilova telefoningiz ish stolida xuddi Play Marketdan o‘rnatilgan ilovadek paydo bo‘ladi!
