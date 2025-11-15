"use client";

import { updateProfile } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { User } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "../full-screen-dialog";

export default function UpdateProfileForm({ user }: { user: User }) {
  const t = useTranslations("Profile");

  const fields = useMemo(
    () => [
      {
        name: "firstName",
        label: t("firstName"),
        type: "input",
        placeholder: "John",
      },
      {
        name: "lastName",
        label: t("lastName"),
        type: "input",
        placeholder: "Doe",
      },
      {
        name: "email",
        label: t("email"),
        type: "email",
        placeholder: "email@example.com",
      },
    ],
    [t],
  );

  const updateProfileWithId = updateProfile.bind(null, user.id);

  const [state, formAction, isPending] = useActionState(
    updateProfileWithId,
    {},
  );

  return (
    <FullScreenDialog
      open={true}
      title={`${t("editProfile")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"edit-profile"}
        >
          {t("updateProfile")}
        </Button>
      }
    >
      <form action={formAction} id={"edit-profile"}>
        <FormGenerator fields={fields} errors={state.errors} values={user} />
      </form>
    </FullScreenDialog>
  );
}
