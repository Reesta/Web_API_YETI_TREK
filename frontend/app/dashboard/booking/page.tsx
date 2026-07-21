import Link from "next/link";
import { ArrowRight, BedDouble, Footprints, History } from "lucide-react";

const bookingOptions = [
  {
    title: "Book a trek",
    description: "Choose a trail, review its itinerary, and reserve your trek package.",
    href: "/dashboard/trails",
    icon: Footprints,
  },
  {
    title: "Book a stay",
    description: "Browse mountain lodges and reserve the stay that suits your route.",
    href: "/dashboard/stay",
    icon: BedDouble,
  },
];

export default function BookingPage() {
  return (
    <main className="mx-auto w-full max-w-5xl py-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e9a127]">
        Reservations
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
        Start a booking
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
        Select what you would like to reserve. You will choose a specific trail or
        lodge before entering your booking details.
      </p>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {bookingOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Link
              key={option.title}
              href={option.href}
              className="group rounded-3xl border border-white/10 bg-[#101925]/80 p-7 transition hover:-translate-y-1 hover:border-[#e9a127]/45 hover:bg-[#14202e]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e9a127]/15 text-[#e9a127]">
                <Icon size={23} />
              </span>
              <h2 className="mt-6 text-2xl font-black text-white">{option.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {option.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#e9a127]">
                Browse options
                <ArrowRight size={17} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </section>

      <Link
        href="/dashboard/booking-history"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-white/25 hover:text-white"
      >
        <History size={17} />
        View booking history
      </Link>
    </main>
  );
}
