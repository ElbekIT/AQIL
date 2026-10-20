import 'package:flutter/material.dart';
import 'models/models.dart';
import 'screens/home_screen.dart';
import 'screens/services_screen.dart';
import 'screens/smarthome_screen.dart';
import 'screens/finance_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  runApp(const AqilSmartLifeApp());
}

class AqilSmartLifeApp extends StatelessWidget {
  const AqilSmartLifeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AQIL Smart Life',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          primary: const Color(0xFF2563EB),
          background: const Color(0xFFF8FAFC),
        ),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          scrolledUnderElevation: 1,
        ),
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<SmartDevice> _devices = [
    SmartDevice(id: 'door_lock', name: 'Asosiy eshik qulfi (Smart Lock)', room: 'Dahliz', type: 'lock', state: true),
    SmartDevice(id: 'light_living', name: 'Mehmonxona yoritgichi', room: 'Mehmonxona', type: 'light', state: true),
    SmartDevice(id: 'light_kids', name: 'Bolalar xonasi chirog\'i', room: 'Bolalar xonasi', type: 'light', state: true),
    SmartDevice(id: 'climate_ac', name: 'Iqlim nazorati (Konditsioner)', room: 'Umumiy', type: 'climate', state: true, targetTemp: 22.5),
    SmartDevice(id: 'sensor_gas', name: 'Aqlli gaz datchigi', room: 'Oshxona', type: 'sensor', state: true, value: '0.01% (Xavfsiz)'),
    SmartDevice(id: 'cam_hallway', name: 'Dahliz videokamerasi', room: 'Kirish', type: 'camera', state: true),
  ];

  void _toggleDevice(String id) {
    setState(() {
      final dev = _devices.firstWhere((d) => d.id == id);
      dev.state = !dev.state;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('${dev.name}: ${dev.state ? "Yoqildi" : "O'chirildi"}'),
          duration: const Duration(milliseconds: 1500),
          behavior: SnackBarBehavior.floating,
        ),
      );
    });
  }

  void _changeTemp(double delta) {
    setState(() {
      final climate = _devices.firstWhere((d) => d.type == 'climate');
      climate.targetTemp = ((climate.targetTemp + delta) * 10).round() / 10;
    });
  }

  void _setScenario(String type) {
    setState(() {
      if (type == 'leave') {
        for (var d in _devices) {
          if (d.type == 'light') d.state = false;
          if (d.type == 'lock') d.state = true;
        }
      } else if (type == 'home') {
        for (var d in _devices) {
          if (d.type == 'light') d.state = true;
          if (d.type == 'lock') d.state = false;
        }
      } else {
        for (var d in _devices) {
          if (d.id == 'light_living') d.state = false;
          if (d.id == 'light_kids') d.state = true;
          if (d.type == 'lock') d.state = true;
        }
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Ssenariy faollashtirildi: $type'),
          duration: const Duration(seconds: 2),
          behavior: SnackBarBehavior.floating,
        ),
      );
    });
  }

  void _openOrderModal(String serviceType) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        String title = 'Xizmatga buyurtma berish';
        String price = '45 000 so\'m';
        if (serviceType == 'kids_transport') {
          title = '🚸 Bolalarni xavfsiz tashish';
          price = '45 000 so\'m';
        } else if (serviceType == 'weekend_daycare') {
          title = '🧸 Dam olish kuni bolalar nazorati';
          price = '60 000 so\'m';
        } else if (serviceType == 'appliance_repair') {
          title = '🔧 Maishiy texnika ta\'miri';
          price = '120 000 so\'m';
        } else if (serviceType == 'roadside_sos') {
          title = '🚨 Avto SOS yordam';
          price = '170 000 so\'m';
        }

        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(ctx).viewInsets.bottom + 20,
            left: 20,
            right: 20,
            top: 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade300,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              const Text('Tekshirilgan mutaxassis va kafolatli xizmat', style: TextStyle(fontSize: 11, color: Colors.grey)),
              const SizedBox(height: 14),

              TextField(
                decoration: InputDecoration(
                  labelText: 'Manzil (Farg\'ona shahri)',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  isDense: true,
                ),
              ),
              const SizedBox(height: 10),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Telefon raqamingiz',
                  hintText: '+998 90 123-45-67',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  isDense: true,
                ),
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: 14),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Xizmat narxi:', style: TextStyle(fontWeight: FontWeight.bold)),
                  Text(price, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Color(0xFF2563EB))),
                ],
              ),
              const SizedBox(height: 16),

              ElevatedButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('✅ Buyurtma qabul qilindi! Xavfsizlik PIN kodi: 7824'),
                      backgroundColor: Color(0xFF10B981),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2563EB),
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 48),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Tasdiqlash va PIN kod olish', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      HomeScreen(
        onOpenOrder: _openOrderModal,
        onTabChange: (idx) => setState(() => _currentIndex = idx),
        devices: _devices,
        onToggleDevice: _toggleDevice,
      ),
      ServicesScreen(onOpenOrder: _openOrderModal),
      SmarthomeScreen(
        devices: _devices,
        onToggleDevice: _toggleDevice,
        onChangeTemp: _changeTemp,
        onScenario: _setScenario,
      ),
      const FinanceScreen(),
      const ProfileScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xFF2563EB), Color(0xFF8B5CF6)]),
                borderRadius: BorderRadius.circular(16),
              ),
              alignment: Alignment.center,
              child: const Text('SN', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Nozima Sharofiddinova', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                Text('TMII Farg\'ona • 1-bosqich', style: TextStyle(fontSize: 10, color: Colors.grey)),
              ],
            ),
          ],
        ),
      ),
      body: screens[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: Colors.white,
        elevation: 2,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Asosiy'),
          NavigationDestination(icon: Icon(Icons.grid_view_outlined), selectedIcon: Icon(Icons.grid_view), label: 'Xizmatlar'),
          NavigationDestination(icon: Icon(Icons.lightbulb_outline), selectedIcon: Icon(Icons.lightbulb), label: 'Aqlli Uy'),
          NavigationDestination(icon: Icon(Icons.bar_chart_outlined), selectedIcon: Icon(Icons.bar_chart), label: 'Moliya'),
          NavigationDestination(icon: Icon(Icons.school_outlined), selectedIcon: Icon(Icons.school), label: 'Titul'),
        ],
      ),
    );
  }
}
