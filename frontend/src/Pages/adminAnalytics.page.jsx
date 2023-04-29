import LineGraph from "../components/LineGraph";
import StatisticsCard from "../components/statisticCard";
import Header from "../layouts/header";
import DropList from "../components/DropList";
import { useState, useEffect } from "react";
import {
	useAllNotifications,
	useNumberClicks,
	useBestUsers,
	useBestBranches,
} from "../Hooks/useNotifications";

const AdminAnalytics = () => {
	const filterList = ["Last Week", "Last Month", "Last Year"];
	const [timeFilter, setTimeFilter] = useState("Last Week");
	const [graphData, setgraphData] = useState();
	const [newFilter, setNewFilter] = useState(false);
	const [analyticsData, setAnalyticsData] = useState([]);
	const day = 86400000;

	const { isLoading: notificationLoading, data: notificationData } =
		useAllNotifications();
	const { isLoading: clicksLoading, data: clicksData } = useNumberClicks();
	const { isLoading: userLoading, data: usersData } = useBestUsers();
	const { isLoading: branchLoading, data: branchData } = useBestBranches();

	let today = new Date();

	const weekList = [
		`${today.getDate() - 6}`,
		`${today.getDate() - 5}`,
		`${today.getDate() - 4}`,
		`${today.getDate() - 3}`,
		`${today.getDate() - 2}`,
		`${today.getDate() - 1}`,
		`${today.getDate()}`,
	];
	let monthList = [];
	for (let i = 29; i >= 0; i--) {
		if (today.getDate() - i === 0) monthList.push(`30`);
		else if (today.getDate() - i < 0)
			monthList.push(`${today.getDate() - i + 30}`);
		else monthList.push(`${today.getDate() - i}`);
	}

	let yearList = [];
	for (let i = 11; i >= 0; i--) {
		if (today.getMonth() - i === 0) yearList.push(`12`);
		else if (today.getMonth() - i < 0)
			yearList.push(`${today.getMonth() - i + 12}`);
		else yearList.push(`${today.getMonth() - i}`);
	}

	const [labels, setLabels] = useState(weekList);

	// this function is for filling the graph data according to the time filter
	const fillGraphData = (fillingData = true) => {
		let dataList = [];
		let limit = 6;
		if (timeFilter === "Last Month") limit = 29;
		if (timeFilter === "Last Year") limit = 11;

		if (timeFilter === "Last Week" || timeFilter === "Last Month") {
			for (let i = limit; i >= 0; i--) {
				dataList[limit - i] = 0;
				for (var data of analyticsData) {
					if (
						new Date(data.clicked_at).getDate() ===
							new Date(today - day * i).getDate() &&
						new Date(data.clicked_at).getMonth() ===
							new Date(today - day * i).getMonth() &&
						new Date(data.clicked_at).getFullYear() ===
							new Date(today - day * i).getFullYear()
					) {
						dataList[limit - i] += 1;
					}
				}
			}
		} else {
			for (let i = limit; i >= 0; i--) {
				dataList[limit - i] = 0;
				for (var aData of analyticsData) {
					if (
						new Date(aData.clicked_at).getMonth() ===
							new Date(today - day * i * 30).getMonth() &&
						new Date(aData.clicked_at).getFullYear() ===
							new Date(today - day * i * 30).getFullYear()
					) {
						dataList[limit - i] += 1;
					}
				}
			}
		}
		setgraphData(dataList);
	};

	// this useEffect is to fill the graph data or update it when the filters change
	useEffect(() => {
		if (!notificationLoading) {
			setAnalyticsData(notificationData?.data.analytics);
			setNewFilter(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationLoading]);

	// this useEffect is to update the graph data when the filters change
	useEffect(() => {
		fillGraphData();
		setNewFilter(false);
	}, [newFilter]);

	// this useEffect is to update the graph labels when the timeFilter changes
	useEffect(() => {
		if (timeFilter === "Last Week") setLabels(weekList);
		if (timeFilter === "Last Month") setLabels(monthList);
		if (timeFilter === "Last Year") setLabels(yearList);

		setNewFilter(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeFilter]);

	return (
		<>
			<Header title="Analytics"></Header>
			{clicksLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="pt-8">
					<div className="flex flex-col gap-4">
						<div className="flex gap-8">
							<StatisticsCard
								color="red"
								title="Number of clicks"
								value={clicksData.data.lastWeek}
							/>
							<StatisticsCard
								color="green"
								title="Number of clicks"
								value={clicksData.data.lastMonth}
							/>
							<StatisticsCard
								color="blue"
								title="Number of clicks"
								value={clicksData.data.lastYear}
							/>
						</div>
						<div className="flex gap-8">
							<StatisticsCard
								color="red"
								title="Best Store"
								name={branchData?.data.nameLastWeek.name}
								value={
									branchData?.data.lastWeek[0]?._count.clicked
								}
							/>
							<StatisticsCard
								color="green"
								title="Best Store"
								name={branchData?.data.nameLastMonth.name}
								value={
									branchData?.data.lastMonth[0]?._count
										.clicked
								}
							/>
							<StatisticsCard
								color="blue"
								title="Best Store"
								name={branchData?.data.nameLastYear.name}
								value={
									branchData?.data.lastYear[0]?._count.clicked
								}
							/>
						</div>
						<div className="flex gap-8">
							<StatisticsCard
								color="red"
								title="Best user"
								name={usersData?.data.nameLastWeek.name}
								value={
									usersData?.data.lastWeek[0]?._count.clicked
								}
							/>
							<StatisticsCard
								color="green"
								title="Best user"
								name={usersData?.data.nameLastMonth.name}
								value={
									usersData?.data.lastMonth[0]?._count.clicked
								}
							/>
							<StatisticsCard
								color="blue"
								title="Best user"
								name={usersData?.data.nameLastYear.name}
								value={
									usersData?.data.lastYear[0]?._count.clicked
								}
							/>
						</div>
					</div>
					<div className="flex justify-between items-center pt-10">
						<h1>Statistics</h1>
						<DropList
							value={timeFilter}
							options={filterList}
							onChange={(e) => setTimeFilter(e.target.value)}
							className=" text-right"
						/>
					</div>

					<div className="w-full my-12">
						<LineGraph graphData={graphData} labels={labels} />
					</div>
				</div>
			)}
		</>
	);
};

export default AdminAnalytics;
