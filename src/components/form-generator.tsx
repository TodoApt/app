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
