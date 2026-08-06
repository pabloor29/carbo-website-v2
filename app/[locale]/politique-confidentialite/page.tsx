import Navbar from "@/components/Navbar";
import React from "react";

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="bg-whiteSmokedBG min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-greenBottle font-cormorantGaramond">
          <h1 className="font-schoolbell text-6xl mb-12 text-center">Politique de confidentialité</h1>

          <p className="text-xl mb-10 leading-relaxed">
            La présente politique de confidentialité décrit comment le restaurant CARBO collecte, utilise et protège
            les données personnelles des utilisateurs du site www.restaurant-carbo.fr, conformément au Règlement
            Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
          </p>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Responsable du traitement</h2>
            <p className="text-xl leading-relaxed">
              Restaurant CARBO — 11 rue Trivalle, 11000 Carcassonne — <a href="mailto:carbo11@icloud.com" className="underline">carbo11@icloud.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Données collectées</h2>
            <p className="text-xl leading-relaxed">
              Nous collectons uniquement les données strictement nécessaires aux finalités décrites ci-dessous&nbsp;:
            </p>
            <ul className="list-disc pl-6 text-xl mt-2 space-y-1">
              <li><strong>Formulaire de réservation</strong>&nbsp;: nom, prénom, email, numéro de téléphone, date et heure de réservation, nombre de personnes, commentaire.</li>
              <li><strong>Formulaire de contact</strong>&nbsp;: nom, email, message.</li>
              <li><strong>Données de navigation</strong>&nbsp;: statistiques de fréquentation anonymisées (via Vercel Analytics, sans cookies).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Finalités du traitement</h2>
            <ul className="list-disc pl-6 text-xl space-y-1">
              <li>Gestion des réservations en ligne et confirmation par email.</li>
              <li>Réponse aux demandes envoyées via le formulaire de contact.</li>
              <li>Mesure d&apos;audience anonyme et amélioration du site.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Base légale</h2>
            <p className="text-xl leading-relaxed">
              Les traitements sont fondés sur votre consentement (formulaires) et sur l&apos;intérêt légitime du
              restaurant (statistiques anonymes de fréquentation).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Durée de conservation</h2>
            <ul className="list-disc pl-6 text-xl space-y-1">
              <li>Réservations&nbsp;: jusqu&apos;à 12 mois après la date de la réservation.</li>
              <li>Demandes de contact&nbsp;: jusqu&apos;à 12 mois après le dernier échange.</li>
              <li>Statistiques anonymes&nbsp;: jusqu&apos;à 25 mois.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Destinataires</h2>
            <p className="text-xl leading-relaxed">
              Vos données sont destinées au restaurant CARBO uniquement. Elles ne sont jamais vendues ni cédées
              à des tiers à des fins commerciales. Certains sous-traitants techniques peuvent les héberger ou les
              transmettre&nbsp;:
            </p>
            <ul className="list-disc pl-6 text-xl mt-2 space-y-1">
              <li><strong>Vercel Inc.</strong> — hébergement du site.</li>
              <li><strong>Resend</strong> — envoi des emails de confirmation de réservation.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Cookies</h2>
            <p className="text-xl leading-relaxed">
              Le site utilise Vercel Analytics, un outil de mesure d&apos;audience <strong>sans cookies</strong> et
              respectueux de la vie privée. Aucune donnée personnelle identifiante n&apos;est collectée à des fins
              publicitaires. Aucun cookie tiers de tracking n&apos;est déposé sur votre appareil.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-schoolbell text-3xl mb-3">Vos droits</h2>
            <p className="text-xl leading-relaxed">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
              de limitation, d&apos;opposition et de portabilité concernant vos données. Pour exercer ces droits,
              contactez-nous à <a href="mailto:carbo11@icloud.com" className="underline">carbo11@icloud.com</a>.
              Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" className="underline">www.cnil.fr</a>).
            </p>
          </section>

          <section>
            <h2 className="font-schoolbell text-3xl mb-3">Sécurité</h2>
            <p className="text-xl leading-relaxed">
              Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos
              données contre tout accès non autorisé, perte ou divulgation.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
