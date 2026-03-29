import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CARBO - Restaurant Italien à Carcassonne",
    template: "%s | CARBO - Restaurant Italien Carcassonne",
  },
  description: "Découvrez CARBO, restaurant italien à Carcassonne. Pâtes fraîches maison, cuisine italienne authentique, cocktails et vins. 11 rue Trivalle, Carcassonne. Réservez en ligne !",
  keywords: [
    "restaurant Carcassonne",
    "restaurant italien Carcassonne",
    "resto italien Carcassonne",
    "cuisine italienne Carcassonne",
    "pâtes fraîches Carcassonne",
    "nouveau restaurant italien Carcassonne",
    "restaurant 11000",
    "CARBO restaurant",
    "restaurant rue Trivalle Carcassonne",
    "meilleur restaurant Carcassonne",
    "restaurant pâtes Carcassonne",
    "réservation restaurant Carcassonne",
  ],
  authors: [{ name: "CARBO" }],
  creator: "CARBO",
  metadataBase: new URL("https://www.restaurant-carbo.fr"),
  alternates: {
    canonical: "https://www.restaurant-carbo.fr",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.restaurant-carbo.fr",
    siteName: "CARBO - Restaurant Italien Carcassonne",
    title: "CARBO - Restaurant Italien à Carcassonne",
    description: "Découvrez CARBO, restaurant italien à Carcassonne. Pâtes fraîches maison, cuisine italienne authentique, cocktails et vins. Réservez en ligne !",
    images: [
      {
        url: "/img/deco/carbo.webp",
        width: 1200,
        height: 630,
        alt: "CARBO - Restaurant italien à Carcassonne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARBO - Restaurant Italien à Carcassonne",
    description: "Découvrez CARBO, restaurant italien à Carcassonne. Pâtes fraîches maison, cuisine italienne authentique.",
    images: ["/img/deco/carbo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/img/logo/CARBO-LOGO-1.webp",
    apple: "/img/logo/CARBO-LOGO-1.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "CARBO",
  "url": "https://www.restaurant-carbo.fr",
  "image": "https://www.restaurant-carbo.fr/img/deco/carbo.webp",
  "telephone": "+33434422749",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11 rue Trivalle",
    "addressLocality": "Carcassonne",
    "postalCode": "11000",
    "addressCountry": "FR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.2094833,
    "longitude": 2.3615143,
  },
  "servesCuisine": ["Italian", "Cuisine italienne"],
  "priceRange": "€€",
  "openingHours": [
    "Tu-Sa 12:00-14:00",
    "Tu-Sa 18:00-22:00",
  ],
  "hasMap": "https://www.google.fr/maps/place/11+Rue+Trivalle,+11000+Carcassonne",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Pets allowed", "value": true },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "5",
    "bestRating": "5",
    "worstRating": "1",
  },
  "sameAs": [
    "https://www.restaurant-carbo.fr",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
