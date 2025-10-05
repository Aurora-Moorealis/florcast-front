import React from "react";
import Images from "next/image";

function Header() {
  return (
    <header className="bg-[#054017]/90 text-white fixed top-0 left-0 right-0 z-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Images width={180} height={10} src='/logo.png' alt="Logo" />

        {/* Menú de navegación */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/map" className="hover:text-gray-200">
                Map
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200">
                About Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
