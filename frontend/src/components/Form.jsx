import { useState, useEffect } from "react";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate } from "react-router-dom";

import logo from "../logo.png";
import TextInput from "./TextInput";
import Button from "./Button";

const Form = () => {
	const {
		mutate,
		error: loginError,
		data: loginData,
		isSuccess,
	} = useLogin();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const onSubmit = () => {
		setError("");
		if (validation(email, password))
			return setError(validation(email, password));
		console.log(email, password);
		const data = { email: email, password: password };
		mutate(data);

		setPassword("");
	};

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem("token", loginData?.data?.token);
			navigate("/users");
		}
	}, [isSuccess, loginData?.data.token, navigate]);

	const validation = (email, password) => {
		const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (!email || !password) return "All fields are required";
		if (!regex.test(email)) return "Invalid email format";
		return "";
	};

	return (
		<div className="w-full h-full fixed">
			<form
				className="max-w-md w-full fixed top-1/2 left-1/2 center-modal 
							black-shadow rounded-3xl p-8 text-center bg-primary"
			>
				<img src={logo} alt="logo" className="w-1/3 mx-auto" />
				<TextInput
					lable="Email"
					placeholder="example@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					shadow="black"
					name="email"
				></TextInput>
				<TextInput
					type="password"
					lable="Password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					shadow="black"
					name="password"
				></TextInput>
				{error ? (
					<p className="text-red-700 pt-2 text-left">{error}</p>
				) : (
					loginError?.response?.status === 400 && (
						<p className="text-red-700 pt-2 text-left">
							{loginError.response.data?.message}
						</p>
					)
				)}

				<Button
					backgroundColor="secondary"
					rounded="xl"
					className="w-32 text-medium"
					onClick={onSubmit}
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default Form;
