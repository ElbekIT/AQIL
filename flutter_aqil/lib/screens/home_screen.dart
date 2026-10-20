import 'package:flutter/material.dart';
import '../models/models.dart';

class HomeScreen extends StatelessWidget {
  final Function(String) onOpenOrder;
  final Function(int) onTabChange;
  final List<SmartDevice> devices;
  final Function(String) onToggleDevice;

  const HomeScreen({
    super.key,
    required this.onOpenOrder,
    required this.onTabChange,
    required this.devices,
    required this.onToggleDevice,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Hero Banner
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20.0),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2563EB), Color(0xFF1D4ED8), Color(0xFF1E40AF)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(24.0),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF2563EB).withOpacity(0.35),
                  blurRadius: 18,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Text(
                    'AQLLI OILA VA XIZMATLAR',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Oilaviy xotirjamlik va aqlli uy boshqaruvi',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    height: 1.25,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Bolalarni maktabdan xavfsiz tashish, dam olish kunlari nazorat, maishiy ta\'mir va yo\'lda avto SOS yordami.',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.85),
                    fontSize: 12,
                    height: 1.35,
                  ),
                ),
                const SizedBox(height: 14),
                ElevatedButton.icon(
                  onPressed: () => onOpenOrder('kids_transport'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF2563EB),
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  ),
                  icon: const Icon(Icons.directions_car, size: 16),
                  label: const Text(
                    'Xavfsiz taksi chaqirish',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 18),

          // Active Live GPS Tracker Card
          Container(
            padding: const EdgeInsets.all(16.0),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18.0),
              border: Border.all(color: Colors.blue.withOpacity(0.2)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.circle, color: Color(0xFF10B981), size: 8),
                          SizedBox(width: 6),
                          Text(
                            'JONLI HARAKAT (GPS)',
                            style: TextStyle(
                              color: Color(0xFF059669),
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Text(
                      'Yetib kelish: 8 daq',
                      style: TextStyle(
                        color: Color(0xFF2563EB),
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Simulated Map Graphic
                Container(
                  height: 110,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: const Color(0xFFF1F5F9),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: Stack(
                    children: [
                      Center(
                        child: Text(
                          'Farg\'ona: 2-maktab (Al-Farg\'oniy) ➔ Marg\'inoniy 14-uy',
                          style: TextStyle(
                            fontSize: 10,
                            color: Colors.grey.shade600,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      Positioned(
                        left: 20,
                        top: 40,
                        child: _mapPin('🏫 Maktab', Colors.green),
                      ),
                      Positioned(
                        right: 20,
                        top: 40,
                        child: _mapPin('🏠 Uy', Colors.red),
                      ),
                      const Positioned(
                        left: 120,
                        top: 35,
                        child: Icon(Icons.directions_car, color: Color(0xFF2563EB), size: 28),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 12),
                const Text(
                  'Otabek Qodirov (Chevrolet Cobalt 40 A 777 BA)',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                ),
                const SizedBox(height: 2),
                Text(
                  'Farzand: Madinaxon (7 yosh, 1-sinf)',
                  style: TextStyle(fontSize: 11, color: Colors.grey.shade600),
                ),

                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Xavfsizlik PIN kodi:',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600),
                      ),
                      Text(
                        '4 8 9 2',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 2,
                          color: Color(0xFF2563EB),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Services Section Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '⚡ Tezkor xizmatlar',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () => onTabChange(1),
                child: const Text('Barchasi ›', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),

          // Services Grid
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            childAspectRatio: 1.25,
            children: [
              _serviceTile(
                '🚸 Bolalar taksisi',
                'Maktab/bog\'chadan olib kelish',
                '45 000 so\'m',
                const Color(0xFFFEF3C7),
                () => onOpenOrder('kids_transport'),
              ),
              _serviceTile(
                '🧸 Dam olish kuni',
                'Shanbalik bolalar nazorati',
                '60 000 so\'m',
                const Color(0xFFEDE9FE),
                () => onOpenOrder('weekend_daycare'),
              ),
              _serviceTile(
                '🔧 Maishiy ta\'mir',
                'Kir yuvish, muzlatgich, TV',
                '120 000 so\'m',
                const Color(0xFFDBEAFE),
                () => onOpenOrder('appliance_repair'),
              ),
              _serviceTile(
                '🚨 Avto SOS',
                'Yo\'lda tezkor yordam 24/7',
                '170 000 so\'m',
                const Color(0xFFFEE2E2),
                () => onOpenOrder('roadside_sos'),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Smart Home Quick View
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '💡 Aqlli Uy holati',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
              ),
              TextButton(
                onPressed: () => onTabChange(2),
                child: const Text('Boshqaruv ›', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),

          Row(
            children: [
              Expanded(
                child: _smartQuickTile(
                  '🔒 Smart Qulf',
                  devices.firstWhere((d) => d.id == 'door_lock').state ? 'Qulflangan' : 'Ochiq',
                  devices.firstWhere((d) => d.id == 'door_lock').state,
                  () => onToggleDevice('door_lock'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _smartQuickTile(
                  '💡 Chiroqlar',
                  devices.firstWhere((d) => d.id == 'light_living').state ? 'Yoqilgan' : 'O\'chirilgan',
                  devices.firstWhere((d) => d.id == 'light_living').state,
                  () => onToggleDevice('light_living'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _mapPin(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.15),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color, width: 0.5),
      ),
      child: Text(
        label,
        style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: color),
      ),
    );
  }

  Widget _serviceTile(String title, String desc, String price, Color bg, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            Text(desc, style: TextStyle(fontSize: 10, color: Colors.grey.shade600)),
            Text(price, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 11, color: Color(0xFF2563EB))),
          ],
        ),
      ),
    );
  }

  Widget _smartQuickTile(String title, String status, bool isActive, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFFEFF6FF) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: isActive ? const Color(0xFF93C5FD) : const Color(0xFFE2E8F0)),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
            const SizedBox(height: 4),
            Text(status, style: TextStyle(fontSize: 11, color: isActive ? const Color(0xFF2563EB) : Colors.grey)),
          ],
        ),
      ),
    );
  }
}
