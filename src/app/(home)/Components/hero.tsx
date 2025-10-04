import React from "react";

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MiLogo</h1>

        {/* Menú de navegación */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                MapaMundi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Informacion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
