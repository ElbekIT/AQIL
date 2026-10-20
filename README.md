# “AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI
**Toshkent Menejment va Iqtisodiyot Instituti (Farg'ona kampusi)**  
**Muallif:** 1-bosqich talabasi Sharofiddinova Nozima Egamberdi qizi  
**Yil:** 2026-yil | **Hudud:** Farg'ona shahri

---

## 📱 Loyiha haqida qisqacha

Ushbu dastur zamonaviy oilalarning kundalik ehtiyojlarini bitta qulay mobil platformada birlashtiradi:
1. **🚸 Bolalarni maktab va bog'chadan xavfsiz tashish (Kids Taxi):**
   - Tekshirilgan haydovchi, ISOFIX bolalar xavfsizlik o'rindig'i.
   - Maxsus 4 xonali **Xavfsizlik PIN kodi** (bola faqat shu kod orqali haydovchiga topshiriladi).
   - Farg'ona shahri bo'ylab real-vaqtli **Jonli GPS xarita kuzatuvi**.
2. **🧸 Dam olish kunlari bolalar nazorati (Weekend Nanny & Club):**
   - Shanba va yakshanba kunlari guruh bo'lib yoki xonadonda yakka tartibda nazorat.
   - Pedagog-tarbiyachi hamrohligida kitobxonlik, rasm chizish, shaxmat, mantiqiy o'yinlar va uy vazifalari.
3. **🔧 Maishiy texnika ta'miri:**
   - Kir yuvish mashinalari, muzlatgich, televizor va elektr plitalarni joyiga borib sozlash (6 oygacha rasmiy kafolat).
4. **🚨 Avto SOS: Yo'lda tezkor texnik yordam:**
   - Farg'ona ko'chalarida 10-15 daqiqada yetib boruvchi yordam: akkumulyator "prikurivanie", g'ildirak almashtirish, avtoelektrik va evakuator.
5. **🏠 Qo'shimcha ro'zg'or xizmatlari:**
   - Santexnik, elektrik, tozalash (cleaning), dori-darmon va mahsulot yetkazish.
6. **💡 “Aqlli Uy” IoT Hub:**
   - Yashash xonasi va bolalar xonasi chiroqlari, aqlli eshik qulfi (Smart Lock - bolani masofadan uyga kiritish), konditsioner harorati hamda gaz/suv sizib chiqish datchiklari signallari.
7. **📊 Biznes va Moliya Tahlili (Talabaning iqtisodiy modeli):**
   - Boshlang'ich 76 mln so'm budjet taqsimoti.
   - Oylik 18.5 mln so'm doimiy xarajatlar.
   - 3 oylik 146.5 mln so'm umumiy budjet.
   - Har bir xizmat rentabelligi va marjasi.
   - **Interaktiv Zararsizlik Nuqtasi (Break-even)** simulyatori: buyurtmalar sonini surib oylik foyda/zararni real vaqtda ko'rish imkoniyati!
8. **📋 Dispetcher / Operator Paneli:**
   - Tushgan buyurtmalarni ko'rish, PIN kodni tekshirish, mutaxassis biriktirish va xizmatni yakunlash.
9. **🎓 Rasmiy Titul Varag'i va Chop etish:**
   - TMII rasmiy rekvizitlari, Nozima Sharofiddinova mualliflik varag'i, bir tugma bilan PDF formatda chop etish.

---

## 🚀 Dasturni ishga tushirish

### 1-usul: Bitta buyruq bilan (Terminal orqali):
```bash
cd /home/kali/Desktop/AQIL
./run.sh
```
yoki:
```bash
python3 server.py
```

### 2-usul: Brauzerda ochish:
- Kompyuterda: `http://localhost:8080`
- Telefondan ochish: server ishga tushganda terminalda ko'rsatilgan mahalliy tarmoq IP manzili orqali, masalan: `http://192.168.x.x:8080`

### 3-usul: Standalone (Serversiz to'g'ridan-to'g'ri):
`index.html` faylini istalgan brauzerda ikki marta bosib ochish mumkin. Dastur to'liq avtonom ishlaydi!

---

## 📱 Foydalanish bo'yicha qo'llanma

- **Telefon ramkasi va to'liq ekran:** Yuqoridagi "🖥️ To'liq ekran" tugmasini bosib, iPhone ramkasi yoki keng ekran rejimi o'rtasida o'tishingiz mumkin.
- **Dynamic Island:** Ekranning yuqorisidagi qora orolchani bosing — u kengayib, bolaning joriy holati va avtomobil masofasini ko'rsatadi.
- **Jonli GPS Harakati:** Bosh sahifada avtomobil Farg'ona shahri ko'chalari (Al-Farg'oniy, Sayilgoh, Marg'inoniy) bo'ylab harakatlanadi.
- **Aqlli Uy tugmalari:** Chiroqlar va eshik qulfi tugmalarini bosib, ularni real vaqtda yoqib/o'chirishingiz mumkin.
- **Moliya kalkulyatori:** "Moliya" bo'limida slayderlarni surib ko'ring: buyurtmalar soni 740 tadan oshganda tizim yashil rangda sof foyda ko'rsatadi!
