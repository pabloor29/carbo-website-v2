"use client";

import { Variants, motion } from "framer-motion";
import Link from "next/link";
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
  return (
    <div className="flex justify-center items-center py-24 bg-whiteSmokedBG">
      <div className="lg:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-10">
        <motion.div
          initial="hiddenRight"
          whileInView="visibleRight"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <img
            src="/octopus-drawing-blue.webp"
            alt=""
            className="-scale-x-100"
          />
        </motion.div>

        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6 flex flex-col space-y-8"
        >
          <h3 className="text-[#023c18] text-5xl font-medium font-schoolbell leading-none">
            Pâtes & tradition
          </h3>
          <article className="text-[#023c18] text-justify lg:text-left font-cormorantGaramond text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique soluta eum dicta enim, nemo dolor adipisci illo vero! Voluptatum blanditiis nisi, dicta laboriosam autem ea hic vitae quas velit placeat?
          </article>
          <Link
            href="/menu"
            className="bg-[#023c18] hover:bg-transparent border hover:border-[#023c18] text-white font-medium hover:text-[#023c18] w-fit duration-200 px-4 py-3"
          >
            Notre carte
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default IntroRestaurant;
