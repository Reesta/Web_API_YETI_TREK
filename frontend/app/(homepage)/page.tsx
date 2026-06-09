import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Mountain,
  Shield,
  Headphones,
} from "lucide-react";

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/home.png"
        alt="Mountain"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8">
        <div className="max-w-[620px] pt-16">
          {/* Tagline */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-[2px] w-8 bg-[#D89A2B]" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D89A2B]">
              Your Journey. Our Expertise.
            </p>
          </div>

          {/* Heading */}
          <h1 className="leading-[0.95] font-extrabold">
            <span className="block text-6xl md:text-7xl text-white">
              Welcome to
            </span>

            <span className="block mt-2 text-6xl md:text-7xl text-[#D89A2B]">
              Yeti Trek
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-gray-300">
            Experience the Himalayas through the lens of
            local expertise and cutting-edge safety.
            Your journey to the roof of the world starts
            here.
          </p>

          {/* Button */}
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex items-center rounded-xl bg-[#D89A2B] px-8 py-4 text-base font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="absolute bottom-8 left-1/2 z-20 w-full max-w-6xl -translate-x-1/2 px-6">
        <div className="rounded-3xl border border-white/10 bg-[#07121D]/75 p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <Stat
              icon={<Users size={26} />}
              title="12,000+"
              subtitle="Happy Trekkers"
            />

            <Stat
              icon={<Mountain size={26} />}
              title="150+"
              subtitle="Expeditions"
            />

            <Stat
              icon={<Shield size={26} />}
              title="98%"
              subtitle="Summit Success"
            />

            <Stat
              icon={<Headphones size={26} />}
              title="24/7"
              subtitle="Support"
            />
          </div>
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
        <h3 className="text-3xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}