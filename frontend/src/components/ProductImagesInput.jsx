import { BiImageAdd } from "react-icons/bi";

const ProductImagesInput = () => {
	return (
		<label className=" cursor-pointer inline-block secondary-shadow rounded-xl w-full">
			<input type="file" multiple />
			<BiImageAdd size={280} className="w-full py-10" />
		</label>
	);
};

export default ProductImagesInput;
