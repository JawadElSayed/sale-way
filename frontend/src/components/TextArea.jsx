const TextArea = ({ onChange, placeholder, value }) => {
	return (
		<div className={`w-full text-left pt-12`}>
			<textarea
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={`secondary-shadow w-full py-2.5 indent-2 
                            rounded-xl text-lg resize-none h-32`}
			/>
		</div>
	);
};

export default TextArea;
