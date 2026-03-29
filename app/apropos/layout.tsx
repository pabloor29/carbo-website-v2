import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description: "Découvrez l'histoire de CARBO : Louis, Louisa et leur passion pour la cuisine italienne authentique à Carcassonne. Un restaurant familial et chaleureux au cœur de la cité.",
  alternates: {
    canonical: "https://www.restaurant-carbo.fr/apropos",
  },
};

export default function AproposLayout({ children }: { children: React.ReactNode }) {
  return children;
}
