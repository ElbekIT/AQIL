import 'package:flutter/material.dart';

class FinanceScreen extends StatefulWidget {
  const FinanceScreen({super.key});

  @override
  State<FinanceScreen> createState() => _FinanceScreenState();
}

class _FinanceScreenState extends State<FinanceScreen> {
  double transportQty = 100;
  double repairQty = 40;
  double sosQty = 20;
  double daycareQty = 16;
  final int fixedCost = 18500000;

  void _setPreset(String type) {
    setState(() {
      if (type == 'initial') {
        transportQty = 100;
        repairQty = 40;
        sosQty = 20;
        daycareQty = 16;
      } else if (type == 'breakeven') {
        transportQty = 450;
        repairQty = 180;
        sosQty = 120;
        daycareQty = 85;
      } else {
        transportQty = 800;
        repairQty = 350;
        sosQty = 220;
        daycareQty = 150;
      }
    });
  }

  String _formatMoney(num val) {
    return '${val.toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]} ')} so\'m';
  }

  @override
  Widget build(BuildContext context) {
    final marginTransport = transportQty * 7000;
    final marginRepair = repairQty * 20000;
    final marginSos = sosQty * 40000;
    final marginDaycare = daycareQty * 80000;

    final totalMargin = marginTransport + marginRepair + marginSos + marginDaycare;
    final netResult = totalMargin - fixedCost;
    final coverage = ((totalMargin / fixedCost) * 100).clamp(0, 300).round();
    final isProfitable = netResult >= 0;

    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        const Text(
          '📊 Biznes va Moliya Simulyatori',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 4),
        Text(
          '1-bosqich talabasi Nozima Sharofiddinova hisob-kitoblari',
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
        ),
        const SizedBox(height: 12),

        // Presets
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _presetBtn('📉 1-oy sinov (Zarar)', Colors.red, () => _setPreset('initial')),
              const SizedBox(width: 8),
              _presetBtn('⚖️ Zararsizlik nuqtasi', Colors.blue, () => _setPreset('breakeven')),
              const SizedBox(width: 8),
              _presetBtn('🚀 O\'sish va Foyda', Colors.green, () => _setPreset('growth')),
            ],
          ),
        ),
        const SizedBox(height: 14),

        // Net Profit / Loss Card
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: isProfitable
                  ? [const Color(0xFF10B981), const Color(0xFF059669)]
                  : [const Color(0xFFEF4444), const Color(0xFFDC2626)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: (isProfitable ? const Color(0xFF10B981) : const Color(0xFFEF4444)).withOpacity(0.35),
                blurRadius: 14,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                isProfitable ? 'SOF OPERATSION FOYDA' : 'OPERATSION ZARAR HOLATI',
                style: const TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 4),
              Text(
                '${netResult >= 0 ? '+' : ''}${_formatMoney(netResult.round())}',
                style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 6),
              Text(
                'Oylik marja: ${_formatMoney(totalMargin.round())} | Xarajat: ${_formatMoney(fixedCost)}',
                style: const TextStyle(color: Colors.white, fontSize: 11),
              ),
              const SizedBox(height: 10),
              LinearProgressIndicator(
                value: (coverage / 100).clamp(0.0, 1.0),
                backgroundColor: Colors.white30,
                valueColor: const AlwaysStoppedAnimation(Colors.white),
                borderRadius: BorderRadius.circular(5),
              ),
              const SizedBox(height: 4),
              Align(
                alignment: Alignment.centerRight,
                child: Text(
                  'Qoplash darajasi: $coverage%',
                  style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // Sliders
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('🎛️ Oylik buyurtmalar hajmi', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 12),

              _slider('🚸 Bolalar taksisi (Marja: 7 000 so\'m)', transportQty, 0, 1000, (v) => setState(() => transportQty = v)),
              _slider('🔧 Maishiy ta\'mir (Marja: 20 000 so\'m)', repairQty, 0, 500, (v) => setState(() => repairQty = v)),
              _slider('🚨 Avto SOS (Marja: 40 000 so\'m)', sosQty, 0, 300, (v) => setState(() => sosQty = v)),
              _slider('🧸 Dam olish guruhi (Marja: 80 000 so\'m)', daycareQty, 0, 200, (v) => setState(() => daycareQty = v)),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // 76M Breakdown
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text('💼 Dastlabki xarajatlar: 76 000 000 so\'m', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              const SizedBox(height: 8),
              _row('🌐 Veb-sayt va tizim:', '30 000 000 so\'m'),
              _row('⚖️ Tashkiliy va yuridik ishlar:', '5 000 000 so\'m'),
              _row('📢 Dastlabki reklama:', '10 000 000 so\'m'),
              _row('🛡️ Bolalar xavfsizlik kreslolari:', '8 000 000 so\'m'),
              _row('🛠️ Avto yordam jihozlari:', '8 000 000 so\'m'),
              _row('📱 Dispetcher aloqa jihozlari:', '4 000 000 so\'m'),
              _row('👕 Forma va brending:', '3 000 000 so\'m'),
              _row('💰 Kutilmagan zaxira:', '8 000 000 so\'m'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _presetBtn(String label, Color color, VoidCallback onTap) {
    return ElevatedButton(
      onPressed: onTap,
      style: ElevatedButton.styleFrom(
        backgroundColor: color.withOpacity(0.1),
        foregroundColor: color,
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
      child: Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
    );
  }

  Widget _slider(String label, double val, double min, double max, ValueChanged<double> onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(fontSize: 11)),
            Text('${val.round()} ta', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF2563EB))),
          ],
        ),
        Slider(
          value: val,
          min: min,
          max: max,
          activeColor: const Color(0xFF2563EB),
          onChanged: onChanged,
        ),
      ],
    );
  }

  Widget _row(String label, String val) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 11, color: Colors.grey.shade700)),
          Text(val, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
