"use client";

import { Variants, motion } from "framer-motion";
import React from "react";

const textVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

function HeroBanner() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#001F50] to-[#002E6D]">
      <div className="h-screen w-full flex justify-center items-center bg-black/60 absolute z-10"></div>
      <img
        src="/img/deco/background_home.webp"
        alt="Ambiance du restaurant CARBO, cuisine italienne à Carcassonne"
        className="w-full h-screen object-cover absolute z-0"
      />
      <div className="relative z-20 flex flex-col items-center justify-center leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="tracking-wide z-30 w-2/3"
        >
          <img src="img/logo/CARBO-LOGO-10.webp" alt="CARBO - Restaurant italien à Carcassonne" />
        </motion.h1>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="z-10 text-white/90 font-schoolbell lg:text-5xl text-2xl pt-10"
        >
          Restaurant italien · Carcassonne
        </motion.h3>
      </div>
    </div>
  );
}

export default HeroBanner;
