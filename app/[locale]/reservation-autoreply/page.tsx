import ReservationDetails from "@/components/ReservationValidation";
import React from "react";
import { getRestaurantContact } from "@/lib/restaurant-contact";

async function ReservationAutoReplyPage() {
  const contact = await getRestaurantContact();
  return (
    <>
      <ReservationDetails phone={contact.phone} />
    </>
  );
}

export default ReservationAutoReplyPage;