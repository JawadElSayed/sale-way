import { useState } from "react";
import Header from "../layouts/header";
import DropList from "../components/DropList";

const StoreAnalytics = () => {
	const filterList = ["Last Week", "Last Month", "Last Year"];
	const [filter, setFilter] = useState("Last Week");

	return (
		<>
			<Header title="Analytics"></Header>
			<div className="pt-8">
				<div>
					<DropList
						value={filter}
						options={filterList}
						onChange={(e) => setFilter(e.target.value)}
						className="mt-10 text-right"
					/>
				</div>
			</div>
		</>
	);
};

export default StoreAnalytics;
