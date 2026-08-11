import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { getOpeningHours, toSchemaOpeningHours } from "@/lib/opening-hours";
import { getRestaurantContact } from "@/lib/restaurant-contact";
import { normalizePhone, SHOW_PHONE } from "@/lib/phone";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL, alternatesFor, ogLocale } from "@/lib/i18n-meta";

const inter = Inter({ subsets: ["latin"] });

// Every page renders live data (opening hours in the footer, reservation slots),
// so render on-demand per request rather than freezing content at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: [
      "restaurant Carcassonne",
      "restaurant italien Carcassonne",
      "italian restaurant Carcassonne",
      "cuisine italienne Carcassonne",
      "pâtes fraîches Carcassonne",
      "carbonara Carcassonne",
      "restaurant 11000",
      "restaurant italien Aude",
      "CARBO restaurant",
      "restaurant rue Trivalle Carcassonne",
      "meilleur restaurant Carcassonne",
      "réservation restaurant Carcassonne",
    ],
    authors: [{ name: "CARBO" }],
    creator: "CARBO",
    metadataBase: new URL(SITE_URL),
    alternates: alternatesFor(locale, ""),
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((l) => l !== locale).map(ogLocale),
      url: alternatesFor(locale, "").canonical,
      siteName: "CARBO - Restaurant Italien Carcassonne",
      title: t("defaultTitle"),
      description: t("description"),
      images: [
        {
          url: "/img/deco/carbo.webp",
          width: 1200,
          height: 630,
          alt: t("defaultTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
      images: ["/img/deco/carbo.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/img/logo/CARBO-LOGO-1.webp",
      apple: "/img/logo/CARBO-LOGO-1.webp",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "CARBO",
  url: SITE_URL,
  image: `${SITE_URL}/img/deco/carbo.webp`,
  // telephone is injected per-request from the restaurants row (see LocaleLayout).
  address: {
    "@type": "PostalAddress",
    streetAddress: "11 rue Trivalle",
    addressLocality: "Carcassonne",
    postalCode: "11000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.2094833,
    longitude: 2.3615143,
  },
  servesCuisine: ["Italian", "Cuisine italienne"],
  priceRange: "€€",
  acceptsReservations: `${SITE_URL}/reservation`,
  hasMenu: `${SITE_URL}/menu`,
  hasMap: "https://www.google.fr/maps/place/11+Rue+Trivalle,+11000+Carcassonne",
  areaServed: { "@type": "City", name: "Carcassonne" },
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pets allowed", value: true },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "5",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [SITE_URL],
};

// Static fallback used only if the DB is unreachable at build/request time.
const FALLBACK_OPENING_HOURS = ["Tu-Sa 12:00-14:00", "Tu-Sa 18:00-22:00"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();

  const hours = await getOpeningHours();
  const schemaHours = hours ? toSchemaOpeningHours(hours) : [];
  const contact = await getRestaurantContact();
  const restaurantJsonLd = {
    ...jsonLd,
    ...(SHOW_PHONE ? { telephone: normalizePhone(contact.phone) } : {}),
    openingHours: schemaHours.length > 0 ? schemaHours : FALLBACK_OPENING_HOURS,
  };

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
