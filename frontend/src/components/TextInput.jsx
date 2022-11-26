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
				className={`${shadow}-shadow w-full py-2.5 indent-${
					indent ? indent : 2
				} rounded-${rounded} text-lg`}
			/>
		</div>
	);
};

export default TextInput;
