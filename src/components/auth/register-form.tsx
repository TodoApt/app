"use client";

import { useActionState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { registerUser } from "@/app/lib/actions";
import FormGenerator from "@/components/form-generator";

export const RegisterForm = () => {
  const t = useTranslations("Register");
  const [state, formAction, isPending] = useActionState(registerUser, {});

  const fields = useMemo(
    () => [
      {
        name: "teamName",
        label: t("teamName"),
        type: "input",
        placeholder: "My team",
      },
      {
        name: "email",
        label: t("email"),
        type: "email",
        placeholder: "email@example.com",
      },
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
        name: "password",
        label: t("password"),
        type: "password",
        placeholder: t("password"),
      },
      {
        name: "inviteToken",
        label: t("inviteToken"),
        type: "input",
        placeholder: t("inviteToken"),
      },
    ],
    [t],
  );

  return (
    <form action={formAction} className="space-y-8">
      <FormGenerator fields={fields} errors={state.errors} />
      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {t("createAccount")}
        </Button>
      </div>
    </form>
  );
};
