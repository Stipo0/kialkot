import classNames from "classnames";
import { ReactNode } from "react";
import { ErrorMessage } from "formik";

import { Alert } from "@mui/material";

interface BaseFieldProps {
  name: string;
  className?: string;
  children: ReactNode;
}

const BaseField = ({ name, className, children }: BaseFieldProps) => {
  return (
    <div className={classNames("form-group", className)}>
      {children}
      <ErrorMessage name={name}>
        {(msg) => (
          <Alert className="mb-3" severity="error">
            {msg}
          </Alert>
        )}
      </ErrorMessage>
    </div>
  );
};

export default BaseField;
