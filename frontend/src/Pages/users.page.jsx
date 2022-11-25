import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";
import { useAllUsers } from "../Hooks/useUser";
import Table from "../components/Table";

const AdminUsers = () => {
	const navigate = useNavigate();

	const [age, setAge] = useState("Age");
	const [gender, setGender] = useState("Gender");

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

	const { isLoading, data, isError, error } = useAllUsers();

	let tableData = [];
	if (!isLoading) {
		data.data.users.map((user) => {
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

			return tableData.push(newData);
		});
	}

	return (
		<div className="flex flex-col h-screen">
			<Header title="Users" secondRowButtons={secondRowButtons} />
			<div className="overflow-y-scroll hide-scroll-bar pt-2">
				{isLoading && <h2>Loading...</h2>}
				<Table titles={tableTitles} data={tableData} />
			</div>
		</div>
	);
};

export default AdminUsers;
