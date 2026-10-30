/**
 * High-fidelity, clean Apple-style industrial product renders.
 * Directly integrates the user-provided Apple asset (/assets/aistudio/image_1c25e20e.png)
 * with pixel-perfect SVG viewBox crops and zero latency.
 */

export const RAW_USER_PROVIDED_IMAGE = '/assets/aistudio/image_1c25e20e.png';

// Helper to create an SVG viewport crop of the user's provided picture
export const createUserCropUri = (sx: number, sy: number, width: number, height: number): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${sx} ${sy} ${width} ${height}" width="${width}" height="${height}"><image href="/assets/aistudio/image_1c25e20e.png" width="1200" height="1494"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// User-provided image crops for all 16 tool slots
export const USER_TOOL_CROPS: Record<string, string> = {
  // Focus items requested by user:
  'T-13': createUserCropUri(250, 320, 490, 510), // Dual Pro Phones (Hero)
  'T-14': createUserCropUri(360, 1050, 265, 285), // Pro Camera Dual Lens
  'T-15': createUserCropUri(60, 1050, 265, 285), // Brushed Titanium Chassis Edge
  'T-16': createUserCropUri(660, 1050, 265, 285), // All-Day Battery Power Module
  'T-09': createUserCropUri(380, 1130, 220, 200), // Precision Optical Macro
  // Additional tools:
  'T-10': createUserCropUri(85, 1130, 220, 200), // Titanium Curve & Speaker Grille
  'T-11': createUserCropUri(490, 350, 230, 250), // Ceramic Shield & Dynamic Island
  'T-12': createUserCropUri(275, 350, 220, 380), // White Ceramic Back & Precision Ring
  'T-05': createUserCropUri(255, 350, 140, 440), // Titanium Side Profile
  'T-06': createUserCropUri(470, 330, 250, 480), // Dark Titanium Finish
  'T-07': createUserCropUri(360, 1060, 250, 260), // Sensor Optical Element
  'T-08': createUserCropUri(70, 1060, 250, 260), // Titanium Edge
  'T-01': createUserCropUri(250, 600, 480, 230), // Solid Industrial Chassis
  'T-02': createUserCropUri(670, 1070, 240, 250), // Internal Battery Cell
  'T-03': createUserCropUri(60, 1080, 260, 240), // Titanium Matte Frame
  'T-04': createUserCropUri(260, 330, 460, 480), // Full Industrial Perspective
};

// Helper to encode SVG to data URI
function svgToUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

// 1. Digital Multimeter (Fluke 87V)
export const SVG_MULTIMETER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="multiBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#facc15" />
      <stop offset="70%" stopColor="#eab308" />
      <stop offset="100%" stopColor="#ca8a04" />
    </linearGradient>
    <linearGradient id="multiLcd" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#0f172a" />
      <stop offset="100%" stopColor="#1e293b" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.15" />
    </filter>
  </defs>
  <rect x="52" y="24" width="96" height="152" rx="18" fill="url(#multiBody)" filter="url(#softShadow)" />
  <rect x="58" y="30" width="84" height="140" rx="14" fill="#18181b" />
  <!-- Yellow Holster Accents -->
  <path d="M 52 38 Q 52 24 68 24 L 78 24 L 78 40 L 52 40 Z" fill="url(#multiBody)" />
  <path d="M 148 38 Q 148 24 132 24 L 122 24 L 122 40 L 148 40 Z" fill="url(#multiBody)" />
  <rect x="52" y="145" width="96" height="25" rx="10" fill="url(#multiBody)" />
  <!-- LCD Display -->
  <rect x="66" y="38" width="68" height="34" rx="4" fill="url(#multiLcd)" stroke="#3f3f46" stroke-width="1.5" />
  <text x="128" y="58" font-family="monospace" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="end">87.5</text>
  <text x="130" y="66" font-family="monospace" font-size="8" fill="#38bdf8" text-anchor="end">VAC RMS</text>
  <!-- Buttons -->
  <circle cx="75" cy="84" r="4" fill="#facc15" />
  <circle cx="89" cy="84" r="4" fill="#71717a" />
  <circle cx="103" cy="84" r="4" fill="#71717a" />
  <circle cx="117" cy="84" r="4" fill="#38bdf8" />
  <!-- Rotary Dial -->
  <circle cx="100" cy="114" r="18" fill="#27272a" stroke="#52525b" stroke-width="1.5" />
  <circle cx="100" cy="114" r="13" fill="#18181b" />
  <rect x="98" y="98" width="4" height="12" rx="1.5" fill="#facc15" />
  <!-- Sockets -->
  <circle cx="72" cy="155" r="4.5" fill="#dc2626" stroke="#18181b" stroke-width="1.5" />
  <circle cx="90" cy="155" r="4.5" fill="#18181b" stroke="#71717a" stroke-width="1.5" />
  <circle cx="108" cy="155" r="4.5" fill="#18181b" stroke="#71717a" stroke-width="1.5" />
  <circle cx="126" cy="155" r="4.5" fill="#dc2626" stroke="#18181b" stroke-width="1.5" />
</svg>
`);

// 2. Infrared Laser Pyrometer (Fluke 62 MAX)
export const SVG_PYROMETER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="pyroYellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#fde047" />
      <stop offset="100%" stopColor="#ca8a04" />
    </linearGradient>
  </defs>
  <!-- Barrel & Head -->
  <path d="M 60 45 L 140 45 L 140 85 L 115 85 L 105 155 L 75 155 L 85 95 L 60 95 Z" fill="url(#pyroYellow)" stroke="#18181b" stroke-width="2" stroke-linejoin="round" />
  <!-- Black Grip Overmold -->
  <path d="M 75 95 L 100 95 L 94 150 L 72 150 Z" fill="#27272a" />
  <!-- Trigger -->
  <path d="M 72 105 Q 65 115 72 125" stroke="#ef4444" stroke-width="4" stroke-linecap="round" fill="none" />
  <!-- Optical Lens / Infrared Window -->
  <rect x="138" y="52" width="6" height="26" rx="2" fill="#ef4444" opacity="0.85" />
  <!-- Back Display Screen -->
  <rect x="62" y="55" width="22" height="28" rx="3" fill="#09090b" stroke="#3f3f46" stroke-width="1" />
  <text x="73" y="70" font-family="monospace" font-size="7" font-weight="bold" fill="#38bdf8" text-anchor="middle">284°C</text>
  <!-- Laser Beam Graphic -->
  <line x1="145" y1="65" x2="175" y2="65" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,2" />
</svg>
`);

// 3. Laser Photo Tachometer (Extech)
export const SVG_TACHOMETER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect x="60" y="30" width="80" height="140" rx="14" fill="#0284c7" stroke="#0f172a" stroke-width="2" />
  <rect x="66" y="36" width="68" height="128" rx="10" fill="#1e293b" />
  <!-- Top Optical Sensor Cone -->
  <path d="M 85 30 L 95 16 L 105 16 L 115 30 Z" fill="#0284c7" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="100" cy="18" r="3" fill="#ef4444" />
  <!-- Screen -->
  <rect x="74" y="48" width="52" height="32" rx="3" fill="#0f172a" stroke="#475569" stroke-width="1" />
  <text x="100" y="66" font-family="monospace" font-size="10" font-weight="bold" fill="#4ade80" text-anchor="middle">3,450</text>
  <text x="100" y="74" font-family="monospace" font-size="6" fill="#94a3b8" text-anchor="middle">RPM</text>
  <!-- Keypad -->
  <circle cx="85" cy="98" r="6" fill="#38bdf8" />
  <circle cx="115" cy="98" r="6" fill="#f59e0b" />
  <rect x="85" y="115" width="30" height="8" rx="3" fill="#0284c7" />
  <text x="100" y="121" font-family="sans-serif" font-size="5" font-weight="bold" fill="#ffffff" text-anchor="middle">MEASURE</text>
</svg>
`);

// 4. Pneumatic Blind Riveter (Lobster)
export const SVG_RIVETER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="chromeSteel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#e2e8f0" />
      <stop offset="50%" stopColor="#94a3b8" />
      <stop offset="100%" stopColor="#cbd5e1" />
    </linearGradient>
  </defs>
  <!-- Long Steel Nose & Jaw Head -->
  <rect x="25" y="62" width="60" height="16" rx="2" fill="url(#chromeSteel)" stroke="#334155" stroke-width="1.5" />
  <rect x="20" y="65" width="8" height="10" rx="1" fill="#475569" />
  <!-- Cast Aluminum Body -->
  <path d="M 80 50 L 145 50 L 155 75 L 140 90 L 125 90 L 115 150 L 85 150 L 90 90 L 80 90 Z" fill="#0284c7" stroke="#0f172a" stroke-width="2" />
  <!-- Rear Mandrel Collector Bottle -->
  <rect x="145" y="55" width="30" height="24" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
  <!-- Bottom Air Cylinder Base -->
  <rect x="75" y="150" width="50" height="25" rx="5" fill="url(#chromeSteel)" stroke="#334155" stroke-width="1.5" />
  <!-- Trigger -->
  <path d="M 85 98 Q 80 106 85 114" stroke="#ef4444" stroke-width="3" stroke-linecap="round" fill="none" />
</svg>
`);

// 5. Digital Outside Micrometer 0-25mm (Mitutoyo)
export const SVG_MICROMETER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="mituGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#10b981" />
      <stop offset="100%" stopColor="#047857" />
    </linearGradient>
    <linearGradient id="satinSteel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#f8fafc" />
      <stop offset="50%" stopColor="#cbd5e1" />
      <stop offset="100%" stopColor="#94a3b8" />
    </linearGradient>
  </defs>
  <!-- C-Frame -->
  <path d="M 40 70 C 20 100, 20 140, 50 160 C 75 175, 105 165, 115 140 L 98 135 C 90 148, 70 155, 55 145 C 38 132, 38 105, 52 85 Z" fill="url(#mituGreen)" stroke="#064e3b" stroke-width="1.5" />
  <!-- Fixed Anvil -->
  <rect x="38" y="65" width="16" height="10" rx="1" fill="url(#satinSteel)" stroke="#475569" stroke-width="1" />
  <!-- Movable Spindle -->
  <rect x="70" y="65" width="40" height="10" rx="1" fill="url(#satinSteel)" stroke="#475569" stroke-width="1" />
  <!-- Digital Electronics Hub -->
  <rect x="100" y="55" width="48" height="30" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
  <!-- LCD -->
  <rect x="106" y="60" width="36" height="14" rx="2" fill="#1e293b" />
  <text x="138" y="71" font-family="monospace" font-size="8" font-weight="bold" fill="#38bdf8" text-anchor="end">24.982</text>
  <!-- Thimble & Ratchet Stop -->
  <rect x="148" y="60" width="30" height="20" rx="2" fill="url(#satinSteel)" stroke="#475569" stroke-width="1" />
  <line x1="155" y1="60" x2="155" y2="80" stroke="#64748b" stroke-width="0.8" />
  <line x1="162" y1="60" x2="162" y2="80" stroke="#64748b" stroke-width="0.8" />
  <line x1="169" y1="60" x2="169" y2="80" stroke="#64748b" stroke-width="0.8" />
  <rect x="178" y="64" width="10" height="12" rx="2" fill="#1e293b" />
</svg>
`);

// 6. Cylinder Dial Bore Gauge
export const SVG_BORE_GAUGE = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Dial Indicator Top -->
  <circle cx="100" cy="50" r="30" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
  <circle cx="100" cy="50" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
  <!-- Dial Pointer -->
  <line x1="100" y1="50" x2="114" y2="38" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" />
  <circle cx="100" cy="50" r="3" fill="#0f172a" />
  <!-- Stem & Extension Rod -->
  <rect x="96" y="80" width="8" height="75" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
  <!-- Anvil Head at bottom -->
  <rect x="75" y="155" width="50" height="14" rx="4" fill="#334155" stroke="#0f172a" stroke-width="1.5" />
  <circle cx="75" cy="162" r="3" fill="#e2e8f0" />
  <circle cx="125" cy="162" r="3" fill="#e2e8f0" />
</svg>
`);

// 7. Smart Electronic Torque Screwdriver
export const SVG_TORQUE_SCREWDRIVER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="handleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#1e293b" />
      <stop offset="50%" stopColor="#334155" />
      <stop offset="100%" stopColor="#0f172a" />
    </linearGradient>
  </defs>
  <!-- Ergonomic Anodized Handle -->
  <rect x="84" y="65" width="32" height="95" rx="8" fill="url(#handleGrad)" stroke="#0284c7" stroke-width="1.5" />
  <!-- Digital OLED display on handle -->
  <rect x="90" y="85" width="20" height="30" rx="3" fill="#09090b" stroke="#38bdf8" stroke-width="1" />
  <text x="100" y="103" font-family="monospace" font-size="8" font-weight="bold" fill="#38bdf8" text-anchor="middle">2.5</text>
  <text x="100" y="111" font-family="monospace" font-size="5" fill="#94a3b8" text-anchor="middle">N·m</text>
  <!-- Steel Bit Shank -->
  <rect x="96" y="30" width="8" height="35" rx="1" fill="#cbd5e1" stroke="#475569" stroke-width="1" />
  <!-- Magnetic 1/4" Hex Bit (Phillips) -->
  <polygon points="100,16 97,30 103,30" fill="#64748b" />
</svg>
`);

// 8. IP67 Coolant-Proof Digital Caliper (Mitutoyo)
export const SVG_CALIPER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="caliperSteel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#f1f5f9" />
      <stop offset="50%" stopColor="#cbd5e1" />
      <stop offset="100%" stopColor="#94a3b8" />
    </linearGradient>
  </defs>
  <!-- Long Stainless Steel Beam -->
  <rect x="25" y="90" width="155" height="16" fill="url(#caliperSteel)" stroke="#475569" stroke-width="1" />
  <!-- Main Fixed Outside Jaw -->
  <path d="M 25 90 L 25 155 Q 35 155 40 106 L 40 90 Z" fill="url(#caliperSteel)" stroke="#475569" stroke-width="1" />
  <!-- Main Fixed Inside Jaw (top) -->
  <path d="M 25 90 L 25 60 Q 33 60 38 90 Z" fill="url(#caliperSteel)" stroke="#475569" stroke-width="1" />
  <!-- Sliding Digital Readout Unit -->
  <rect x="75" y="80" width="46" height="36" rx="4" fill="#0f172a" stroke="#059669" stroke-width="1.5" />
  <!-- Slider Moving Jaw (bottom) -->
  <path d="M 75 116 L 75 155 Q 85 155 90 116 Z" fill="url(#caliperSteel)" stroke="#475569" stroke-width="1" />
  <!-- Slider Inside Jaw (top) -->
  <path d="M 75 80 L 75 60 Q 82 60 88 80 Z" fill="url(#caliperSteel)" stroke="#475569" stroke-width="1" />
  <!-- Digital LCD -->
  <rect x="81" y="86" width="34" height="15" rx="2" fill="#1e293b" />
  <text x="111" y="97" font-family="monospace" font-size="8" font-weight="bold" fill="#34d399" text-anchor="end">150.00</text>
</svg>
`);

// 9. Industrial Torque Wrench 1/2" 40-200Nm
export const SVG_TORQUE_WRENCH = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="wrenchChrome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="50%" stopColor="#cbd5e1" />
      <stop offset="100%" stopColor="#64748b" />
    </linearGradient>
  </defs>
  <!-- Long Shaft -->
  <rect x="45" y="93" width="105" height="14" rx="2" fill="url(#wrenchChrome)" stroke="#334155" stroke-width="1.5" />
  <!-- Ratchet Head Left -->
  <circle cx="45" cy="100" r="16" fill="url(#wrenchChrome)" stroke="#334155" stroke-width="1.5" />
  <rect x="41" y="96" width="8" height="8" rx="1" fill="#1e293b" />
  <!-- Reverse Lever -->
  <path d="M 36 94 L 40 88 L 44 94 Z" fill="#ef4444" />
  <!-- Knurled Handle Grip Right -->
  <rect x="110" y="90" width="45" height="20" rx="3" fill="#1e293b" stroke="#0284c7" stroke-width="1" />
  <line x1="120" y1="90" x2="120" y2="110" stroke="#475569" />
  <line x1="130" y1="90" x2="130" y2="110" stroke="#475569" />
  <line x1="140" y1="90" x2="140" y2="110" stroke="#475569" />
  <!-- Micrometer Scale on Shaft -->
  <line x1="90" y1="93" x2="90" y2="107" stroke="#0f172a" stroke-width="1" />
  <text x="80" y="86" font-family="monospace" font-size="7" font-weight="bold" fill="#0284c7">120 N·m</text>
</svg>
`);

// 10. High-Torque Cordless Impact Wrench 3/4"
export const SVG_IMPACT_WRENCH = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Metal Gear Housing / Anvil Front -->
  <rect x="35" y="65" width="30" height="25" rx="3" fill="#94a3b8" stroke="#334155" stroke-width="1.5" />
  <rect x="25" y="73" width="10" height="10" fill="#1e293b" />
  <!-- Motor Housing -->
  <path d="M 65 55 L 130 55 L 140 95 L 115 95 L 110 145 L 80 145 L 85 95 L 65 95 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2" />
  <!-- Black Rubber Ergonomic Grip -->
  <path d="M 85 95 L 110 95 L 105 145 L 80 145 Z" fill="#18181b" />
  <!-- Trigger -->
  <path d="M 80 102 Q 74 110 80 118" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" />
  <!-- M18 Battery Pack Base -->
  <rect x="70" y="145" width="55" height="25" rx="5" fill="#18181b" stroke="#dc2626" stroke-width="1.5" />
  <circle cx="112" cy="157" r="3" fill="#22c55e" />
</svg>
`);

// 11. Ultrasonic Thickness Gauge
export const SVG_ULTRASONIC = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Body -->
  <rect x="65" y="35" width="70" height="130" rx="14" fill="#334155" stroke="#0f172a" stroke-width="2" />
  <!-- Screen -->
  <rect x="74" y="48" width="52" height="38" rx="3" fill="#0f172a" stroke="#64748b" stroke-width="1" />
  <text x="100" y="68" font-family="monospace" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">12.45</text>
  <text x="100" y="78" font-family="monospace" font-size="6" fill="#94a3b8" text-anchor="middle">mm STEEL</text>
  <!-- Keypad -->
  <circle cx="82" cy="105" r="5" fill="#0284c7" />
  <circle cx="100" cy="105" r="5" fill="#64748b" />
  <circle cx="118" cy="105" r="5" fill="#059669" />
  <rect x="85" y="125" width="30" height="18" rx="4" fill="#1e293b" />
  <!-- Transducer Cable on top -->
  <path d="M 100 35 L 100 20 Q 115 10 130 25 L 130 50" fill="none" stroke="#0f172a" stroke-width="2.5" />
  <rect x="125" y="50" width="10" height="15" rx="2" fill="#94a3b8" stroke="#334155" stroke-width="1" />
</svg>
`);

// 12. Master Color-Coded Hex Key Metric Set
export const SVG_HEX_KEYS = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Black Sleeve Caddy -->
  <rect x="60" y="70" width="80" height="55" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="2" />
  <!-- 9 Rainbow L-Keys nested side-by-side -->
  <!-- 10mm Navy -->
  <path d="M 70 30 L 70 160 L 52 160" fill="none" stroke="#1e3a8a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 8mm Cyan -->
  <path d="M 78 40 L 78 150 L 62 150" fill="none" stroke="#06b6d4" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 6mm Green -->
  <path d="M 85 50 L 85 140 L 72 140" fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 5mm Yellow -->
  <path d="M 92 60 L 92 132 L 80 132" fill="none" stroke="#eab308" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 4mm Orange -->
  <path d="M 98 68 L 98 125 L 88 125" fill="none" stroke="#f97316" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 3mm Red -->
  <path d="M 104 76 L 104 118 L 96 118" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  <!-- 2.5mm Purple -->
  <path d="M 110 84 L 110 112 L 104 112" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`);

// 13. Industrial Magnetic Drill Press 1200W
export const SVG_MAG_DRILL = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Magnetic Base Bottom -->
  <rect x="55" y="145" width="90" height="25" rx="3" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
  <rect x="75" y="152" width="20" height="10" rx="1" fill="#dc2626" />
  <!-- Vertical Column Guideway -->
  <rect x="75" y="45" width="22" height="100" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
  <!-- Motor Unit Body (Orange/Grey) -->
  <rect x="97" y="55" width="45" height="55" rx="6" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
  <!-- Feed Spindle / Star Handles -->
  <circle cx="68" cy="95" r="8" fill="#1e293b" />
  <line x1="68" y1="80" x2="68" y2="110" stroke="#334155" stroke-width="3" stroke-linecap="round" />
  <line x1="53" y1="95" x2="83" y2="95" stroke="#334155" stroke-width="3" stroke-linecap="round" />
  <!-- Drill Arbor & Annular Cutter -->
  <rect x="112" y="110" width="14" height="22" fill="#334155" />
  <polygon points="112,132 126,132 122,145 116,145" fill="#cbd5e1" stroke="#475569" stroke-width="1" />
</svg>
`);

// 14. Hydraulic Bearing Puller 10-Ton
export const SVG_BEARING_PULLER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Central Hydraulic Ram Cylinder -->
  <rect x="88" y="30" width="24" height="85" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
  <!-- Hydraulic Forcing Screw -->
  <rect x="96" y="115" width="8" height="40" fill="#94a3b8" stroke="#475569" stroke-width="1" />
  <!-- 3 Puller Arms / Jaws -->
  <path d="M 88 75 L 45 110 L 50 160 L 60 160 L 55 120 L 92 85 Z" fill="#334155" stroke="#0f172a" stroke-width="1.5" />
  <path d="M 112 75 L 155 110 L 150 160 L 140 160 L 145 120 L 108 85 Z" fill="#334155" stroke="#0f172a" stroke-width="1.5" />
  <!-- Top Hydraulic Pump Coupling -->
  <circle cx="100" cy="25" r="5" fill="#ef4444" />
</svg>
`);

// 15. Cordless Angle Grinder 125mm
export const SVG_ANGLE_GRINDER = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Long Motor Body -->
  <rect x="75" y="85" width="90" height="30" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="1.5" />
  <!-- Battery on rear right -->
  <rect x="155" y="82" width="25" height="36" rx="4" fill="#dc2626" />
  <!-- Aluminum Gear Head left -->
  <polygon points="50,75 75,85 75,115 50,125" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
  <!-- Wheel Guard -->
  <path d="M 50 60 A 40 40 0 0 0 50 140 Z" fill="#0f172a" />
  <!-- Grinding Disc -->
  <ellipse cx="50" cy="100" rx="6" ry="36" fill="#cbd5e1" stroke="#f59e0b" stroke-width="2" />
  <!-- Auxiliary Handle -->
  <rect x="60" y="48" width="12" height="30" rx="3" fill="#18181b" stroke="#334155" stroke-width="1" />
</svg>
`);

// 16. Pneumatic Digital Pressure Calibrator
export const SVG_PRESSURE_CALIBRATOR = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Rugged Handheld Body -->
  <rect x="60" y="40" width="80" height="120" rx="16" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
  <rect x="68" y="48" width="64" height="104" rx="10" fill="#0f172a" />
  <!-- Large Digital LCD -->
  <rect x="74" y="58" width="52" height="32" rx="4" fill="#1e293b" stroke="#0284c7" stroke-width="1" />
  <text x="100" y="76" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">10.000</text>
  <text x="100" y="84" font-family="monospace" font-size="5" fill="#94a3b8" text-anchor="middle">BAR GAUGE</text>
  <!-- Buttons -->
  <circle cx="85" cy="105" r="5" fill="#38bdf8" />
  <circle cx="100" cy="105" r="5" fill="#facc15" />
  <circle cx="115" cy="105" r="5" fill="#22c55e" />
  <!-- Hand Pump Lever below -->
  <rect x="85" y="160" width="30" height="15" rx="3" fill="#64748b" stroke="#334155" stroke-width="1" />
</svg>
`);

export const TOOL_SVG_MAP: Record<string, string> = {
  'T-13': SVG_MULTIMETER,
  'T-14': SVG_PYROMETER,
  'T-15': SVG_TACHOMETER,
  'T-16': SVG_RIVETER,
  'T-09': SVG_MICROMETER,
  'T-10': SVG_BORE_GAUGE,
  'T-11': SVG_TORQUE_SCREWDRIVER,
  'T-12': SVG_CALIPER,
  'T-05': SVG_TORQUE_WRENCH,
  'T-06': SVG_IMPACT_WRENCH,
  'T-07': SVG_ULTRASONIC,
  'T-08': SVG_HEX_KEYS,
  'T-01': SVG_MAG_DRILL,
  'T-02': SVG_BEARING_PULLER,
  'T-03': SVG_ANGLE_GRINDER,
  'T-04': SVG_PRESSURE_CALIBRATOR,
};
