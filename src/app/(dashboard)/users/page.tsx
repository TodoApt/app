import { Metadata } from "next";
import { headers } from "next/headers";
import { getBrandConfig } from "@/lib/edge-config";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import UsersList from "@/components/users/users-list";
import { Skeleton } from "@/components/ui/skeleton";
import Search from "@/components/search";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Users");
  const headersList = await headers();

  const domain = headersList.get("host") || "default";
  const brandConfig = await getBrandConfig(domain);

  return {
    title: `${t("title")} | ${brandConfig.name}`,
  };
}

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || "";

  const t = await getTranslations();
  return (
    <div>
      <Search />
      <div className={"flex items-center justify-between"}>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">
          {t("Users.yourUsers")}
        </h2>

        <Link href={"/users/new"}>
          <Button>{t("Shared.add")}</Button>
        </Link>
      </div>

      <Suspense
        key={query}
        fallback={
          <div className={"mt-4 flex flex-col gap-2"}>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        }
      >
        <UsersList
          query={{
            search: query,
          }}
        />
      </Suspense>
    </div>
  );
}
