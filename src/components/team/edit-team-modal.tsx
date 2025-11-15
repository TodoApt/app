"use client";

import { updateTeam } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { Team } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

export default function UpdateTeamFormModal({ team }: { team: Team }) {
  const t = useTranslations("Team");

  const fields = useMemo(
    () => [
      {
        name: "name",
        label: t("teamName"),
        type: "input",
        placeholder: "My team",
      },
    ],
    [t],
  );

  const updateTeamWithId = updateTeam.bind(null, team.id);

  const [state, formAction, isPending] = useActionState(updateTeamWithId, {});

  return (
    <FullScreenDialog
      open={true}
      title={`${t("editTeam")}`}
      actions={
        <Button
          type={"submit"}
          className={"mt-4 w-full"}
          disabled={isPending}
          form={"edit-team"}
        >
          {t("updateTeam")}
        </Button>
      }
    >
      <form action={formAction} id={"edit-team"}>
        <FormGenerator fields={fields} errors={state.errors} values={team} />
      </form>
    </FullScreenDialog>
  );
}
