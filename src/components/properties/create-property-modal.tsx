"use client";

import { createProperty } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function CreatePropertyFormModal() {
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

  const [state, formAction, isPending] = useActionState(createProperty, {});

  return (
    <FullScreenDialog
      open={true}
      title={`${t("addProperty")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"add-property"}
        >
          {t("createProperty")}
        </Button>
      }
    >
      <form action={formAction} id={"add-property"}>
        <FormGenerator fields={fields} errors={state.errors} />
      </form>
    </FullScreenDialog>
  );
}
