import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json(); // Parse le corps de la requête

  // Faites quelque chose avec les données reçues
  const { fullName, email, numberOfGuests, eventDate, eventTime, specialRequests } = body;

  // Exemple de réponse
  return NextResponse.json({
    message: 'Réservation reçue',
    data: { fullName, email, numberOfGuests, eventDate, eventTime, specialRequests },
  });
}

// Optionnel : Gérer d'autres méthodes HTTP comme GET, PUT, etc.
export function GET() {
  return NextResponse.json({ message: 'GET non implémenté pour cette route' });
}
