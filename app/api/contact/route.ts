import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// À remplacer par une adresse vérifiée sur resend.com/domains une fois le domaine vérifié
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const RESTAURANT_EMAIL = process.env.RESTAURANT_CONTACT_EMAIL ?? "restaurant.carbo11@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.restaurant-carbo.fr";

export async function POST(req: NextRequest) {
  const { fullName, email, numberOfGuests, eventDate, eventTime, specialRequests } =
    await req.json();

  const reservationDetails = `
    <table style="border-collapse:collapse;width:100%;font-family:Georgia,serif;">
      <tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Nom</td><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${fullName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Personnes</td><td style="padding:8px;border:1px solid #ddd;">${numberOfGuests}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Date</td><td style="padding:8px;border:1px solid #ddd;">${eventDate}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Heure</td><td style="padding:8px;border:1px solid #ddd;">${eventTime}</td></tr>
      ${specialRequests ? `<tr><td style="padding:8px;border:1px solid #ddd;color:#555;">Demandes spéciales</td><td style="padding:8px;border:1px solid #ddd;">${specialRequests}</td></tr>` : ""}
    </table>
  `;

  const manageUrl = `${SITE_URL}/reservation-autoreply?date=${encodeURIComponent(eventDate)}&heure=${encodeURIComponent(eventTime)}&invites=${encodeURIComponent(numberOfGuests)}&nom=${encodeURIComponent(fullName)}&commentaire=${encodeURIComponent(specialRequests ?? "")}&email=${encodeURIComponent(email)}`;

  const restaurantHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#2d4a2d;text-align:center;">DEMANDE DE RÉSERVATION</h2>
      ${reservationDetails}
      <div style="text-align:center;margin-top:32px;">
        <a href="${manageUrl}" target="_blank" rel="noopener"
          style="background:#2d4a2d;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;">
          Gérer la réservation
        </a>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;">
      <h2 style="color:#2d4a2d;text-align:center;">CARBO</h2>
      <p>Bonjour <strong>${fullName}</strong>,</p>
      <p>Nous avons bien reçu votre demande de réservation. Voici le récapitulatif :</p>
      ${reservationDetails}
      <p style="margin-top:24px;padding:16px;background:#f5f5f0;border-left:4px solid #2d4a2d;">
        Votre réservation est actuellement <strong>EN ATTENTE DE CONFIRMATION</strong>.<br/><br/>
        Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais.
        Veuillez noter que votre réservation ne sera confirmée qu'une fois que vous aurez reçu un mail
        de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !
      </p>
      <p style="color:#888;font-size:13px;margin-top:32px;text-align:center;">
        Restaurant CARBO — 11 rue Trivalle, Carcassonne
      </p>
    </div>
  `;

  const [restaurantResult, clientResult] = await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: RESTAURANT_EMAIL,
      subject: `Nouvelle réservation — ${fullName} — ${eventDate} à ${eventTime}`,
      html: restaurantHtml,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Confirmation de votre demande de réservation — CARBO",
      html: clientHtml,
    }),
  ]);

  if (restaurantResult.error) {
    console.error("Resend error (restaurant):", JSON.stringify(restaurantResult.error));
    return NextResponse.json({ error: restaurantResult.error }, { status: 500 });
  }
  if (clientResult.error) {
    console.error("Resend error (client):", JSON.stringify(clientResult.error));
    return NextResponse.json({ error: clientResult.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
