import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CARBO",
  description: "Découvrez CARBO, un restaurant italien à Carcassonne offrant des pâtes fraîches et une cuisine italienne authentique dans un cadre enchanteur. Réservez dès maintenant !",
  icons: "/img/logo/CARBO-LOGO-4.webp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>CARBO - restaurant italien - cuisine italienne</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content="Italien, Restaurant italien carcassonne, Restaurant Carcassonne, Restaurant italien, pâtes fraîches" />
        <meta name="description" content="Découvrez CARBO, un restaurant italien à Carcassonne offrant des pâtes fraîches et une cuisine italienne authentique dans un cadre chaleureux. Réservez dès maintenant !" />
        <meta property="og:title" content="CARBO" />
        <meta property="og:image" content="/img/deco/carbo.webp" />
        <meta property="og:url" content="https://www.restaurant-carbo.fr/" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/img/logo/CARBO-LOGO-1.webp"></link>
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
        </body>
    </html>
  );
}

