import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Church, CalendarPlus, Navigation } from 'lucide-react';
import { C, EVENT, WHATSAPP_NUMBER } from '../config';
import { ScrollReveal, RevealWords, GoldDivider, Countdown } from './UI';

// Assets: copia la carpeta flores en public/flores.
// Cada ramo utiliza las seis imágenes originales con su transparencia intacta.
const FLORAL_ASSETS = '/';
const BOUQUETS = {
  corner: [
    { file: 'tallo_3.png', x: 4, y: 16, w: 24, rotation: -26, z: 1 },
    { file: 'tallo.png', x: 18, y: 4, w: 26, rotation: -5, z: 2 },
    { file: 'tallo_2.png', x: 34, y: 24, w: 24, rotation: 52, z: 1 },
    { file: 'tallo.png', x: 50, y: 30, w: 20, rotation: 76, z: 2 },
    { file: 'flor_3.png', x: 8, y: 57, w: 83, rotation: -14, z: 3 },
    { file: 'flor_2.png', x: 20, y: 52, w: 34, rotation: -12, z: 4 },
    { file: 'flor.png', x: 40, y: 65, w: 25, rotation: 18, z: 5 },
  ],
  photo: [
    { file: 'tallo_3.png', x: 3, y: 18, w: 24, rotation: -24, z: 1 },
    { file: 'tallo_2.png', x: 25, y: 4, w: 26, rotation: 16, z: 2 },
    { file: 'tallo.png', x: 47, y: 29, w: 23, rotation: 67, z: 1 },
    { file: 'flor_3.png', x: 4, y: 57, w: 90, rotation: -20, z: 3 },
    { file: 'flor.png', x: 20, y: 59, w: 36, rotation: -18, z: 4 },
    { file: 'flor_2.png', x: 47, y: 62, w: 26, rotation: 26, z: 5 },
  ],
  airy: [
    { file: 'tallo_3.png', x: 10, y: 16, w: 21, rotation: -16, z: 1 },
    { file: 'tallo.png', x: 32, y: 8, w: 21, rotation: 14, z: 1 },
    { file: 'tallo_2.png', x: 51, y: 31, w: 19, rotation: 48, z: 1 },
    { file: 'flor_3.png', x: 11, y: 62, w: 74, rotation: -12, z: 2 },
    { file: 'flor_2.png', x: 28, y: 56, w: 27, rotation: 12, z: 3 },
    { file: 'flor.png', x: 52, y: 69, w: 19, rotation: -15, z: 4 },
  ],
};

const FloralCorner = ({ className = '', onDark = false, variant = 'corner' }) => {
  const reduce = useReducedMotion();
  const pieces = BOUQUETS[variant] || BOUQUETS.corner;
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}
      style={{ aspectRatio: '1 / 1' }} aria-hidden="true">
      <motion.div className="absolute inset-0"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }}
        transition={{ duration: reduce ? 0 : 1, ease: 'easeOut' }}
        style={onDark ? { filter: 'brightness(1.8) saturate(.65)' } : undefined}>
        {pieces.map((piece, index) => (
          <img key={`${piece.file}-${index}`} src={`${FLORAL_ASSETS}${piece.file}`}
            alt="" draggable={false} loading="lazy" decoding="async"
            style={{ position: 'absolute', left: `${piece.x}%`, top: `${piece.y}%`,
              width: `${piece.w}%`, height: 'auto', maxWidth: 'none', zIndex: piece.z,
              transform: `rotate(${piece.rotation}deg)`, transformOrigin: '50% 85%' }} />
        ))}
      </motion.div>
    </div>
  );
};

export const LoadingScreen = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!opening) return;
    const id = window.setTimeout(onComplete, reduce ? 0 : 1350);
    return () => window.clearTimeout(id);
  }, [opening, onComplete, reduce]);
  return (
    <motion.div className="fixed inset-0 z-50 wine-bg flex items-center justify-center px-6" exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .6 }}>
      <div className="w-full max-w-md text-center">
        <p className="font-display uppercase tracking-[.25em] text-sm mb-10" style={{ color: C.goldSoft }}>Una invitación para ti</p>
        <button type="button" aria-label="Abrir invitación de Jonathan y Deyanira" disabled={opening} onClick={() => setOpening(true)} className="relative block w-full h-60 rounded-md shadow-2xl" style={{ perspective: 1000, background: C.ivory }}>
          <motion.div className="absolute inset-x-8 top-5 bottom-5 rounded border flex flex-col items-center justify-center" style={{ background: C.ivory, borderColor: C.gold }} animate={opening ? { y: reduce ? 0 : -90, opacity: 0 } : { y: 0, opacity: 1 }} transition={{ delay: .5, duration: .7 }}>
            <span className="font-script text-4xl" style={{ color: C.wine }}>Jonathan & Deyanira</span>
            <span className="font-display mt-3" style={{ color: C.wine }}>26 · 12 · 2026</span>
          </motion.div>
          <div className="absolute inset-0 rounded-md" style={{ background: '#EEE2CF', clipPath: 'polygon(0 0,50% 52%,100% 0,100% 100%,0 100%)' }} />
          <div className="absolute inset-0 rounded-md" style={{ background: '#F8F0E3', clipPath: 'polygon(0 100%,50% 45%,100% 100%)' }} />
          <motion.div className="absolute inset-0 rounded-t-md" style={{ background: '#E3CFA0', clipPath: 'polygon(0 0,100% 0,50% 58%)', transformOrigin: 'top', backfaceVisibility: 'hidden' }} animate={{ rotateX: opening ? 180 : 0 }} transition={{ duration: reduce ? 0 : .7 }} />
          <motion.span className="absolute left-1/2 top-1/2 -ml-7 -mt-7 rounded-full w-14 h-14 flex items-center justify-center font-display text-xl border shadow-md" style={{ background: C.wine, color: C.goldSoft, borderColor: C.gold }} animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: .2 }}>J&D</motion.span>
        </button>
        <p className="font-display italic text-xl mt-12" style={{ color: C.blush }} aria-live="polite">{opening ? 'Con mucho cariño…' : 'Toca el sobre para abrir'}</p>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress: scrollY } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollY, [0, 1], [1, reduce ? 1 : 1.06]);
  const opacity = useTransform(scrollY, [0, .9], [1, reduce ? 1 : 0]);
  const y = useTransform(scrollY, [0, 1], [0, reduce ? 0 : -120]);
  const cueOpacity = useTransform(scrollY, [0, .25], [1, reduce ? 1 : 0]);
  return (
    <section ref={heroRef} className="relative min-h-[100svh] paper">
      <div className="relative min-h-[100svh] overflow-hidden flex items-center justify-center py-24">
        <div className="absolute inset-4 md:inset-8 border pointer-events-none" style={{ borderColor: C.gold }} />
        <div className="absolute inset-6 md:inset-[2.75rem] border pointer-events-none" style={{ borderColor: C.gold, opacity: 0.45 }} />
        <FloralCorner className="top-0 left-0 w-44 md:w-72 rotate-180 scale-x-[-1] origin-center" />
        <FloralCorner className="bottom-0 right-0 w-44 md:w-72" />
        <motion.div style={{ scale, opacity, y }} className="flex flex-col items-center text-center px-6">
          <h1 className="sr-only">Boda de Jonathan y Deyanira</h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1.2 }} className="font-display italic text-xl md:text-2xl mb-4" style={{ color: C.wine }}>Nos casamos</motion.p>
          <ScrollReveal delay={0.15}><div className="font-script text-7xl md:text-[9.5rem] leading-[0.95]" style={{ color: C.wine }}>Jonathan</div></ScrollReveal>
          <span className="font-script text-5xl md:text-7xl my-1" style={{ color: C.gold }}>&</span>
          <ScrollReveal delay={0.3}><div className="font-script text-7xl md:text-[9.5rem] leading-[0.95]" style={{ color: C.wine }}>Deyanira</div></ScrollReveal>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }} className="font-display text-xl md:text-2xl mt-8 tracking-wide" style={{ color: C.wine }}>Sábado 26 de diciembre de 2026</motion.p>
        </motion.div>
        <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-10 md:bottom-14 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="font-display italic text-sm" style={{ color: C.wine }}>Desliza</span>
          <motion.span className="block w-px h-10 origin-top" style={{ background: C.gold }} animate={reduce ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </div>
    </section>
  );
};

export const Message = () => (
  <section className="relative paper py-28 px-6 overflow-hidden">
    <FloralCorner variant="airy" className="bottom-0 left-0 w-40 md:w-64 scale-x-[-1]" />
    <div className="relative z-10 max-w-2xl mx-auto text-center">
      <RevealWords text="“En esto consiste el amor: no en que nosotros hayamos amado a Dios, sino en que él nos amó a nosotros.”" className="font-display italic text-2xl md:text-4xl leading-relaxed text-stone-700" />
      <RevealWords text="1 Juan 4:10" delay={0.6} className="font-display font-semibold text-lg md:text-xl mt-5" />
      <GoldDivider />
      <ScrollReveal><p className="font-display text-xl md:text-2xl mb-10" style={{ color: C.wine }}>Con la bendición de Dios y de nuestros padres</p></ScrollReveal>
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center font-display text-xl md:text-2xl text-stone-800">
        <ScrollReveal className="space-y-1"><p>Severo Julián</p><p>Yolanda Manuel</p></ScrollReveal>
        <span className="hidden md:block w-px h-16 mx-auto" style={{ background: C.gold }} />
        <ScrollReveal className="space-y-1"><p>David G. Valdez</p><p>Virginia López</p></ScrollReveal>
      </div>
      <GoldDivider />
      <ScrollReveal><p className="font-display text-2xl md:text-3xl leading-relaxed mb-14" style={{ color: C.wine }}>Queremos compartir contigo la alegría de nuestra unión religiosa</p></ScrollReveal>
      <Countdown />
    </div>
  </section>
);

export const Details = () => {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const googleCalendar = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE', text: 'Boda de Jonathan y Deyanira',
    dates: `${fmt(EVENT.date)}/${fmt(new Date(EVENT.date.getTime() + 5 * 3600000))}`,
    location: EVENT.ceremonyPlace,
    details: 'Ceremonia religiosa. Consulta la invitación para los detalles de recepción.',
  })}`;
  const ceremonyMap = EVENT.ceremonyMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT.ceremonyPlace + ', Arroyo Limón, Oaxaca')}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${EVENT.receptionLine1}, ${EVENT.receptionLine2}`)}`;
  const downloadCalendar = () => {
    const end = new Date(EVENT.date.getTime() + 5 * 3600 * 1000);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Boda Jonathan y Deyanira//ES', 'BEGIN:VEVENT',
      `DTSTART:${fmt(EVENT.date)}`, `DTEND:${fmt(end)}`, 'UID:boda-jonathan-deyanira-20261226@invitacion.local',
      `DTSTAMP:${fmt(new Date())}`, 'SUMMARY:Boda de Jonathan y Deyanira', `LOCATION:${EVENT.ceremonyPlace.replace(/[,;]/g, ' ')}`,
      'DESCRIPTION:Ceremonia religiosa. Consulta la invitación para los detalles de recepción.', 'BEGIN:VALARM',
      'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Mañana es la boda de Jonathan y Deyanira', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'boda-jonathan-deyanira.ics'; a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <section className="paper px-6 py-20 md:py-28" aria-labelledby="details-title">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal><h2 id="details-title" className="font-script text-5xl md:text-7xl" style={{ color: C.wine }}>Dónde y cuándo</h2>
        <p className="font-display text-2xl mt-6">Sábado 26 de diciembre de 2026</p></ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {[
            { title: 'Ceremonia', icon: Church, place: EVENT.ceremonyPlace, time: '12:00 hrs', address: '', href: ceremonyMap },
            { title: 'Recepción', icon: MapPin, place: EVENT.receptionLine1, time: EVENT.receptionTime, address: EVENT.receptionLine2, href: EVENT.receptionMapsUrl || mapsUrl },
          ].map(({ title, icon: Icon, place, time, address, href }) => (
            <ScrollReveal key={title} className="h-full"><article className="relative border bg-white px-6 py-10 flex flex-col items-center" style={{ borderColor: C.gold }}>
              <Icon size={36} strokeWidth={1.4} color={C.wine} aria-hidden="true" />
              <h3 className="font-script text-4xl mt-5" style={{ color: C.wine }}>{title}</h3>
              <p className="font-display text-2xl font-semibold mt-4">{place}</p>
              {time && <p className="font-display text-xl mt-3">{time}</p>}
              {address && <p className="font-display text-xl mt-3 text-stone-600">{address}</p>}
              <a href={href} target="_blank" rel="noopener noreferrer" className="invite-action border px-5 py-3 mt-7 font-display text-lg inline-flex items-center gap-2"><Navigation size={18} />Cómo llegar</a>
            </article></ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-12">
          <h3 className="font-display text-2xl" style={{ color: C.wine }}>Reserva este día para nosotros</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <a href={googleCalendar} target="_blank" rel="noopener noreferrer" className="invite-action border px-6 py-3 font-display text-lg inline-flex justify-center items-center gap-2"><CalendarPlus size={20} />Google Calendar</a>
            <button type="button" onClick={downloadCalendar} className="invite-action border px-6 py-3 font-display text-lg inline-flex justify-center items-center gap-2"><CalendarPlus size={20} />Apple / Outlook (.ics)</button>
          </div>
          <p className="font-display text-base text-stone-600 mt-4">Guarda el evento en tu calendario. El archivo .ics incluye un aviso un día antes; revisa los recordatorios al importarlo.</p>
        </ScrollReveal>
        {EVENT.dressCode && <p className="font-display text-xl mt-10">Código de vestimenta: {EVENT.dressCode}</p>}
      </div>
    </section>
  );
};

export const Closing = () => {
  const reduce = useReducedMotion();
  const celebrate = () => {
    if (reduce) return;
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.7 }, colors: [C.wine, C.gold, '#ffffff', C.blush] });
  };
  const [guestName, setGuestName] = useState('Julian');
  const [guests, setGuests] = useState(1);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`¡Hola! Soy ${guestName.trim()}. Confirmo mi asistencia a la boda de Jonathan y Deyanira. Asistentes: ${guests}.`)}`;
  return (
    <footer className="relative paper py-28 px-6 text-center overflow-hidden">
      <FloralCorner className="top-0 left-0 w-40 md:w-64 rotate-180 scale-x-[-1]" />
      <FloralCorner className="bottom-0 right-0 w-40 md:w-64" />
      <ScrollReveal className="relative z-10 flex flex-col items-center">
        <h2 className="font-script text-6xl md:text-8xl" style={{ color: C.wine }}>¡Te esperamos!</h2>
        <p className="font-display italic text-xl md:text-2xl mt-4 text-stone-700">Esperamos compartir este día tan especial contigo</p>
        {WHATSAPP_NUMBER && <div className="w-full max-w-sm mt-10 space-y-4 text-left font-display text-stone-800">
          <label className="block">Tu nombre<input value={guestName} onChange={e => setGuestName(e.target.value)} autoComplete="name" className="block w-full rounded border p-3 mt-1 text-stone-800 bg-white" style={{ borderColor: C.gold }} /></label>
          <label className="block">Número de asistentes<input type="number" min="1" step="1" value={guests} onChange={e => setGuests(Math.max(1, Math.floor(Number(e.target.value) || 1)))} className="block w-full rounded border p-3 mt-1 text-stone-800 bg-white" style={{ borderColor: C.gold }} /></label>
          {EVENT.rsvpDeadline && <p>Confirma antes del {EVENT.rsvpDeadline}.</p>}
        </div>}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          {WHATSAPP_NUMBER && (
            <a href={guestName.trim() ? whatsappHref : undefined} aria-disabled={!guestName.trim()} onClick={e => { if (!guestName.trim()) e.preventDefault(); }} target="_blank" rel="noopener noreferrer" className="px-8 py-3 font-display text-xl transition-colors hover:brightness-110" style={{ background: C.gold, color: C.deep }}>Confirmar asistencia</a>
          )}
          <button onClick={celebrate} className="invite-action border px-8 py-3 font-display text-xl transition-colors">Celebrar con nosotros</button>
        </div>
        <p className="font-script text-3xl mt-16 mb-24 md:mb-0 relative z-20" style={{ color: C.wine }}>Jonathan & Deyanira</p>
      </ScrollReveal>
    </footer>
  );
};

// Ajusta objectPosition si el anillo o los rostros necesitan otro encuadre.
export const PhotoSection = ({ src = '/Image.jpeg', alt = 'Anillo de compromiso', objectPosition = '50% 50%' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setFailed(false);
  }
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-3%', '3%']);
  return (
    <section ref={ref} className="relative paper overflow-hidden px-6 py-20 md:py-28" aria-label="Nuestro compromiso">
      <div className="relative max-w-3xl mx-auto">
        <FloralCorner variant="photo" className="-bottom-16 -left-32 md:-left-48 w-56 md:w-80 z-20 opacity-90" />
        <FloralCorner variant="airy" className="-top-12 -right-16 w-48 md:w-72 rotate-180 z-20 opacity-90" />
        <ScrollReveal className="relative z-10 mx-auto max-w-xl">
          <div className="relative p-3 md:p-4" style={{ border: `1px solid ${C.gold}`, borderRadius: '48% 48% 8px 8px / 32% 32% 8px 8px', background: C.ivory }}>
            <figure className="relative m-0 overflow-hidden" style={{ aspectRatio: '4 / 5', borderRadius: '48% 48% 4px 4px / 32% 32% 4px 4px', background: '#EDE4D7', boxShadow: '0 16px 45px -25px rgba(69,20,30,.3)' }}>
              {failed ? <div role="img" aria-label={alt} className="absolute inset-0 flex items-center justify-center p-10 text-center font-display text-xl" style={{ color: C.wine }}>Un recuerdo de nuestro compromiso</div> :
                <motion.img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)}
                  className="absolute w-full object-cover" style={{ height: '110%', top: '-5%', objectPosition, y: photoY }} />}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4" style={{ background: 'linear-gradient(transparent, rgba(69,20,30,.16))' }} />
            </figure>
          </div>
          <div className="relative text-center pt-8 px-8">
            <span className="block mx-auto w-12 h-px mb-5" style={{ background: C.gold }} />
            <p className="font-script text-4xl md:text-5xl" style={{ color: C.wine }}>El comienzo de nuestra historia</p>
            <p className="font-display italic text-lg mt-3 text-stone-600">Un sí, una promesa y toda una vida juntos.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};