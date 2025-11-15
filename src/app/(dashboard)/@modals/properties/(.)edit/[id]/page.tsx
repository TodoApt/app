import { getProperty } from "@/app/lib/data";
import { notFound } from "next/navigation";
import UpdatePropertyFormModal from "@/components/properties/edit-property-modal";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const property = await getProperty(id);

  if (!property) {
    return notFound();
  }

  return <UpdatePropertyFormModal property={property} />;
}
