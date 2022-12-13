import { Field } from "formik";

import BaseField from "../base-field/BaseField";

import './TextField.scss';

export interface OptionValues {
  value: string;
  name: string;
}

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: OptionValues[];
  className?: string;
}

const TextField = ({
  name,
  label,
  type = "text",
  required = false,
  options,
  className,
}: TextFieldProps) => {
  const TypeSwitch = () => {
    switch (type) {
      case "select":
        return (
          <div className="form-control mb-2 mt-2">
            <label htmlFor={name}>{label}: </label>
            <Field name={name} as="select" className="m-2" required={required}>
              <option></option>
              {options?.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Field>
          </div>
        );

      case "textarea":
        return (
            <Field
              name={name}
              as="textarea"
              placeholder={label}
              className="form-control mb-2 mt-2"
              rows="4"
              required={required}
            />
        );

      default:
        return (
          <Field
            name={name}
            type={type}
            placeholder={label}
            required={required}
            className="form-control mb-2 mt-2"
          />
        );
    }
  };

  return (
    <BaseField className={className} name={name}>
      {TypeSwitch()}
    </BaseField>
  );
};

export default TextField;
