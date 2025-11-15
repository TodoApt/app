"use client";

import { startTransition, useCallback } from "react";
import { updateUserImage, deleteUserImage } from "@/app/lib/actions";
import AvatarUploader from "@/components/avatar-upload";
import { User } from "@/app/lib/schema";

export function EditAvatar({ user }: { user: User }) {
  const handleUpload = useCallback((image: string) => {
    startTransition(async () => {
      await updateUserImage(image);
    });
  }, []);

  const onClear = useCallback(() => {
    startTransition(async () => {
      await deleteUserImage();
    });
  }, []);

  return (
    <AvatarUploader
      image={user?.image || undefined}
      alt={`${user.firstName} ${user.lastName}`}
      onUpload={handleUpload}
      onClear={onClear}
    />
  );
}
