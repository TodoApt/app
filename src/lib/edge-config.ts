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

function hostToKey(host: string) {
  const domain = host.replace(".localhost:3000", "").replace(/_/g, ".");
  return `brand_${domain.replace(/\./g, "_")}`;
}

export function brandCacheTag(host: string) {
  return `brand-config-${hostToKey(host)}`;
}

export async function getBrandConfig(host: string): Promise<Brand> {
  const key = hostToKey(process.env.BRAND_HOST || host);
  const tag = brandCacheTag(process.env.BRAND_HOST || host);

  return unstable_cache(
    async () => {
      try {
        const config = (await get(key)) as Brand | undefined;
        return config || defaultConfig;
      } catch {
        return defaultConfig;
      }
    },
    [key],
    { revalidate: 86400, tags: [tag] },
  )();
}
