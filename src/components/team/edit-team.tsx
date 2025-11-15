"use client";

import { updateTeam } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { Team } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";

export default function UpdateTeamForm({ team }: { team: Team }) {
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
    <form action={formAction}>
      <FormGenerator fields={fields} values={team} errors={state.errors} />
      <Button type={"submit"} className={"mt-4 w-full"} disabled={isPending}>
        {t("updateTeam")}
      </Button>
    </form>
  );
}
