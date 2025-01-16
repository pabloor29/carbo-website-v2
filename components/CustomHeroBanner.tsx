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

function CustomHeroBanner(props: any) {
  return (
    <div className="h-96 relative">
      <div className="w-full h-full bg-black/50 z-40 absolute"></div>
      <img
        src={props.img}
        alt=""
        className="h-full w-full object-cover absolute z-30 grayscale"
      />

      <div className="relative z-40 h-full flex flex-col items-center justify-center leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="text-bigSM lg:text-9xl text-white font-ttInterphasesMono
            tracking-wide z-40 drop-shadow-[4px_4px_0_#f7dad9]"
        >
          {props.title}
        </motion.h1>
      </div>
    </div>
  );
}

export default CustomHeroBanner;
