import "server-only";
import { createClient } from "@supabase/supabase-js";

export type RestaurantContact = {
  phone: string; // display form as stored in DB, e.g. "+33 6 29 10 42 17"
  email: string;
};

// Used only if the DB is unreachable; mirrors the historical hardcoded values.
export const FALLBACK_CONTACT: RestaurantContact = {
  phone: "+33 4 34 42 27 49",
  email: "carbo11@icloud.com",
};

// Phone + public email come from the `restaurants` row so the owner can change
// them in one place and have every display (site pages, footer, emails) follow.
export async function getRestaurantContact(): Promise<RestaurantContact> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { global: { fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }) } }
  );

  const { data, error } = await supabase
    .from("restaurants")
    .select("phone, email")
    .eq("id", process.env.RESTAURANT_ID!)
    .single();

  if (error || !data) return FALLBACK_CONTACT;
  return {
    phone: data.phone?.trim() || FALLBACK_CONTACT.phone,
    email: data.email?.trim() || FALLBACK_CONTACT.email,
  };
}
