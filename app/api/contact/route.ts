import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const RESTAURANT_EMAIL = process.env.RESTAURANT_CONTACT_EMAIL ?? "restaurant.carbo11@gmail.com";

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700;800&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">`;

const MONOGRAM = `<div style="display:inline-block;width:34px;height:34px;border-radius:10px;background:#13503B;text-align:center;line-height:34px;vertical-align:middle;"><span style="color:#F5F1E9;font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:17px;letter-spacing:-0.03em;">R</span></div>`;

const WORDMARK = `<span style="font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.03em;color:#16201B;vertical-align:middle;margin-left:9px;">RESA<span style="color:#C77E3A;">.</span></span>`;

function detailsTable(rows: [string, string][]): string {
  const last = rows.length - 1;
  return `
    <table style="width:100%;border-collapse:collapse;">
      ${rows.map(([label, value], i) => `
        <tr>
          <td style="padding:9px 0;${i < last ? "border-bottom:1px solid #F0EADD;" : ""}color:#9A9587;font-size:13px;width:38%;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;">${label}</td>
          <td style="padding:9px 0;${i < last ? "border-bottom:1px solid #F0EADD;" : ""}color:#16201B;font-size:14px;font-weight:500;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;">${value}</td>
        </tr>`).join("")}
    </table>`;
}

export async function POST(req: NextRequest) {
  const { fullName, email, phone, numberOfGuests, eventDate, eventDateISO, eventTime, specialRequests } =
    await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Service split: time_slot before 17:00 => lunch ("midi"), otherwise dinner ("soir").
  const SERVICE_CUTOFF_MIN = 17 * 60;
  const serviceFromTime = (t: string): "midi" | "soir" => {
    const [h, m] = (t ?? "").split(":").map(Number);
    return h * 60 + (m || 0) < SERVICE_CUTOFF_MIN ? "midi" : "soir";
  };

  // Block duplicate: same email + same day + same service (midi/soir).
  // Service filter pushed to the DB: time_slot is zero-padded "HH:MM", so a
  // lexicographic compare against "17:00" == chronological. Fetches at most the
  // one matching row (limit 1) instead of scanning + filtering in JS.
  const incomingService = serviceFromTime(eventTime);
  let dupQuery = supabase
    .from("reservations")
    .select("name, email, date, time_slot, covers")
    .eq("restaurant_id", process.env.RESTAURANT_ID!)
    .eq("date", eventDateISO)
    .ilike("email", email)
    .not("status", "in", "(refused,cancelled)")
    .limit(1);
  dupQuery =
    incomingService === "midi"
      ? dupQuery.lt("time_slot", "17:00")
      : dupQuery.gte("time_slot", "17:00");

  const { data: match, error: dupError } = await dupQuery.maybeSingle();

  if (dupError) {
    console.error("Supabase duplicate check error:", JSON.stringify(dupError));
    // Non-blocking: fall through to normal insert if the check itself fails.
  } else if (match) {
    return NextResponse.json(
      {
        duplicate: true,
        existing: {
          name: match.name,
          email: match.email,
          date: match.date,
          time_slot: match.time_slot,
          covers: match.covers,
          service: incomingService,
        },
      },
      { status: 409 }
    );
  }

  const { error: dbError } = await supabase.from("reservations").insert({
    restaurant_id: process.env.RESTAURANT_ID!,
    date: eventDateISO,
    time_slot: eventTime,
    covers: parseInt(numberOfGuests, 10),
    name: fullName,
    email,
    phone: phone ?? "",
    notes: specialRequests ?? "",
    status: "pending",
  });

  if (dbError) {
    console.error("Supabase insert error:", JSON.stringify(dbError));
    return NextResponse.json({ error: dbError }, { status: 500 });
  }

  const dateLabel = eventDateISO ? fmtDate(eventDateISO) : eventDate;

  const detailRows: [string, string][] = [
    ["Nom", fullName],
    ["Email", email],
    ["Téléphone", phone ?? "—"],
    ["Date", dateLabel],
    ["Heure", eventTime],
    ["Couverts", `${numberOfGuests} personne${parseInt(numberOfGuests, 10) > 1 ? "s" : ""}`],
    ...(specialRequests ? [["Notes", specialRequests] as [string, string]] : []),
  ];

  const restaurantId = process.env.RESTAURANT_ID!;
  const manageUrl = `https://resa-service.com/restaurant/${restaurantId}/reservations`;

  const restaurantHtml = `
    <!DOCTYPE html><html><head>${FONTS}</head>
    <body style="margin:0;padding:0;background:#F5F1E9;">
      <div style="font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#F5F1E9;padding:32px 24px;">

        <div style="text-align:center;margin-bottom:28px;">
          ${MONOGRAM}${WORDMARK}
        </div>

        <div style="background:#F6EBD6;border:1px solid rgba(185,125,43,0.25);border-radius:12px;padding:16px 20px;text-align:center;margin-bottom:24px;">
          <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#B97D2B;">Nouvelle demande de réservation</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">En attente de validation</p>
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#9A9587;text-transform:uppercase;">Détails de la réservation</p>
          ${detailsTable(detailRows)}
        </div>

        <div style="text-align:center;margin-bottom:28px;">
          <a href="${manageUrl}" target="_blank" rel="noopener"
            style="display:inline-block;background:#C77E3A;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:10px;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;font-weight:600;font-size:14px;">
            Gérer dans RESA
          </a>
        </div>

        <p style="margin:0;text-align:center;font-size:12px;color:#9A9587;">
          Propulsé par <a href="https://resa-service.com" style="color:#9A9587;">RESA</a> · resa-service.com
        </p>
      </div>
    </body></html>
  `;

  const clientHtml = `
    <!DOCTYPE html><html><head>${FONTS}</head>
    <body style="margin:0;padding:0;background:#F5F1E9;">
      <div style="font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#F5F1E9;padding:32px 24px;">

        <div style="text-align:center;margin-bottom:28px;">
          ${MONOGRAM}${WORDMARK}
        </div>

        <div style="background:#F6EBD6;border:1px solid rgba(185,125,43,0.25);border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#B97D2B;">Demande reçue · En attente de confirmation</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">Votre réservation sera confirmée dès que le restaurant l'aura validée.</p>
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#9A9587;text-transform:uppercase;">Récapitulatif</p>
          ${detailsTable(detailRows)}
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#16201B;">Restaurant CARBO</p>
          <p style="margin:0 0 3px;font-size:13px;color:#5E665E;">11 rue Trivalle, Carcassonne</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">+33 4 34 42 27 49</p>
        </div>

        <p style="margin:0;text-align:center;font-size:12px;color:#9A9587;">
          Propulsé par <a href="https://resa-service.com" style="color:#9A9587;">RESA</a> · resa-service.com
        </p>
      </div>
    </body></html>
  `;

  // Emails sent in the background (waitUntil): the reservation is already saved,
  // so we respond immediately instead of blocking the client on two Resend
  // round trips. The function stays alive until these settle.
  waitUntil(
    Promise.all([
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
    ])
      .then(([restaurantResult, clientResult]) => {
        if (restaurantResult.error) console.error("Resend error (restaurant):", JSON.stringify(restaurantResult.error));
        if (clientResult.error) console.error("Resend error (client):", JSON.stringify(clientResult.error));
      })
      .catch((err) => console.error("Resend send failed:", err))
  );

  return NextResponse.json({ success: true });
}
