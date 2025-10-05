import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  SiInstagram, 
  SiGithub
} from "react-icons/si";
import { 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaLeaf,
  FaHeart,
  FaArrowUp
} from "react-icons/fa";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#054017] via-[#0a5c1f] to-[#0d4519] text-white relative overflow-hidden">
      {/* Decorative flower pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🌸</div>
        <div className="absolute top-32 right-20 text-4xl">🌺</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">🌻</div>
        <div className="absolute top-20 right-1/3 text-3xl">🌷</div>
        <div className="absolute bottom-32 right-10 text-4xl">🌹</div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo and description section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image 
                width={200} 
                height={60} 
                src='/logo.png' 
                alt="FlorCast Logo" 
                className="brightness-110"
              />
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Advanced flowering prediction using artificial intelligence and 
              weather data to optimize agriculture and gardening.
            </p>
            <div className="flex items-center gap-2 text-green-200">
              <FaLeaf className="text-green-300" />
              <span className="text-sm">Sustainable technology for a green future</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-green-200 flex items-center gap-2">
              <FaLeaf className="text-green-300" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform"></span>
                  Interactive Map
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 text-green-200 flex items-center gap-2">
              <FaEnvelope className="text-green-300" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-green-100">
                <FaEnvelope className="text-green-300 flex-shrink-0" />
                <a target="_blank" href="mailto:florcastteam@gmail.com" className="hover:text-white transition-colors">
                  florcastteam@gmail.com
                </a>
              </li>
            
              <li className="flex items-start gap-3 text-green-100">
                <FaMapMarkerAlt className="text-green-300 flex-shrink-0 mt-1" />
                <span>National District,<br/>Dominican Republic</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-6 text-green-200 flex items-center gap-2">
              <FaHeart className="text-pink-400" />
              Follow Us
            </h3>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#" className="bg-green-700/50 hover:bg-green-600 p-3 rounded-full transition-all duration-300 hover:scale-110 group">
                <SiInstagram size={20} className="text-pink-300 group-hover:text-pink-200" />
              </a>
            
             
              <a href="https://github.com/Aurora-Moorealis/florcast-front" className="bg-green-700/50 hover:bg-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 group">
                <SiGithub size={20} className="text-gray-300 group-hover:text-gray-200" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-600/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
                  <p className="text-green-200">
                  © 2025 FLORCAST. All rights reserved.
                  </p>
                  <p className="text-green-300 text-xs mt-1">
                  Developed with 💚 for a greener world
                  </p>
                </div>

            {/* Legal links */}
            <div className="flex flex-wrap gap-6 text-sm">
                <Link href="/privacy" className="text-green-200 hover:text-white transition-colors">
                Privacy Policy
                </Link>
                <Link href="/terms" className="text-green-200 hover:text-white transition-colors">
                Terms of Use
                </Link>
              <Link href="https://api.florcast.earth/docs" className="text-green-200 hover:text-white transition-colors">
                API
              </Link>
              <Link href="/sources" className="text-green-200 hover:text-white transition-colors">
                Sources
              </Link>
            </div>

            {/* Scroll to top button */}
            <button 
              onClick={scrollToTop}
              className="bg-green-600 hover:bg-green-500 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Go to top"
            >
              <FaArrowUp className="text-white group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"></div>
    </footer>
  );
}

export default Footer;
