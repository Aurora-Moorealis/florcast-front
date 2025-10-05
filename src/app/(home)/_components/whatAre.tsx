import Images from "next/image";

function WhatAre() {
  return (
    <div className="flex items-center gap-x-20 my-6 px-20">
      <div className="flex-1">
        <h2 className="text-[#366b2b] text-4xl font-bold">What we are?</h2>
        <p className="text-black text-balance text-left mt-3">
          We are a project that combines science, technology and nature to
          predict and visualize flowering events. Our goal is to offer an
          accessible tool that benefits communities, farmers, beekeepers, and
          scientist, promoting a greater understanding of the importance of
          flowers and their environmental impact.
        </p>
      </div>
      <div className="flex-1">
        <Images
          width={400}
          height={400}
          src="/campoFlores.jpg"
          alt="Logo"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default WhatAre;
