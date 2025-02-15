import type { Route } from "./+types/home";
import { useEffect, useRef, useState, type FormEvent } from "react";
import JSConfetti from "js-confetti";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Valentines" },
    { name: "description", content: "Happy Valentines Day" },
  ];
}

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/to?name=${name}`);
  };

  return (
    <section className="grid place-items-center h-screen">
      <form
        className="bg-white p-8 rounded-xl max-w-lg w-full shadow"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-bold text-pink-600">Welcome</h1>
        <div className="grid gap-1.5 mt-4">
          <label className="font-medium text-sm">Who is this for?</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="rounded-0 bg-neutral-100 rounded-md border-0 focus-visible:ring-pink-500"
          />
        </div>
        <button
          type="submit"
          className="h-10 bg-pink-600 rounded-lg px-4 text-white mt-8 hover:opacity-70 font-semibold transition-all w-full disabled:opacity-30"
        >
          Send Valentine
        </button>
      </form>
    </section>
  );
}
