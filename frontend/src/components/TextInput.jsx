const TextInput = ({
	lable,
	onChange,
	shadow = "primary",
	placeholder = "",
	type = "text",
	value,
}) => {
	return (
		<div className="w-full text-left pt-8">
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
				className={
					shadow + "-shadow w-full py-2.5 indent-2 rounded-xl text-lg"
				}
			/>
		</div>
	);
};

export default TextInput;
