import { useState } from "react";
import Map from "react-map-gl";

const MapPage = () => {
	const [veiwPort, setViewPort] = useState({
		longitude: 35.52,
		latitude: 33.875,
		zoom: 12.5,
	});

	return (
		<>
			<div>
				<Map
					mapboxAccessToken="pk.eyJ1IjoiamF3YWQ5OTEiLCJhIjoiY2xhcGc3cmNkMTNzMzNwbWs5MWdhdWVmcyJ9.nW3u7Sc2-IK1cewxd7GukA"
					initialViewState={{ ...veiwPort }}
					style={{ width: " 100%", height: "100vh" }}
					mapStyle="mapbox://styles/mapbox/streets-v9"
				></Map>
			</div>
		</>
	);
};

export default MapPage;
