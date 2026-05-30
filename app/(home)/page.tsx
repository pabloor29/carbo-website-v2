export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import MainPage from "../../components/MainPage";
import Navbar from "../../components/Navbar";
import FormulaPopup from "@/components/FormulaPopup";
import { getMenuData, getMenuFileUrl } from "@/lib/menu";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CARBO - Restaurant Italien à Carcassonne | Pâtes Fraîches Maison",
  description: "CARBO — restaurant italien à Carcassonne, 11 rue Trivalle. Pâtes fraîches maison, cuisine italienne authentique, cocktails et carte des vins. Ouvert mar-sam. Réservez en ligne !",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr",
  },
};

export default async function Home() {
  const categories = await getMenuData();
  const formuleCategory = categories.find((c) => c.name === "Formule du midi");
  const formuleImages = formuleCategory?.files.map((f) => getMenuFileUrl(f.file_path)) ?? [];

  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <HeroBanner />
      <MainPage />
      <Footer />
      <Analytics />
      <FormulaPopup images={formuleImages} autoOpen={true} />
    </main>
  );
}
