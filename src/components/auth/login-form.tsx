"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { CircleX } from "lucide-react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export const LoginForm = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
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

          <Field>
            <FieldLabel htmlFor="password">{t("SignIn.password")}</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={t("SignIn.password")}
              required
              autoComplete="current-password"
              minLength={8}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {t("SignIn.login")}
        </Button>

        {errorMessage && (
          <div
            className="mt-4 flex items-center gap-2 justify-center"
            aria-live="polite"
            aria-atomic="true"
          >
            <CircleX className="h-5 w-5 text-red-500" />
            <div className="text-sm text-red-500">{errorMessage}</div>
          </div>
        )}
      </div>
    </form>
  );
};
