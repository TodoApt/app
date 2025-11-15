import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { getUsers } from "@/app/lib/data";
import { DeleteUser } from "@/components/users/delete-user";

export default async function UsersList({
  query,
}: {
  query: Record<string, string>;
}) {
  const t = await getTranslations();

  const users = await getUsers(query);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {users?.map((user) => (
        <div
          className="p-3 border rounded-md border-gray-200 bg-muted hover:shadow-sm dark:border-gray-7000"
          key={user.id}
        >
          <h3 className="font-medium text-gray-800 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h3>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {user.email}
          </h2>

          <div className={"flex gap-2 mt-2"}>
            <Link href={`/users/edit/${user.id}`}>
              <Button>{t("Shared.edit")}</Button>
            </Link>
            <DeleteUser id={user.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
