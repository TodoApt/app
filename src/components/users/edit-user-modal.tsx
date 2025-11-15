"use client";

import { updateUser } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { User } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function UpdateUserFormModal({ user }: { user: User }) {
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

  const updateUserWithId = updateUser.bind(null, user.id);

  const [state, formAction, isPending] = useActionState(updateUserWithId, {});

  return (
    <FullScreenDialog
      open={true}
      title={`${t("editUser")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"update-user"}
        >
          {t("updateUser")}
        </Button>
      }
    >
      <form action={formAction} id={"update-user"}>
        <FormGenerator fields={fields} errors={state.errors} values={user} />
      </form>
    </FullScreenDialog>
  );
}
