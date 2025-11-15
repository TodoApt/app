"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "@/app/lib/actions";
import { CircleCheck, CircleX } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const initialState = { status: "", message: "" };

export const UpdatePasswordForm = ({ token }: { token: string }) => {
  const resetPasswordActionWithToken = resetPasswordAction.bind(null, token);

  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(
    resetPasswordActionWithToken,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-8">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">{t("SignIn.password")}</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t("UpdatePassword.newPassword")}
              required
              autoComplete="current-password"
              minLength={8}
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
          {t("UpdatePassword.updatePassword")}
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
