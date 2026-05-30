export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getReservationConfig } from "@/lib/reservation";
import React from "react";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre table au restaurant CARBO à Carcassonne. Réservation en ligne rapide et simple. Restaurant italien, 11 rue Trivalle, Carcassonne.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/reservation",
  },
};

async function ReservationPage() {
  const config = await getReservationConfig();

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Réservation" video="/img/deco/bg_video.mp4" />
      <ContactForm
        closedWeekdays={config.closedWeekdays}
        closedDates={config.closedDates}
        holidayPeriods={config.holidayPeriods}
        timeSlots={config.timeSlots}
      />
      <Footer />
    </>
  );
}

export default ReservationPage;
