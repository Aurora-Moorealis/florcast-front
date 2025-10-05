import Image from "next/image";
import Header from "../components/header";
import Hero from "./_components/hero";
import Footer from "../components/footer";
import WhatAre from "./_components/whatAre";
import HowWork from "./_components/howWork";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatAre />
        <HowWork />
        <Footer />
      </main>
    </>
  );
}
