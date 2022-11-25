import LineGraph from "../components/LineGraph";
import StatisticsCard from "../components/statisticCard";
import Header from "../layouts/header";
import DropList from "../components/DropList";
import { useState } from "react";
import {
	useAllNotifications,
	useNumberClicks,
	useBestUsers,
	useBestBranches,
} from "../Hooks/useNotifications";
import { useEffect } from "react";

const AdminAnalytics = () => {
	const filterList = ["Last Week", "Last Month", "Last Year"];
	const [filter, setFilter] = useState("");

	const { isLoading: notificationLoading, data: notificationData } =
		useAllNotifications();
	const { isLoading: clicksLoading, data: clicksData } = useNumberClicks();
	const { isLoading: userLoading, data: usersData } = useBestUsers();
	const { isLoading: branchLoading, data: branchData } = useBestBranches();

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

	const analyticsData = notificationData?.data.analytics;
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
	if (!notificationLoading) fillGraphData();

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
									branchData?.data.lastWeek[0]._count.clicked
								}
							/>
							<StatisticsCard
								color="green"
								title="Best Store"
								name={branchData?.data.nameLastMonth.name}
								value={
									branchData?.data.lastMonth[0]._count.clicked
								}
							/>
							<StatisticsCard
								color="blue"
								title="Best Store"
								name={branchData?.data.nameLastYear.name}
								value={
									branchData?.data.lastYear[0]._count.clicked
								}
							/>
						</div>
						<div className="flex gap-8">
							<StatisticsCard
								color="red"
								title="Best user"
								name={usersData?.data.nameLastWeek.name}
								value={
									usersData?.data.lastWeek[0]._count.clicked
								}
							/>
							<StatisticsCard
								color="green"
								title="Best user"
								name={usersData?.data.nameLastMonth.name}
								value={
									usersData?.data.lastMonth[0]._count.clicked
								}
							/>
							<StatisticsCard
								color="blue"
								title="Best user"
								name={usersData?.data.nameLastYear.name}
								value={
									usersData?.data.lastYear[0]._count.clicked
								}
							/>
						</div>
					</div>
					<div className="flex justify-between items-center pt-10">
						<h1>Statistics</h1>
						<DropList
							value={filter}
							options={filterList}
							onChange={(e) => setFilter(e.target.value)}
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
