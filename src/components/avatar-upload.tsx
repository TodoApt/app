import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Plus, Trash } from "lucide-react";
import { getPreview, handleUpload } from "@/utils/file";

interface AvatarUploaderProps {
  image?: string;
  onUpload: (image: string) => void;
  onClear: () => void;
  alt: string;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  image,
  onUpload,
  onClear,
  alt,
}) => {
  const preview = image ? getPreview(image) : null;

  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setLoading(true);
        const result = await handleUpload([file]);

        setLoading(false);

        setPreviewUrl(result[0]);

        return onUpload(result[0]);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const removeFile = async () => {
    await onClear();
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col items-center">
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt={alt}
            className="w-16 h-16 rounded-full object-cover border-2"
          />
          <button
            onClick={removeFile}
            className="absolute top-0 right-0 w-5 h-5 bg-muted text-white rounded-full flex items-center justify-center text-xs"
          >
            <Trash className="w-3 h-3 text-destructive" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex items-center justify-center w-16 h-16 border-2 border-dashed  rounded-full bg-background cursor-pointer "
        >
          <input {...getInputProps()} />
          {!loading ? (
            <Plus className="h-4 w-4" />
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
