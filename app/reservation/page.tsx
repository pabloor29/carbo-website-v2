import ContactForm from "@/components/ContactForm";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title="Réservation" video="/img/deco/bg_video.mp4" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
