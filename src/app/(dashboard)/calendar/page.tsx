import { Metadata } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TaskCalendar from "@/components/task-calendar";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Calendar");
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function Page() {
  const session = await auth();
  const isAdmin = session?.user?.type === "admin" || false;

  if (!isAdmin) {
    redirect("/");
  }

  return <TaskCalendar />;
}
