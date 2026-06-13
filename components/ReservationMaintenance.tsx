import { Instagram, Phone, Wrench } from "lucide-react";

const messages = {
  fr: {
    title: "Réservation en ligne",
    subtitle: "Système temporairement indisponible",
    body: "Notre système de réservation en ligne est actuellement en maintenance. En attendant, vous pouvez nous contacter directement par téléphone ou via Instagram pour réserver votre table.",
    phone: "Par téléphone",
    instagram: "Sur Instagram",
    back: "Retour à l'accueil",
  },
  en: {
    title: "Online reservation",
    subtitle: "System temporarily unavailable",
    body: "Our online reservation system is currently under maintenance. In the meantime, you can contact us directly by phone or via Instagram to book your table.",
    phone: "By phone",
    instagram: "On Instagram",
    back: "Back to home",
  },
  es: {
    title: "Reserva en línea",
    subtitle: "Sistema temporalmente no disponible",
    body: "Nuestro sistema de reservas en línea se encuentra actualmente en mantenimiento. Mientras tanto, puede contactarnos directamente por teléfono o a través de Instagram para reservar su mesa.",
    phone: "Por teléfono",
    instagram: "En Instagram",
    back: "Volver al inicio",
  },
  it: {
    title: "Prenotazione online",
    subtitle: "Sistema temporaneamente non disponibile",
    body: "Il nostro sistema di prenotazione online è attualmente in manutenzione. Nel frattempo, puoi contattarci direttamente per telefono o tramite Instagram per prenotare il tuo tavolo.",
    phone: "Per telefono",
    instagram: "Su Instagram",
    back: "Torna alla home",
  },
};

export default function ReservationMaintenance() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center bg-whiteSmokedBG px-6 py-20 text-greenBottle">
      <div className="flex flex-col items-center gap-6 max-w-xl text-center">
        <Wrench size={48} strokeWidth={1.5} className="opacity-70" />

        <div>
          <p className="font-schoolbell text-5xl leading-tight mb-1">
            {messages.fr.title}
          </p>
          <p className="font-cormorantGaramond text-2xl italic opacity-80">
            {messages.fr.subtitle}
          </p>
        </div>

        <p className="font-cormorantGaramond text-xl leading-relaxed opacity-90">
          {messages.fr.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <a
            href="tel:+33434422749"
            className="flex items-center gap-3 justify-center border border-greenBottle px-6 py-4 font-cormorantGaramond text-xl hover:bg-greenBottle hover:text-whiteSmokedBG transition-colors duration-200"
          >
            <Phone size={20} />
            <span>+33 4 34 42 27 49</span>
          </a>

          <a
            href="https://www.instagram.com/carbo_restaurant/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 justify-center border border-greenBottle px-6 py-4 font-cormorantGaramond text-xl hover:bg-greenBottle hover:text-whiteSmokedBG transition-colors duration-200"
          >
            <Instagram size={20} />
            <span>@carbo_restaurant</span>
          </a>
        </div>
      </div>
    </section>
  );
}
