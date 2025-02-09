import { Instagram, Mail, Phone } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-[#f7dad9] flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row w-5/6 lg:justify-between p-4 space-y-12 lg:space-y-0">
        <div className="lg:w-1/3 w-full text-[#023c18] flex flex-col items-center h-full">
          <h4 className="font-schoolbell text-4xl mb-3">Horaires</h4>
          <ul className="flex items-center justify-between space-x-10">
            <div className="flex flex-col items-center justify-center text-center">
              <li className="font-bold">Juillet - Août</li>
              <p>Lundi - Samedi</p>
              <p className="font-cormorantGaramond text-xl">
                12:00 - 14:00 <br /> 18:00 - 22:00
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <li className="font-bold">Septembre - Juin</li>
              <p>Mardi - Samedi</p>
              <p className="font-cormorantGaramond text-xl">
                12:00 - 14:00 <br /> 18:00 - 22:00
              </p>
            </div>
          </ul>
        </div>

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
          <ul className="flex flex-col gap-1 items-center justify-center text-xl font-cormorantGaramond">
            <li className="flex gap-2 hover:underline">
              <Mail />
              <a href="mailto:carbo11@icloud.com">
                carbo11@icloud.com
              </a>
            </li>
            <li className="flex gap-2 hover:underline">
              <Phone />
              <a href="tel:+33">TEL</a>
            </li>
            <li className="flex gap-2 hover:underline">
              <Instagram />
              <a href="https://www.instagram.com/carbo_restaurant/?hl=fr">@carbo_restaurant</a>
            </li>
            <li className="flex gap-2 hover:underline"></li>
          </ul>
        </div>

        <div className="lg:w-1/3 w-full  flex items-center justify-center">
          <div className="w-52">
            <img src="/CARBO-LOGO-4.webp" alt="logo carbo" />
          </div>
        </div>
      </div>

      <a
        href=""
        className="text-[#023c18] hover:underline py-2 text-xs w-full bg-[#f7dad9] border-t-2 flex justify-center items-center"
      >
        © Pablo ORTEGA - 2025
      </a>
    </footer>
  );
}

export default Footer;
