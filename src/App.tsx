import React, { useState, useEffect, useRef } from 'react';

export function App() {
  const [loading, setLoading] = useState(true);
  const [pg, setPg] = useState('dash');
  const [sel, setSel] = useState(0);
  const [clock, setClock] = useState('08:12');
  const [tok, setTok] = useState(7);
  const [left, setLeft] = useState(10);
  const [busy, setBusy] = useState(false);
  
  // Default to IT Support (Your Blue Monochrome), but colleagues will get Sky-Blue Apple Monochromes when switched!
  const [userRole, setUserRole] = useState('IT Support');

  // Preloader animation states
  const [dimOpacity, setDimOpacity] = useState(0);
  const [litOpacity, setLitOpacity] = useState(0);
  const [dotOpacity, setDotOpacity] = useState(0);
  const [dotRingOpacity, setDotRingOpacity] = useState(0);
  const [dotScale, setDotScale] = useState(1);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [progressHidden, setProgressHidden] = useState(false);
  const [logoScale, setLogoScale] = useState(1);
  const [isLifted, setIsLifted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fxRings, setFxRings] = useState<Array<{ id: number, type: string }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number, x: number, y: number }>>([]);
  const fxKeyRef = useRef(0);

  // State Registries
  const [colleagues, setColleagues] = useState([
    { n: "Aline Uwase", p: "Receptionist", ti: "Miss", s: 0, t: "", rev: 0, devName: "Tecno Spark", battery: "94%", license: "Visitor Pass & Gate Hub" },
    { n: "Jean Claude Habimana", p: "Front Desk", ti: "Mr", s: 0, t: "", rev: 0, devName: "iPhone 13", battery: "81%", license: "Client Check-in Suite" },
    { n: "Diane Mukamana", p: "HR Manager", ti: "Miss", s: 0, t: "", rev: 0, devName: "Galaxy A14", battery: "67%", license: "HR Enterprise Portal" },
    { n: "Eric Nsengiyumva", p: "Operational Manager", ti: "Mr", s: 0, t: "", rev: 0, devName: "iPhone 11", battery: "89%", license: "Operations & Rollout Suite" },
    { n: "Grace Ingabire", p: "Customer Care", ti: "Miss", s: 0, t: "", rev: 0, devName: "Redmi 12", battery: "75%", license: "Support Portal Pro" },
    { n: "Patrick Niyonzima", p: "Interview Manager", ti: "Mr", s: 0, t: "", rev: 0, devName: "Pixel 6", battery: "92%", license: "Recruit Pro Engine" },
    { n: "Samuel Mugisha", p: "IT Support", ti: "Mr", s: 0, t: "", rev: 0, devName: "iPhone 14 Pro", battery: "99%", license: "Root Admin / Go / Node" }
  ]);

  const [audit, setAudit] = useState<Array<{t: string, m: string, type?: string}>>([
    { t: '08:10', m: 'Auto-sync active across all colleague nodes', type: 'system' },
    { t: '08:13', m: 'Database background backup secured', type: 'system' },
    { t: '08:14', m: 'New device biometric token generated', type: 'security' },
    { t: '08:15', m: 'Sky-blue monochrome theme profile applied', type: 'theme' }
  ]);
  const [pend, setPend] = useState<string[]>(['Claudine Uwera · Receptionist', 'Olivier Habimana · Front Desk']);
  const [codes, setCodes] = useState<string[]>([]);
  const [posL] = useState<string[]>(['Admin', 'Manager', 'Receptionist', 'Front Desk', 'Customer Care', 'IT Support']);
  
  const [tix, setTix] = useState([
    { id: 1, t: "Biometric QR scanner timeout on gate terminal", by: "Aline Uwase", p: "Receptionist", s: "open", priority: "High" },
    { id: 2, t: "Provision secure token for new iPhone 14 Pro", by: "Eric Nsengiyumva", p: "Operational Manager", s: "open", priority: "Urgent" },
    { id: 3, t: "Audit Q3 department access logs", by: "Diane Mukamana", p: "HR Manager", s: "done", priority: "Normal" }
  ]);

  const [mods, setMods] = useState<Record<string, string[]>>({
    "Admin": ["dash", "att", "usr", "dev", "pos", "rel", "tix", "hl", "aud", "set", "term", "lic"],
    "Manager": ["dash", "att", "usr", "dev", "rel", "tix", "hl", "aud", "lic"],
    "Receptionist": ["dash", "att", "tix"],
    "Front Desk": ["dash", "att", "tix"],
    "Customer Care": ["dash", "att", "tix"],
    "IT Support": ["dash", "att", "usr", "dev", "pos", "rel", "tix", "hl", "aud", "set", "term", "lic"]
  });

  const [cfg, setCfg] = useState({ start: "08:30", grace: 5 });
  const [relState, setRelState] = useState(-1);
  const [bkTime, setBkTime] = useState<string | null>(null);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  // Dynamic Theme Styling Generator based on Role
  const isUserIT = userRole === 'IT Support' || userRole === 'Admin';
  // Theme Accents: Your IT uses deep royal blue/indigo; Colleagues use stunning Apple-style Sky-Blue Monochrome (#0EA5E9)
  const themeGlowBg = isUserIT 
    ? "absolute top-[-15%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-blue-600/15 blur-[160px] pointer-events-none animate-pulse"
    : "absolute top-[-15%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-sky-400/15 blur-[160px] pointer-events-none animate-pulse";
  
  const themeGlowBg2 = isUserIT 
    ? "absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-indigo-600/15 blur-[160px] pointer-events-none"
    : "absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none";

  const activeNavHighlight = isUserIT
    ? 'bg-gradient-to-r from-blue-600/35 via-blue-600/15 to-transparent text-white font-semibold shadow-[0_4px_20px_rgba(59,130,246,0.25)] border-l-2 border-blue-400 backdrop-blur-md'
    : 'bg-gradient-to-r from-sky-500/30 via-sky-500/10 to-transparent text-white font-semibold shadow-[0_4px_20px_rgba(14,165,233,0.25)] border-l-2 border-sky-400 backdrop-blur-md';

  const brandBadgeGradient = isUserIT
    ? 'bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
    : 'bg-gradient-to-tr from-sky-400 to-cyan-500 shadow-[0_0_25px_rgba(14,165,233,0.6)]';

  // Creative Bento-Structured Navigation Sections
  const navSections = [
    {
      title: "Core Command",
      items: [
        ["dash", "Dashboard", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>],
        ["att", "Attendance Hub", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>],
      ]
    },
    {
      title: "Registry & Assets",
      items: [
        ["usr", "Users & Invites", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>],
        ["dev", "Device Binding", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>],
        ["pos", "Positions", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>],
        ["lic", "Licenses", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>],
      ]
    },
    {
      title: "Execution & Ops",
      items: [
        ["tix", "Support Tickets", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>],
        ["rel", "Live Releases", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>],
        ["term", "Terminal & SSH", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>],
      ]
    },
    {
      title: "System Governance",
      items: [
        ["hl", "System Health", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>],
        ["aud", "Audit Trail", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>],
        ["set", "Settings & Broadcast", <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>]
      ]
    }
  ];

  // Exact QR Generator from source HTML
  const generateQrRects = (seed: number) => {
    let r = seed;
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const rects = [];
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 25; x++) {
        const finder = (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16);
        let on = false;
        if (finder) {
          const a = x > 16 ? x - 17 : x;
          const b = y > 16 ? y - 17 : y;
          on = a < 7 && b < 7 && (a === 0 || a === 6 || b === 0 || b === 6 || (a > 1 && a < 5 && b > 1 && b < 5));
        } else {
          on = rnd() > 0.52;
        }
        if (on) {
          rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.03" height="1.03" />);
        }
      }
    }
    return rects;
  };

  // Preloader Animation Timeline Runner
  useEffect(() => {
    if (!loading) return;
    const DURATION = 4800;
    const startTime = performance.now();
    let animId: number;

    const smootherstep = (t: number) => {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return t * t * t * (t * (t * 6 - 15) + 10);
    };

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      if (elapsed <= 600) {
        const p = elapsed / 600;
        const easeP = smootherstep(p);
        setDimOpacity(easeP * 0.35);
        setLitOpacity(easeP);
        setDotOpacity(easeP);
        setDotRingOpacity(easeP * 0.6);
      } else {
        setDimOpacity(0.35);
        setLitOpacity(1);
        setDotOpacity(1);
      }

      const pulseCycle = (elapsed % 1600) / 1600;
      setDotScale(1 + 0.12 * Math.sin(pulseCycle * Math.PI * 2));
      setDotRingOpacity(0.4 + 0.3 * Math.sin(pulseCycle * Math.PI * 2));

      if (elapsed >= 500 && elapsed <= 3700) {
        const sweepP = smootherstep((elapsed - 500) / 3200);
        setSweepAngle(sweepP * 360);
        setProgressWidth(sweepP * 100);
      } else if (elapsed > 3700) {
        setSweepAngle(360);
        setProgressWidth(100);
      } else {
        setSweepAngle(0);
        setProgressWidth(0);
      }

      if (elapsed >= 3700 && !window._fxTriggered) {
        window._fxTriggered = true;
        setLogoScale(1.05);
        setTimeout(() => setLogoScale(1.0), 200);
        setFxRings([
          { id: fxKeyRef.current++, type: 'white' },
          { id: fxKeyRef.current++, type: 'gold' }
        ]);
        const newSpks = [];
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const dist = 50 + Math.random() * 45;
          newSpks.push({ id: fxKeyRef.current++, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
        }
        setSparkles(newSpks);
        setProgressHidden(true);
      }

      if (elapsed >= 4100 && !window._textTriggered) {
        window._textTriggered = true;
        setIsLifted(true);
        setShowText(true);
      }

      if (progress < 1) {
        animId = requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setLoading(false);
          window._fxTriggered = false;
          window._textTriggered = false;
        }, 400);
      }
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [loading]);

  const cutTime = () => {
    const [h, m] = cfg.start.split(":").map(Number);
    const t = h * 60 + m + Number(cfg.grace);
    return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
  };

  const isLate = () => clock > cutTime();
  const logAction = (m: string, type = 'action') => setAudit(prev => [{ t: clock, m, type }, ...prev]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      if (busy) return;
      setLeft(prev => {
        if (prev <= 1) {
          setTok(t => t + 1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [busy, loading]);

  const handleScan = () => {
    if (busy) return;
    const p = colleagues[sel];
    if (p.rev) return alert("Security Notice: Device binding revoked.");
    if (p.s) return alert("Attendance Guard: Already checked in.");

    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      const status = isLate() ? "late" : "ok";
      const updatedColleagues = [...colleagues];
      updatedColleagues[sel] = { ...p, s: status as any, t: clock };
      setColleagues(updatedColleagues);
      logAction(`QR scanned: ${p.n} [${status.toUpperCase()}]`, 'success');
      setTok(t => t + 1);
      setLeft(10);
    }, 1000);
  };

  const getWedgePath = (cx: number, cy: number, angleDeg: number, radius: number) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    const x = cx + radius * Math.cos(rad);
    const y = cy + radius * Math.sin(rad);
    const largeArc = angleDeg > 180 ? 1 : 0;
    if (angleDeg <= 0) return `M ${cx},${cy} L ${cx},${cy} Z`;
    if (angleDeg >= 360) return `M ${cx-radius},${cy} A ${radius},${radius} 0 1,0 ${cx+radius},${cy} A ${radius},${radius} 0 1,0 ${cx-radius},${cy} Z`;
    return `M ${cx},${cy} L ${cx},${cy - radius} A ${radius},${radius} 0 ${largeArc},1 ${x},${y} Z`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0B0F17] z-50 flex items-center justify-center select-none overflow-hidden font-['Inter',system-ui,sans-serif]">
        <div className="flex flex-col items-center justify-center w-full max-w-[400px] p-5">
          <div 
            className="relative w-[40vmin] h-[40vmin] max-w-[220px] max-h-[220px] transition-transform duration-800 cubic-bezier(0.16,1,0.3,1)"
            style={{ transform: `translateY(${isLifted ? -18 : 0}px) scale(${logoScale})` }}
          >
            <svg viewBox="20 36 205 215" className="w-full h-full overflow-visible">
              <defs>
                <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE27A" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#FAD201" stopOpacity="0"/>
                </radialGradient>
                <clipPath id="sweepClip">
                  <path d={getWedgePath(123, 143, sweepAngle, 300)} />
                </clipPath>
              </defs>

              <path 
                d="M125.0 43.8 L123.2 45.0 L123.2 84.5 L124.5 85.5 L131.2 85.8 L140.5 88.5 L146.0 91.8 L151.2 96.5 L155.2 102.0 L158.2 108.2 L160.2 116.0 L160.5 122.8 L159.2 123.5 L33.8 123.5 L32.5 125.2 L31.2 136.8 L31.5 154.5 L35.5 176.2 L41.2 191.2 L51.5 207.8 L64.0 220.8 L79.5 231.2 L89.2 235.8 L98.2 238.8 L120.5 242.8 L141.2 242.5 L162.2 238.8 L174.5 234.5 L183.2 230.2 L199.0 219.0 L208.8 209.2 L208.8 208.0 L172.5 178.2 L171.0 178.5 L164.2 185.5 L158.8 189.5 L152.0 193.0 L144.8 195.5 L136.8 197.0 L126.8 197.2 L116.5 196.0 L109.8 194.0 L101.2 189.5 L93.8 182.0 L88.8 172.5 L86.5 159.5 L88.2 158.2 L214.0 158.2 L215.0 157.0 L214.8 130.8 L211.8 111.0 L206.0 93.5 L201.2 84.0 L196.5 76.8 L184.8 63.8 L171.8 54.5 L158.2 48.5 L140.8 44.5 Z" 
                fill="#1E293B" 
                opacity={dimOpacity} 
              />

              <circle cx="51.5" cy="64.5" r="32" fill="url(#dotGlow)" opacity={dotRingOpacity} />
              <circle 
                cx="51.5" 
                cy="64.5" 
                r="20.5" 
                fill="#FFFFFF" 
                opacity={dotOpacity} 
                transform={`translate(51.5, 64.5) scale(${dotScale}) translate(-51.5, -64.5)`}
              />

              <g clipPath="url(#sweepClip)">
                <path 
                  d="M125.0 43.8 L123.2 45.0 L123.2 84.5 L124.5 85.5 L131.2 85.8 L140.5 88.5 L146.0 91.8 L151.2 96.5 L155.2 102.0 L158.2 108.2 L160.2 116.0 L160.5 122.8 L159.2 123.5 L33.8 123.5 L32.5 125.2 L31.2 136.8 L31.5 154.5 L35.5 176.2 L41.2 191.2 L51.5 207.8 L64.0 220.8 L79.5 231.2 L89.2 235.8 L98.2 238.8 L120.5 242.8 L141.2 242.5 L162.2 238.8 L174.5 234.5 L183.2 230.2 L199.0 219.0 L208.8 209.2 L208.8 208.0 L172.5 178.2 L171.0 178.5 L164.2 185.5 L158.8 189.5 L152.0 193.0 L144.8 195.5 L136.8 197.0 L126.8 197.2 L116.5 196.0 L109.8 194.0 L101.2 189.5 L93.8 182.0 L88.8 172.5 L86.5 159.5 L88.2 158.2 L214.0 158.2 L215.0 157.0 L214.8 130.8 L211.8 111.0 L206.0 93.5 L201.2 84.0 L196.5 76.8 L184.8 63.8 L171.8 54.5 L158.2 48.5 L140.8 44.5 Z" 
                  fill="#FFFFFF" 
                  opacity={litOpacity} 
                />
              </g>

              {fxRings.map(r => (
                <circle
                  key={r.id}
                  cx="123"
                  cy="143"
                  r={r.type === 'white' ? '130' : '160'}
                  fill="none"
                  stroke={r.type === 'white' ? '#FFFFFF' : '#FAD201'}
                  strokeWidth={r.type === 'white' ? '2' : '1.5'}
                  opacity="0"
                  style={{ transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)', transformOrigin: '123px 143px', transform: 'scale(0.3)' }}
                  ref={el => {
                    if (el) setTimeout(() => {
                      el.style.transform = 'scale(1)';
                      el.style.opacity = '0';
                    }, 20);
                  }}
                />
              ))}

              {sparkles.map(s => (
                <circle
                  key={s.id}
                  cx="123"
                  cy="143"
                  r="2.5"
                  fill="#FAD201"
                  style={{ transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transform: `translate(${s.x}px, ${s.y}px) scale(0.2)`, opacity: 0 }}
                  ref={el => {
                    if (el) setTimeout(() => {
                      el.style.transform = `translate(${s.x * 1.4}px, ${s.y * 1.4}px) scale(1)`;
                      el.style.opacity = '1';
                      setTimeout(() => { el.style.opacity = '0'; }, 300);
                    }, 20);
                  }}
                />
              ))}
            </svg>

            <div 
              className="absolute bottom-[-36px] left-1/2 whitespace-nowrap text-[19px] tracking-[0.05em] transition-all duration-800 cubic-bezier(0.16,1,0.3,1)"
              style={{
                opacity: showText ? 1 : 0,
                transform: `translateX(-50%) translateY(${showText ? 0 : 8}px)`
              }}
            >
              <span className="font-bold text-white">Elite</span>
              <span className="font-light text-white">jobs</span>
              <span className="font-bold text-[#FAD201]">Rwanda</span>
            </div>
          </div>

          <div 
            className="w-[120px] h-[3px] bg-slate-800 rounded-full mt-6 overflow-hidden transition-opacity duration-400"
            style={{ opacity: progressHidden ? 0 : 1 }}
          >
            <div className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  const checkedCount = colleagues.filter(p => p.s).length;
  const checkedPercent = Math.round((checkedCount / colleagues.length) * 100);

  return (
    <div className="h-screen w-screen bg-[#04060A] text-[#F1F5F9] font-['Inter',system-ui,sans-serif] flex flex-col select-none overflow-hidden relative">
      
      {/* Archimedes Dynamic Ambient Glow & Refraction Orbs (Auto-toggled between IT Blue & Colleague Sky-Blue Monochrome) */}
      <div className={themeGlowBg}></div>
      <div className={themeGlowBg2}></div>

      {/* Active Broadcast Banner Notice */}
      {activeNotice && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shrink-0 z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
            <span>BROADCAST NOTICE: {activeNotice}</span>
          </div>
          <button onClick={() => setActiveNotice(null)} className="underline text-[11px] hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Top Navbar: Stunned 300% Archimedes iOS Drop */}
      <header 
        className="flex items-center justify-between px-6 py-3.5 bg-[#080C14]/85 backdrop-blur-3xl border-b border-slate-800/90 shrink-0 z-40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        style={{ animation: 'iosDrop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.04s both' }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-sm ${brandBadgeGradient}`}>
            e
          </div>
          <span className="font-semibold text-sm text-slate-200 tracking-tight">
            EliteJobs Workspace <span className="text-slate-500 font-normal">/ {userRole} Engine</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-slate-400 font-medium">
            Server Time: <span className="text-slate-200 font-mono font-bold">{clock}</span> {isLate() ? '· (Late)' : ''}
          </div>
          
          <button 
            onClick={() => setLoading(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all flex items-center gap-1.5 shadow-sm hover:border-sky-500/50"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Relaunch App
          </button>

          <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Win EXE Active
          </span>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex flex-1 h-[calc(100vh-57px)] overflow-hidden relative z-10">
        
        {/* Sidebar: Stunned 300% iOS Drop */}
        <nav 
          className="w-64 bg-[#060912]/90 backdrop-blur-2xl border-r border-slate-800/90 p-4 flex flex-col gap-6 shrink-0 select-none overflow-y-auto no-scrollbar shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
          style={{ animation: 'iosDrop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' }}
        >
          
          <div className="space-y-6 flex-1">
            {navSections.map((sec, secIdx) => {
              const visibleItems = sec.items.filter(n => (mods[userRole] || []).includes(n[0]));
              if (visibleItems.length === 0) return null;
              return (
                <div key={secIdx} className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2 flex items-center gap-2">
                    <span>{sec.title}</span>
                    <div className="flex-1 h-[1px] bg-slate-800/50"></div>
                  </div>
                  {visibleItems.map(n => {
                    const active = pg === n[0];
                    return (
                      <button
                        key={n[0]}
                        onClick={() => setPg(n[0])}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                          active
                            ? activeNavHighlight
                            : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-base transition-transform duration-200 group-hover:scale-110 ${active ? (isUserIT ? 'text-blue-400' : 'text-sky-400') : 'text-slate-400 group-hover:text-slate-200'}`}>
                            {n[2]}
                          </span>
                          <span className="tracking-tight">{n[1]}</span>
                        </div>
                        {n[0] === 'tix' && tix.filter(t => t.s === 'open').length > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 shadow-sm">
                            {tix.filter(t => t.s === 'open').length}
                          </span>
                        )}
                        {n[0] === 'usr' && pend.length > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/20 shadow-sm">
                            {pend.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Role Profile Selector: Instantly switches themes & privileges for colleagues */}
          <div className="pt-4 border-t border-slate-800/90 px-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Active Role Profile</div>
            <div className="relative">
              <select
                value={userRole}
                onChange={e => {
                  setUserRole(e.target.value);
                  const firstAvail = (mods[e.target.value] || [])[0] || 'dash';
                  setPg(firstAvail);
                  logAction(`Switched role profile: ${e.target.value}`, 'info');
                }}
                className={`w-full bg-[#04060A] border border-slate-700/80 text-xs font-bold p-2.5 rounded-xl outline-none cursor-pointer transition-all shadow-inner ${isUserIT ? 'text-blue-400' : 'text-sky-400'}`}
              >
                {posL.map(pos => <option key={pos} value={pos} className="bg-[#0B0F17] text-white">{pos}</option>)}
              </select>
            </div>
          </div>
        </nav>

        {/* Scrollable Content Pane: Stunned 300% Synchronized Drop */}
        <main 
          className="flex-1 p-8 bg-transparent overflow-auto no-scrollbar" 
          key={pg}
          style={{ animation: 'iosDrop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.16s both' }}
        >
          <div className="max-w-6xl mx-auto pb-16">
            
            {/* 1. DASHBOARD */}
            {pg === 'dash' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Dashboard</h1>
                <p className="text-xs text-slate-400 mb-6">Welcome back, {userRole} · Live enterprise overview.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-6 rounded-2xl md:col-span-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-medium mb-1">Checked In Staff Today</div>
                        <div className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                          {checkedCount} <span className="text-lg font-normal text-slate-500">/ {colleagues.length}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{checkedPercent}% active response rate</span>
                        </div>
                      </div>
                      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className={`transition-all duration-1000 ease-out ${isUserIT ? 'text-blue-500' : 'text-sky-400'}`} strokeDasharray={`${checkedPercent}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className={`absolute font-bold text-xs ${isUserIT ? 'text-blue-400' : 'text-sky-400'}`}>{checkedPercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-slate-400 font-medium">Late Arrivals</div>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                    </div>
                    <div className="text-4xl font-extrabold text-amber-400 mb-2 tracking-tight">{colleagues.filter(p => p.s === "late").length}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Grace period window active</div>
                  </div>

                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="text-xs text-slate-400 font-medium mb-1">Open Tickets</div>
                    <div className="text-4xl font-extrabold text-rose-400 mb-2 tracking-tight">{tix.filter(t => t.s === "open").length}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Requires immediate triage</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-xl">
                    <div className="text-xs text-slate-400 font-medium mb-1">Devices Online</div>
                    <div className="text-2xl font-bold text-white">{colleagues.filter(p => !p.rev).length} <span className="text-xs text-slate-500 font-normal">Active nodes</span></div>
                  </div>
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-xl">
                    <div className="text-xs text-slate-400 font-medium mb-1">Pending Approvals</div>
                    <div className={`text-2xl font-bold ${isUserIT ? 'text-blue-400' : 'text-sky-400'}`}>{pend.length} <span className="text-xs text-slate-500 font-normal">Requests</span></div>
                  </div>
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-xl">
                    <div className="text-xs text-slate-400 font-medium mb-1">System Errors</div>
                    <div className="text-2xl font-bold text-emerald-400">0 <span className="text-xs text-slate-500 font-normal">Stable</span></div>
                  </div>
                </div>

                {/* Dashboard: Latest System Activity cascading iOS Notification Drop */}
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <h3 className="text-sm font-bold text-white mb-4">Latest System Activity</h3>
                  <div className="space-y-2.5 font-mono text-xs">
                    {audit.map((a, idx) => (
                      <div 
                        key={idx} 
                        className="flex gap-4 p-3.5 rounded-xl bg-[#04060A]/85 border border-slate-800/70 shadow-inner"
                        style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${idx * 0.08}s both` }}
                      >
                        <span className={`${isUserIT ? 'text-blue-400' : 'text-sky-400'} font-bold`}>{a.t}</span>
                        <span className="text-slate-300">{a.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. ATTENDANCE */}
            {pg === 'att' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Attendance</h1>
                <p className="text-xs text-slate-400 mb-6">Colleague attendance & QR code validation.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Attendance Hub: Colleague Registry cascading iOS Notification Drop */}
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-bold text-white mb-4">Colleague Registry</h3>
                    <div className="space-y-2.5 max-h-[460px] overflow-y-auto no-scrollbar pr-1">
                      {colleagues.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => { setSel(i); setTok(t => t + 1); setLeft(10); }}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                            sel === i ? 'bg-slate-800/90 border-sky-400 shadow-lg' : 'bg-[#04060A]/85 border-slate-800/70 hover:border-slate-700'
                          }`}
                          style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s both` }}
                        >
                          <div>
                            <div className="font-semibold text-slate-200 text-sm">{p.n}</div>
                            <div className="text-[11px] text-slate-400">{p.p}</div>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold ${
                            p.s === 'late' ? 'bg-amber-500/10 text-amber-400' : p.s === 'ok' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {p.s ? (p.s === 'late' ? `Late ${p.t}` : `On time ${p.t}`) : 'Not yet'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-8 flex flex-col items-center justify-center text-center lg:col-span-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-xl font-bold text-white mb-1">{colleagues[sel].n}</h3>
                    <p className="text-xs text-slate-400 mb-6">{colleagues[sel].p} · bound device only</p>
                    
                    <div className={`relative w-[230px] my-2 p-3.5 bg-white text-[#0B2A5B] rounded-2xl border-2 border-amber-400 shadow-[0_20px_40px_rgba(250,210,1,0.25)] transition-transform duration-300 hover:scale-105 ${busy ? 'filter blur-[3px]' : ''}`}>
                      <svg viewBox="0 0 25 25" fill="currentColor" className="w-full h-full" aria-label="QR code">
                        {generateQrRects(tok * 977 + sel * 31)}
                      </svg>
                      {colleagues[sel].s ? (
                        <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-[2px] rounded-xl">
                          <i className="w-16 h-16 rounded-full bg-emerald-600 text-white text-3xl font-bold flex items-center justify-center not-italic animate-[pop_0.35s_cubic-bezier(0.3,1.6,0.5,1)]">
                            ✓
                          </i>
                        </div>
                      ) : null}
                    </div>

                    <div className="w-[230px] h-1.5 bg-slate-800 rounded-full overflow-hidden my-3">
                      <div className="h-full bg-amber-400 transition-all duration-1000 ease-linear shadow-[0_0_12px_rgba(250,210,1,0.8)]" style={{ width: `${left * 10}%` }}></div>
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-6 font-mono">{left}s until this code renews. One scan, then it dies.</p>

                    <button
                      onClick={handleScan}
                      className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-all shadow-xl hover:shadow-amber-500/30"
                    >
                      Simulate Colleague Scan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. USERS AND INVITES */}
            {pg === 'usr' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Users and Invites</h1>
                <p className="text-xs text-slate-400 mb-6">Manage user onboarding and department role assignments.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-bold text-white mb-4">Create Invite Code</h3>
                    <div className="space-y-4">
                      <input id="innInput" placeholder="Colleague name" className="w-full px-3.5 py-2.5 rounded-xl bg-[#04060A]/85 border border-slate-700/80 text-white text-xs outline-none focus:border-sky-400 transition-all shadow-inner" />
                      <select id="inpSelect" className="w-full px-3.5 py-2.5 rounded-xl bg-[#04060A]/85 border border-slate-700/80 text-white text-xs outline-none focus:border-sky-400 transition-all shadow-inner">
                        {posL.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <button
                        onClick={() => {
                          const nameEl = document.getElementById('innInput') as HTMLInputElement;
                          const posEl = document.getElementById('inpSelect') as HTMLSelectElement;
                          const name = nameEl?.value.trim() || "New colleague";
                          const position = posEl?.value || "IT Support";
                          const code = `EJ-${position.split(' ').map(w => w[0]).join('').toUpperCase()}-${1000 + Math.floor(Math.random() * 9000)}`;
                          setCodes(prev => [code + ` · ${name} · ${position}`, ...prev]);
                          logAction(`Invite created for ${name} (${position})`, 'success');
                          if (nameEl) nameEl.value = "";
                        }}
                        className={`w-full py-3 rounded-xl text-white font-bold text-xs transition-all shadow-xl ${isUserIT ? 'bg-blue-600 hover:bg-blue-500' : 'bg-sky-500 hover:bg-sky-400'}`}
                      >
                        Create Code
                      </button>
                    </div>
                    <div className="mt-4 space-y-2">
                      {codes.map((c, i) => (
                        <div key={i} className={`px-3.5 py-2.5 rounded-xl bg-[#04060A]/85 border border-slate-800 text-xs font-mono ${isUserIT ? 'text-blue-400' : 'text-sky-400'} shadow-inner`}>{c}</div>
                      ))}
                    </div>
                  </div>

                  {/* Users & Invites: Pending Approvals cascading iOS Notification Drop */}
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-bold text-white mb-4">Pending Approvals</h3>
                    <div className="space-y-3">
                      {pend.length === 0 ? <p className="text-xs text-slate-500">All caught up.</p> : pend.map((p, i) => (
                        <div 
                          key={i} 
                          className="flex items-center justify-between p-3.5 rounded-xl bg-[#04060A]/85 border border-slate-800/80"
                          style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both` }}
                        >
                          <span className="text-xs font-semibold text-slate-200">{p}</span>
                          <button
                            onClick={() => {
                              logAction(`Approved ${pend[i]}`, 'success');
                              setPend(prev => prev.filter((_, idx) => idx !== i));
                            }}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                          >
                            Approve
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DEVICES */}
            {pg === 'dev' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Devices and Sessions</h1>
                <p className="text-xs text-slate-400 mb-6">One account, one device. Revoke a lost phone in one tap.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  {colleagues.map((p, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl bg-[#04060A]/85 border border-slate-800/80 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                      style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s both` }}
                    >
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">{p.n}</div>
                        <div className="text-xs text-slate-400">{p.p} · {p.devName} (Battery: {p.battery})</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold ${p.rev ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {p.rev ? 'Revoked' : 'Online'}
                        </span>
                        <button
                          onClick={() => {
                            const updated = [...colleagues];
                            updated[i].rev = updated[i].rev ? 0 : 1;
                            setColleagues(updated);
                            logAction((updated[i].rev ? 'Session revoked: ' : 'Session restored: ') + p.n, updated[i].rev ? 'warn' : 'success');
                          }}
                          className="px-3.5 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-sm"
                        >
                          {p.rev ? 'Restore' : 'Revoke'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. POSITIONS & MODULES */}
            {pg === 'pos' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Positions and Modules</h1>
                <p className="text-xs text-slate-400 mb-6">Choose what each position sees. Changes go live instantly.</p>
                
                <div className="space-y-4">
                  {posL.map((pos, i) => (
                    <div 
                      key={pos} 
                      className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                      style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both` }}
                    >
                      <b className="text-white text-sm block mb-3">{pos}</b>
                      <div className="flex flex-wrap gap-2">
                        {["Attendance", "Recruitment", "Tasks", "Chat", "Invoices", "Reports", "Visitors"].map(mod => {
                          const active = (mods[pos] || []).includes(mod);
                          return (
                            <button
                              key={mod}
                              onClick={() => {
                                const cur = mods[pos] || [];
                                const next = active ? cur.filter(m => m !== mod) : [...cur, mod];
                                setMods({ ...mods, [pos]: next });
                                logAction(`${pos}: ${mod} ${active ? 'off' : 'on'}`, 'success');
                              }}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                active ? 'bg-sky-500/15 text-sky-400 border-sky-500/30 shadow-md' : 'bg-[#04060A]/85 text-slate-400 border-slate-800'
                              }`}
                            >
                              {mod}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. RELEASES */}
            {pg === 'rel' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Releases</h1>
                <p className="text-xs text-slate-400 mb-6">Auto-live updates with zero disturbance.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {["Build", "Test (you first)", "10%", "50%", "Everyone"].map((s, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        idx < relState ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : idx === relState ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md' : 'bg-[#04060A]/85 text-slate-500 border-slate-800'
                      }`}>
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setRelState(0);
                        logAction("Auto-live rollout started", 'success');
                        const t = setInterval(() => {
                          setRelState(r => {
                            if (r >= 4) {
                              clearInterval(t);
                              logAction("Auto-update live for all nodes successfully", 'success');
                              return 4;
                            }
                            return r + 1;
                          });
                        }, 1200);
                      }}
                      className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs transition-all shadow-xl ${isUserIT ? 'bg-blue-600 hover:bg-blue-500' : 'bg-sky-500 hover:bg-sky-400'}`}
                    >
                      Start Auto-Live Rollout
                    </button>
                    <button
                      onClick={() => { setRelState(-1); logAction("Rolled back safely", 'warn'); }}
                      className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 font-semibold text-xs text-slate-200 transition-all shadow-sm"
                    >
                      Roll Back
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 7. TICKETS */}
            {pg === 'tix' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Tickets</h1>
                <p className="text-xs text-slate-400 mb-6">Support requests from colleagues.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  {tix.map((t, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl bg-[#04060A]/85 border border-slate-800/80 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                      style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both` }}
                    >
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">{t.t}</div>
                        <div className="text-xs text-slate-400">{t.by} · {t.p}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold ${t.s === 'open' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          {t.s.toUpperCase()}
                        </span>
                        <button
                          onClick={() => {
                            const updated = [...tix];
                            updated[i].s = updated[i].s === 'open' ? 'done' : 'open';
                            setTix(updated);
                            logAction(`Ticket ${updated[i].s === 'done' ? 'resolved: ' : 'reopened: '}${t.t}`, 'success');
                          }}
                          className="px-3.5 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-all shadow-sm"
                        >
                          {t.s === 'open' ? 'Resolve' : 'Reopen'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. TERMINAL & SSH */}
            {pg === 'term' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Terminal & Remote SSH Hub</h1>
                <p className="text-xs text-slate-400 mb-6">Execute infrastructure commands and manage service nodes.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => logAction("Gateway tunnel re-established", 'success')}
                      className={`px-4 py-2.5 text-white rounded-xl text-xs font-bold transition-all shadow-xl ${isUserIT ? 'bg-blue-600 hover:bg-blue-500' : 'bg-sky-500 hover:bg-sky-400'}`}
                    >
                      Reconnect Gateway Tunnel
                    </button>
                    <button 
                      onClick={() => logAction("Biometric queue cache flushed", 'success')}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all shadow-sm"
                    >
                      Flush Biometric Cache
                    </button>
                  </div>

                  <div className="bg-[#04060A] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2 text-emerald-400 shadow-inner">
                    <div className="text-slate-500"># elitejobs-cli v1.5.0 connected [ok]</div>
                    <div>&gt; systemctl status elitejobs-gate --active</div>
                    <div className="text-slate-300">  [ACTIVE] Running smoothly · 0 packet loss · 1ms latency</div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. LICENSES & ASSETS */}
            {pg === 'lic' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Software Licenses & Assets</h1>
                <p className="text-xs text-slate-400 mb-6">Track software entitlements and device inventory assigned to staff.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  {colleagues.map((p, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl bg-[#04060A]/85 border border-slate-800/80 transition-all hover:border-slate-700 hover:-translate-y-0.5"
                      style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s both` }}
                    >
                      <div>
                        <div className="font-semibold text-slate-200 text-sm">{p.n} <span className={`text-xs ${isUserIT ? 'text-blue-400' : 'text-sky-400'} font-normal`}>({p.p})</span></div>
                        <div className="text-xs text-slate-400">Hardware: {p.devName} · License: <span className="text-slate-200">{p.license}</span></div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-md font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Licensed & Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. SYSTEM HEALTH */}
            {pg === 'hl' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">System Health</h1>
                <p className="text-xs text-slate-400 mb-6">Server, sync and backups at a glance.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="text-[11px] text-slate-400 font-semibold">Uptime</div>
                    <div className="text-3xl font-extrabold text-white mt-1">99.98%</div>
                    <div className="text-xs text-slate-500 mt-1">last 30 days</div>
                  </div>
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="text-[11px] text-slate-400 font-semibold">Sync Queue</div>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">0</div>
                    <div className="text-xs text-slate-500 mt-1">pending changes</div>
                  </div>
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="text-[11px] text-slate-400 font-semibold">Last Backup</div>
                    <div className={`text-3xl font-extrabold ${isUserIT ? 'text-blue-400' : 'text-sky-400'} mt-1`}>{bkTime || '02:00'}</div>
                    <div className="text-xs text-slate-500 mt-1">daily, automatic</div>
                  </div>
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="text-[11px] text-slate-400 font-semibold">Errors Today</div>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">0</div>
                    <div className="text-xs text-slate-500 mt-1">none</div>
                  </div>
                </div>
                <button
                  onClick={() => { setBkTime(clock); logAction("Backup completed", 'success'); alert("Backup completed successfully."); }}
                  className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs transition-all shadow-xl ${isUserIT ? 'bg-blue-600 hover:bg-blue-500' : 'bg-sky-500 hover:bg-sky-400'}`}
                >
                  Run Backup Now
                </button>
              </div>
            )}

            {/* 11. AUDIT LOG */}
            {pg === 'aud' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Audit Log</h1>
                <p className="text-xs text-slate-400 mb-6">Every action is securely recorded.</p>
                
                <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-2 font-mono text-xs shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  {audit.map((a, idx) => (
                    <div 
                      key={idx} 
                      className="flex gap-4 p-3.5 rounded-xl bg-[#04060A]/85 border border-slate-800"
                      style={{ animation: `iosDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${idx * 0.06}s both` }}
                    >
                      <span className="text-amber-400 font-bold">{a.t}</span>
                      <span className="text-slate-300">{a.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 12. SETTINGS */}
            {pg === 'set' && (
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Settings & Broadcast</h1>
                <p className="text-xs text-slate-400 mb-6">Attendance rules and global workplace announcements.</p>
                
                <div className="space-y-6 max-w-lg">
                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-bold text-white mb-2">Attendance Rules</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">Check-in opens</span>
                      <select
                        value={cfg.start}
                        onChange={e => { setCfg({ ...cfg, start: e.target.value }); logAction("Setting start: " + e.target.value, 'success'); }}
                        className="px-3.5 py-2 rounded-xl bg-[#04060A] border border-slate-700 text-white text-xs outline-none focus:border-sky-400"
                      >
                        {["08:00", "08:30", "09:00"].map(x => <option key={x} value={x}>{x}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">Grace minutes</span>
                      <select
                        value={cfg.grace}
                        onChange={e => { setCfg({ ...cfg, grace: Number(e.target.value) as any }); logAction("Setting grace: " + e.target.value, 'success'); }}
                        className="px-3.5 py-2 rounded-xl bg-[#04060A] border border-slate-700 text-white text-xs outline-none focus:border-sky-400"
                      >
                        {[0, 5, 10, 15].map(x => <option key={x} value={x}>{x}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="bg-[#0B0F18]/85 backdrop-blur-3xl border border-slate-800/90 rounded-2xl p-6 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <h3 className="text-sm font-bold text-white mb-2">Broadcast Notice to All Staff</h3>
                    <input 
                      value={broadcastMsg}
                      onChange={e => setBroadcastMsg(e.target.value)}
                      placeholder="e.g., Scheduled server maintenance at 22:00..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#04060A]/85 border border-slate-700 text-white text-xs outline-none focus:border-sky-400"
                    />
                    <button
                      onClick={() => {
                        if (!broadcastMsg.trim()) return;
                        setActiveNotice(broadcastMsg);
                        logAction("Broadcast notice published: " + broadcastMsg, 'warn');
                        setBroadcastMsg("");
                        alert("Broadcast notice pushed to all connected colleague nodes.");
                      }}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-xl"
                    >
                      Publish Global Notice
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <style>{`
        @keyframes iosDrop {
          0% { opacity: 0; transform: translateY(-40px) scale(0.95); filter: blur(6px); }
          65% { transform: translateY(5px) scale(1.01); filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
export default App;