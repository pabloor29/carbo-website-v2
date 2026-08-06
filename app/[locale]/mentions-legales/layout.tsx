export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import React from "react";
import { alternatesFor } from "@/lib/i18n-meta";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  return {
    title: "Mentions légales",
    description: "Mentions légales du restaurant CARBO à Carcassonne : éditeur du site, hébergeur, propriété intellectuelle.",
    alternates: alternatesFor(locale, "/mentions-legales"),
    robots: { index: true, follow: true },
  };
}

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
