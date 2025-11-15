"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Shared");
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">{t("error")}</h2>
      <Button
        className="mt-2"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        {t("retry")}
      </Button>
    </main>
  );
}
