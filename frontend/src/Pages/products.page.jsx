import Button from "../components/Button";
import { useAllProducts } from "../Hooks/useProducts";
import Header from "../layouts/header";
import { useNavigate } from "react-router-dom";

const Products = () => {
	const titles = [
		"image",
		"Products Name",
		"category",
		"Discount",
		"Actions",
	];

	const navigate = useNavigate();

	const secondRowButtons = [
		["Add Product", () => navigate("/store/add-product")],
	];

	const { isLoading, data, isError, error } = useAllProducts();

	if (!isLoading) console.log(data);

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Products"
				secondRowButtons={secondRowButtons}
				titles={titles}
			></Header>

			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{isLoading && <h2>Loading...</h2>}
				{data?.data.products.map((product) => {
					return (
						<div
							key={product.id}
							className="flex items-center pb-4 gap-6"
						>
							<img
								src={`../../../server/public/images/products/default.png`}
								alt="product"
								className="w-20"
							/>
							<h3>{product.name}</h3>
							<h3>{product.name}</h3>
							<h3>{product.discount}</h3>
							<div>
								<Button
									style={{ width: "8.75vw", minWidth: "fit" }}
								>
									Edit
								</Button>
								<Button
									className="ml-2"
									backgroundColor="red"
									style={{ width: "8.75vw", minWidth: "fit" }}
								>
									Delete
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Products;
