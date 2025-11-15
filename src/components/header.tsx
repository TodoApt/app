"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/avatar";
import React from "react";
import { PopulatedUser } from "@/app/lib/schema";
import { getPreview } from "@/utils/file";
import { Brand } from "@/lib/edge-config";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Header = ({
  user,
  brandConfig,
}: {
  user: PopulatedUser;
  brandConfig: Brand;
}) => {
  const router = useRouter();
  const t = useTranslations("Shared");

  const teamImage = user.teamImage ? getPreview(user.teamImage) : null;
  const isAdmin = user?.type === "admin" || false;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary shadow-sm sticky top-0 z-10">
      <div>
        <Link href="/">
          <div className="flex items-center gap-2">
            {teamImage && (
              <Image
                src={teamImage}
                alt={user.teamName}
                className={"rounded-full bg-white h-10 w-10"}
                width={100}
                height={100}
              />
            )}

            <h1 className="text-lg font-semibold text-white">
              {brandConfig.name} - {user.teamName}
            </h1>
          </div>
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar
              name={`${user?.firstName} ${user?.lastName}`}
              image={user.image}
              alt={`${user?.firstName} ${user?.lastName}`}
              size={10}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align={"end"}>
          <DropdownMenuItem onClick={() => router.push("/")}>
            {t("tasks")}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/calendar")}>
            {t("calendar")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              {t("profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              {t("settings")}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t("myTeam")}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/users")}>
                  {t("manageUsers")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/properties")}>
                  {t("manageProperties")}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/team")}>
                  {t("manageTeam")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className={"text-destructive"}
          >
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
