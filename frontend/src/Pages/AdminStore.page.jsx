import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBranchByID } from "../Hooks/useBranches";
import Header from "../layouts/header";
import DropList from "../components/DropList";
import LineGraph from "../components/LineGraph";
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
	const filterList = ["Last Week", "Last Month", "Last Year"];
	const [filter, setFilter] = useState("Last Week");

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

	let date = new Date();

	const weekList = [
		`${date.getDate() - 6}`,
		`${date.getDate() - 5}`,
		`${date.getDate() - 4}`,
		`${date.getDate() - 3}`,
		`${date.getDate() - 2}`,
		`${date.getDate() - 1}`,
		`${date.getDate()}`,
	];
	let monthList = [];
	for (let i = 29; i >= 0; i--) {
		if (date.getDate() - i === 0) monthList.push(`30`);
		else if (date.getDate() - i < 0)
			monthList.push(`${date.getDate() - i + 30}`);
		else monthList.push(`${date.getDate() - i}`);
	}

	let yearList = [];
	for (let i = 11; i >= 0; i--) {
		if (date.getMonth() - i === 0) yearList.push(`12`);
		else if (date.getMonth() - i < 0)
			yearList.push(`${date.getMonth() - i + 12}`);
		else yearList.push(`${date.getMonth() - i}`);
	}

	// console.log(labels);
	let graphDataList = [];

	useEffect(() => {
		if (filter === "Last Week") setLabels(weekList);
		if (filter === "Last Month") setLabels(monthList);
		if (filter === "Last Year") setLabels(yearList);

		setgraphData(graphDataList);
	}, [filter]);

	const [labels, setLabels] = useState(weekList);
		<div className="flex flex-col h-screen">
			<Header
				image={!branchLoading && branch?.image}
				title={!branchLoading && branch?.name}
				firstRowButtons={firstRowButtons}
				showSearchBar={false}
			></Header>
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{branchLoading && <h2>Loading...</h2>}
				<div>
					<DropList
						value={filter}
						options={filterList}
						onChange={(e) => setFilter(e.target.value)}
						className="text-right"
					/>
				</div>

				<div className="w-full my-12">
					<LineGraph graphData={graphData} labels={labels} />
				</div>
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
