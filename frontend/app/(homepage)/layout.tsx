import Link from "next/link";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07121D] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07121D]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
          >
            Yeti Trek
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link href="#" className="hover:text-white transition">Explore</Link>
            <Link href="#" className="hover:text-white transition">Travel Blog</Link>
            <Link href="#" className="hover:text-white transition">About</Link>
            <Link href="#" className="hover:text-white transition">Contact Us</Link>
            <Link href="#" className="hover:text-white transition">Destinations</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Login Button */}
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Login
            </Link>

            {/* Signup Button */}
            <Link
              href="/register"
              className="rounded-full bg-[#D89A2B] px-5 py-2 text-sm font-semibold text-black transition hover:scale-105"
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