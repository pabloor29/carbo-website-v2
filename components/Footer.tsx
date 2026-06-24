import { Instagram, Mail, Phone } from "lucide-react";
import React from "react";
import Link from "next/link";
import { getOpeningHours, DAYS_FR } from "@/lib/opening-hours";
import CookieBanner from "./CookieBanner";

async function Footer() {
  const hours = await getOpeningHours();

  return (
    <footer className="w-full bg-[#f7dad9] flex flex-col items-center justify-center">
      <div className="flex flex-col w-5/6 items-center lg:justify-between p-4 gap-12 lg:space-y-0">
        <div className="lg:w-1/3 w-full text-[#023c18] flex flex-col items-center h-full">
          <h4 className="font-schoolbell text-4xl mb-3">Horaires</h4>
          {hours ? (
            <ul className="flex flex-col gap-1 font-cormorantGaramond text-xl">
              {DAYS_FR.map((day, i) => {
                const d = hours[i];
                return (
                  <li key={day} className="flex justify-between gap-6 lg:text-xl">
                    <span className="font-bold w-24">{day}</span>
                    {d.closedDay ? (
                      <span className="italic lg:text-xl md:text-base text-sm">Fermé</span>
                    ) : (
                      <div className="flex flex-col items-end">
                        {!d.closedLunch && d.midi.debut && (
                          <span className="lg:text-xl md:text-base text-sm">{d.midi.debut} - {d.midi.fin}</span>
                        )}
                        {!d.closedDiner && d.soir.debut && (
                          <span className="lg:text-xl md:text-base text-sm">{d.soir.debut} - {d.soir.fin}</span>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="font-cormorantGaramond text-xl text-center">Horaires non disponibles</p>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="lg:w-1/3 w-full text-[#023c18] flex flex-col items-center justify-center h-full">
            <h4 className="font-schoolbell text-4xl mb-3">Adresse</h4>
            <a
              className="flex flex-col items-center justify-center text-center hover:underline font-cormorantGaramond text-xl"
              href="https://www.google.fr/maps/place/11+Rue+Trivalle,+11000+Carcassonne/@43.2094872,2.3589394,17z/data=!3m1!4b1!4m6!3m5!1s0x12ae2c155f7dfa75:0xfab50ca890041ead!8m2!3d43.2094833!4d2.3615143!16s%2Fg%2F11c5qj1msb?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D"
            >
              11 rue Trivalle
              <br />
              11000, Carcassonne
            </a>
          </div>

          <div className="lg:w-1/3 w-full text-[#023c18] flex flex-col items-center justify-center h-full">
            <h4 className="font-schoolbell text-4xl mb-3">Contact</h4>
            <ul className="flex flex-col gap-3 items-center justify-center text-xl font-cormorantGaramond">
              <li className="flex gap-2 hover:underline">
                <Mail />
                <a href="mailto:carbo11@icloud.com">
                  carbo11@icloud.com
                </a>
              </li>
              <li className="flex gap-2 hover:underline">
                <Phone />
                <a href="tel:+33434422749">TEL +33 4 34 42 27 49</a>
              </li>
              <li className="flex gap-2 hover:underline">
                <Instagram />
                <a href="https://www.instagram.com/carbo_restaurant/?hl=fr">@carbo_restaurant</a>
              </li>
              <li className="flex gap-2 hover:underline"></li>
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3 w-full  flex items-center justify-center">
          <div className="w-52">
            <img src="img/logo/CARBO-LOGO-4.webp" alt="logo carbo" />
          </div>
        </div>
      </div>

      <nav
        aria-label="Liens légaux"
        className="w-full bg-[#f7dad9] border-t-2 text-[#023c18] text-xs flex flex-wrap justify-center items-center gap-x-4 gap-y-2 py-3 px-4"
      >
        <Link href="/mentions-legales" className="hover:underline">
          Mentions légales
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/politique-confidentialite" className="hover:underline">
          Politique de confidentialité
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/cgu" className="hover:underline">
          CGU
        </Link>
        <span aria-hidden="true">·</span>
        <span>
          © <a href="https://resa-service.com" target="_blank" rel="noopener noreferrer" className="hover:underline">resa-service.com</a> - 2025
        </span>
      </nav>
      <CookieBanner />
    </footer>
  );
}

export default Footer;
