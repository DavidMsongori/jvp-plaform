import { gallery } from "../../../data/gallery";

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="uppercase tracking-[4px] text-cyan-600 font-semibold">
            Gallery
          </span>

          <h2 className="mt-5 text-5xl font-bold">
            Experience the Journey
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Moments from leadership forums, youth engagements,
            community outreach, networking events and JVP initiatives
            across Kenya's Coast Region.
          </p>

        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-16">

          {gallery.map((image) => (

            <img
              key={image}
              src={image}
              alt=""
              className="mb-6 rounded-3xl w-full hover:scale-[1.02] transition duration-300 shadow-lg"
            />

          ))}

        </div>

      </div>
    </section>
  );
}