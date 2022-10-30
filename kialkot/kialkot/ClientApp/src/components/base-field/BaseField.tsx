import classNames from "classnames";
import { ReactNode } from "react";
import { ErrorMessage } from "formik";

import classes from "./BaseField.module.scss";

interface BaseFieldProps {
	label: string;
	name: string;
	className?: string;
	children: ReactNode;
}

const BaseField = ({name, label, className, children}: BaseFieldProps) => {
	return (
		<div className={classNames("form-group", className)}>
			<label className="mb-2">{label}</label>
			{children}
			<ErrorMessage name={name}>
				{(msg) => (
					<div className={classNames(classes.ErrorMessage, "mt-2")}>{msg}</div>
				)}
			</ErrorMessage>
		</div>
	);
};

export default BaseField;
