import { Metadata } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { getTranslations } from "next-intl/server";
import Settings from "@/components/settings";
import { auth } from "@/auth";
import { User } from "@/app/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Settings" });
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function Page() {
  const session = await auth();

  return <Settings user={session?.user as User} />;
}
