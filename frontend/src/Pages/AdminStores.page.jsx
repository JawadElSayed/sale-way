import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/header";

const AdminStores = () => {
	const navigate = useNavigate();

	const [storeType, setStoreType] = useState("");

	const filters = [
		[
			["Store Type", "first", "second"],
			storeType,
			(e) => setStoreType(e.target.value),
		],
	];

	const secondRowButtons = [
		["Add Store", () => navigate("/admin/add-store")],
	];

	const titles = ["image", "Store Name", "Type", "location", "Action"];

	return (
		<div className="flex flex-col h-screen">
			<Header
				title="Stores"
				filters={filters}
				secondRowButtons={secondRowButtons}
				titles={titles}
			/>
		</div>
	);
};

export default AdminStores;
