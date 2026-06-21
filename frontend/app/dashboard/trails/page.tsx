import { Clock, MapPin, Mountain } from "lucide-react";

const trails = [
  {
    title: "Everest Base Camp",
    region: "Khumbu",
    altitude: "5,364m",
    duration: "8 Days",
    image: "/mount.png",
    difficulty: "Hard",
  },
  {
    title: "Annapurna Base Camp",
    region: "Annapurna",
    altitude: "4,130m",
    duration: "7 Days",
    image: "/home.png",
    difficulty: "Mod",
  },
  {
    title: "Gokyo Lakes",
    region: "Everest",
    altitude: "4,790m",
    duration: "5 Days",
    image: "/login.png",
    difficulty: "Hard",
  },
];

export default function TrailsPage() {
  return (
    <section className="grid gap-5">
      <div>
        <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#e0a12b]">Trails</p>
        <h1 className="text-[32px] font-black leading-tight text-[#f3f5f6]">Trekking Trails</h1>
        <span className="mt-1.5 block text-[15px] text-[#aeb8c3]">
          Browse routes that can share the same backend data with Flutter.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
        {trails.map((trail) => (
          <article key={trail.title} className="overflow-hidden rounded-[13px] border border-white/10 bg-[#282c2d]">
            <div
              className="relative h-[158px] bg-cover bg-center"
              style={{ backgroundImage: `url(${trail.image})` }}
            >
              <span className="absolute right-3 top-3 rounded-full bg-[#b92026] px-2 py-1 text-[10px] font-black uppercase text-white">
                {trail.difficulty}
              </span>
            </div>
            <div className="p-[18px]">
              <h3 className="text-base font-black text-white">{trail.title}</h3>
              <p className="mt-2 min-h-[42px] text-[13px] leading-snug text-[#a7b0bb]">
                {trail.region} route with high-altitude views and guided stops.
              </p>

              <div className="mt-5 flex justify-between">
                <div className="grid gap-1">
                  <MapPin size={15} className="text-[#e0a12b]" />
                  <small className="text-[10px] font-black uppercase text-[#7f8b98]">Region</small>
                  <strong className="text-[13px] text-[#f3f3f3]">{trail.region}</strong>
                </div>
                <div className="grid gap-1">
                  <Mountain size={15} className="text-[#e0a12b]" />
                  <small className="text-[10px] font-black uppercase text-[#7f8b98]">Altitude</small>
                  <strong className="text-[13px] text-[#f3f3f3]">{trail.altitude}</strong>
                </div>
                <div className="grid gap-1">
                  <Clock size={15} className="text-[#e0a12b]" />
                  <small className="text-[10px] font-black uppercase text-[#7f8b98]">Duration</small>
                  <strong className="text-[13px] text-[#f3f3f3]">{trail.duration}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
