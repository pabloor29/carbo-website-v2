export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du restaurant CARBO à Carcassonne : éditeur du site, hébergeur, propriété intellectuelle.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
