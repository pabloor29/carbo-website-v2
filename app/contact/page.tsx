import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Banknote, CreditCard, Coins, Ticket } from "lucide-react";
import React from "react";

function ContactPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Contact" img="/IMG_0234.webp" />

      <div className="w-full flex flex-col lg:flex-row justify-between lg:space-x-8 space-y-8 lg:space-y-0 bg-whiteSmokedBG">
        <div className="lg:h-[750px] h-[1100px] lg:w-1/2 lg:pl-16 space-y-8 flex flex-col items-center justify-center lg:py-12">
          <div className="w-1/2">
            <img src="/CARBO-LOGO-9.webp" alt="" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16 font-cormorantGaramond text-xl">
            <div className="flex flex-col justify-between items-center space-y-12">
              <div className="text-greenBottle flex flex-col space-y-3 items-center lg:items-start justify-center">
                <a
                  className=""
                  href="https://www.google.fr/maps/place/11+Rue+Trivalle,+11000+Carcassonne/@43.2094872,2.3589394,17z/data=!3m1!4b1!4m6!3m5!1s0x12ae2c155f7dfa75:0xfab50ca890041ead!8m2!3d43.2094833!4d2.3615143!16s%2Fg%2F11c5qj1msb?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D"
                >
                  11 rue Trivalle, 11000 Carcassonne
                </a>
                <a href="tel:+33430345855">Fixe : +33  </a>
                <a href="tel:+33634294874">Mobile : +33 </a>
              </div>

              <div className="text-greenBottle w-full flex flex-col space-y-3 items-center lg:items-start justify-center">
                <p>Modes de paiment</p>
                <div className="flex items-center space-x-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <CreditCard />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Carte de crédit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <Banknote />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chèques bancaires et postaux</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <Coins />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Espèces</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="scale-125">
                          <Ticket />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ticket Restaurant</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="text-greenBottle flex w-full flex-col justify-center items-center lg:items-start space-y-3">
                <p>Animaux acceptés</p>
                <p>Accès Internet Wifi</p>
                <p>🇬🇧 Anglais</p>
                <p>🇪🇸 Espagnol</p>
                <p>🇮🇹 Italien</p>
              </div>
            </div>

            <div className="text-greenBottle border-4 w-fit mt-12 lg:mt-0 px-8 py-4 border-greenBottle flex flex-col items-center justify-center space-y-6 shadow-[-15px_15px_0_0_#192C1D]">
              <h3 className="w-full text-center z-10 text-greenBottle border-b-4 border-greenBottle font-schoolbell text-7xl tracking-wide">
                Horaires
              </h3>

              <div className="flex flex-col items-center justify-center">
                <p>Juillet - Aout</p>
                <p>Lundi - Samedi </p>
                <p className="font-cormorantGaramond text-2xl">
                  {" "}
                  12:00 - 14:00 & 18:00 - 22:00
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p>Septembre - Juin</p>
                <p>Mardi - Samedi </p>
                <p className="font-cormorantGaramond text-2xl">
                  {" "}
                  12:00 - 14:00 & 18:00 - 22:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center lg:h-[750px] overflow-hidden">
          <img src="/map-carbo.webp" alt="" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
