"use client";

import Image from "next/image";
import Header from "../components/header";
import Hero from "./_components/hero";
import Footer from "../components/footer";
import WhatAre from "./_components/whatAre";
import HowWork from "./_components/howWork";
import { useGsapAnimations } from "./_components/hooks/useGsapAnimations";

export default function Home() {
  const { heroRef, whatAreRef, howWorkRef } = useGsapAnimations();

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero ref={heroRef} />
        <WhatAre ref={whatAreRef} />
        <HowWork ref={howWorkRef} />
        <Footer />
      </main>
    </>
  );
}
