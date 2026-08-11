// Phone-number formatting helpers shared by server and client components.

// Temporary toggle: hide the phone number everywhere it is displayed on the
// public site (footer, contact, legal pages, JSON-LD, reservation call buttons).
// Transactional emails (confirmation / autoreply) keep the number regardless.
// Flip to `true` to show it again.
export const SHOW_PHONE = false;

/** Strip a display phone number down to dialable characters ("+33 6 29" -> "+33629"). */
export const normalizePhone = (phone: string): string => phone.replace(/[^\d+]/g, "");

/** Build a tel: href from a display phone number. */
export const telHref = (phone: string): string => `tel:${normalizePhone(phone)}`;
