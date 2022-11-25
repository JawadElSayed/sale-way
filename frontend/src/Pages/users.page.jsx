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

	return (
		<div className="flex flex-col h-screen">
			<Header title="Users" secondRowButtons={secondRowButtons} />
		</div>
	);
};

export default AdminUsers;
