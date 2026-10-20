import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        // Titul Sheet Card
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFE2E8F0), width: 2),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              const Text('🏛️', style: TextStyle(fontSize: 40)),
              const SizedBox(height: 8),
              const Text(
                'Toshkent Menejment va Iqtisodiyot Instituti',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, letterSpacing: 0.5),
              ),
              const SizedBox(height: 2),
              Text(
                'Farg\'ona kampusi • Iqtisodiyot va menejment',
                style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Text(
                  '“AQLLI UY” BOSHQARUVI VA OILALAR UCHUN KOMPLEKS XIZMATLAR TIZIMI',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF2563EB),
                  ),
                ),
              ),
              const SizedBox(height: 14),
              _authorRow('👤 Muallif:', 'Sharofiddinova Nozima Egamberdi qizi'),
              _authorRow('🎓 O\'quv yurti:', 'TMII Farg\'ona kampusi'),
              _authorRow('📚 Bosqich:', '1-bosqich talabasi'),
              _authorRow('📍 Hudud:', 'Farg\'ona shahri'),
              _authorRow('📅 Yil:', '2026-yil'),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Relevance
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('🎯 Loyihaning maqsadi va dolzarbligi', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              SizedBox(height: 8),
              Text(
                'Ota-onalar ish bilan band bo\'lgan sharoitda bolalarni maktabdan olib kelish, dam olish kunlari foydali mashg\'ulotlar bilan band qilish, maishiy texnika va avtomobil nosozliklariga tezkor yordam ko\'rsatishni bitta raqamli tizimga birlashtirish.',
                style: TextStyle(fontSize: 11, height: 1.5, color: Colors.black87),
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Safety
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFFF0FDF4),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFBBF7D0)),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('🛡️ Xavfsizlik va nazorat kafolatlari', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Color(0xFF166534))),
              SizedBox(height: 6),
              Text(
                '• 4 xonali maxsus PIN kodli topshirish tizimi\n• Real-vaqtli GPS jonli kuzatuv\n• Tekshirilgan haydovchilar va ISOFIX bolalar o\'rindig\'i\n• Malakali tarbiyachi-pedagoglar nazorati',
                style: TextStyle(fontSize: 11, height: 1.6, color: Color(0xFF14532D)),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _authorRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, color: Colors.grey)),
          Text(value, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
