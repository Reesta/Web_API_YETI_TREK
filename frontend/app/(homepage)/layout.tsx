import Link from "next/link";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070b13] text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#070b13]/92 backdrop-blur-xl">
        <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[180px_1fr_180px] items-center px-6">
          <div />

          <div className="hidden items-center justify-center gap-9 text-sm font-medium text-slate-300 md:flex">
            <Link href="#" className="border-b-2 border-[#D89A2B] pb-2 text-[#D89A2B]">Explore</Link>
            <Link href="#" className="transition hover:text-white">Travel Blog</Link>
            <Link href="#" className="transition hover:text-white">About</Link>
            <Link href="#" className="transition hover:text-white">Contact Us</Link>
            <Link href="#" className="transition hover:text-white">Destinations</Link>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition hover:border-[#D89A2B] hover:text-[#D89A2B]"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-[#D89A2B] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#e7ad3e]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
