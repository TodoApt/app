import React from "react";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Trash } from "lucide-react";
import { getFileKey, getPreview, handleUpload, isFile } from "@/utils/file";
import Image from "next/image";

const FileUploader = React.forwardRef<
  HTMLInputElement,
  {
    onChange?: (files: string[] | undefined) => void;
    value: string[] | undefined;
    name?: string;
    id?: string;
  }
>(({ onChange, value = [], name = "files", id }, ref) => {
  const t = useTranslations();
  const [files, setFiles] = useState<string[]>(value);
  const [queue, setQueue] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "video/mp4": [".mp4"],
      "video/mov": [".mov"],
    },
    onDrop: async (acceptedFiles) => {
      setQueue(acceptedFiles);
      const uploadedFiles = await handleUpload(acceptedFiles);
      const newFiles = [...files, ...uploadedFiles];

      if (onChange) {
        onChange(newFiles);
      }
      setFiles(newFiles);
      setQueue([]);
    },
  });

  const handleDelete = useCallback(
    async (id: string) => {
      const key = getFileKey(id);
      if (key) {
        try {
          const newFiles = files.filter((file) => file !== id);
          setFiles(newFiles);
          if (onChange) {
            onChange(newFiles);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [files, onChange],
  );

  const thumbs = [...files, ...queue].map((file) => {
    const isUploading = isFile(file);
    const fileKey = isUploading
      ? (file as File).name
      : getFileKey(file as string);

    return (
      <div
        className="inline-flex rounded border border-gray-200 mb-2 mr-2 w-24 h-24 p-1 box-border relative"
        key={fileKey}
      >
        <div className="flex min-w-0 overflow-hidden items-center justify-center relative w-full">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <Image
              src={getPreview(file as string)}
              className="block w-auto h-full"
              alt={fileKey as string}
              width={100}
              height={100}
            />
          )}
        </div>

        {!isUploading && (
          <button
            type="button"
            className="absolute top-1 right-1 text-red-500"
            onClick={() => handleDelete(file as string)}
          >
            <Trash className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  });

  return (
    <section className="w-full">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="border border-gray-200 border-dashed p-4 rounded-xl flex items-center justify-center">
          {t("Shared.addFile")}
        </p>
      </div>

      {/* Hidden input for form submission */}
      {files.map((file, index) => (
        <input
          id={`${id}_${index}`}
          key={file}
          type="hidden"
          name={name}
          value={file}
          ref={ref}
        />
      ))}

      <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
});

FileUploader.displayName = "FileUploader";

export { FileUploader };
