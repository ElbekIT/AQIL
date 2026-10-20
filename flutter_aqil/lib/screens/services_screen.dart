import 'package:flutter/material.dart';

class ServicesScreen extends StatelessWidget {
  final Function(String) onOpenOrder;

  const ServicesScreen({super.key, required this.onOpenOrder});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        const Text(
          '🗂️ Xizmatlar Katalogi',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Text(
          'Farg\'ona shahri oilalari uchun 5 ta asosiy yo\'nalish',
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 16),

        _serviceCard(
          icon: '🚸',
          title: 'Bolalarni maktab va bog\'chadan tashish',
          desc: 'Ota-ona ishda bo\'lganda bolani xavfsiz olib borish va olib kelish. ISOFIX kreslo, 4 xonali PIN kod, tekshirilgan haydovchi.',
          price: '45 000 so\'m',
          color: const Color(0xFFFEF3C7),
          onTap: () => onOpenOrder('kids_transport'),
        ),

        _serviceCard(
          icon: '🧸',
          title: 'Dam olish kunlari bolalar nazorati',
          desc: 'Shanba va yakshanba 09:00 dan 18:00 gacha. Markazda guruh bo\'lib (5 nafar) yoki xonadonda yakka tartibda nazorat. Kitobxonlik, rasm, shaxmat, mantiqiy o\'yinlar.',
          price: '60 000 / 180 000 so\'m',
          color: const Color(0xFFEDE9FE),
          onTap: () => onOpenOrder('weekend_daycare'),
        ),

        _serviceCard(
          icon: '🔧',
          title: 'Maishiy texnika kafolatli ta\'miri',
          desc: 'Kir yuvish mashinasi, muzlatgich, televizor, changyutgich va elektr plitalarni joyiga borib ta\'mirlash. 6 oygacha rasmiy kafolat.',
          price: '120 000 so\'m',
          color: const Color(0xFFDBEAFE),
          onTap: () => onOpenOrder('appliance_repair'),
        ),

        _serviceCard(
          icon: '🚨',
          title: 'Avtomobillarga yo\'lda texnik yordam (SOS)',
          desc: 'Yo\'lda buzilib qolgan avtomobillarga 10-15 daqiqada yetib boruvchi yordam. Akkumulyator, shina almashtirish, avtoelektrik, evakuator.',
          price: '170 000 so\'m',
          color: const Color(0xFFFEE2E2),
          onTap: () => onOpenOrder('roadside_sos'),
        ),

        _serviceCard(
          icon: '🏠',
          title: 'Qo\'shimcha ro\'zg\'or xizmatlari',
          desc: 'Santexnik, elektrik, xonadon tozalash (cleaning), tezkor dori-darmon va mahsulot yetkazish.',
          price: '80 000 so\'mdan',
          color: const Color(0xFFD1FAE5),
          onTap: () => onOpenOrder('home_services'),
        ),
      ],
    );
  }

  Widget _serviceCard({
    required String icon,
    required String title,
    required String desc,
    required String price,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.bottom(14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(12),
                ),
                alignment: Alignment.center,
                child: Text(icon, style: const TextStyle(fontSize: 20)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            desc,
            style: TextStyle(fontSize: 11, color: Colors.grey.shade600, height: 1.4),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                price,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF2563EB),
                ),
              ),
              ElevatedButton(
                onPressed: onTap,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2563EB),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: const Text('Buyurtma berish', style: TextStyle(fontSize: 11)),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
