import TextInput from "./TextInput";
import { GoSearch } from "react-icons/go";

const SearchBar = ({ value, onChange }) => {
	return (
		<div className="relative flex items-center">
			<GoSearch className="absolute left-2" size={20}></GoSearch>
			<TextInput
				value={value}
				rounded="full"
				shadow="black"
				placeholder="Search"
				onChange={onChange}
				pt="0"
				indent="9"
			></TextInput>
		</div>
	);
};

export default SearchBar;
