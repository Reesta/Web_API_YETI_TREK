import Link from "next/link";
import { Clock, Mountain } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth-action";

export default async function DashboardPage() {
  const response = await getCurrentUserAction();

  if (!response?.success || !response.data) {
    redirect("/login");
  }

  const user = response.data;

  const treks = [
    {
      title: "Everest Base Camp",
      image: "/mount.png",
      difficulty: "Hard",
      altitude: "5,364m",
      duration: "8 Days",
      text: "The classic journey to the foot of the world's highest peak.",
    },
    {
      title: "Annapurna Base Camp",
      image: "/home.png",
      difficulty: "Mod",
      altitude: "4,130m",
      duration: "7 Days",
      text: "A deep dive into the heart of the Annapurna massif.",
    },
    {
      title: "Gokyo Lakes",
      image: "/login.png",
      difficulty: "Hard",
      altitude: "4,790m",
      duration: "5 Days",
      text: "Emerald lakes and wide Himalayan views.",
    },
  ];

  return (
    <section className="flex flex-col gap-[18px]">
      <div className="flex items-center justify-between gap-[18px] max-[1000px]:flex-col max-[1000px]:items-start">
        <div>
          <h1 className="text-[32px] font-black leading-tight text-[#f3f5f6]">
            Welcome Back, {user.fullName}!
          </h1>
          <p className="mt-1.5 text-[15px] text-[#aeb8c3]">Ready for your next adventure?</p>
        </div>

      </div>

      <div className="flex min-h-[220px] items-end justify-between gap-6 overflow-hidden rounded-[14px] bg-[linear-gradient(90deg,rgba(5,11,18,0.78),rgba(5,11,18,0.2)),url('/home.png')] bg-cover bg-center px-8 py-7 max-[1000px]:min-h-[260px] max-[1000px]:flex-col max-[1000px]:items-start">
        <div>
          <h2 className="max-w-[520px] text-[34px] font-black leading-tight text-white">
            Majestic High-Altitude Lodge
          </h2>
          <p className="mt-5 max-w-[420px] text-base leading-relaxed text-[#e1e6ec]">
            Experience luxury and comfort at the heart of the Himalayas.
          </p>
        </div>
        <Link
          href="/dashboard/stay"
          className="flex h-12 min-w-40 items-center justify-center rounded-lg bg-[#e0a12b] font-black text-[#111]"
        >
          View Details
        </Link>
      </div>

      <div className="mt-0.5 flex items-center justify-between">
        <h2 className="text-[19px] font-black text-[#f4f4f4]">Popular Treks</h2>
        <span className="text-[13px] font-bold text-[#e0a12b]">View All</span>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
        {treks.map((trek) => (
          <article key={trek.title} className="overflow-hidden rounded-[13px] border border-white/10 bg-[#282c2d]">
            <div
              className="relative h-[158px] bg-cover bg-center"
              style={{ backgroundImage: `url(${trek.image})` }}
            >
              <span className="absolute right-3 top-3 rounded-full bg-[#b92026] px-2 py-1 text-[10px] font-black uppercase text-white">
                {trek.difficulty}
              </span>
            </div>
            <div className="p-[18px]">
              <h3 className="text-base font-black text-white">{trek.title}</h3>
              <p className="mt-2 min-h-[42px] text-[13px] leading-snug text-[#a7b0bb]">{trek.text}</p>

              <div className="mt-5 flex justify-between">
                <div className="grid gap-1">
                  <Mountain size={15} className="text-[#e0a12b]" />
                  <small className="text-[10px] font-black uppercase text-[#7f8b98]">Altitude</small>
                  <strong className="text-[13px] text-[#f3f3f3]">{trek.altitude}</strong>
                </div>
                <div className="grid gap-1">
                  <Clock size={15} className="text-[#e0a12b]" />
                  <small className="text-[10px] font-black uppercase text-[#7f8b98]">Duration</small>
                  <strong className="text-[13px] text-[#f3f3f3]">{trek.duration}</strong>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
