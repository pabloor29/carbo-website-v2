"use client";

import { useEffect, useState } from "react";
import { X, UtensilsCrossed } from "lucide-react";

type Props = {
  images: string[];
  autoOpen?: boolean;
  showFloatingButton?: boolean;
};

export default function FormulaPopup({ images, autoOpen = false, showFloatingButton = false }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (autoOpen && images.length > 0) {
      setOpen(true);
    }
  }, [autoOpen, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      {/* Floating button */}
      {showFloatingButton && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-greenBottle text-white px-5 py-3 shadow-lg font-cormorantGaramond text-lg hover:bg-opacity-90 transition-all"
          aria-label="Voir la formule du midi"
        >
          <UtensilsCrossed size={20} />
          Formule du midi
        </button>
      )}

      {/* Popup overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-whiteSmokedBG max-w-2xl w-11/12 max-h-[90vh] overflow-y-auto p-4 flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between border-b-2 border-greenBottle pb-3 mb-2">
              <h2 className="font-schoolbell text-greenBottle text-3xl tracking-wide">
                Formule du midi
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-greenBottle hover:opacity-70 transition-opacity"
                aria-label="Fermer"
              >
                <X size={28} />
              </button>
            </div>

            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Formule du midi ${i + 1}`}
                className="w-full h-auto object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
