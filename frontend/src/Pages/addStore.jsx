import { useState, useEffect } from "react";
import { useAddBranch } from "../Hooks/useBranches";

import Button from "../components/Button";
import ProductImagesInput from "../components/ProductImagesInput";
import TextArea from "../components/TextArea";
import TextInput from "../components/TextInput";
import Header from "../layouts/header";
import SearchDropDown from "../components/SearchDropDown";
import { useAllStores } from "../Hooks/useStore";

const AddStoer = () => {
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
	const { data: storesData, isLoading: storesLoading } = useAllStores();

	let storesList = [];
	let storesNameList = [];
	if (!storesLoading) {
		for (var store of storesData.data.stores) {
			storesList.push([store.id, store.name]);
			storesNameList.push(store.name);
		}
	}

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

	return (
		<div className="flex flex-col h-screen">
			<Header title="Add Store"></Header>
			<div className="overflow-y-scroll hide-scroll-bar px-2.5 pb-8 pt-8">
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
						<p className="text-red-700 pt-2 text-left">{error}</p>
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
			</div>
		</div>
	);
};

export default AddStoer;
