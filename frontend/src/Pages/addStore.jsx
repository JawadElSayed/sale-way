import { useState, useEffect } from "react";
import { useAddBranch, useBranchByID } from "../Hooks/useBranches";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";
import ProductImagesInput from "../components/ProductImagesInput";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Header from "../layouts/header";
import SearchDropDown from "../components/SearchDropDown";
import DropList from "../components/DropList";
import { useAddStore } from "../Hooks/useStore";
import { useAllStores } from "../Hooks/useStore";

const AddStoer = () => {
	const navigate = useNavigate();

	const params = useParams();
	const id = params.id;

	const [addType, setAddType] = useState("Branch");

	const [StoreName, setStoreName] = useState("");
	const [phone, setPhone] = useState("");
	const [about, setAbout] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [type, setType] = useState("");
	const [mainStore, setMainStore] = useState("");
	const [mainStoreId, setMainStoreID] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState("");

	const {
		mutate: branchMutate,
		isSuccess: branchIsSuccess,
		isError: branchIsError,
	} = useAddBranch();
	const {
		mutate: storeMutate,
		isSuccess: storeIsSuccess,
		isError: storeIsError,
	} = useAddStore();
	const { data: storesData, isLoading: storesLoading } = useAllStores();

	const { data, isLoading } = useBranchByID(id);

	let storesList = [];
	let storesNameList = [];
	if (!storesLoading) {
		for (var store of storesData.data.stores) {
			storesList.push([store.id, store.name]);
			storesNameList.push(store.name);
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (id) {
				setStoreName(data.data.branch.name);
				setPhone(data.data.branch.phone);
				setAbout(data.data.branch.about);
				setLatitude(data.data.branch.latitude);
				setLongitude(data.data.branch.longitude);
			}
		}
	}, [
		isLoading,
		id,
		data?.data.branch.name,
		data?.data.branch.phone,
		data?.data.branch.about,
		data?.data.branch.latitude,
		data?.data.branch.longitude,
	]);

	const saveBranch = () => {
		setError("");
		if (addType === "Branch") {
			if (
				branchValidation(
					StoreName,
					about,
					phone,
					type,
					latitude,
					longitude,
					mainStore
				)
			)
				return setError(
					branchValidation(
						StoreName,
						about,
						phone,
						type,
						latitude,
						longitude,
						mainStore
					)
				);
			const data = {
				name: StoreName,
				category: type,
				about: about,
				latitude: parseFloat(latitude).toString(),
				longitude: parseFloat(longitude).toString(),
				phone: parseInt(phone).toString(),
				images: [],
				store_id: mainStoreId,
			};
			console.log(`mutate ${mainStoreId}`);
			branchMutate(data);
		} else {
			if (storeValidation(StoreName, about, phone))
				return setError(storeValidation(StoreName, about, phone));
			const data = {
				name: StoreName,
				about: about,
				phone: parseInt(phone).toString(),
				images: [],
			};
			storeMutate(data);
		}

		if (storeIsError || branchIsError)
			alert("Something went wrong");
	};

	useEffect(() => {
		if (storeIsSuccess || branchIsSuccess)
			navigate("/admin/stores");
	}, [branchIsSuccess, navigate, storeIsSuccess]);

	const branchValidation = (
		StoreName,
		about,
		phone,
		type,
		latitude,
		longitude,
		mainStore
	) => {
		if (!StoreName) return "Store Name fields is required";
		if (!about) return "About fields is required";
		if (!phone) return "phone fields is required";
		if (!type) return "Store type fields is required";
		if (!latitude) return "Latitude fields is required";
		if (!longitude) return "Longitude fields is required";
		if (!mainStore) return "MainStore fields is required";

		if (phone.toString().length < 7) return "Phone Number is too short";
		if (phone.toString().length > 8) return "Phone Number is too long";
		if (!parseFloat(latitude))
			return "latitude fields must contain a number";
		if (!parseFloat(longitude))
			return "longitude fields must contain a number";
		let available = false;
		for (store of storesList) {
			if (mainStore === store[1]) {
				available = true;
				break;
			}
		}
		if (!available) return "Main Store is not available";

		return "";
	};

	useEffect(() => {
		let available = false;
		for (store of storesList) {
			if (mainStore === store[1]) {
				available = true;
				setMainStoreID(store[0]);
				break;
			}
		}
	}, [mainStore]);
	const storeValidation = (StoreName, about, phone) => {
		if (!StoreName) return "Store Name fields is required";
		if (!about) return "About fields is required";
		if (!phone) return "phone fields is required";

		if (!parseInt(phone)) return "phone fields must contain a number";

		return "";
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="Add Store"></Header>
			{!id && (
				<DropList
					value={addType}
					onChange={(e) => setAddType(e.target.value)}
					options={["Store", "Branch"]}
					className="mr-10 text-right"
				/>
			)}
			<div className="overflow-y-scroll hide-scroll-bar px-2.5 pb-8 pt-8">
				{addType === "Branch" ? (
					<>
						<ProductImagesInput />
						<div className="flex gap-6">
							<TextInput
								placeholder="Store Name"
								pt={12}
								onChange={(e) => setStoreName(e.target.value)}
								value={StoreName}
							/>
							<SearchDropDown
								placeholder="Main Store"
								onChange={(e) => setMainStore(e.target.value)}
								value={mainStore}
								options={storesNameList}
							/>
						</div>

						<TextArea
							placeholder="About"
							onChange={(e) => setAbout(e.target.value)}
							value={about}
						/>
						<div className="flex gap-6">
							<TextInput
								placeholder="Phone: 71 874 395, 3 963 384"
								pt={12}
								onChange={(e) => {
									const result = e.target.value.replace(
										/\D/g,
										""
									);
									setPhone(parseInt(result));
								}}
								value={phone}
							/>
							<SearchDropDown
								placeholder="Store Type"
								onChange={(e) => setType(e.target.value)}
								value={type}
							/>
						</div>
						<div className="flex gap-6">
							<TextInput
								placeholder="Latitude: 34.45653"
								pt={12}
								onChange={(e) => {
									const result = e.target.value.replace(
										/[^0-9.]/g,
										""
									);
									setLatitude(result);
								}}
								value={latitude}
							/>
							<TextInput
								placeholder="Longitude: 33.57327"
								pt={12}
								onChange={(e) => {
									const result = e.target.value.replace(
										/[^0-9.]/g,
										""
									);
									setLongitude(result);
								}}
								value={longitude}
							/>
							<Button
								className="mt-12 w-full"
								rounded="xl"
								onClick={null}
							>
								Auto Location
							</Button>
						</div>

						{error && (
							<p className="text-red-700 pt-2 text-left">
								{error}
							</p>
						)}
						<div className="text-center">
							<Button
								className="mt-12 w-32"
								rounded="xl"
								onClick={saveBranch}
							>
								Save
							</Button>
						</div>
					</>
				) : (
					<>
						<ProductImagesInput />
						<div className="flex gap-6">
							<TextInput
								placeholder="Store Name"
								pt={12}
								onChange={(e) => setStoreName(e.target.value)}
								value={StoreName}
							/>
							<TextInput
								placeholder="Phone: 71 874 395, 3 963 384"
								pt={12}
								onChange={(e) => {
									const result = e.target.value.replace(
										/\D/g,
										""
									);
									setPhone(parseInt(result));
								}}
								value={phone}
							/>
						</div>
						<TextArea
							placeholder="About"
							onChange={(e) => setAbout(e.target.value)}
							value={about}
						/>

						{error && (
							<p className="text-red-700 pt-2 text-left">
								{error}
							</p>
						)}
						<div className="text-center">
							<Button
								className="mt-12 w-32"
								rounded="xl"
								onClick={saveBranch}
							>
								Save
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default AddStoer;
