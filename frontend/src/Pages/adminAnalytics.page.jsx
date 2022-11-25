import StatisticsCard from "../components/statisticCard";
import Header from "../layouts/header";
import DropList from "../components/DropList";
import { useState } from "react";
import {
	useNumberClicks,
	useBestUsers,
	useBestBranches,
} from "../Hooks/useNotifications";

const AdminAnalytics = () => {
	const filterList = ["Last Week", "Last Month", "Last Year"];
	const [filter, setFilter] = useState("");
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
				</div>
			)}
		</>
	);
};

export default AdminAnalytics;
