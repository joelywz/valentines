import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";
import JSConfetti from "js-confetti";
import { useSearchParams } from "react-router";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Valentines" },
    { name: "description", content: "Happy Valentines Day" },
  ];
}



const emojis = [
  '❤️', '💖', '💗', '💓', '💕', '💞', '💘', '💝', '💟', // Love and hearts  
  '🌹', '💐', '🥀', // Flowers  
  '💌', '📜', '✉️', // Love letters  
  '🧸', '🎁', '🎀', // Gifts and teddy bears  
  '🍫', '🍬', '🍩', '🍪', '🍰', '🍷', '🍾', // Sweet treats and drinks  
  '💑', '👩‍❤️‍👨', '👩‍❤️‍👩', '👨‍❤️‍👨', // Couples and love  
  '❤️‍🔥', // Passion and love healing  
  '😍', '😘', '😻', // Romantic expressions  
];


export default function To() {
  const [searchParams] = useSearchParams();
  const confetti = useRef<JSConfetti>(null);
  const [count, setCount] = useState(0);
  const [isCrazy, setIsCrazy] = useState(false);
  const [isRunning, setIsRunning] = useState(false);


  useEffect(() => {

    const jsConfetti = new JSConfetti();
    confetti.current = jsConfetti;

    return () => {
      jsConfetti.destroyCanvas();
    }

  }, [])

  const handleClick = async () => {
    setIsRunning(true);
    setCount(prev => ++prev);

    let times = isCrazy ? 30 : 1


    for (let i = 0; i < times; i++) {
      const randomEmojis = emojis.sort(() => Math.random() - 0.5).slice(0, 5);

      confetti.current?.addConfetti({
        emojis: randomEmojis,
      });

      await new Promise(res => setTimeout(res, 15));
    }

    setIsRunning(false);

  }



  return (
    <section className="grid place-items-center h-screen">
      <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow">
        <h1>Dear <span className="font-bold">{ searchParams.get('name') ?? 'Friend'}</span>,</h1>
        <p className="mt-4">
          May your heart ❤️ be filled with joy, love, and wonderful moments.
        </p>
        <p className="mt-4 font-bold text-pink-500">
          Happy Valentines Day
        </p>

        <button className="h-10 bg-pink-600 rounded-lg px-4 text-white mt-8 hover:opacity-70 font-semibold transition-all w-full disabled:opacity-30" onClick={handleClick} disabled={isRunning}>
          Click Me
        </button>

        {count > 0 && <div className="flex items-center mt-2 justify-center">
          <input id="crazy" type="checkbox" className="text-pink-500 rounded-sm focus:ring-pink-500" checked={isCrazy} onChange={() => setIsCrazy(prev => !prev)} />
          <label className="pl-2" htmlFor="crazy">I'm greedy</label>
        </div>}
      </div>
    </section>
  )
}
