import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import { useAllUsers } from "../Hooks/useUser";
import Table from "../components/Table";

const AdminUsers = () => {
	const navigate = useNavigate();

	const [age, setAge] = useState("Age");
	const [gender, setGender] = useState("Gender");
	const [tableData, setTableData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [search, setSearch] = useState("");

	const tableTitles = ["Image", "Name", "Gender", "Age", "Click"];

	const filters = [
		[
			["Age", "13-25", "25-36", "36-45", "45-64", "64+"],
			age,
			(e) => setAge(e.target.value),
		],
		[
			["Gender", "Male", "Female"],
			gender,
			(e) => setGender(e.target.value),
		],
	];

	const secondRowButtons = [
		["Add User", () => navigate("/admin/users/add-user")],
	];

	const { isLoading, data } = useAllUsers();

	// this useEffect is for getting data from the api
	useEffect(() => {
		let dataArray = [];
		data?.data?.users?.map((user) => {
			const newData = [
				user.id,
				user.profile,
				user.name,
				user.gender,
				[
					((Date.now() - Date.parse(user.DOB)) / 31556952000).toFixed(
						0
					),
				],
				user.Notifications.length.toString(),
			];

			return dataArray.push(newData);
		});
		setTableData(dataArray);
		setFilteredData(dataArray);
	}, [data, isLoading]);

	// this useEffect is for Searching
	useEffect(() => {
		let filteringData = [];
		tableData.map((user) => {
			let newData = null;
			if (user?.[2]?.toLowerCase().includes(search.toLowerCase())) {
				newData = user;
				filteringData.push(newData);
			}
			return null;
		});
		setFilteredData(filteringData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Users"
				secondRowButtons={secondRowButtons}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{isLoading && <h2>Loading...</h2>}
				<Table titles={tableTitles} data={filteredData} />
			</div>
		</div>
	);
};

export default AdminUsers;
