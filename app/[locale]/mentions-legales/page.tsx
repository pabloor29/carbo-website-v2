import Navbar from "@/components/Navbar";
import React from "react";

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-whiteSmokedBG min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-greenBottle font-cormorantGaramond">
          <h1 className="font-schoolbell text-6xl mb-12 text-center">Mentions légales</h1>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Éditeur du site</h2>
            <p className="text-xl leading-relaxed">
              Le site <strong>www.restaurant-carbo.fr</strong> est édité par&nbsp;:
              <br />
              <strong>Restaurant CARBO</strong>
              <br />
              11 rue Trivalle, 11000 Carcassonne, France
              <br />
              Téléphone&nbsp;: +33 4 34 42 27 49
              <br />
              Email&nbsp;: carbo11@icloud.com
              <br />
              {/* TODO: compléter avec la forme juridique, le SIRET, le RCS, le N° TVA, le capital social, et le nom du directeur de la publication */}
              Forme juridique&nbsp;: [à compléter]
              <br />
              SIRET&nbsp;: [à compléter]
              <br />
              N° TVA intracommunautaire&nbsp;: [à compléter]
              <br />
              Directeur de la publication&nbsp;: [à compléter]
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Hébergeur</h2>
            <p className="text-xl leading-relaxed">
              Le site est hébergé par&nbsp;:
              <br />
              <strong>Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              Site&nbsp;: <a href="https://vercel.com" className="underline">vercel.com</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Propriété intellectuelle</h2>
            <p className="text-xl leading-relaxed">
              L&apos;ensemble des éléments présents sur le site (textes, images, photographies, logos, vidéos, graphismes)
              est la propriété exclusive du restaurant CARBO ou de ses partenaires. Toute reproduction, représentation,
              modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est strictement interdite
              et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Crédits</h2>
            <p className="text-xl leading-relaxed">
              Conception et développement&nbsp;: <a href="https://resa-service.com" target="_blank" rel="noopener noreferrer" className="underline">resa-service.com</a>.
              <br />
              Photographies&nbsp;: Restaurant CARBO.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Responsabilité</h2>
            <p className="text-xl leading-relaxed">
              Les informations diffusées sur ce site sont données à titre indicatif. Le restaurant CARBO s&apos;efforce
              de fournir des informations exactes et à jour, mais ne saurait être tenu responsable des erreurs ou omissions,
              ni de l&apos;utilisation qui pourrait en être faite par un tiers.
            </p>
          </section>

          <section>
            <h2 className="font-schoolbell text-3xl mb-3">Contact</h2>
            <p className="text-xl leading-relaxed">
              Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l&apos;adresse&nbsp;
              <a href="mailto:carbo11@icloud.com" className="underline">carbo11@icloud.com</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
