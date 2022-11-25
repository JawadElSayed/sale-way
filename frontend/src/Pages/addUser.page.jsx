import { useState, useEffect } from "react";
import { useAddUser } from "../Hooks/useUser";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Header from "../layouts/header";

const AddUser = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [DOB, setDOB] = useState("");
	const [error, setError] = useState("");

	const { mutate, isSuccess, isError, data } = useAddUser();

	const saveUser = () => {
		setError("");
		if (validation(name, email, gender, DOB))
			return setError(validation(name, email, gender, DOB));
		const data = {
			name: name,
			email: email,
			gender: gender,
			DOB: DOB,
			user_type: "store manager",
		};

		mutate(data);
		if (isError) alert("Something went wrong");
	};

	useEffect(() => {
		if (isSuccess) {
			alert(`password: ${data.data.password}`);
			navigate("/admin/users");
		}
	}, [isSuccess, navigate]);

	const validation = (name, email, gender, DOB) => {
		if (!name) return "Name fields is required";
		if (!email) return "Email fields is required";
		if (!gender) return "Gender fields is required";
		if (!DOB) return "Date of birth fields is required";

		return "";
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="Add User"></Header>
			<div className="overflow-y-scroll hide-scroll-bar px-2.5 pb-8 pt-8">
				<TextInput
					placeholder="Name"
					pt={12}
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<TextInput
					placeholder="Example@Example.com"
					pt={12}
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>

				<TextInput
					placeholder="male, female"
					pt={12}
					onChange={(e) => setGender(e.target.value)}
					value={gender}
				/>
				<TextInput
					placeholder="24-12-2002"
					pt={12}
					onChange={(e) => setDOB(e.target.value)}
					value={DOB}
				/>

				{error && (
					<p className="text-red-700 pt-2 text-left">{error}</p>
				)}
				<div className="text-center">
					<Button
						className="mt-12 w-32"
						rounded="xl"
						onClick={saveUser}
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddUser;
