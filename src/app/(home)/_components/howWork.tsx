"use client";

import Images from "next/image";
import { forwardRef } from "react";

interface HowWorkProps {
  className?: string;
}

const HowWork = forwardRef<HTMLElement, HowWorkProps>(({ className }, ref) => {
  return (
    <section ref={ref} className={className}>
      {/* Header con animación */}
      <div className="work-header flex items-center my-6 px-10 bg-gradient-to-r from-[#307b8e] to-[#4a9bb8] text-center py-6 rounded-lg mx-6 shadow-xl">
        <Images
          width={48}
          height={48}
          src="/logo-flor.png"
          alt="FlorcasT Logo"
          className="p-1 animate-spin-slow"
        />
        <h1 className="font-floral text-white text-3xl ml-4 tracking-wider">
          FLORCAST MAP
        </h1>
      </div>

      <div className="flex items-center gap-x-20 my-6 px-20 py-16">
        <div className="flex-1">
          <h2 className="work-title font-second text-[#366b2b] text-4xl font-bold mb-6">
            How does it works?
          </h2>

          <div className="space-y-4">
            <p className="work-text text-black text-balance text-left text-lg leading-relaxed">
              Our system collects and analyzes bloom data using observations,
              sensors, and predictive models. We provide the following data:
            </p>

            <div className="work-text grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-green-600 font-semibold">
                  🌱 Vegetation Greenness
                </span>
                <p className="text-sm text-gray-600 mt-1">(NDVI/EV)</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-blue-600 font-semibold">
                  💚 Plant Health
                </span>
                <p className="text-sm text-gray-600 mt-1">(NDRE)</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-purple-600 font-semibold">
                  🗺️ Bloom Map
                </span>
                <p className="text-sm text-gray-600 mt-1">(LVI)</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-yellow-600 font-semibold">
                  🌺 Flowering Areas
                </span>
                <p className="text-sm text-gray-600 mt-1">(Bloom detection)</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-pink-600 font-semibold">
                  🔮 Upcoming Blooms
                </span>
                <p className="text-sm text-gray-600 mt-1">(Prediction Layer)</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-orange-600 font-semibold">
                  ⏰ Bloom Type
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  (Early, Normal or Late)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <Images
              width={400}
              height={400}
              src="/redFLower.jpg"
              alt="Como funciona - Campo de flores"
              className="work-image rounded-lg shadow-2xl"
            />
            {/* Elementos decorativos flotantes */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute top-1/2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-ping opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HowWork;
