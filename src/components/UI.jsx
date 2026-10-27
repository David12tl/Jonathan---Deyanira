import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { C, EVENT } from '../config';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
    html { scroll-behavior: smooth; }
    .invite-action { color: #6B2430; border-color: #6B2430; }
    .invite-action:hover { background: #6B2430; color: white; }
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
    }
    body { margin: 0; background: ${C.ivory}; overflow-x: hidden; }
    .font-script { font-family: 'Great Vibes', cursive; }
    .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
    ::selection { background: ${C.gold}; color: ${C.deep}; }
    :focus-visible { outline: 2px solid ${C.gold}; outline-offset: 3px; }
    .paper {
      background-color: ${C.ivory};
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .35 0 0 0 0 .25 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    .wine-bg {
      background-color: ${C.wine};
      background-image:
        radial-gradient(ellipse at 50% 35%, rgba(255,255,255,.07), transparent 60%),
        radial-gradient(ellipse at 50% 100%, rgba(0,0,0,.28), transparent 60%);
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${C.ivory}; }
    ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 4px; }

    #root {
      width: 1126px;
      max-width: 100%;
      margin: 0 auto;
      text-align: center;
      border-inline: 1px solid #e5e4e7;
      min-height: 100svh;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    p { margin: 0; }
    h1, h2 { font-family: system-ui, 'Segoe UI', Roboto, sans-serif; font-weight: 500; color: ${C.deep}; }
    h1 { font-size: 56px; letter-spacing: -1.68px; margin: 32px 0; }
    h2 { font-size: 24px; line-height: 118%; letter-spacing: -0.24px; margin: 0 0 8px; }
    @media (max-width: 1024px) {
      h1 { font-size: 36px; margin: 20px 0; }
      h2 { font-size: 20px; }
    }
  `}</style>
);

export const ScrollReveal = ({ children, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  return <motion.div className={className}
    initial={reduce ? false : { opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: reduce ? 0 : .7, delay: reduce ? 0 : delay, ease: 'easeOut' }}>
    {children}
  </motion.div>;
};

const LineArtFlower = ({ cx, cy, r, color }) => (
  <g transform={`translate(${cx} ${cy})`} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <ellipse key={a} rx={r * 0.15} ry={r} transform={`rotate(${a})`} />
    ))}
    <circle r={r * 0.25} fill="#FBF7F0" />
    <circle r={r * 0.1} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <circle key={a} cx={Math.cos(a * Math.PI / 180) * r * 0.15} cy={Math.sin(a * Math.PI / 180) * r * 0.15} r="0.8" fill={color} stroke="none" />
    ))}
  </g>
);

const LineArtBranch = ({ x, y, rot, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0,0 Q20,-30 50,-40" />
    <path d="M10,-13 Q5,-25 12,-30 Q18,-20 10,-13" />
    <path d="M25,-25 Q15,-40 25,-45 Q32,-35 25,-25" />
    <path d="M35,-32 Q30,-45 40,-50 Q45,-40 35,-32" />
  </g>
);

const LineArtSprig = ({ x, y, rot, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round">
    <path d="M0,0 Q10,-20 30,-15" />
    <circle cx="30" cy="-15" r="2.5" fill={color} />
    <path d="M10,-12 Q15,-25 25,-28" />
    <circle cx="25" cy="-28" r="2" fill={color} />
  </g>
);

export const FloralCorner = ({ className = '' }) => {
  const reduce = useReducedMotion();
  const strokeColor = C.wine;
  return (
    <svg viewBox="0 0 260 260" className={`pointer-events-none absolute ${className}`} aria-hidden="true" fill="none">
      <motion.g initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 1.2, ease: 'easeOut' }}>
        <LineArtBranch color={strokeColor} rot={-35} s={1.6} x={30} y={230} />
        <LineArtBranch color={strokeColor} rot={-10} s={1.3} x={100} y={150} />
        <LineArtBranch color={strokeColor} rot={-60} s={1.2} x={170} y={90} />
        <LineArtSprig color={C.gold} rot={-70} s={1.5} x={70} y={180} />
        <LineArtSprig color={C.gold} rot={-30} s={1.5} x={150} y={120} />
        <LineArtFlower color={strokeColor} cx={70} cy={170} r={32} />
        <LineArtFlower color={strokeColor} cx={160} cy={100} r={24} />
        <LineArtFlower color={strokeColor} cx={210} cy={45} r={16} />
      </motion.g>
    </svg>
  );
};

export const GoldDivider = () => (
  <ScrollReveal><div className="flex items-center justify-center gap-3 my-10" aria-hidden="true">
    <span className="h-px w-16" style={{ background: C.gold }} />
    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5Z" fill={C.gold} /></svg>
    <span className="h-px w-16" style={{ background: C.gold }} />
  </div></ScrollReveal>
);

export const RevealWords = ({ text, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <motion.p className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }} aria-label={text}>
      {words.map((w, i) => (
        <motion.span key={i} aria-hidden="true" className="inline-block mr-[0.28em]" variants={{ hidden: { opacity: 0, y: 12, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } } }}>
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
};

const useCountdown = (target) => {
  const targetTime = target.getTime();
  const [ms, setMs] = useState(() => Math.max(0, targetTime - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setMs(Math.max(0, targetTime - Date.now())), 1000);
    return () => clearInterval(id);
  }, [targetTime]);
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    parts: [
      { v: Math.floor(s / 86400), l: 'días' },
      { v: Math.floor((s % 86400) / 3600), l: 'horas' },
      { v: Math.floor((s % 3600) / 60), l: 'minutos' },
      { v: s % 60, l: 'segundos' },
    ],
  };
};

export const Countdown = () => {
  const { parts, done } = useCountdown(EVENT.date);
  const reduce = useReducedMotion();
  if (done) {
    return <p className="font-script text-5xl" style={{ color: C.wine }}>{new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(new Date()) === new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(EVENT.date) ? '¡Hoy es el gran día!' : 'Gracias por ser parte de nuestra historia'}</p>;
  }
  return (
    <div className="flex items-stretch justify-center" role="timer" aria-label="Tiempo restante para la boda">
      {parts.map((p, i) => (
        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : .6, delay: reduce ? 0 : i * .1 }} key={p.l} className="px-4 md:px-9 text-center" style={{ borderLeft: i === 0 ? 'none' : `1px solid ${C.gold}` }}>
          <div className="font-display text-4xl md:text-6xl font-medium tabular-nums" style={{ color: C.wine }}>{String(p.v).padStart(2, '0')}</div>
          <div className="font-display italic text-sm md:text-base mt-1" style={{ color: C.sage }}>{p.l}</div>
        </motion.div>
      ))}
    </div>
  );
};