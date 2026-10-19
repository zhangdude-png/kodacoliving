import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-19");
  const alternates = (en: string, zh: string) => ({
    languages: {
      en: absoluteUrl(en),
      "zh-Hans": absoluteUrl(zh),
      "x-default": absoluteUrl(en),
    },
  });
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: alternates("/", "/zh"),
    },
    {
      url: absoluteUrl("/for-landlords"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: alternates("/for-landlords", "/zh/for-landlords"),
    },
    {
      url: absoluteUrl("/zh"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates("/", "/zh"),
    },
    {
      url: absoluteUrl("/zh/for-landlords"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates("/for-landlords", "/zh/for-landlords"),
    },
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
