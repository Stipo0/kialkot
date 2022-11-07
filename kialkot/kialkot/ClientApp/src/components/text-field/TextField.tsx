import { Field } from "formik";

import BaseField from "../base-field/BaseField";

interface TextFieldProps {
	label: string;
	name: string;
	type?: string;
	className?: string;
	hidden?: boolean;
}

const TextField = ({
	name,
	label,
	type = "text",
	className,
}: TextFieldProps) => {
	return (
		<BaseField className={className} name={name} label={label}>
			<Field name={name} type={type} className="form-control" />
		</BaseField>
	);
};

export default TextField;