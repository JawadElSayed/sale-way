import { useState, useEffect } from "react";
import { useAddProduct } from "../Hooks/useProducts";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import ProductImagesInput from "../components/ProductImagesInput";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Header from "../layouts/header";

const AddProduct = () => {
	const navigate = useNavigate();

	const [productName, setProductName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setdescription] = useState("");
	const [percentage, setPercentage] = useState("");
	const [error, setError] = useState("");

	const { mutate, isSuccess, isError } = useAddProduct();

	const saveProduct = () => {
		setError("");
		if (validation(productName, category, percentage))
			return setError(validation(productName, category, percentage));
		const data = {
			name: productName,
			category: category,
			description: description,
			discount: parseInt(percentage),
			images: [],
		};

		mutate(data);
		if (isError) alert("Something went wrong");
	};

	useEffect(() => {
		if (isSuccess) navigate("/store/products");
	}, [isSuccess, navigate]);

	const validation = (productName, category, percentage) => {
		if (!productName) return "Product Name fields is required";
		if (!category) return "Category fields is required";
		if (!percentage) return "Percentage fields is required";

		if (!parseInt(percentage))
			return "Percentage fields must contain a number";

		return "";
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="Add Product"></Header>
			<div className="overflow-y-scroll hide-scroll-bar px-2.5 pb-8 pt-8">
				<ProductImagesInput />
				<div className="flex gap-6">
					<TextInput
						placeholder="Product Name"
						pt={12}
						onChange={(e) => setProductName(e.target.value)}
						value={productName}
					/>
					<TextInput
						placeholder="Category"
						pt={12}
						onChange={(e) => setCategory(e.target.value)}
						value={category}
					/>
				</div>
				<TextArea
					placeholder="description"
					onChange={(e) => setdescription(e.target.value)}
					value={description}
				/>
				<TextInput
					placeholder="eg: 50, 35, 75"
					pt={12}
					onChange={(e) => setPercentage(e.target.value)}
					value={percentage}
					width="1/2"
				/>
				{error && (
					<p className="text-red-700 pt-2 text-left">{error}</p>
				)}
				<div className="text-center">
					<Button
						className="mt-12 w-32"
						rounded="xl"
						onClick={saveProduct}
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
