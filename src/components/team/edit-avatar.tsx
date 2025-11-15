"use client";

import { startTransition, useCallback } from "react";
import { updateTeamImage, deleteTeamImage } from "@/app/lib/actions";
import AvatarUploader from "@/components/avatar-upload";
import { Team } from "@/app/lib/schema";

export function EditAvatar({ team }: { team: Team }) {
  const handleUpload = useCallback(
    (image: string) => {
      startTransition(async () => {
        await updateTeamImage(team.id, image);
      });
    },
    [team.id],
  );

  const onClear = useCallback(() => {
    startTransition(async () => {
      await deleteTeamImage(team.id);
    });
  }, [team.id]);

  return (
    <AvatarUploader
      image={team?.image}
      alt={team?.name as string}
      onUpload={handleUpload}
      onClear={onClear}
    />
  );
}
