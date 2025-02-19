import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function MenuPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Menu" img="/IMG_0236.webp" />

      <div className="w-full flex justify-center items-center bg-whiteSmokedBG">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2024-2.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2024-3.webp"
            alt=""
          />
          <img
            className="w-full h-auto object-cover"
            src="/carteETE2024-4.webp"
            alt=""
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MenuPage;
