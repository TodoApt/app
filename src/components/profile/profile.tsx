"use client";

import { useTranslations } from "next-intl";
import { User, UserTypeEnum } from "@/app/lib/schema";
import { EditAvatar } from "@/components/profile/edit-avatar";

export default function UserInfo({ user }: { user: User }) {
  const t = useTranslations();
  const userTypeMap: Record<UserTypeEnum, string> = {
    user: t("Users.typeUser"),
    admin: t("Users.typeAdmin"),
  };
  return (
    <div className="flex items-center justify-between space-x-4 mt-4">
      <div className="flex items-center space-x-4">
        <EditAvatar user={user} />

        <div className={"flex flex-col gap-0.5"}>
          <p className="text-lg font-medium leading-none">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-md text-muted-foreground">{user.email}</p>
          <p className="text-md text-muted-foreground">
            {userTypeMap[user.type]}
          </p>
        </div>
      </div>
    </div>
  );
}
