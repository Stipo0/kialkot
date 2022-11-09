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
		<BaseField className={className} name={name}>
			<Field name={name} type={type} placeholder={label} className="form-control mb-2 mt-2" />
		</BaseField>
	);
};

export default TextField;