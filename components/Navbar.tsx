"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Variants, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

const Variants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "linear",
      duration: 1,
      delay: 0.5,
    },
  },
};

function Navbar() {
  const t = useTranslations("nav");

  const links = [
    { label: t("home"), href: "/" as const },
    { label: t("about"), href: "/apropos" as const },
    { label: t("menu"), href: "/menu" as const },
    { label: t("contact"), href: "/contact" as const },
  ];

  return (
    <nav className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={Variants}
        className="fixed w-full h-24 backdrop-blur justify-between items-center text-white px-8 z-50 hidden lg:flex bg-greenBottle/30"
      >
        <Link href="/" className="h-24 w-24 py-2">
          <img src="/img/logo/CARBO-LOGO-21.webp" alt="logo carbo" />
        </Link>
        <div>
          <ul className="flex justify-center space-x-12">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="leading-none hover:text-pinkCarbo hover:border-pinkCarbo font-schoolbell text-2xl"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <Link
            href="/reservation"
            className="leading-none hover:text-pinkCarbo hover:border-pinkCarbo font-schoolbell text-2xl"
          >
            {t("reservation")}
          </Link>
        </div>
      </motion.div>

      <div className="lg:hidden fixed top-6 z-50 flex justify-between w-full px-6">
        <Sheet key="left">
          <SheetTrigger className="overflow-hidden flex justify-center items-center w-10 h-10 rounded-full shadow bg-greenBottle/50">
            <img src="/menu-2-line.png" alt="hamburger menu icon" />
          </SheetTrigger>
          <SheetContent className="bg-[#f7dad9]">
            <SheetHeader>
              <SheetDescription className="flex flex-col">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="overflow-hidden h-20 w-4/5 flex items-center text-greenBottle hover:text-white hover:bg-greenBottle duration-300 px-5 py-3 cursor-pointer"
                  >
                    <h3 className="font-schoolbell text-3xl tracking-wide">
                      {item.label}
                    </h3>
                  </Link>
                ))}
                <Link
                  href="/reservation"
                  className="overflow-hidden h-20 w-4/5 flex items-center hover:bg-greenBottle duration-300 px-5 py-3 cursor-pointer"
                >
                  <h3 className="font-schoolbell text-greenBottle hover:text-white text-3xl tracking-wide">
                    {t("reservation")}
                  </h3>
                </Link>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <LanguageSwitcher className="h-10 px-1 rounded-full bg-greenBottle/50 shadow" />
        <Link
          href="/reservation"
          className="shadow cursor-pointer overflow-hidden h-10 px-3 rounded-full bg-greenBottle/50 flex items-center justify-center"
        >
          <h3 className="font-schoolbell text-2xl tracking-wide text-[#f7dad9]">
            {t("reserve")}
          </h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
