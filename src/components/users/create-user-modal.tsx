"use client";

import { createUser } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function CreateUserFormModal() {
  const t = useTranslations("Users");

  const fields = useMemo(
    () => [
      {
        name: "email",
        label: t("email"),
        type: "email",
        placeholder: "email@example.com",
      },
      {
        name: "type",
        label: t("type"),
        type: "select",
        placeholder: t("type"),
        options: [
          { value: "user", label: t("typeUser") },
          { value: "admin", label: t("typeAdmin") },
        ],
      },
    ],
    [t],
  );

  const [state, formAction, isPending] = useActionState(createUser, {});

  return (
    <FullScreenDialog
      open={true}
      title={`${t("inviteUser")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"invite-user"}
        >
          {t("inviteUser")}
        </Button>
      }
    >
      <form action={formAction} id={"invite-user"}>
        <FormGenerator fields={fields} errors={state.errors} />
      </form>
    </FullScreenDialog>
  );
}
