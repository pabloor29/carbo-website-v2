"use client";

import { Variants, motion } from "framer-motion";
import Bubble from "@/components/Bubble";
import CustomHeroBanner from "@/components/CustomHeroBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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


function AboutPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBanner title="Présentation" img="/IMG_0230.webp" />

      <div className="z-40 flex flex-col justify-center items-center pt-12 pb-24 lg:py-32 bg-whiteSmokedBG relative overflow-hidden">
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
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
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
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
        </div>
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
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
            L'équipe
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde eius exercitationem aliquid, molestias libero, similique quia, labore tempora deleniti ex repellendus quisquam voluptatibus molestiae delectus modi neque vero! Est dicta sequi dolorum exercitationem facere, ex, mollitia earum, repellat assumenda nesciunt autem porro omnis sit nostrum quidem rerum perspiciatis voluptatem eaque.
          </article>
        </motion.div>
        </div>
        <div className="md:w-3/5 flex flex-col lg:flex-row justify-center items-center lg:space-x-20 space-y-16">
        <motion.div
          initial="hiddenLeft"
          whileInView="visibleLeft"
          viewport={{ once: true, margin: "-20%" }}
          variants={imagesVariants}
          className="lg:w-1/2 w-5/6"
        >
          <h3 className="text-greenBottle text-7xl font-medium font-schoolbell">
            L'équipe
          </h3>
          <article className="text-greenBottle font-cormorantGaramond text-xl text-justify lg:text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde eius exercitationem aliquid, molestias libero, similique quia, labore tempora deleniti ex repellendus quisquam voluptatibus molestiae delectus modi neque vero! Est dicta sequi dolorum exercitationem facere, ex, mollitia earum, repellat assumenda nesciunt autem porro omnis sit nostrum quidem rerum perspiciatis voluptatem eaque.
          </article>
        </motion.div>
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
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
