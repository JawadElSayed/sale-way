const SearchDropDown = ({ options, value, onChange, placeholder }) => {
	return (
		<div className="w-full text-left pt-12">
			<input
				type="search"
				list="mylist"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="secondary-shadow w-full py-2.5 indent-2 rounded-xl text-lg"
			/>
			<datalist id="mylist">
				{options?.map((option) => {
					return <option key={option} value={option} />;
				})}
			</datalist>
		</div>
	);
};

export default SearchDropDown;
