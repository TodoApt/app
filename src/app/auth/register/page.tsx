import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Register from "@/components/auth/register";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Register");

  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default function RegisterPage() {
  return <Register />;
}
