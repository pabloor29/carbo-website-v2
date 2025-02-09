import Bubble from "@/components/Bubble";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function AboutPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="Présentation" img="/IMG_0230.webp" />

      <div className="z-40 flex justify-center items-center pt-12 pb-24 lg:py-32 bg-whiteSmokedBG relative overflow-hidden">
        <div className="lg:w-3/5 w-5/6 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
          <img
            src="/worker.webp"
            alt=""
            className="shadow-[-25px_25px_0_0_#002E6D] lg:w-1/2 w-5/6"
          />
          <div className="lg:w-1/2 flex flex-col lg:space-y-8">
            <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
              Les loulous
            </h3>
            <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde eius exercitationem aliquid, molestias libero, similique quia, labore tempora deleniti ex repellendus quisquam voluptatibus molestiae delectus modi neque vero! Est dicta sequi dolorum exercitationem facere, ex, mollitia earum, repellat assumenda nesciunt autem porro omnis sit nostrum quidem rerum perspiciatis voluptatem eaque.
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
