import { Field } from "formik";

import BaseField from "../base-field/BaseField";

interface OptionValues {
  value: string;
  name: string;
}

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  options?: OptionValues[];
  className?: string;
}

const TextField = ({
  name,
  label,
  type = "text",
  options,
  className,
}: TextFieldProps) => {
  return (
    <BaseField className={className} name={name}>
      {type === "select" ? (
        <div className="form-control mb-2 mt-2">
          <label htmlFor="isDesinger">{label}: </label>
          <Field name="isDesinger" as="select" className="m-2">
            <option></option>
            {options?.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </Field>
        </div>
      ) : (
        <Field
          name={name}
          type={type}
          placeholder={label}
          className="form-control mb-2 mt-2"
        />
      )}
    </BaseField>
  );
};

export default TextField;
