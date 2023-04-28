import { useEffect, useState } from "react";

const TextInput = ({
	lable,
	onChange,
	shadow = "secondary",
	placeholder,
	type = "text",
	rounded = "xl",
	pt = 8,
	indent = "2",
	value,
	width = "full",
}) => {

	const [ind,setInd] = useState("indent-2");

	useEffect(() => {
		if (indent === "9") {
			setInd("indent-9");
		}
	},[indent]);

	return (
		<div className={`w-${width} text-left pt-${pt}`}>
			{lable && (
				<>
					<label className=" text-white font-normal text-xl">
						{lable + ":"}
					</label>
					<br />
				</>
			)}
			<input
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`${ind} ${shadow}-shadow w-full py-2.5 rounded-${rounded} text-lg`}
			/>
		</div>
	);
};

export default TextInput;
