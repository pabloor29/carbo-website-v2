"use client";

import { Variants, motion } from "framer-motion";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";

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
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Présentation" video="/IMG_0439.mp4" />
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
            src="/team-carbo-1.webp"
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
          <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
            Les loulous
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            Nous, c’est Louis et Louisa, un jeune couple passionné de gastronomie et d’hospitalité. Notre aventure commence avec une idée simple : créer un lieu chaleureux où l’on partage des plats italiens authentiques, des cocktails raffinés et surtout, des moments conviviaux.  
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
          <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
            La cheffe
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            Derrière les fourneaux, Louisa, amoureuse de la cuisine italienne, prépare des plats faits maison inspirés des recettes traditionnelles et des produits de saison. 
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
            src="/louisa-1.webp"
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
            src="/louis-1.webp"
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
          <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
            Le barman
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            En salle, Louis vous accueille avec le sourire, vous conseille sur les vins et élabore des cocktails soigneusement pensés pour accompagner vos repas. 
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
          <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
            Carbo
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            Et bien sûr, il y a Carbo, notre petite teckel et mascotte du restaurant, qui nous accompagne dans cette belle aventure.  
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
            src="/carbo-1.webp"
            alt="Carbo"
            className="shadow-2xl"
          />
        </motion.div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
