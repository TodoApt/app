import { Metadata } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import UserInfo from "@/components/profile/profile";
import { User } from "@/app/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Profile");
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function Page() {
  const t = await getTranslations();

  const session = await auth();

  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">
          {t("Profile.yourProfile")}
        </h2>

        <Link href={"/profile/edit"}>
          <Button>{t("Shared.edit")}</Button>
        </Link>
      </div>

      <UserInfo user={session?.user as User} />
    </div>
  );
}
