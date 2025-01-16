"use client"; 
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import React from "react";

function Bubble() {
  const [scrollY, setScrollY] = useState(0); 

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll); 
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          transform: `translateY(${scrollY * -0.5}px)`,
        }}
        className="bg-[rgba(2,60,24,0.5)] w-8 h-1/2 -z-0 absolute bottom-0 right-1/3"
      >
      </motion.div>

      <motion.div
        style={{
          transform: `translateY(${scrollY * -0.4}px)`,
        }}
        className="bg-[rgba(2,60,24,0.5)] w-8 h-1/3 -z-0 absolute bottom-0"
      >
      </motion.div>

      <motion.div
        style={{
          transform: `translateY(${scrollY * -0.4}px)`,
        }}
        className="bg-[rgba(2,60,24,0.5)] w-8 h-2/3 -z-0 absolute bottom-0 left-1/3"
      >
      </motion.div>
    </>
  );
}

export default Bubble;
