import Navbar from "@/components/Navbar";
import React from "react";

export default function CguPage() {
  return (
    <>
      <Navbar />
      <main className="bg-whiteSmokedBG min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-greenBottle font-cormorantGaramond">
          <h1 className="font-schoolbell text-6xl mb-12 text-center">Conditions Générales d&apos;Utilisation</h1>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">1. Objet</h2>
            <p className="text-xl leading-relaxed">
              Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir les modalités
              d&apos;accès et d&apos;utilisation du site <strong>www.restaurant-carbo.fr</strong>, édité par le
              restaurant CARBO. Toute utilisation du site implique l&apos;acceptation pleine et entière de ces CGU.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">2. Accès au site</h2>
            <p className="text-xl leading-relaxed">
              L&apos;accès au site est gratuit. Les frais d&apos;accès et d&apos;utilisation du réseau de
              télécommunications sont à la charge de l&apos;utilisateur. Le restaurant CARBO se réserve le droit
              de suspendre ou d&apos;interrompre l&apos;accès au site à tout moment, notamment pour des opérations
              de maintenance, sans préavis ni indemnité.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">3. Services proposés</h2>
            <p className="text-xl leading-relaxed">
              Le site permet de&nbsp;:
            </p>
            <ul className="list-disc pl-6 text-xl mt-2 space-y-1">
              <li>Consulter la carte, les horaires et les informations du restaurant.</li>
              <li>Effectuer une demande de réservation en ligne.</li>
              <li>Contacter le restaurant via le formulaire dédié.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">4. Réservation</h2>
            <p className="text-xl leading-relaxed">
              Toute demande de réservation effectuée via le site est soumise à confirmation par le restaurant.
              Une réservation n&apos;est définitive qu&apos;après réception d&apos;un email de confirmation.
              En cas d&apos;empêchement, l&apos;utilisateur s&apos;engage à prévenir le restaurant dans les meilleurs délais.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">5. Obligations de l&apos;utilisateur</h2>
            <p className="text-xl leading-relaxed">
              L&apos;utilisateur s&apos;engage à fournir des informations exactes lors de l&apos;utilisation des
              formulaires, à ne pas utiliser le site à des fins illicites, et à ne pas porter atteinte au bon
              fonctionnement du site (intrusion, surcharge, contenu malveillant).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">6. Propriété intellectuelle</h2>
            <p className="text-xl leading-relaxed">
              L&apos;ensemble du contenu du site (textes, images, logos, vidéos, code) est protégé par le droit
              d&apos;auteur. Toute reproduction sans autorisation préalable écrite est interdite. Voir les
              <a href="/mentions-legales" className="underline">&nbsp;mentions légales&nbsp;</a> pour plus de détails.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">7. Données personnelles</h2>
            <p className="text-xl leading-relaxed">
              Le traitement des données personnelles est décrit dans notre&nbsp;
              <a href="/politique-confidentialite" className="underline">politique de confidentialité</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">8. Responsabilité</h2>
            <p className="text-xl leading-relaxed">
              Le restaurant CARBO ne saurait être tenu responsable des dommages directs ou indirects résultant
              de l&apos;utilisation du site, d&apos;une indisponibilité temporaire, d&apos;une erreur ou d&apos;une
              omission dans les contenus publiés.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">9. Modification des CGU</h2>
            <p className="text-xl leading-relaxed">
              Le restaurant CARBO se réserve le droit de modifier les présentes CGU à tout moment. Les
              utilisateurs sont invités à les consulter régulièrement.
            </p>
          </section>

          <section>
            <h2 className="font-schoolbell text-3xl mb-3">10. Droit applicable</h2>
            <p className="text-xl leading-relaxed">
              Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou
              à leur exécution relève de la compétence des tribunaux français.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
