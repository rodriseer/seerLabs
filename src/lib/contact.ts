/**
 * Single source of truth for how people reach Rodrigo about work.
 *
 * Everything that emails him — the inquiry form fallback, the contact-page
 * card, footer links, CTAs — should build its mailto through `mailtoHref`
 * so the address and formatting stay consistent in one place.
 */

export const CONTACT_EMAIL = "rodrigoseer.dev@gmail.com";

interface MailtoOptions {
  subject?: string;
  body?: string;
}

/**
 * Build a mailto: link with a properly-encoded subject and body.
 * Uses %20 encoding (not "+") so mail clients render the draft cleanly.
 */
export function mailtoHref({ subject, body }: MailtoOptions = {}): string {
  const parts: string[] = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}${parts.length ? `?${parts.join("&")}` : ""}`;
}
