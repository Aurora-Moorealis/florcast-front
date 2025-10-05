import Images from "next/image";

function HowWork() {
  return (
    <section>
      <div className="flex items-center my-6 px-10 bg-[#307b8e] text-center">
        <Images
          width={48}
          height={48}
          src="/logo-flor.png"
          alt="Logo"
          className="p-1"
        />
        <h1 className="bg-[#307b8e] font-floral text-3xl">
          FLORCAST MAP ---------------------------------------------
        </h1>
      </div>
      <div className="flex items-center gap-x-20 my-6 px-20">
        <div className="flex-1">
          <h2 className="text-[#366b2b] text-4xl font-bold">
            How does it works?
          </h2>
          <p className="text-black text-balance text-left mt-3">
            Our system collects and analyzes bloom data using observations,
            sensors, and predictive models.We provide the following data:
            </p>
            <p className="text-black text-balance text-left mt-3">
            Vegetation Greenness (NDVI/EV) Plant Health (NDRE) Bloom Map (LVI)
            Flowering Areas (Bloom detection) Upcoming Blooms (Prediction Layer)
            Bloom Type (Early,normal or late)
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
    </section>
  );
}

export default HowWork;
