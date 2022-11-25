import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { MdLocationOn } from "react-icons/md";
import { baseUrl } from "../../config/config";
import { useAllBranches } from "../../Hooks/useBranches";
import "./index.css";

const MapPage = () => {
	const [veiwPort, setViewPort] = useState({
		longitude: 35.52,
		latitude: 33.875,
		zoom: 12.5,
	});

	const { isLoading, data, isError, error, isSuccess } = useAllBranches();

	const [displayModel, setDisplayModel] = useState("hidden");
	const [modelData, setModelData] = useState("");
	const [storeType, setStoreType] = useState("");
	const [storeDiscount, setStoreDiscount] = useState("");

	return (
		<>
			<div
				onClick={() => {
					if (displayModel === "block") setDisplayModel("hidden");
				}}
			>
				<Map
					mapboxAccessToken="pk.eyJ1IjoiamF3YWQ5OTEiLCJhIjoiY2xhcGc3cmNkMTNzMzNwbWs5MWdhdWVmcyJ9.nW3u7Sc2-IK1cewxd7GukA"
					initialViewState={{ ...veiwPort }}
					style={{ width: " 100%", height: "100vh" }}
					mapStyle="mapbox://styles/mapbox/streets-v9"
				>
					{isSuccess &&
						data?.data.branches.map((branch) => {
							return (
								<Marker
									key={branch.id}
									longitude={branch.longitude}
									latitude={branch.latitude}
								>
									<MdLocationOn
										size={40}
										onClick={() => {
											setModelData(branch);
											setStoreType(
												branch.store_types[0].categories
													.category
											);
											setStoreDiscount(
												branch.products[0].discount
											);
											setDisplayModel("block");
										}}
									/>
								</Marker>
							);
						})}
				</Map>
			</div>
			<div id="myModal" className={`modal ${displayModel}`}>
				<div className="modal-content rounded-t-2xl">
					<div className="p-10 flex items-center justify-between">
						<div className="flex items-center justify-start">
							<img
								src={`${baseUrl}${modelData.image}`}
								alt="Store Profile"
								className="w-24 h-24 mr-8 rounded-full border-secondary"
							/>
							<div>
								<h2>{modelData.name}</h2>
								<h3>{storeType}</h3>
							</div>
						</div>
						<div>
							<h3>{`Latitude: ${parseFloat(
								modelData.latitude
							).toFixed(5)}`}</h3>
							<h3>{`Longitude: ${parseFloat(
								modelData.longitude
							).toFixed(5)}`}</h3>
						</div>
						<div>
							<h3>{`up to ${storeDiscount}%`}</h3>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MapPage;
