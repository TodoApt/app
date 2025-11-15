import { unstable_cache } from "next/cache";
import { get } from "@vercel/edge-config";

const defaultConfig = {
  colors: {
    light: {
      primary: "#ea580c",
      secondary: "#f5f5f4",
    },
    dark: {
      primary: "#ea580c",
      secondary: "#292524",
    },
  },
  logo: "https://cdn.todoapt.com/image/upload/icon_kywxmp.png",
  name: "TodoApt",
};

export interface Brand {
  colors: {
    light: { primary: string; secondary: string };
    dark: { primary: string; secondary: string };
  };
  logo: string;
  name: string;
}

const getCachedBrandConfig = unstable_cache(
  async (host: string): Promise<Brand> => {
    const domain = host.replace(".localhost:3000", "").replace(/_/g, ".");
    const key = `brand_${domain.replace(/\./g, "_")}`;
    try {
      const config = (await get(key)) as Brand | undefined;
      return config || defaultConfig;
    } catch {
      return defaultConfig;
    }
  },
  ["brand-config"], // cache key
  { revalidate: 86400 }, // 24 hours in seconds
);

export async function getBrandConfig(domain: string) {
  return getCachedBrandConfig(domain);
}
