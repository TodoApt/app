import { getProperties, getUsers } from "@/app/lib/data";
import { Filters } from "@/components/filters";
import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import Tasks from "@/components/tasks/tasks";
import { auth } from "@/auth";

const convertSearchParams = <T extends Record<string, string>>(
  params: T | undefined,
): Partial<T> => {
  if (!params) {
    return {};
  }
  return Object.entries(params).reduce(
    (acc, [key, value]) =>
      value !== null && value !== "" ? { ...acc, [key]: value } : acc,
    {} as Partial<T>,
  );
};

const toKey = (query: Record<string, string>) => {
  return Object.values(query).join("_");
};

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    propertyId?: string;
    priority?: string;
    assignedTo?: string;
    dueDate?: string;
    completedDate?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const [properties, users] = await Promise.all([getProperties(), getUsers()]);
  const t = await getTranslations();

  const query = convertSearchParams(searchParams);

  const key = `key_${toKey(query)}`;
  const session = await auth();
  const isAdmin = session?.user?.type === "admin" || false;

  return (
    <div>
      <Filters properties={properties} users={users} isAdmin={isAdmin} />
      <div className={"flex items-center justify-between"}>
        <h2 className="text-base font-medium text-gray-700 dark:text-gray-300">
          {isAdmin ? t("Tasks.allTasks") : t("Tasks.yourTasks")}
        </h2>

        <Link href={"/new"}>
          <Button>{t("Shared.add")}</Button>
        </Link>
      </div>

      <Suspense
        key={`${key}_tasks`}
        fallback={
          <div className={"mt-4 flex flex-col gap-2"}>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        }
      >
        <Tasks query={query} />
      </Suspense>
    </div>
  );
}
