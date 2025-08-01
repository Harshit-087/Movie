import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full px-10 py-12 flex flex-col items-center gap-10">
      {/* Logo and Branding */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.jpg"
          alt="Cine Logo"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold tracking-wide">CineVerse</h1>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm text-gray-300 w-full max-w-4xl">
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Basics</h2>
          <ul className="space-y-2">
            <li><Link href="/">About Us</Link></li>
            <li><Link href="/">Contact</Link></li>
            <li><Link href="/">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Movies</h2>
          <ul className="space-y-2">
            <li><Link href="/">Trending</Link></li>
            <li><Link href="/">Upcoming</Link></li>
            <li><Link href="/">Top Rated</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
          <ul className="space-y-2">
            <li><Link href="/">Help Center</Link></li>
            <li><Link href="/">Terms of Service</Link></li>
            <li><Link href="/">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Social</h2>
          <ul className="space-y-2">
            <li><Link href="/">Instagram</Link></li>
            <li><Link href="/">Twitter</Link></li>
            <li><Link href="/">YouTube</Link></li> 
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-sm text-gray-500 mt-6 text-center">
        © {new Date().getFullYear()} CineVerse. All rights reserved.
      </div>
    </footer>
  );
}
