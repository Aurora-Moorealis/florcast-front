"use client";

import Images from "next/image";
import { forwardRef } from "react";

interface WhatAreProps {
  className?: string;
}

const WhatAre = forwardRef<HTMLDivElement, WhatAreProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-x-20 my-6 px-20 py-16 ${
          className || ""
        }`}
      >
        <div className="flex-1">
          <h2 className="section-title text-[#366b2b] text-4xl font-second font-bold mb-6">
            What is BloomWatch?
          </h2>
          <p className="section-text text-black text-balance text-left mt-3 text-lg leading-relaxed">
            We are a project that combines science, technology and nature to
            predict and visualize flowering events. Our goal is to offer an
            accessible tool that benefits communities, farmers, beekeepers, and
            scientist, promoting a greater understanding of the importance of
            flowers and their environmental impact.
          </p>

          {/* Elementos decorativos */}
          <div className="mt-8 flex space-x-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <Images
              width={400}
              height={400}
              src="/redFlower2.jpg"
              alt="Campo de flores - What we are"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay decorativo */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full opacity-30 animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }
);

WhatAre.displayName = "WhatAre";

export default WhatAre;
