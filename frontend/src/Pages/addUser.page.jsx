import { useState, useEffect } from "react";

import TextInput from "../components/TextInput";
import Header from "../layouts/header";

const AddUser = () => {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [DOB, setDOB] = useState("");
	const [error, setError] = useState("");

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
			</div>
		</div>
	);
};

export default AddUser;
