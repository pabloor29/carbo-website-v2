import ContactForm from "@/components/ContactForm";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Réservation" img="" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
