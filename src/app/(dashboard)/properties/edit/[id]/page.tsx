import { getProperty } from "@/app/lib/data";
import UpdatePropertyForm from "@/components/properties/edit-property";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const property = await getProperty(id);

  if (!property) {
    return notFound();
  }

  return <UpdatePropertyForm property={property} />;
}
