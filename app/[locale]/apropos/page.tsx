"use client";

import { Variants, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import React from "react";
import { useTranslations } from "next-intl";
import CustomHeroBannerVideo from "@/components/CustomHeroBannerVideo";

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


function AboutPage() {
  const t = useTranslations("about");
  const th = useTranslations("hero");
  return (
    <>
      <Navbar />
      <CustomHeroBannerVideo title={th("about")} video="/img/deco/bg_video.mp4" />
      <div className="z-40 flex flex-col justify-center items-center space-y-32 pt-12 pb-24 md:py-32 bg-whiteSmokedBG relative overflow-hidden">
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-4">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <img
            src="/img/person/team-carbo-1.webp"
            alt="carbo team"
            className="shadow-2xl"
          />
        </motion.div>
        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <h3 className="text-greenBottle text-6xl lg:text-5xl font-medium font-schoolbell">
            {t("loulousTitle")}
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            {t("loulousBody")}
          </article>
        </motion.div>
        </div>
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-4">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <h3 className="text-greenBottle text-6xl lg:text-5xl font-medium font-schoolbell">
            {t("chefTitle")}
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            {t("chefBody")}
          </article>
        </motion.div>
        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <img
            src="/img/person/louisa-1.webp"
            alt="Louisa"
            className="shadow-2xl"
          />
        </motion.div>
        </div>
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-4">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <img
            src="/img/person/louis-1.webp"
            alt="Louis"
            className="shadow-2xl"
          />
        </motion.div>
        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <h3 className="text-greenBottle text-6xl lg:text-5xl font-medium font-schoolbell">
            {t("barmanTitle")}
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            {t("barmanBody")}
          </article>
        </motion.div>
        </div>
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-4">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <h3 className="text-greenBottle text-6xl lg:text-5xl font-medium font-schoolbell">
            {t("carboTitle")}
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            {t("carboBody")}
          </article>
        </motion.div>
        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <img
            src="/img/person/carbo-1.webp"
            alt="Carbo"
            className="shadow-2xl"
          />
        </motion.div>
        </div>

      </div>
    </>
  );
}

export default AboutPage;
