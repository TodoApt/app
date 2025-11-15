"use client";

import { Bot, CircleX, SendHorizontal } from "lucide-react";
import { useActionState, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { generateTask } from "@/app/lib/actions";

export const TaskAssistant = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const [errorMessage, formAction, isPending] = useActionState(
    generateTask,
    undefined,
  );

  const toggleOpen = () => setOpen((prevState) => !prevState);

  return (
    <div>
      <div
        onClick={toggleOpen}
        className={
          "fixed bottom-4 right-4 bg-primary p-2 rounded-full z-10 cursor-pointer text-white"
        }
      >
        <Bot className={"h-8 w-8"} />
      </div>
      {open && (
        <form
          className={
            "fixed bottom-20 right-4 bg-background w-[300px] md:w-[600px] p-2 rounded-lg"
          }
          action={formAction}
        >
          <div className={"flex gap-2 items-center relative"}>
            <Textarea
              placeholder={t("TaskAssistant.enterTask")}
              rows={4}
              name={"input"}
            />

            <Button
              type={"submit"}
              disabled={isPending}
              className={"w-8 h-8 absolute bottom-4 right-2"}
            >
              {!isPending ? (
                <SendHorizontal />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              )}
            </Button>

            {errorMessage && (
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <CircleX className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
