import { ArrowRight, Quote } from "lucide-react";

export default function KeynoteSpeaker() {
  return (
    <section
      id="keynote"
      className="py-28 bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Speaker Image */}

          <div className="relative">

            <img
              src="/images/speakers/keynote.jpg"
              alt="Keynote Speaker"
              className="w-full h-[650px] object-cover rounded-3xl shadow-2xl"
            />

            <div className="absolute bottom-6 left-6 bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold">
              Keynote Speaker
            </div>

          </div>

          {/* Speaker Details */}

          <div>

            <span className="uppercase tracking-[4px] text-cyan-400 font-semibold">
              Featured Keynote
            </span>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              Hon. Guest Name
            </h2>

            <p className="mt-4 text-2xl text-cyan-300 font-medium">
              Cabinet Secretary / Governor / CEO
            </p>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              Our keynote speaker is a distinguished leader whose work has
              transformed communities through innovation, leadership,
              entrepreneurship and public service. Their address will inspire
              young people to embrace opportunities and lead positive change.
            </p>

            {/* Quote */}

            <div className="mt-10 border-l-4 border-cyan-500 pl-6">

              <Quote className="text-cyan-400 mb-4" size={34} />

              <p className="text-2xl italic leading-relaxed">
                "The future of our nation depends on young people who dare
                to dream, innovate and lead with purpose."
              </p>

            </div>

            {/* CTA */}

            <button className="mt-12 inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-xl font-semibold transition">

              Meet All Speakers

              <ArrowRight size={20} />

            </button>

          </div>

        </div>

      </div>
    </section>
  );
}