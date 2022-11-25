import { useParams } from "react-router-dom";
import { useBranchByID } from "../Hooks/useBranches";
import Header from "../layouts/header";
import Table from "../components/Table";

const AdminStore = () => {
	const params = useParams();
	const id = params.id;
	let branch = "";

	const tableTitles = [
		"Image",
		"Product Name",
		"Category",
		"Discount",
		"Action",
	];

	const {
		isLoading: branchLoading,
		data: branchData,
		isError,
		error,
	} = useBranchByID(id);

	const firstRowButtons = [
		["Edit", () => null],
		["Delete", () => null],
	];

	let tableData = [];
	if (!branchLoading) {
		branch = branchData.data.branch;
		branch?.products?.map((product) => {
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

	return (
		<div className="flex flex-col h-screen">
			<Header
				image={!branchLoading && branch?.image}
				title={!branchLoading && branch?.name}
				firstRowButtons={firstRowButtons}
				showSearchBar={false}
			></Header>
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{branchLoading && <h2>Loading...</h2>}
				<div className="pt-8 pb-12">
					<Table
						titles={tableTitles}
						data={tableData}
						view={viewClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminStore;
