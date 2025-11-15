import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { getProperties } from "@/app/lib/data";
import { DeleteProperty } from "@/components/properties/delete-property";

export default async function PropertiesList({
  query,
}: {
  query: Record<string, string>;
}) {
  const t = await getTranslations();

  const properties = await getProperties(query);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {properties?.map((property) => (
        <div
          className="p-3 border rounded-md border-gray-200 bg-muted hover:shadow-sm dark:border-gray-7000"
          key={property.id}
        >
          <h3 className="font-medium text-gray-800 dark:text-gray-100">
            {property.name}
          </h3>

          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {property.reference}
          </h2>

          <div className={"flex gap-2 mt-2"}>
            <Link href={`/properties/edit/${property.id}`}>
              <Button>{t("Shared.edit")}</Button>
            </Link>
            <DeleteProperty id={property.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
