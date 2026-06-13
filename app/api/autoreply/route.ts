import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  const { email, fullName, eventDate, eventTime, numberOfGuests, reservationType, reservationComment, reservationComment2 } =
    await req.json();

  const isConfirmed = reservationType === "CONFIRMÉE";
  const accentColor = isConfirmed ? "#2d4a2d" : "#991b1b";
  const statusLabel = isConfirmed ? "✅ CONFIRMÉE" : "❌ REFUSÉE";

  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px;">
      <h2 style="color:${accentColor};text-align:center;">CARBO</h2>
      <p>Bonjour <strong>${fullName}</strong>,</p>
      <p>Votre réservation du <strong>${eventDate} à ${eventTime}</strong> pour <strong>${numberOfGuests} personne(s)</strong> est :</p>
      <h3 style="text-align:center;color:${accentColor};">${statusLabel}</h3>
      <p style="padding:16px;background:#f5f5f0;border-left:4px solid ${accentColor};">
        ${reservationComment}
      </p>
      ${reservationComment2 ? `<p style="padding:16px;background:#f5f5f0;border-left:4px solid ${accentColor};margin-top:12px;">${reservationComment2}</p>` : ""}
      <p style="color:#888;font-size:13px;margin-top:32px;text-align:center;">
        Restaurant CARBO — 11 rue Trivalle, Carcassonne
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Votre réservation chez CARBO est ${reservationType}`,
    html,
  });

  if (error) {
    console.error("Resend autoreply error:", JSON.stringify(error));
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
