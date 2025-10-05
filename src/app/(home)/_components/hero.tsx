import Image from "next/image";

function Hero() {
  return (
    <section className="relative">
      <Image
        src="/lavanda.jpg"
        alt="Hero Image"
        width={1200}
        height={400}
        className="w-full h-[90vh] object-cover"
        />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 flex-col">
        <h1 className="font-floral text-8xl">BLOOM WATCH:</h1>
        <span className="font-floral text-4xl">Let’s go to watch flowers!</span>
      </div>
    </section>
  );
}

export default Hero;
