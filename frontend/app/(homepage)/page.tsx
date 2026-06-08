import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Shield,
  Mountain,
  Headphones,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/home.png"
          alt="Himalayan Mountain"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8 md:px-12 lg:px-20">
          <div className="max-w-[620px]">
            {/* Tagline */}
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-10 bg-[#D89A2B]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D89A2B]">
                Your Journey. Our Expertise.
              </p>
            </div>

            {/* Heading */}
            <h1 className="font-extrabold leading-[0.95]">
              <span className="block text-6xl md:text-7xl text-white">
                Welcome to
              </span>

              <span className="mt-2 block text-6xl md:text-7xl text-[#D89A2B]">
                Yeti Trek
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-[560px] text-lg leading-[1.5] text-gray-300 md:text-xl">
              Experience the Himalayas through the lens of
              local expertise and cutting-edge safety.
              Your journey to the roof of the world starts
              here.
            </p>

            {/* Buttons */}
            {/* Buttons */}
            <div className="mt-20 flex flex-wrap gap-5">
              <Link
                href="/register"
                className="rounded-2xl bg-[#D89A2B] px-8 py-4 text-base font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Link>

              <button className="rounded-xl border border-white/20 bg-black/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-black/50">
                View Expeditions
              </button>
            </div>

            
          </div>
        </div>

        {/* Stats Card */}
        <div className="absolute bottom-8 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-6">
          <div className="rounded-3xl border border-white/10 bg-[#07121D]/80 p-8 backdrop-blur-xl">
            <div className="grid gap-8 md:grid-cols-4">
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
        </div>
      </section>
    </>
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
        <h3 className="text-3xl font-bold text-white">
          {title}
        </h3>

        <p className="text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}