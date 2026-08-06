"use client";

import { Variants, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import React from "react";

const imagesVariants: Variants = {
  hiddenBottom: {
    y: 100,
    opacity: 0,
  },
  visibleBottom: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenLeft: {
    x: 200,
    opacity: 0,
  },
  visibleLeft: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
  hiddenRight: {
    x: -200,
    opacity: 0,
  },
  visibleRight: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

function IntroRestaurant() {
  const t = useTranslations("intro");
  return (
    <div className="flex justify-center items-center py-24 bg-whiteSmokedBG">
      <div className="lg:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-10">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 md:w-1/2 w-5/6"
        >
          <img
            src="/img/plats/plat-carbo-1.webp"
            alt="Pâtes fraîches maison du restaurant CARBO, cuisine italienne à Carcassonne"
            className="shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6 flex flex-col space-y-8"
        >
          <h2 className="text-greenBottle text-5xl font-medium font-schoolbell leading-none">
            {t("title")}
          </h2>
          <article className="text-greenBottle text-justify lg:text-left font-cormorantGaramond text-xl">
            {t("body")}
          </article>
          <Link
            href="/menu"
            className="bg-greenBottle hover:bg-transparent border hover:border-greenBottle text-white font-medium hover:text-greenBottle w-fit duration-200 px-4 py-3"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default IntroRestaurant;
