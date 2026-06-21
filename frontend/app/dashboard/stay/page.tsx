import {
  ArrowRight,
  Bath,
  Briefcase,
  Flame,
  Heater,
  Soup,
  Sparkles,
  Utensils,
  Wifi,
} from "lucide-react";

const stays = [
  {
    name: "Yeti Mountain Home",
    price: "$850",
    image: "/stay1.png",
    description:
      "Khumbu Region. A pinnacle of comfort at 3,800m featuring heated beds, gourmet cuisine,",
    amenities: [Wifi, Briefcase, Flame],
  },
  {
    name: "Ama Dablam Lodge",
    price: "$1,200",
    image: "/stay2.png",
    description:
      "Everest Base. High-tech shelter with pressurized suites and a 24/7 expedition support",
    amenities: [Heater, Sparkles, Briefcase],
  },
  {
    name: "Mustang Royal Retreat",
    price: "$550",
    image: "/stay3.png",
    description:
      "Upper Mustang. A bridge between tradition and luxury in the forbidden kingdom.",
    amenities: [Bath, Utensils, Soup],
  },
  {
    name: "Machapuchare Lodge",
    price: "$320",
    image: "/stay4.png",
    description:
      "Annapurna South. Serene forest retreat with therapeutic hot springs and organic farm",
    amenities: [Soup, Flame, Sparkles],
  },
  {
    name: "Langtang Zenith",
    price: "$950",
    image: "/stay5.png",
    description:
      "Langtang Valley. An architectural marvel perched at 4,200m, offering unmatched",
    amenities: [Sparkles, Heater, Utensils],
  },
  {
    name: "Thorang La Base",
    price: "$480",
    image: "/stay6.png",
    description:
      "Annapurna Circuit. Essential high-altitude refuge for trekkers crossing the pass,",
    amenities: [Bath, Briefcase, Soup],
  },
];

export default function StayPage() {
  return (
    <section className="grid gap-6">
      <div className="flex min-h-[260px] items-end overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,rgba(2,9,16,0.06),rgba(2,9,16,0.82)),url('/stay.png')] bg-cover bg-[center_42%] px-14 py-10 max-[1000px]:min-h-[220px] max-[1000px]:p-7">
        <h1 className="max-w-[720px] text-[34px] font-black leading-tight text-white max-[1000px]:text-[30px]">
          Elite Stays in the High Himalayas
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-8 max-[1000px]:grid-cols-1 max-[1000px]:gap-5 min-[701px]:max-[1000px]:grid-cols-2">
        {stays.map((stay) => (
          <article key={stay.name} className="min-w-0 overflow-hidden rounded-[18px] bg-[#0d1314] shadow-2xl shadow-black/25">
            <div
              className="relative h-[148px] bg-cover bg-center after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#020910]/0 after:to-[#020910]/15"
              style={{ backgroundImage: `url(${stay.image})` }}
            >
              
            </div>

            <div className="flex min-h-[238px] flex-col px-7 pb-5 pt-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="max-w-[150px] text-[22px] font-medium leading-tight text-white max-[1000px]:max-w-none">
                  {stay.name}
                </h2>
                <div className="grid justify-items-end pt-1">
                  <strong className="text-[22px] font-black leading-none text-[#e9a127]">{stay.price}</strong>
                  <span className="mt-0.5 text-[10px] text-[#909794]">/night</span>
                </div>
              </div>

              <p className="mt-5 max-w-[220px] text-xs leading-relaxed text-[#b4bcb8] max-[1000px]:max-w-none">
                {stay.description}...
              </p>

              <div className="mt-auto flex items-end justify-between gap-4">
                <div className="flex min-h-[42px] items-end gap-3 text-[#e9a127]">
                  {stay.amenities.map((Icon, index) => (
                    <Icon key={`${stay.name}-${index}`} size={15} />
                  ))}
                </div>
                <button
                  aria-label={`View ${stay.name}`}
                  className="flex h-[52px] w-[52px] shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[#e9a127] text-[#121a18]"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
