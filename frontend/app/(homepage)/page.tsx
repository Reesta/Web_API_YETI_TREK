import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Mountain,
  Shield,
  Headphones,
  Tent,
} from "lucide-react";

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/home.png"
        alt="Mountain"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#03070d]/95 via-[#07101a]/55 to-[#120b05]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#04080e]/65 via-transparent to-[#04080e]/25" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-32 pt-24">
        <div className="max-w-[590px]">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[2px] w-7 bg-[#D89A2B]" />
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#D89A2B]">
              Your Journey. Our Expertise.
            </p>
          </div>

          <h1 className="leading-[0.95] font-extrabold">
            <span className="block text-6xl text-white md:text-7xl">
              Welcome to
            </span>

            <span className="mt-2 block text-6xl text-[#D89A2B] md:text-7xl">
              Yeti Trek
            </span>
          </h1>

          <p className="mt-7 max-w-[560px] text-xl leading-relaxed text-slate-200">
            Experience the Himalayas through the lens of
            local expertise and cutting-edge safety.
            Your journey to the roof of the world starts
            here.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-[#D89A2B] px-7 text-sm font-extrabold text-white shadow-lg transition hover:bg-[#e7ad3e]"
            >
              <Tent size={17} />
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-6">
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-[#07121D]/86 px-8 py-8 shadow-2xl backdrop-blur-xl md:grid-cols-4">
          <Stat
            icon={<Users size={28} />}
            title="12,000+"
            subtitle="Happy Trekkers"
          />

          <Stat
            icon={<Mountain size={28} />}
            title="150+"
            subtitle="Expeditions"
          />

          <Stat
            icon={<Shield size={28} />}
            title="98%"
            subtitle="Summit Success"
          />

          <Stat
            icon={<Headphones size={28} />}
            title="24/7"
            subtitle="Support"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[#D89A2B]">
        {icon}
      </div>

      <div>
        <h3 className="text-4xl font-black leading-none text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
