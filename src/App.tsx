import React, { useState, useEffect } from 'react';
import { 
  Heart, MapPin, Clock, Gift, Camera, 
  CheckCircle2, Copy, Sparkles, Navigation, Send, Check, ChevronDown 
} from 'lucide-react';
import logoImg from './logo.jpeg';

// Modifica aquí los datos reales de tu boda
const defaultWeddingData = {
 brideName: "Paula",
  groomName: "David",
  monogram: "P & D",
  weddingDate: "2027-04-24T11:00",
  dateDisplay: "Sábado, 24 de Abril de 2027",
  heroSubtitle: "¡Nos casamos y nos encantaría compartir este día tan especial contigo!",
  heroBgImage: "https://i.postimg.cc/4Nqr5V1z/Fondo-2027.jpg",
  
  storyTitle: "Nuestra Historia",
  storyText: "Nos conocimos una tarde soleada de primavera y desde aquel instante supimos que comenzaba algo maravilloso. Tras años inolvidables de viajes, risas compartidas y miles de momentos mágicos, hemos decidido dar el paso más importante de nuestras vidas. ¡Queremos celebrar nuestro amor rodeados de la gente a la que más queremos!",
  storyImage: "https://i.postimg.cc/5y7HRv57/Foto-boda.jpg",
  
  ceremony: {
    title: "La Ceremonia",
    time: "11:00 H",
    place: "Basílica de Santa Engracia",
    address: "C. de Tomás Castellano, 1, Casco Antiguo, 50001 Zaragoza",
    description: "La ceremonia religiosa donde nos daremos el 'Sí, quiero'. Os rogamos puntualidad.",
    mapUrl: "https://maps.app.goo.gl/9zPq8tsVAGpzemV2A",
    image: "https://i.postimg.cc/KjvRJdx7/basilica-nueva.jpg"
  },
  
  banquet: {
    title: "El Banquete y Celebración",
    time: "14:15 H",
    place: "Hotel NH Collection Gran Hotel de Zaragoza",
    address: "Calle de Joaquín Costa, 5, Casco Antiguo, 50001 Zaragoza",
    description: "Continuaremos la celebración con un cocktail de bienvenida, banquete, barra libre y fiesta hasta que el cuerpo aguante.",
    mapUrl: "https://maps.app.goo.gl/DJ9Ypiw6yfBPgCe98",
    image: "https://i.postimg.cc/Vv6kjnWS/Gran-hotel-acuarela.jpg"
  },
  
  timeline: [
    { id: 1, time: "11:00", title: "Ceremonia", desc: "Llegada de invitados y daremos el 'Sí, quiero'" },
    { id: 2, time: "12:30", title: "Fotos de los novios", desc: "Momento para inmortalizar nuestros recuerdos de este día especial. Os recomendamos tomar la primera en las inmediaciones del Gran Hotel (Plaza los Sitios)" },
    { id: 3, time: "14:15", title: "Cocktail de Bienvenida", desc: "Aperitivos, cortador de jamón, tabla de quesos, arroces y  más" },
    { id: 4, time: "16:00", title: "Comida ", desc: "Menú especial en el salón principal" },
    { id: 5, time: "18:00", title: "Música en vivo y en directo", desc: "Grupo sorpresa que os encantará" },
    { id: 6, time: "20:00", title: "Fiesta con DJ", desc: "¡Fotomatón, barra libre y  más sorppresas!" },
    { id: 7, time: "22:00", title: "Recena", desc: "Guardar sitio para continuar la fiesta" }
  ],
  
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800"
  ],
  
  iban: "ES55 3017 0550 6525 8285 4820",
  ibanHolder: "Paula y David - Boda",
  giftMessage: "El mejor regalo para nosotros es poder contar con vuestra presencia en este día inolvidable. Si además deseáis hacernos un detalle para comenzar nuestro nuevo camino y nuestra Luna de Miel, os dejamos nuestra cuenta bancaria:",
  
  rsvpDeadline: "28 de Marzo de 2027"
};

function App() {
  const wedding = defaultWeddingData;

  const [isCopied, setIsCopied] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvps');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    attending: 'si',
    guests: '1',
    dietary: '',
    song: '',
    message: ''
  });
  
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
    } catch (e) {}
  }, [rsvps]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(wedding.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [wedding.weddingDate]);

  const handleCopyIban = () => {
    navigator.clipboard.writeText(wedding.iban.replace(/\s+/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };


    const handleRsvpSubmit = async (e: any) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    // Pega aquí la URL que obtuviste al desplegar en Google Apps Script
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCnkFC9dPsS0cNXPj4V35yyl9tIr3IP8oPiEYpJVU0iNyC7l76MXCfIxEcemWZhpmKRA/exec";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: rsvpForm.name,
          Asistencia: rsvpForm.attending === 'si' ? 'Sí asistirá' : 'No asistirá',
          Acompañantes: rsvpForm.guests,
          Alergias: rsvpForm.dietary || 'Ninguna',
          Cancion: rsvpForm.song || 'Ninguna',
          Mensaje: rsvpForm.message || 'Sin mensaje'
        })
      });

      setRsvpSubmitted(true);
    } catch (error) {
      alert("Hubo un error al enviar la confirmación. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif-wedding { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-wedding { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Navegación Superior */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#portada" className="font-serif-wedding text-2xl font-bold tracking-widest text-stone-900 flex items-center gap-2">
            <img src={logoImg} alt="Logo Paula y David" className="w-full h-full rounded-full object-cover" />
            <span>{wedding.brideName} & {wedding.groomName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-stone-600">
            <a href="#historia" className="hover:text-amber-700 transition">Historia</a>
            <a href="#donde-y-cuando" className="hover:text-amber-700 transition">Dónde & Cuándo</a>
            <a href="#programa" className="hover:text-amber-700 transition">Programa</a>
            <a href="#galeria" className="hover:text-amber-700 transition">Galería</a>
            <a href="#rsvp" className="hover:text-amber-700 transition">Confirmar</a>
            <a href="#regalo" className="hover:text-amber-700 transition">Regalos</a>
          </nav>

          <a href="#rsvp" className="hidden sm:inline-flex px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow transition">
            Confirmar Asistencia
          </a>
        </div>
      </header>

      {/* Sección de Portada */}
      <section id="portada" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={wedding.heroBgImage} alt="Wedding Cover" className="w-full h-full object-cover scale-105 filter brightness-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6 py-20">
          
          {/* Logo Paula & David */}
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-amber-300/80 bg-white/90 backdrop-blur-md p-1 shadow-2xl mb-2">
            <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo Paula y David" className="w-full h-full rounded-full object-cover" />
          </div>

          <p className="text-amber-200 text-sm md:text-base tracking-[0.3em] uppercase font-light">
            ¡Nos Casamos!
          </p>

          <h1 className="font-serif-wedding text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide drop-shadow-md">
            {wedding.brideName} <span className="text-amber-300 font-serif-wedding italic font-light">&</span> {wedding.groomName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-200 text-sm md:text-base font-light leading-relaxed">
            {wedding.heroSubtitle}
          </p>

          <div className="pt-2">
            <span className="inline-block px-6 py-2 border-y border-amber-300/60 text-amber-200 text-sm md:text-lg font-serif-wedding tracking-widest uppercase">
              {wedding.dateDisplay}
            </span>
          </div>

          {/* Cuenta atrás */}
          <div className="pt-8 grid grid-cols-4 gap-3 max-w-md mx-auto">
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Días</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Horas</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Min</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Seg</span>
            </div>
          </div>

          <div className="pt-6">
            <a href="#rsvp" className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg font-medium tracking-wider uppercase text-xs transition duration-300 hover:scale-105">
              <Heart className="w-4 h-4 fill-white" />
              <span>Confirmar Asistencia</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-amber-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={wedding.storyImage} alt="Paula y David Story" className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-amber-200 hidden sm:block">
              <p className="font-serif-wedding text-amber-800 text-xl font-bold">{wedding.monogram}</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Para Siempre</p>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Love Story</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900 leading-tight">{wedding.storyTitle}</h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto md:mx-0"></div>
            <p className="text-stone-600 leading-relaxed font-light text-base md:text-lg">{wedding.storyText}</p>
          </div>
        </div>
      </section>

      {/* Ubicaciones */}
      <section id="donde-y-cuando" className="py-24 px-4 bg-stone-100/70 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Ubicaciones</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Dónde y Cuándo</h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto">Te esperamos para vivir juntos cada momento inolvidable de este día.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img src={wedding.ceremony.image} alt={wedding.ceremony.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-serif-wedding text-lg italic font-semibold text-amber-200 bg-stone-900/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/30">
                      {wedding.ceremony.time}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">{wedding.ceremony.title}</h3>
                    <p className="font-semibold text-stone-800 mt-1">{wedding.ceremony.place}</p>
                    <p className="text-sm font-light text-stone-600">{wedding.ceremony.address}</p>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t">{wedding.ceremony.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a href={wedding.ceremony.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition">
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar a la Iglesia</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img src={wedding.banquet.image} alt={wedding.banquet.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-serif-wedding text-lg italic font-semibold text-amber-200 bg-stone-900/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/30">
                      {wedding.banquet.time}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">{wedding.banquet.title}</h3>
                    <p className="font-semibold text-stone-800 mt-1">{wedding.banquet.place}</p>
                    <p className="text-sm font-light text-stone-600">{wedding.banquet.address}</p>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t">{wedding.banquet.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a href={wedding.banquet.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition">
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar al Banquete</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa */}
      <section id="programa" className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Timing</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Programa del Día</h2>
          </div>

          <div className="relative border-l-2 border-amber-300/60 ml-4 md:ml-32 space-y-12">
            {wedding.timeline.map((item: any, index: number) => (
              <div key={item.id || index} className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-amber-600 flex items-center justify-center text-amber-700 shadow-md">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="md:absolute md:-left-36 md:top-1.5 md:w-28 md:text-right mb-1 md:mb-0">
                  <span className="font-serif-wedding text-2xl font-bold text-amber-800">{item.time}</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/80 space-y-2">
                  <h3 className="font-serif-wedding text-2xl font-bold text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-24 px-4 bg-stone-100/70">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Recuerdos</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Galería de Momentos</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wedding.gallery.map((url: string, idx: number) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                <img src={url} alt={`Galería ${idx + 1}`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-24 px-4 bg-[#FAF8F5] relative">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/90 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>

          <div className="text-center space-y-3 mb-8">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Se ruega confirmación</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Confirmación de Asistencia</h2>
            <p className="text-stone-500 text-sm">
              Por favor, confirma tu asistencia antes del <strong className="text-stone-800">{wedding.rsvpDeadline}</strong>
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">¡Muchas Gracias!</h3>
              <p className="text-stone-600 max-w-md mx-auto text-sm">Hemos recibido tu respuesta correctamente.</p>
              <button onClick={() => setRsvpSubmitted(false)} className="mt-4 px-6 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full hover:bg-stone-200">
                Enviar otra respuesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Nombre Completo *</label>
                <input type="text" required placeholder="Ej. María García López" value={rsvpForm.name} onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-2">¿Asistirás?</label>
                  <select value={rsvpForm.attending} onChange={e => setRsvpForm({...rsvpForm, attending: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm bg-white">
                    <option value="si">¡Sí, allí estaré!</option>
                    <option value="no">Sintiéndolo mucho, no puedo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Nº de Acompañantes</label>
                  <select value={rsvpForm.guests} onChange={e => setRsvpForm({...rsvpForm, guests: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm bg-white">
                    <option value="1">Solo yo (1)</option>
                    <option value="2">Voy con acompañante (2)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Intolerancias / Alergias Alimentarias</label>
                <input type="text" placeholder="Vegetariano, celíaco..." value={rsvpForm.dietary} onChange={e => setRsvpForm({...rsvpForm, dietary: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Canción preferida</label>
                <input type="text" placeholder="Título y artista..." value={rsvpForm.song} onChange={e => setRsvpForm({...rsvpForm, song: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Mensaje</label>
                <textarea rows={3} placeholder="Déjanos unas palabras..." value={rsvpForm.message} onChange={e => setRsvpForm({...rsvpForm, message: e.target.value})} className="w-full p-3.5 border border-stone-300 rounded-xl outline-none text-sm" />
              </div>

              <button type="submit" className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl tracking-wider uppercase text-xs shadow-lg transition flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Enviar Confirmación</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Regalos */}
      <section id="regalo" className="py-24 px-4 bg-stone-100/70">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-7 h-7" />
            </div>
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Mesa de Regalos</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Regalo de Boda</h2>
          </div>

          <p className="text-stone-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-light">{wedding.giftMessage}</p>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-stone-200 max-w-lg mx-auto space-y-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Titular de la cuenta</span>
              <p className="font-semibold text-stone-800">{wedding.ibanHolder}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left font-mono text-sm md:text-base font-bold text-stone-900 tracking-wider">{wedding.iban}</div>
              <button onClick={handleCopyIban} className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 ${isCopied ? 'bg-emerald-600 text-white' : 'bg-amber-700 hover:bg-amber-800 text-white'}`}>
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? '¡Copiado!' : 'Copiar IBAN'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-stone-900 text-white py-16 px-4 text-center space-y-6">
        <img src={logoImg} alt="Logo Paula y David" className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-amber-400/40 bg-white shadow-md" />
          <h3 className="font-serif-wedding text-3xl font-light">{wedding.brideName} & {wedding.groomName}</h3>
          <p className="text-amber-200/70 text-xs tracking-widest uppercase">{wedding.dateDisplay}</p>
      </footer>

    </div>
  );
}

export default App;
