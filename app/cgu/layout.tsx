export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation du site du restaurant CARBO à Carcassonne.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/cgu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CguLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
