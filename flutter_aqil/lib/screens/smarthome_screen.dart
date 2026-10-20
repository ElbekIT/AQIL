import 'package:flutter/material.dart';
import '../models/models.dart';

class SmarthomeScreen extends StatelessWidget {
  final List<SmartDevice> devices;
  final Function(String) onToggleDevice;
  final Function(double) onChangeTemp;
  final Function(String) onScenario;

  const SmarthomeScreen({
    super.key,
    required this.devices,
    required this.onToggleDevice,
    required this.onChangeTemp,
    required this.onScenario,
  });

  @override
  Widget build(BuildContext context) {
    final climate = devices.firstWhere((d) => d.type == 'climate');

    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        const Text(
          '💡 Aqlli Uy Hub Boshqaruvi',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Text(
          'Xonadon xavfsizligi, eshik qulfi va harorat nazorati',
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 14),

        // Scenarios
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _scenarioChip('👋 Uyga kelish', Colors.blue, () => onScenario('home')),
              const SizedBox(width: 8),
              _scenarioChip('🚪 Uydan chiqish', Colors.red, () => onScenario('leave')),
              const SizedBox(width: 8),
              _scenarioChip('🌙 Tungi rejim', Colors.purple, () => onScenario('night')),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Climate Card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('🌡️ Iqlim nazorati (AC)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  const SizedBox(height: 2),
                  Text('Xona harorati: 23°C', style: TextStyle(fontSize: 11, color: Colors.grey.shade600)),
                ],
              ),
              Row(
                children: [
                  IconButton.filledTonal(
                    onPressed: () => onChangeTemp(-0.5),
                    icon: const Icon(Icons.remove, size: 16),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '${climate.targetTemp}°C',
                    style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Color(0xFF2563EB)),
                  ),
                  const SizedBox(width: 8),
                  IconButton.filledTonal(
                    onPressed: () => onChangeTemp(0.5),
                    icon: const Icon(Icons.add, size: 16),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        // Grid of devices
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            childAspectRatio: 1.3,
          ),
          itemCount: devices.length,
          itemBuilder: (context, index) {
            final dev = devices[index];
            if (dev.type == 'climate') return const SizedBox.shrink();

            String icon = '💡';
            if (dev.type == 'lock') icon = dev.state ? '🔒' : '🔓';
            if (dev.type == 'sensor') icon = '🚨';
            if (dev.type == 'camera') icon = '📹';

            final isActive = dev.state;

            return InkWell(
              onTap: () => onToggleDevice(dev.id),
              borderRadius: BorderRadius.circular(16),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: isActive ? const Color(0xFFEFF6FF) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isActive ? const Color(0xFF93C5FD) : const Color(0xFFE2E8F0),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(icon, style: const TextStyle(fontSize: 22)),
                        Switch(
                          value: isActive,
                          onChanged: (val) => onToggleDevice(dev.id),
                          activeColor: const Color(0xFF2563EB),
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          dev.name,
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          '${dev.room} • ${dev.type == 'lock' ? (dev.state ? 'Qulflangan' : 'Ochiq') : (dev.state ? 'Yoqilgan' : 'O\'chirilgan')}',
                          style: TextStyle(fontSize: 10, color: Colors.grey.shade600),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _scenarioChip(String label, Color color, VoidCallback onTap) {
    return ActionChip(
      label: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
      backgroundColor: color.withOpacity(0.1),
      side: BorderSide(color: color.withOpacity(0.3)),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      onPressed: onTap,
    );
  }
}
