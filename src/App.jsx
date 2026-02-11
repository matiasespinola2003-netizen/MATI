import { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';

import mixpanel from './lib/mixpanel';

function App() {
  const jsConfetti = new JSConfetti();
  const [randomValor, setRandomValor] = useState({});
  const [valueSi, setValueSi] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState('relative');
  const [siButtonSize, setSiButtonSize] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [blockSi, setBlockSi] = useState(false);
const [noLocked, setNoLocked] = useState(false);


  let random = [
    {
      id: 1,
      description: 'Di si por favor',
      img: 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif',
    },
    {
      id: 2,
      description: 'Piénsalo de nuevo.',
      img: 'https://i.pinimg.com/originals/77/6b/21/776b215bed3deeef47fd3aa657685a18.gif',
    },
    {
      id: 3,
      description: 'Vamos, atrévete a decir que sí.',
      img: 'https://media.tenor.com/DTmYqda3ZokAAAAi/peachandgoma.gif',
    },
    {
      id: 4,
      description: 'No tengas miedo, será genial.',
      img: 'https://i.pinimg.com/originals/e1/c3/88/e1c388133e0f998e25bb17c837b74a14.gif',
    },
    {
      id: 5,
      description: 'Confía en mí, será divertido.',
      img: 'https://media.tenor.com/Bn88VELdNI8AAAAi/peach-goma.gif',
    },
    {
      id: 6,
      description: 'No tengas dudas, te hará sonreír.',
      img: 'https://i.pinimg.com/originals/c6/b3/0d/c6b30d1a2dc178aeb92de63295d4ae64.gif',
    },
    {
      id: 7,
      description: 'Te prometo que será inolvidable.',
      img: 'https://media.tenor.com/N2oqtqaB_G0AAAAi/peach-goma.gif',
    },
    {
      id: 8,
      description: 'No dejes que el miedo te detenga.',
      img: 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif',
    },
    {
      id: 9,
      description: 'Confía en el destino, nos está dando una señal.',
      img: 'https://media.tenor.com/cbEccaK9QxMAAAAi/peach-goma.gif',
    },
    {
      id: 10,
      description: 'Confía en mí.',
      img: 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif',
    },
    {
      id: 11,
      description: 'No te arrepentirás.',
      img: 'https://media.tenor.com/I7KdFaMzUq4AAAAi/peach-goma.gif',
    },
    {
      id: 12,
      description: 'Ya pon que siiii',
      img: 'https://media.tenor.com/_4KFcz84OGMAAAAj/cute.gif',
    },
    {
      id: 13,
      description: 'Dale, no seas mala',
      img: 'https://media.tenor.com/Az64YfoL7JcAAAAj/rawr.gif',
    },
  ];

  const randomResponse = () => {
  if (noLocked) return; // 👈 BLOQUEO
  setNoLocked(true);

  mixpanel.track('Boton No Clickeado');
  setNoAttempts(prev => prev + 1);
  setSiButtonSize(prev => Math.min(prev + 0.15, 1.8));

  let randX = Math.random() * 40 + 5;
  let randY = Math.random() * 40 + 35;

  let index = Math.floor(Math.random() * random.length);
  setPosition('absolute');
  setButtonPosition({ top: randY, left: randX });
  setRandomValor(random[index]);

  // 🔓 se desbloquea después de moverse
  setTimeout(() => setNoLocked(false), 350);
};

  const getTitle = () => {
    if (noAttempts === 0) return "¿Quieres ser mi San Valentín?";
    if (noAttempts < 3) return "¿Quieres ser mi San Valentín? 🥺";
    if (noAttempts < 5) return "Por favoooor, di que sí 💕";
    if (noAttempts < 8) return "Te prometo que será genial 😊";
    return "Ya pon que SIIIII 😭❤️";
  };

  useEffect(() => {
    mixpanel.track('Pagina Cargada');
    setShowHearts(true);
  }, []);

  // Generar corazones flotantes (menos en móviles)
  const FloatingHearts = () => {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    const heartCount = window.innerWidth < 768 ? 8 : 15; // 8 en móvil, 15 en desktop
    
    return (
      <div className="floating-hearts">
        {[...Array(heartCount)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            {hearts[Math.floor(Math.random() * hearts.length)]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main
      id="canvas"
      className="w-screen relative h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center overflow-hidden"
    >
      {showHearts && <FloatingHearts />}
      
      {!valueSi ? (
        <div className="p-3 md:p-5 relative z-10 max-w-2xl w-full">
          <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl text-center mb-6 text-pink-700 px-2">
            {getTitle()}
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl">
            {/* OPCIÓN: Puedes mostrar una foto de ustedes aquí también */}
            {/* <div className="mb-4">
              <img
                src="/path-to-your-photo.jpg"
                alt="Nosotros"
                className="mx-auto object-cover w-full max-w-xs rounded-lg shadow-md"
              />
            </div> */}
            
            <img
              src={
                Object.keys(randomValor).length === 0
                  ? 'https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif'
                  : randomValor.img
              }
              alt="San Valentin"
              className="mx-auto object-cover h-[160px] md:h-[220px] rounded-lg"
            />
            
            {noAttempts > 0 && (
              <p className="text-center mt-3 text-sm md:text-base text-gray-600 animate-pulse">
                Intentos de escape: {noAttempts} 😏
              </p>
            )}
            
            <div className="relative z-30 flex justify-center">
  <button
    onClick={() => {
      mixpanel.track('Boton Si Clickeado');
      setValueSi(true);

      jsConfetti.addConfetti({
        emojis: ['😍', '🥰', '❤️', '😘', '💕', '💖'],
        emojiSize: 70,
        confettiNumber: 250,
      });
    }}
    style={{
      transform: `scale(${siButtonSize})`,
      transformOrigin: 'center',
      position: 'relative',
      zIndex: 30,
      pointerEvents: 'auto'
    }}
    className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold p-2.5 md:p-3 rounded-lg text-lg md:text-xl shadow-lg transition-all duration-300 active:scale-95"
  >
    Sí ❤️
  </button>
</div>
              
              {/* Botón No - se mueve cuando haces hover/click */}
             <button
  onTouchStart={(e) => {
    e.preventDefault();
    e.stopPropagation();
    randomResponse();
  }}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  style={{
    position: position,
    top: `${buttonPosition.top}%`,
    left: `${buttonPosition.left}%`,
    transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    zIndex: 10,
    touchAction: 'none' // 👈 MUY IMPORTANTE
  }}
  className="bg-gradient-to-r from-red-400 to-red-600 text-white min-w-40 md:min-w-48 font-bold p-2.5 md:p-3 rounded-lg text-base md:text-xl shadow-lg"
>
                {Object.keys(randomValor).length === 0
                  ? 'No'
                  : randomValor.description}
                <span hidden>
                  {
                    (document.title =
                      Object.keys(randomValor).length === 0
                        ? '¿Quieres ser mi San Valentín?'
                        : randomValor.description)
                  }
                  
                </span>
              </button>
            </div>
          </div>
        
      ) : (
        <div className="flex justify-center items-center flex-col space-y-6 p-4 relative z-10">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center animate-bounce text-pink-700 px-2">
            ¡Sabía que dirías que sí, Marlene! ❤️
          </h1>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-2xl">
            {/* Opción 1: Usa tu foto de pareja */}
            {/* <img
              src="/path-to-your-photo.jpg"
              alt="Nuestra foto"
              className="mx-auto rounded-lg shadow-lg max-w-xs md:max-w-md"
            /> */}
            
            {/* Opción 2: GIF de celebración (actual) */}
            <img
              src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif"
              alt="Celebración"
              className="mx-auto rounded-lg shadow-lg max-w-xs md:max-w-md"
            />
          </div>
          
          <p className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl text-gray-700 bg-white/70 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg mx-4">
            {noAttempts > 0 
              ? `¡Lo intentaste ${noAttempts} ${noAttempts === 1 ? 'vez' : 'veces'} pero sabía que terminarías diciendo que sí! 🥰`
              : "¡Sabía que eras la persona indicada! 💕"
            }
          </p>
          
          <span hidden>{(document.title = '¡Sabía que dirías que sí, Marlene! ❤️')}</span>
        </div>
      )}
    </main>
  );
}

export default App;