export const siteConfig = {
  name: "Koda Coliving.AI",
  legalName: "Koda Coliving.AI",
  description:
    "Agentic AI coliving management for Singapore operators and landlords. WhatsApp tenant service, verified viewings, rent collection, and vendor dispatch.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4317",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/6500000000",
  locale: "en_SG",
  region: "Singapore",
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
