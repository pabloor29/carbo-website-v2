export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du restaurant CARBO à Carcassonne : collecte, traitement et protection de vos données personnelles conformément au RGPD.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/politique-confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
