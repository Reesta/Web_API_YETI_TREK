import Link from "next/link";

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07121D] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07121D]/80 backdrop-blur-md">
      
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-extrabold text-white"
          >
            Yeti Trek
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
            <Link href="#">Explore</Link>
            <Link href="#">Travel Blog</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Destinations</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-[#D89A2B] px-200 py-200 text-sm font-semibold text-black transition hover:bg-[#cbe7c3]"
            >
              Login 
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-[#D89A2B] px-200 py-200 text-sm font-semibold text-black transition hover:bg-[#e4ab44]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#08131E] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <h3 className="text-2xl font-bold text-[#D89A2B]">
                Yeti Trek
              </h3>

              <p className="mt-4 text-gray-400">
                Explore the Himalayas with expert guides,
                unforgettable adventures, and local
                expertise.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Company
              </h4>

              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Popular Treks
              </h4>

              <ul className="space-y-2 text-gray-400">
                <li>Everest Base Camp</li>
                <li>Annapurna Base Camp</li>
                <li>Langtang Valley</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">
                Contact
              </h4>

              <ul className="space-y-2 text-gray-400">
                <li>info@yetitrek.com</li>
                <li>+977 9800000000</li>
                <li>Kathmandu, Nepal</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500">
            © 2025 Yeti Trek. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}