import { useEffect } from "react";
import { useState } from "react";

const StatisticsCard = ({ color, title, value, name = "" }) => {
	const [duration, setDuration] = useState("this week");

	useEffect(() => {
		if (color === "green") setDuration("this month");
		if (color === "blue") setDuration("this year");
	}, [color]);

	return (
		<div
			className={`w-full h-40 bg-card-${color} rounded-2xl p-4 text-center flex flex-col justify-between text-white`}
		>
			<h3>{`${title} ${duration}`}</h3>
			{name && <h2>{name}</h2>}
			<h2>{value}</h2>
		</div>
	);
};

export default StatisticsCard;
