import LineGraph from "../components/LineGraph";
import CardRow from "../components/CardRow";
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
	const timeFilterList = ["Last Week", "Last Month", "Last Year"];
	const genderFilterList = ["Gender", "Male", "Female"];
	const ageFilterList = [
		"Age",
		"18-",
		"18-25",
		"25-35",
		"35-45",
		"45-55",
		"55-65",
		"65+",
	];
	const [timeFilter, setTimeFilter] = useState("Last Week");
	const [genderFilter, setGenderFilter] = useState("Gender");
	const [ageFilter, setAgeFilter] = useState("Age");
	const [graphData, setgraphData] = useState();
	const [newFilter, setNewFilter] = useState(false);
	const [callAgeFilter, setCallAgeFilter] = useState(false);
	const [analyticsData, setAnalyticsData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [dataNumbers, setDataNumbers] = useState([]);
	const [dataNames, setDataNames] = useState([]);
	const day = 86400000;
	const year = 31556952000;

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
	const fillGraphData = () => {
		let dataList = [];
		let limit = 6;
		if (timeFilter === "Last Month") limit = 29;
		if (timeFilter === "Last Year") limit = 11;

		if (timeFilter === "Last Week" || timeFilter === "Last Month") {
			for (let i = limit; i >= 0; i--) {
				dataList[limit - i] = 0;
				for (var data of filteredData) {
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
				for (var aData of filteredData) {
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

	// this function is to filter the data according to Gender
	const filterDataByGender = () => {
		if (genderFilter !== genderFilterList[0]) {
			let filteringData = [];
			for (var data of filteredData) {
				if (data.users.gender === genderFilter) {
					filteringData.push(data);
				}
			}
			setFilteredData(filteringData);
		}
	};

	// this function is to filter the data according to Age
	const filterDataByAge = () => {
		if (ageFilter !== ageFilterList[0]) {
			let filteringData = [];
			for (var data of filteredData) {
				const age = (today - Date.parse(data.users.DOB)) / year;
				if (ageFilter === ageFilterList[1]) {
					if (age <= 18) filteringData.push(data);
				} else if (ageFilter === ageFilterList[7]) {
					if (age > 65) filteringData.push(data);
				} else {
					let filteredAge = ageFilter.split("-");
					if (age > filteredAge[0] && age <= filteredAge[1])
						filteringData.push(data);
				}
			}
			setFilteredData(filteringData);
		}
	};

	const fillDataNumbers = () => {
		let numberData = [];
		let namesData = [];
		let Numbers = [];
		let names = [];

		Numbers = [
			clicksData?.data.lastWeek,
			clicksData?.data.lastMonth,
			clicksData?.data.lastYear,
		];
		numberData[0] = Numbers;
		namesData[0] = [];

		Numbers = [
			branchData?.data.lastWeek[0]?._count.clicked,
			branchData?.data.lastMonth[0]?._count.clicked,
			branchData?.data.lastYear[0]?._count.clicked,
		];
		names = [
			branchData?.data.nameLastWeek.name,
			branchData?.data.nameLastMonth.name,
			branchData?.data.nameLastYear.name,
		];
		numberData[1] = Numbers;
		namesData[1] = names;

		Numbers = [
			usersData?.data.lastWeek[0]?._count.clicked,
			usersData?.data.lastMonth[0]?._count.clicked,
			usersData?.data.lastYear[0]?._count.clicked,
		];
		names = [
			usersData?.data.nameLastWeek.name,
			usersData?.data.nameLastMonth.name,
			usersData?.data.nameLastYear.name,
		];
		numberData[2] = Numbers;
		namesData[2] = names;

		setDataNumbers(numberData);
		setDataNames(namesData);
	};

	// this useEffect is to fill the graph data or update it when the filters change
	useEffect(() => {
		if (!notificationLoading) {
			setAnalyticsData(notificationData?.data.analytics);
			setFilteredData(notificationData?.data.analytics);
			fillDataNumbers();
			setNewFilter(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notificationLoading]);

	// these useEffects is to update the graph data when the filters change
	// ordered by gender, age, timeFilter
	useEffect(() => {
		filterDataByGender();
		setCallAgeFilter(true);
		setNewFilter(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newFilter]);

	useEffect(() => {
		filterDataByAge();
		fillGraphData();
		setCallAgeFilter(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callAgeFilter]);

	// this useEffect is to update the graph labels when the timeFilter changes
	useEffect(() => {
		if (timeFilter === "Last Week") setLabels(weekList);
		if (timeFilter === "Last Month") setLabels(monthList);
		if (timeFilter === "Last Year") setLabels(yearList);

		setFilteredData(analyticsData);
		setNewFilter(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeFilter, genderFilter, ageFilter]);

	return (
		<>
			<Header title="Analytics"></Header>
			{clicksLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="pt-8">
					<div className="flex flex-col gap-4">
						<CardRow
							title="Number of clicks"
							names={dataNames[0]}
							data={dataNumbers[0]}
						></CardRow>
						<CardRow
							title="Best Store"
							names={dataNames[1]}
							data={dataNumbers[1]}
						></CardRow>
						<CardRow
							title="Best user"
							names={dataNames[2]}
							data={dataNumbers[2]}
						></CardRow>
					</div>
					<div className="flex justify-between items-center pt-10">
						<h1>Statistics</h1>
						<DropList
							value={ageFilter}
							options={ageFilterList}
							onChange={(e) => setAgeFilter(e.target.value)}
							className=" text-right"
						/>
						<DropList
							value={genderFilter}
							options={genderFilterList}
							onChange={(e) => setGenderFilter(e.target.value)}
							className=" text-right"
						/>
						<DropList
							value={timeFilter}
							options={timeFilterList}
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
