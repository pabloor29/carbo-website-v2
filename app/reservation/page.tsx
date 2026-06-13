import type { Metadata } from "next";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReservationMaintenance from "@/components/ReservationMaintenance";
import React from "react";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre table au restaurant CARBO à Carcassonne. Réservation en ligne rapide et simple. Restaurant italien, 11 rue Trivalle, Carcassonne.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/reservation",
  },
};

async function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Réservation" video="/img/deco/bg_video.mp4" />
      <ReservationMaintenance />
      <Footer />
    </>
  );
}

export default ReservationPage;
