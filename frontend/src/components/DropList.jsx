const DropList = ({ options, value, onChange, className }) => {
	return (
		<div className={`w-full text-left ${className}`}>
			<select
				id="mylist"
				className="bg-secondary p-2 text-white text-2xl text-center 
                            cursor-pointer rounded-full w-40"
				value={value}
				onChange={onChange}
			>
				{options?.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default DropList;
