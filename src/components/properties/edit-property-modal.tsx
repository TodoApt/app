"use client";

import { updateProperty } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { Property } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function UpdatePropertyFormModal({
  property,
}: {
  property: Property;
}) {
  const t = useTranslations("Properties");

  const fields = useMemo(
    () => [
      {
        name: "name",
        label: t("propertyName"),
        type: "input",
        placeholder: "My apt",
      },
      {
        name: "reference",
        label: t("propertyReference"),
        type: "input",
        placeholder: "REF01",
      },
      {
        name: "address",
        label: t("propertyAddress"),
        type: "input",
        placeholder: "Address",
      },
      {
        name: "floor",
        label: t("propertyFloor"),
        type: "input",
        placeholder: "Floor",
      },
      {
        name: "door",
        label: t("propertyDoor"),
        type: "input",
        placeholder: "Door",
      },
      {
        name: "notes",
        label: t("propertyNotes"),
        type: "textarea",
        placeholder: "Notes",
      },
    ],
    [t],
  );

  const updatePropertyWithId = updateProperty.bind(null, property.id);

  const [state, formAction, isPending] = useActionState(
    updatePropertyWithId,
    {},
  );

  return (
    <FullScreenDialog
      open={true}
      title={`${t("editProperty")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"edit-property"}
        >
          {t("updateProperty")}
        </Button>
      }
    >
      <form action={formAction} id={"edit-property"}>
        <FormGenerator
          fields={fields}
          errors={state.errors}
          values={property}
        />
      </form>
    </FullScreenDialog>
  );
}
