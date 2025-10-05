"use client";

import Image from "next/image";
import { forwardRef } from "react";

interface HeroProps {
  className?: string;
}

const Hero = forwardRef<HTMLElement, HeroProps>(({ className }, ref) => {
  return (
    <section ref={ref} className={`relative overflow-hidden ${className || ''}`}>
      <Image
        src="/lavanda.jpg"
        alt="Hero Image"
        width={1200}
        height={400}
        className="hero-image w-full h-[90vh] object-cover"
        priority
        />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 via-black/50 to-black/70 flex-col">
        <h1 className="hero-title font-floral text-4xl md:text-6xl lg:text-8xl text-white text-center px-4 drop-shadow-2xl">
          BLOOM WATCH:
        </h1>
        <span className="hero-subtitle font-floral text-xl md:text-2xl lg:text-4xl text-white/90 text-center px-4 mt-4 drop-shadow-xl">
          Let&apos;s go to watch flowers!
        </span>
        
        <div className="absolute top-20 left-20 animate-bounce">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 right-16 animate-pulse">
          <div className="w-6 h-6 bg-pink-400 rounded-full opacity-50"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-purple-400 rounded-full opacity-70"></div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
