"use client";

import { useTranslations } from "next-intl";
import { PlanTypeEnum, Team, Usage } from "@/app/lib/schema";
import { EditAvatar } from "@/components/team/edit-avatar";

export default function TeamInfo({
  team,
  usage,
}: {
  team: Team;
  usage: Usage;
}) {
  const t = useTranslations("Team");

  const planTypeMap: Record<PlanTypeEnum, string> = {
    free: t("planFree"),
    basic: t("planBasic"),
    premium: t("planPremium"),
    enterprise: t("planEnterprise"),
  };

  return (
    <div className="flex items-center justify-between space-x-4 mt-4">
      <div className="flex items-center space-x-4">
        <EditAvatar team={team} />

        <div className={"flex flex-col gap-0.5"}>
          <p className="text-lg font-medium leading-none">{team.name}</p>
          <p className="text-md text-muted-foreground">
            {planTypeMap[team.plan]}
          </p>
          <p className="text-md text-muted-foreground">
            {usage.numUsers} / {usage.numAllowedUsers} {t("userUsage")}
          </p>
          <p className="text-md text-muted-foreground">
            {usage.numProperties} / {usage.numAllowedProperties}{" "}
            {t("propertiesUsage")}
          </p>
        </div>
      </div>
    </div>
  );
}
