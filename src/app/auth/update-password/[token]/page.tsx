import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import UpdatePassword from "@/components/auth/update-password";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("UpdatePassword");

  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function UpdatePasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <UpdatePassword token={token} />;
}
