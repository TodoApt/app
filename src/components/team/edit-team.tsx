"use client";

import { updateTeamAndBranding } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/form-generator";
import { Team } from "@/app/lib/schema";
import { useActionState, useMemo } from "react";
import { useTranslations } from "next-intl";
import FullScreenDialog from "@/components/full-screen-dialog";

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
      { name: "logo", label: t("logo"), type: "logo" },
      { name: "primaryLight", label: t("primaryColorLight"), type: "color" },
      {
        name: "secondaryLight",
        label: t("secondaryColorLight"),
        type: "color",
      },
      { name: "primaryDark", label: t("primaryColorDark"), type: "color" },
      { name: "secondaryDark", label: t("secondaryColorDark"), type: "color" },
    ],
    [t],
  );

  const values = useMemo(
    () => ({
      name: team.name,
      logo: team.logo ?? "",
      primaryLight: team.primaryColorLight ?? "#ea580c",
      secondaryLight: team.secondaryColorLight ?? "#f5f5f4",
      primaryDark: team.primaryColorDark ?? "#ea580c",
      secondaryDark: team.secondaryColorDark ?? "#292524",
    }),
    [team],
  );

  const updateWithId = updateTeamAndBranding.bind(null, team.id);
  const [state, formAction, isPending] = useActionState(updateWithId, {});

  return (
    <FullScreenDialog
      open={true}
      title={t("editTeam")}
      actions={
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          form="edit-team"
        >
          {t("updateTeam")}
        </Button>
      }
    >
      <form action={formAction} id="edit-team">
        <FormGenerator fields={fields} values={values} errors={state.errors} />
      </form>
    </FullScreenDialog>
  );
}
