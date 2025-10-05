"use client";

import Images from "next/image";
import { forwardRef } from "react";

interface FlorcastMapProps {
  className?: string;
}

const FlorcastMap = forwardRef<HTMLElement, FlorcastMapProps>(({ className }, ref) => {
  return (
    <section ref={ref} className={`about-animate ${className || ''}`}>
      <div className="map-title flex items-center my-6 px-10 bg-gradient-to-r from-[#307b8e] to-[#4a9bb8] text-center py-8 rounded-lg mx-6 shadow-2xl relative overflow-hidden">
        <div className="map-element absolute inset-0 bg-gradient-to-r from-blue-400/20 to-teal-400/20 animate-pulse"></div>
        
        <Images 
          width={48} 
          height={48} 
          src="/logo-flor.png" 
          alt="FlorcasT Logo" 
          className="map-element p-1 relative z-10 animate-spin-slow hover:animate-bounce transition-all duration-300" 
        />
        
        <h1 className="map-element bg-transparent font-floral text-white text-2xl md:text-3xl ml-4 tracking-wider relative z-10">
          FLORCAST MAP
        </h1>
        
        {/* Elementos decorativos */}
        <div className="decorative-element absolute top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="decorative-element absolute bottom-2 right-8 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      </div>

      {/* Contenido principal */}
      <div className="map-container flex items-center gap-x-20 my-6 px-20 py-16 relative">
        {/* Texto y descripción */}
        <div className="flex-1 relative z-10">
          <h2 className="about-animate font-second text-[#366b2b] text-4xl font-bold mb-6 relative">
            Who we are?
            <div className="decorative-element absolute -top-2 -right-6 w-8 h-8 bg-green-200 rounded-full opacity-60"></div>
          </h2>
          
          <div className="about-animate space-y-4">
            <p className="text-black text-balance text-left text-lg leading-relaxed">
              We are a project that combines science, technology and nature to
              predict and visualize flowering events. Our goal is to offer an
              accessible tool that benefits communities, farmers, beekeepers, and
              scientist, promoting a greater understanding of the importance of
              flowers and their environmental impact.
            </p>
            
            {/* Características destacadas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="about-animate bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="text-green-600 font-semibold flex items-center">
                  🔬 <span className="ml-2">Science & Technology</span>
                </span>
              </div>
              
              <div className="about-animate bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                   <span className="ml-2">Flowering Predictions</span>
              </div>
              
              <div className="about-animate bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="text-yellow-600 font-semibold flex items-center">
                  👥 <span className="ml-2">Community Focus</span>
                </span>
              </div>
              
              <div className="about-animate bg-purple-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="text-purple-600 font-semibold flex items-center">
                  🌱 <span className="ml-2">Environmental Impact</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Imagen con efectos */}
        <div className="flex-1 relative">
          <div className="about-animate relative">
            <Images 
              width={400} 
              height={400} 
              src="/campoFlores.jpg" 
              alt="Campo de flores - Quienes somos" 
              className="map-element rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105" 
            />
            
            {/* Elementos decorativos flotantes */}
            <div className="decorative-element absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-30 animate-bounce"></div>
            <div className="decorative-element absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-40 animate-pulse"></div>
            <div className="decorative-element absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-50 animate-ping"></div>
            
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

FlorcastMap.displayName = "FlorcastMap";

export default FlorcastMap;
