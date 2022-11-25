import Button from "../components/Button";
import { useAllProducts, useDeleteProduct } from "../Hooks/useProducts";
import Header from "../layouts/header";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const Products = () => {
	const titles = [
		"image",
		"Products Name",
		"category",
		"Discount",
		"Actions",
	];

	const navigate = useNavigate();

	const tableTitles = [
		"Image",
		"Product Name",
		"Category",
		"Discount",
		"Actions",
	];

	const secondRowButtons = [
		["Add Product", () => navigate("/store/add-product")],
	];

	const { isLoading, data, isError, error } = useAllProducts();
	const { mutate } = useDeleteProduct();
	let tableData = [];
	if (!isLoading) {
		data.data.products.map((product) => {
			const newData = [
				product.id,
				product.images?.[0]?.image,
				product.name,
				product.product_categories?.[0]?.categories.category,
				[product.discount],
				product,
			];
			return tableData.push(newData);
		});
	}
	const deleteProduct = (id) => {
		mutate(parseInt(id));
		window.location.reload();
	};

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Products"
				secondRowButtons={secondRowButtons}
			></Header>

			<div className="overflow-y-scroll hide-scroll-bar pt-8">
				{isLoading && <h2>Loading...</h2>}
				<Table
					titles={tableTitles}
					data={tableData}
					imageClick={imageClick}
					edit={1}
					deleteClick={deleteProduct}
				/>
			</div>
		</div>
	);
};

export default Products;
