"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Agat the blues",
    rating: 5,
    date: "il y a 3 mois",
    text: "L’italien (Sarde) parfait entree burrate a partager ensuite risotto fagioli (pates) avec calamars et artichauts ( juste ce qu’il faut de parmessn artichauts grillés le tout tres bon) ou escalope de veau (croustillante) dessert: tiramisu a la châtaigne (délicieux) carte simple et plats parfaitement exécutés avec une pointe de raffinement. De loin le meilleur italien de Carcassonne. En plus la rue trivalle est belle donc a ne pas manquer. La cheffe est une artiste!",
  },
  {
    name: "Laurine Menard",
    rating: 5,
    date: "il y a 5 mois",
    text: "Les plats étaient délicieux et le service très rapide. Nous étions également en bonne compagnie puisque nous avons mangé avec la mascotte du restaurant : Carbo le petit chien saucisse !",
  },
  {
    name: "Caroline Jean",
    rating: 5,
    date: "il y a 1 an",
    text: "Une excellente adresse à Carcassonne ! La cuisine est absolument délicieuse, avec des produits frais et faits maison, notamment les pâtes qui sont un vrai régal. L’ambiance est chaleureuse et conviviale. La décoration, soigneusement pensée, nous fait voyager en Italie dès qu’on passe la porte. Une superbe découverte, à bientôt ! 🇮🇹✨",
  },
  {
    name: "Coraline Guenet",
    rating: 5,
    date: "il y a 1 an",
    text: "La cuisine est vraiment bonne, ils sont passionnés et le décor est réalisé avec goût ! Sans nul doute l’une de mes nouvelles adresses préférées sur Carcassonne 😍",
  },
  {
    name: "Maina Ruffier",
    rating: 5,
    date: "il y a 6 mois",
    text: "Nous y avons mangé en famille et avons adoré ! Carbo est LA bonne adresse italienne à Carcassonne, de bonnes entrée bien généreuses, des pâtes fraîche faites maison et bien garnis et un succulent tiramisu ! Deux gérants très sympa et en prime la super mascotte, Carbo, qui vous fera chavirer à coup sûr !",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};

export default function GoogleReviews() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir: number) => {
    setIndex([(index + dir + reviews.length) % reviews.length, dir]);
  };

  const review = reviews[index];

  return (
    <section className="w-full bg-whiteSmokedBG py-20 flex flex-col items-center">
      <div className="flex flex-col items-center mb-10 space-y-2">
        <div className="flex items-center space-x-3">
          {/* Google "G" logo */}
          <svg width="28" height="28" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <h2 className="text-greenBottle text-4xl font-schoolbell">Avis Google</h2>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-greenBottle font-cormorantGaramond text-lg ml-2">5 / 5</span>
        </div>
      </div>

      <div className="w-full lg:w-2/5 md:w-3/5 relative flex items-center justify-center px-4">
        {/* Left arrow */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Avis précédent"
          className="absolute left-0 z-10 p-2 text-greenBottle hover:text-greenBottle/60 transition-colors"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Card */}
        <div className="w-full overflow-hidden px-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col space-y-4 border border-gray-100"
            >
              {/* Stars */}
              <div className="flex space-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-greenBottle font-cormorantGaramond text-xl text-justify leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-greenBottle flex items-center justify-center text-white font-medium text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-greenBottle font-medium text-sm">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => paginate(1)}
          aria-label="Avis suivant"
          className="absolute right-0 z-10 p-2 text-greenBottle hover:text-greenBottle/60 transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            aria-label={`Aller à l'avis ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-greenBottle w-5" : "bg-greenBottle/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
