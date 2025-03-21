import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function MenuPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Menu" video="/img/deco/bg_video.mp4" />

      <div className="w-full flex justify-center items-center bg-whiteSmokedBG">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/MENU_MARS_2025.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/CARBO_CARTE_DES_VINS.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/img/menu/CARBO_CARTE_COCKTAILS.webp"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MenuPage;
