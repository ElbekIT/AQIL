/**
 * Farg'ona shahri bo'ylab jonli interaktiv GPS xarita simulyatori
 * Canvas orqali ishlaydi, offline va real vaqtda harakatlanuvchi avtomobilni chizadi.
 */

class FerganaMapSimulator {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.progress = 0;
    this.speed = 0.003;
    this.animId = null;
    this.active = true;

    // Farg'ona shahri koordinatalar marshruti (Al-Farg'oniy -> Sayilgoh -> B.Marg'inoniy)
    this.waypoints = [
      { x: 30, y: 110, label: "2-sonli Maktab (Olib ketish)" },
      { x: 90, y: 110, label: "Al-Farg'oniy chorrahasi" },
      { x: 140, y: 60, label: "Sayilgoh xiyoboni" },
      { x: 220, y: 60, label: "Farg'ona Teatri" },
      { x: 270, y: 100, label: "B.Marg'inoniy ko'chasi" },
      { x: 340, y: 100, label: "Xonadon (Manzil)" }
    ];

    this.carPos = { x: this.waypoints[0].x, y: this.waypoints[0].y };
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  animate() {
    if (!this.active) return;
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  update() {
    this.progress += this.speed;
    if (this.progress > 1) {
      this.progress = 0; // Loop simulation
    }

    // Interpolate waypoints
    const totalSegments = this.waypoints.length - 1;
    const scaledProg = this.progress * totalSegments;
    const segIndex = Math.min(Math.floor(scaledProg), totalSegments - 1);
    const subProg = scaledProg - segIndex;

    const p1 = this.waypoints[segIndex];
    const p2 = this.waypoints[segIndex + 1];

    this.carPos = {
      x: p1.x + (p2.x - p1.x) * subProg,
      y: p1.y + (p2.y - p1.y) * subProg
    };
  }

  draw() {
    if (!this.canvas) return;
    const ctx = this.ctx;
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Shahar foni (xarita to'ri)
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(0, 0, w, h);

    // Kvartallar va ko'chalar foni
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(15, 15, w - 30, h - 30);

    // Ko'cha chiziqlari (Farg'ona ko'chalari)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Fon yo'llari
    ctx.beginPath();
    ctx.moveTo(10, 110);
    ctx.lineTo(w - 10, 110);
    ctx.moveTo(140, 10);
    ctx.lineTo(140, h - 10);
    ctx.moveTo(270, 10);
    ctx.lineTo(270, h - 10);
    ctx.stroke();

    // 2. Harakat marshruti (Yo'nalish)
    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(this.waypoints[0].x, this.waypoints[0].y);
    for (let i = 1; i < this.waypoints.length; i++) {
      ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y);
    }
    ctx.stroke();

    // Bosib o'tilgan yo'l (Ko'k rangda)
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(this.waypoints[0].x, this.waypoints[0].y);
    const totalSegments = this.waypoints.length - 1;
    const scaledProg = this.progress * totalSegments;
    const currentSeg = Math.floor(scaledProg);

    for (let i = 1; i <= currentSeg; i++) {
      ctx.lineTo(this.waypoints[i].x, this.waypoints[i].y);
    }
    ctx.lineTo(this.carPos.x, this.carPos.y);
    ctx.stroke();

    // 3. Boshlang'ich nuqta (Maktab)
    const pStart = this.waypoints[0];
    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(pStart.x, pStart.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 9px sans-serif";
    ctx.fillText("🏫 Maktab", pStart.x - 10, pStart.y - 12);

    // 4. Yakuniy nuqta (Uy)
    const pEnd = this.waypoints[this.waypoints.length - 1];
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(pEnd.x, pEnd.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.fillText("🏠 Uy", pEnd.x - 6, pEnd.y - 12);

    // 5. Harakatlanayotgan avtomobil ikonkasi
    ctx.save();
    ctx.translate(this.carPos.x, this.carPos.y);

    // Car shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Car body
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.roundRect(-12, -7, 24, 14, 4);
    ctx.fill();

    // Roof
    ctx.fillStyle = "#60a5fa";
    ctx.beginPath();
    ctx.roundRect(-6, -5, 12, 10, 2);
    ctx.fill();

    // Headlights
    ctx.fillStyle = "#fbbf24";
    ctx.fillRect(10, -5, 2, 3);
    ctx.fillRect(10, 2, 2, 3);

    ctx.restore();
  }
}

window.FerganaMapSimulator = FerganaMapSimulator;
