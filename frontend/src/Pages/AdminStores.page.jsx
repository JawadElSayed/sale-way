import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import { useAllBranches, useDeleteBranch } from "../Hooks/useBranches";
import Table from "../components/Table";

const AdminStores = () => {
	const navigate = useNavigate();

	const [storeType, setStoreType] = useState("Store Type");
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState("");

	const filters = [
		[
			[
				"Store Type",
				"clothe",
				"mobiles",
				"laptops",
				"shoes",
				"mackups",
				"perfumes",
			],
			storeType,
			(e) => setStoreType(e.target.value),
		],
	];

	const secondRowButtons = [
		["Add Store", () => navigate("/admin/stores/add-store")],
	];

	const tableTitles = ["Image", "Branch Name", "Type", "Location", "Actions"];

	const { isLoading, data } = useAllBranches();
	const { mutate: deleteMutate } = useDeleteBranch();

	const [tableData, setTableData] = useState([]);

	// this useEffect is for getting data from the api
	useEffect(() => {
		let dataArray = [];
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
			return dataArray.push(newData);
		});
		setTableData(dataArray);
		setFilteredData(dataArray);
	}, [data, isLoading]);

	// this useEffect is for filtering by store type
	useEffect(() => {
		let filteringData = [];
		tableData.map((branch) => {
			let newData = null;
			if (branch?.[3] === storeType) {
				newData = branch;
				filteringData.push(newData);
			} else if (storeType === "Store Type") {
				newData = branch;
				filteringData.push(newData);
			}
			return null;
		});
		setFilteredData(filteringData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeType]);

	// this useEffect is for searching
	useEffect(() => {
		let filteringData = [];
		tableData.map((branch) => {
			let newData = null;
			if (branch?.[2]?.toLowerCase().includes(search.toLowerCase())) {
				newData = branch;
				filteringData.push(newData);
			}
			return null;
		});
		setFilteredData(filteringData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

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
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{isLoading && <h2>Loading...</h2>}
				<Table
					titles={tableTitles}
					data={filteredData}
					deleteClick={deleteBranch}
					edit={EditStore}
					imageClick={goToStore}
				/>
			</div>
		</div>
	);
};

export default AdminStores;
