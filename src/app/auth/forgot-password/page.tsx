import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import ResetPassword from "@/components/auth/reset-password";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResetPassword" });

  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
