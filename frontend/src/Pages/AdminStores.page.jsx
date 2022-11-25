import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import { useAllBranches, useDeleteBranch } from "../Hooks/useBranches";
import Table from "../components/Table";

const AdminStores = () => {
	const navigate = useNavigate();

	const [storeType, setStoreType] = useState("");

	const filters = [
		[
			["Store Type", "Clothes", "Mobiles", "Laptops", "shoes", "mackups"],
			storeType,
			(e) => setStoreType(e.target.value),
		],
	];

	const secondRowButtons = [
		["Add Store", () => navigate("/admin/stores/add-store")],
	];

	const tableTitles = ["Image", "Branch Name", "Type", "Location", "Actions"];

	const { isLoading, data, isError, error } = useAllBranches();
	const { mutate: deleteMutate } = useDeleteBranch();
	let tableData = [];
	if (!isLoading) {
		data?.data.branches.map((branch) => {
			const newData = [
				branch.id,
				branch.image,
				branch.name,
				branch.store_types?.[0]?.categories.category,
				[
					parseFloat(branch.latitude).toFixed(5),
					parseFloat(branch.longitude).toFixed(5),
				],
				branch.id,
			];
			return tableData.push(newData);
		});
	}

	const deleteBranch = (id) => {
		deleteMutate(parseInt(id));
		window.location.reload();
	};

	const goToStore = (id) => navigate(`/admin/stores/store/${id}`);

	const EditStore = (id) => navigate(`/admin/stores/edit-store/${id}`);

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Stores"
				filters={filters}
				secondRowButtons={secondRowButtons}
			/>
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{isLoading && <h2>Loading...</h2>}
				<Table
					titles={tableTitles}
					data={tableData}
					deleteClick={deleteBranch}
					edit={EditStore}
					imageClick={goToStore}
				/>
			</div>
		</div>
	);
};

export default AdminStores;
