"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { requestResetPassword } from "@/app/lib/actions";
import { CircleX, CircleCheck } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const initialState = { status: "", message: "" };

export const ResetPasswordForm = () => {
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(
    requestResetPassword,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-8">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">{t("SignIn.email")}</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              autoComplete="email"
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {t("ResetPassword.sendLink")}
        </Button>

        {state.message && (
          <div
            className={cn({
              "mt-4 flex items-center gap-2 justify-center": true,
              "text-green-600": state.status === "SUCCESS",
              "text-red-600": state.status === "ERROR",
            })}
            aria-live="polite"
            aria-atomic="true"
          >
            {state.status === "SUCCESS" ? (
              <CircleCheck className="h-5 w-5 text-green-500" />
            ) : (
              <CircleX className="h-5 w-5 text-red-500" />
            )}
            <div>{state.message}</div>
          </div>
        )}
      </div>
    </form>
  );
};
