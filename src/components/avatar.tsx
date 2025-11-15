import React from "react";
import { getPreview } from "@/utils/file";
import { cn } from "@/lib/utils";

interface AvatarProps {
  image: string | null;
  name: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ image, name, alt, size = 6 }) => {
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    const initials = parts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return initials.slice(0, 2);
  };

  if (image) {
    const preview = getPreview(image);
    return (
      <img
        src={preview}
        alt={alt}
        className={`rounded-full bg-white h-${size} w-${size}`}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-muted text-gray-800 dark:text-gray-100 font-bold",
        `h-${size} w-${size}`,
      )}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
