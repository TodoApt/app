"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Plus, Trash } from "lucide-react";
import { handleUpload } from "@/utils/file";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { AutoComplete } from "@/components/ui/auto-complete";
import { FileUploader } from "@/components/ui/file";
import { DateTimePicker } from "@/components/ui/datetime-picker";

function LogoUploadField({
  name,
  initialValue,
}: {
  name: string;
  initialValue: string;
}) {
  const [url, setUrl] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (files: File[]) => {
    if (!files[0]) return;
    setLoading(true);
    const [uploaded] = await handleUpload(files);
    setUrl(uploaded);
    setLoading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative inline-block">
          <img
            src={url}
            alt="Logo"
            className="w-16 h-16 rounded-lg object-contain border"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute -top-1 -right-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center"
          >
            <Trash className="w-3 h-3 text-destructive" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer bg-background"
        >
          <input {...getInputProps()} />
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
      )}
    </>
  );
}

interface Option {
  value: string;
  label: string;
}
export interface FieldType {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  options?: Option[];
}

const FieldRenderer = ({
  field,
  value,
}: {
  field: FieldType;
  value?: string | string[] | Date;
}) => {
  switch (field.type) {
    case "input":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="text"
          placeholder={field.placeholder}
          required={field.required || false}
          defaultValue={value as string}
        />
      );
    case "email":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="email"
          placeholder={field.placeholder}
          required={field.required || false}
          defaultValue={value as string}
        />
      );
    case "textarea":
      return (
        <Textarea
          id={field.name}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required || false}
          defaultValue={value as string}
        />
      );
    case "password":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="password"
          placeholder={field.placeholder}
          required={field.required || false}
          autoComplete="current-password"
          minLength={8}
          defaultValue={value as string}
        />
      );
    case "select":
      return (
        <AutoComplete
          id={field.name}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required || false}
          value={value as string}
          options={field.options || []}
        />
      );
    case "uploader":
      return (
        <FileUploader
          id={field.name}
          name={field.name}
          value={(value as string[]) || []}
        />
      );
    case "dateTimePicker":
      return (
        <DateTimePicker
          id={field.name}
          name={field.name}
          value={value as string}
        />
      );
    case "color":
      return (
        <input
          id={field.name}
          name={field.name}
          type="color"
          defaultValue={(value as string) || "#000000"}
          className="h-9 w-full cursor-pointer rounded-md border p-1"
        />
      );
    case "logo":
      return (
        <LogoUploadField
          name={field.name}
          initialValue={(value as string) || ""}
        />
      );
    default:
      return <div>not impl</div>;
  }
};

const convertErrors = (errors: string[]) => {
  return errors ? errors.map((error) => ({ message: error })) : [];
};

const FormGenerator = ({
  fields,
  values = {},
  errors = {},
}: {
  fields: FieldType[];
  values?: Record<string, string | null | Date>;
  errors?: Record<string, string[]>;
}) => {
  return (
    <FieldSet>
      <FieldGroup>
        {fields.map((field: FieldType, index: number) => (
          <Field key={index}>
            <FieldLabel htmlFor={`${field.name}`}>{field.label}</FieldLabel>
            <FieldRenderer
              field={field}
              value={values[field.name] || field.defaultValue}
            />
            <FieldError errors={convertErrors(errors[field.name])} />
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
};

export default FormGenerator;
