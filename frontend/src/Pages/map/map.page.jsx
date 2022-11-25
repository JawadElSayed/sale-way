import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import { MdLocationOn } from "react-icons/md";
import { useAllBranches } from "../../Hooks/useBranches";

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
			<div>
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
											console.log(modelData);
										}}
									/>
								</Marker>
							);
						})}
				</Map>
			</div>
		</>
	);
};

export default MapPage;
