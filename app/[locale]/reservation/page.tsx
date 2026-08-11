import type { Metadata } from "next";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import ContactForm from "@/components/ContactForm";
import { getReservationConfig } from "@/lib/reservation";
import { getRestaurantContact } from "@/lib/restaurant-contact";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/lib/i18n-meta";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("reservationTitle"),
    description: t("reservationDescription"),
    alternates: alternatesFor(locale, "/reservation"),
  };
}

async function ReservationPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const config = await getReservationConfig();
  const contact = await getRestaurantContact();
  const heroTitle = (await getTranslations("hero"))("reservation");

  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title={heroTitle} video="/img/deco/bg_video.mp4" />
      <ContactForm
        closedWeekdays={config.closedWeekdays}
        closedDates={config.closedDates}
        holidayPeriods={config.holidayPeriods}
        timeSlots={config.timeSlots}
        lunchSlots={config.lunchSlots}
        dinnerSlots={config.dinnerSlots}
        dayServices={config.dayServices}
        disabledSlotsByDate={config.disabledSlotsByDate}
        phone={contact.phone}
        email={contact.email}
      />
      <Footer />
    </>
  );
}

export default ReservationPage;
