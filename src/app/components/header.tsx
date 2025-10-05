"use client";

import React from "react";
import Images from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/map", label: "Map" },
    { href: "/about", label: "About Us" }
  ];

  return (
    <header className="bg-[#054017]/90 backdrop-blur-sm text-white fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo con efecto hover */}
        <div className="transition-transform duration-300 hover:scale-105">
          <Images 
            width={180} 
            height={10} 
            src='/logo.png' 
            alt="FlorcasT Logo" 
            className="drop-shadow-lg"
          />
        </div>

        {/* Menú de navegación con animaciones */}
        <nav>
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                              (item.href === "/" && pathname === "/") ||
                              (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <li key={item.href} className="relative nav-item">
                  <Link 
                    href={item.href} 
                    className={`
                      relative px-3 py-2 font-medium transition-all duration-300 ease-out
                      hover:text-yellow-300 group block
                      ${isActive ? 'text-yellow-300' : 'text-white'}
                    `}
                  >
                    {item.label}
                    
                    {/* Underline animado principal */}
                    <span className={`
                      absolute bottom-0 left-0 w-full h-0.5 
                      bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                      transform transition-all duration-500 ease-out origin-left
                      ${isActive 
                        ? 'scale-x-100 opacity-100' 
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }
                    `}></span>
                    
                    {/* Segundo underline para efecto de profundidad */}
                    <span className={`
                      absolute bottom-0.5 left-0 w-full h-px 
                      bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent
                      transform transition-all duration-600 ease-out origin-left delay-100
                      ${isActive 
                        ? 'scale-x-100 opacity-100' 
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }
                    `}></span>
                    
                    {/* Efecto de brillo en hover */}
                    <span className="
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
                      transform -skew-x-12 -translate-x-full transition-transform duration-800 ease-out
                      group-hover:translate-x-full
                    "></span>
                    
                    {/* Punto decorativo para item activo con resplandor */}
                    {isActive && (
                      <span className="
                        absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full
                        active-dot shadow-lg shadow-yellow-400/50
                      "></span>
                    )}
                    
                    {/* Efecto de hover superior */}
                    <span className={`
                      absolute top-0 left-0 w-full h-px 
                      bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent
                      transform transition-all duration-400 ease-out origin-center
                      scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100
                    `}></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Efecto de borde inferior animado */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
    </header>
  );
}

export default Header;
