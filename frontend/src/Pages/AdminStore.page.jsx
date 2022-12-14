import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBranchByID } from "../Hooks/useBranches";
import Header from "../layouts/header";
import DropList from "../components/DropList";
import LineGraph from "../components/LineGraph";
import Table from "../components/Table";
import ProductModal from "../components/Product/Product";
import { useBranchAnalyticsBYID } from "../Hooks/useNotifications";

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
	const [displayModel, setDisplayModel] = useState("hidden");
	const [modelData, setModelData] = useState("");

	const { isLoading: analyticsLoading, data: branchAnalyticsData } =
		useBranchAnalyticsBYID(id);
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

	const viewClick = (product) => {
		setModelData(product);
		setDisplayModel("block");
	};

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

	let graphDataList = [];

	useEffect(() => {
		if (filter === "Last Week") setLabels(weekList);
		if (filter === "Last Month") setLabels(monthList);
		if (filter === "Last Year") setLabels(yearList);

		setgraphData(graphDataList);
	}, [filter]);

	const [labels, setLabels] = useState(weekList);
	const [graphData, setgraphData] = useState();

	const analyticsData = branchAnalyticsData?.data.analytics;
	const day = 86400000;

	const fillGraphData = () => {
		let limit = 6;
		if (filter === "Last Month") limit = 29;
		if (filter === "Last Year") limit = 11;

		if (filter === "Last Week" || filter === "Last Month") {
			for (let i = limit; i >= 0; i--) {
				graphDataList[limit - i] = 0;
				for (var data of analyticsData) {
					if (
						new Date(data.clicked_at).getDate() ===
							new Date(date - day * i).getDate() &&
						new Date(data.clicked_at).getMonth() ===
							new Date(date - day * i).getMonth() &&
						new Date(data.clicked_at).getFullYear() ===
							new Date(date - day * i).getFullYear()
					) {
						graphDataList[limit - i] += 1;
					}
				}
			}
		} else {
			for (let i = limit; i >= 0; i--) {
				graphDataList[limit - i] = 0;
				for (var data of analyticsData) {
					if (
						new Date(data.clicked_at).getMonth() ===
							new Date(date - day * i * 30).getMonth() &&
						new Date(data.clicked_at).getFullYear() ===
							new Date(date - day * i * 30).getFullYear()
					) {
						graphDataList[limit - i] += 1;
					}
				}
			}
		}
	};
	if (!analyticsLoading) fillGraphData();

	return (
		<div
			className="flex flex-col h-screen"
			onClick={() => {
				if (displayModel === "block") setDisplayModel("hidden");
			}}
		>
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
				<ProductModal display={displayModel} product={modelData} />
			</div>
		</div>
	);
};

export default AdminStore;
