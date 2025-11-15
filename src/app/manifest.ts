import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";

const getLogoSizes = (logo: string) => {
  if (!logo) {
    return [];
  }
  const sizes = [192, 512];

  const logos = [];
  for (const size of sizes) {
    const url = logo.replace(
      "image/upload",
      `image/upload/h_${size},w_${size}`,
    );

    logos.push({
      src: url,
      sizes: `${size}x${size}`,
      type: "image/png",
    });
  }

  return logos;
};
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    name: brandConfig.name,
    short_name: brandConfig.name,
    description: brandConfig.name,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brandConfig.colors.light.primary,
    icons: getLogoSizes(brandConfig.logo),
    shortcuts: [
      {
        name: "Add task",
        url: "/new",
        description: "Add task",
      },
    ],
  };
}
