import type { Metadata } from "next";

const BASE_URL = "https://eaglenestcreations.com";

export const siteConfig = {
  name: "EagleNest Creations",
  tagline: "Build. Launch. Dominate.",
  description:
    "EagleNest Creations is a premium digital studio specializing in AI development, software engineering, digital marketing, branding, SEO, and automation.",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og/default.png`,
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url: siteConfig.url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
