const TextInput = ({ shadow, lable, onChange, placeholder, type = "text" }) => {
	return (
		<div className="w-full text-left pt-8">
			{lable && (
				<>
					<lable className=" text-white font-normal text-xl">
						{lable + ":"}
					</lable>
					<br />
				</>
			)}
			<input
				type={type}
				value={null}
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
