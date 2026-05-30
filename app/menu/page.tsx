export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FormulaPopup from "@/components/FormulaPopup";
import { getMenuData, getMenuFileUrl } from "@/lib/menu";
import React from "react";

export const metadata: Metadata = {
  title: "Menu & Carte",
  description: "Découvrez la carte de CARBO : pâtes fraîches maison, plats italiens authentiques, carte des vins et cocktails. Restaurant italien à Carcassonne, 11 rue Trivalle.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/menu",
  },
};

async function MenuPage() {
  const categories = await getMenuData();

  const menusCategory = categories.find((c) => c.name === "Menus");
  const formuleCategory = categories.find((c) => c.name === "Formule du midi");

  const menuImages = menusCategory?.files.map((f) => getMenuFileUrl(f.file_path)) ?? [];
  const formuleImages = formuleCategory?.files.map((f) => getMenuFileUrl(f.file_path)) ?? [];

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Menu" video="/img/deco/bg_video.mp4" />

      <div className="w-full flex justify-center items-center bg-whiteSmokedBG">
        <div className="lg:w-3/5 w-11/12 flex flex-col items-center justify-center py-20 space-y-6">
          {menuImages.map((src, i) => (
            <img
              key={i}
              className="w-full h-auto object-cover"
              src={src}
              alt={`Carte CARBO ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <FormulaPopup
        images={formuleImages}
        showFloatingButton={true}
      />

      <Footer />
    </>
  );
}

export default MenuPage;
