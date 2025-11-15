import { Slide } from "yet-another-react-lightbox";
import Compressor from "compressorjs";

const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

export const getFileKey = (file: string) => {
  return file.split("/").pop()?.split(".")[0];
};

export const getSlides = (files: string[]): Slide[] => {
  return files.map((file) => {
    const thumb = getPreview(file);
    const src = getFile(file);

    const fileType = getFileType(file);
    if (fileType === "video") {
      return {
        type: "video",
        thumbnail: thumb,
        sources: [{ type: "video/mp4", src: src }],
      };
    }
    return {
      type: "image",
      src: src,
      thumbnail: thumb,
    };
  });
};

const getFileType = (file: string) => {
  const ext = file.split(".")?.pop() || "";
  return ["mov", "mp4"].includes(ext) ? "video" : "image";
};

export const getPreview = (file: string) => {
  const key = getFileKey(file);
  const type = getFileType(file);
  return `${cdnUrl}/${type}/upload/h_100,w_100/maintenance/${key}.png`;
};

export const getFile = (file: string) => {
  const key = getFileKey(file);
  const type = getFileType(file);
  const ext = type === "video" ? "mp4" : "png";
  return `${cdnUrl}/${type}/upload/maintenance/${key}.${ext}`;
};

export const compress = async (file: File) => {
  return await new Promise((resolve, reject) => {
    new Compressor(file, {
      success: (file) => resolve(file),
      error: (error) => reject(error),
    });
  });
};

export const getPreSignedUrl = async (type: string) => {
  const response = await fetch(`/api/file`, {
    method: "POST",
    body: JSON.stringify({ type }),
  });

  return await response.json();
};

export const handleUpload = async (files: File[]) => {
  const uploads: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const type = file.type.includes("image") ? "image" : "video";
      const signData = await getPreSignedUrl(type);

      const compressed = type === "image" ? await compress(file) : file;

      const formData = new FormData();
      formData.append("file", compressed as Blob, file.name);
      formData.append("api_key", signData.apikey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("eager", signData.eager);
      formData.append("folder", "maintenance");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      uploads.push(getFile(data.url));
    }),
  );

  return uploads;
};

export const isFile = (file: File | string) => {
  return file instanceof File;
};
