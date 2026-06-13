"use client";

import { useEffect, useState } from "react";

interface ReservationInfo {
  date?: string;
  heure?: string;
  invites?: string;
  nom?: string;
  commentaire?: string;
  email?: string;
}

const CONFIRM_COMMENT = "Merci beaucoup pour votre réservation ! Nous sommes heureux de vous informer que votre demande a été confirmée. Nous avons hâte de vous accueillir au restaurant pour passer un agréable moment ensemble. À très bientôt !";
const CONFIRM_COMMENT2 = "Nous vous attendons au 11 rue Trivalle CARCASSONNE. Pour toutes demandes supplémentaires, veuillez nous contacter au +33 4 34 42 27 49 ou +33 6 29 10 42 17.";
const REFUSE_COMMENT = "Nous vous remercions pour votre réservation. Malheureusement, nous ne pouvons pas l'accepter pour le moment. Nous sommes désolés pour ce contretemps et espérons avoir l'occasion de vous accueillir une prochaine fois. N'hésitez pas à reprogrammer votre réservation à une autre date. À bientôt !";

const ReservationDetails = () => {
  const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState<"confirmed" | "refused" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReservationInfo({
      date: params.get("date") || "",
      heure: params.get("heure") || "",
      invites: params.get("invites") || "",
      nom: params.get("nom") || "",
      commentaire: params.get("commentaire") || "",
      email: params.get("email") || "",
    });
  }, []);

  const sendAutoreply = async (type: "CONFIRMÉE" | "REFUSÉE") => {
    if (!reservationInfo?.email) return;
    setIsSending(true);

    const isConfirmed = type === "CONFIRMÉE";

    try {
      const res = await fetch("/api/autoreply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: reservationInfo.email,
          fullName: reservationInfo.nom,
          eventDate: reservationInfo.date,
          eventTime: reservationInfo.heure,
          numberOfGuests: reservationInfo.invites,
          reservationType: type,
          reservationComment: isConfirmed ? CONFIRM_COMMENT : REFUSE_COMMENT,
          reservationComment2: isConfirmed ? CONFIRM_COMMENT2 : "",
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      setSent(isConfirmed ? "confirmed" : "refused");
    } catch (error) {
      console.error("Erreur autoreply :", error);
      alert("Échec de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSending(false);
    }
  };

  if (!reservationInfo) return <p className="text-center mt-10">Chargement...</p>;

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="p-6 text-center shadow-lg bg-white rounded-2xl max-w-sm">
          <p className="text-xl font-semibold">
            {sent === "confirmed" ? "✅ Réservation confirmée" : "❌ Réservation refusée"}
          </p>
          <p className="text-gray-500 mt-2">Le mail a bien été envoyé à {reservationInfo.email}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="p-6 text-center shadow-lg bg-white rounded-2xl max-w-sm">
        <h2 className="text-xl font-semibold">Demande de Réservation</h2>
        <p className="text-gray-600 mt-2">
          <strong>📅 Date :</strong> {reservationInfo.date || "Non précisé"} à {reservationInfo.heure || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>👥 Nombre d'invités :</strong> {reservationInfo.invites || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>👤 Nom :</strong> {reservationInfo.nom || "Non précisé"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>💬 Commentaire :</strong> {reservationInfo.commentaire || "Aucun commentaire"}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>✉️ Email :</strong> {reservationInfo.email || "Non précisé"}
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            disabled={isSending}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => sendAutoreply("REFUSÉE")}
          >
            REFUSER
          </button>
          <button
            disabled={isSending}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => sendAutoreply("CONFIRMÉE")}
          >
            VALIDER
          </button>
        </div>

        {isSending && <p className="text-sm text-gray-400 mt-3">Envoi en cours...</p>}
      </div>
    </div>
  );
};

export default ReservationDetails;
