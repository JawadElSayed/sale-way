import StatisticsCard from "./statisticCard";

const CardRow = (props) => {
	return (
		<div className="flex gap-8">
			<StatisticsCard
				color="red"
				title={props.title}
				name={props.names?.[0] || "---"}
				value={props.data?.[0] || 0}
			/>
			<StatisticsCard
				color="green"
				title={props.title}
				name={props.names?.[1] || "---"}
				value={props.data?.[1] || 0}
			/>
			<StatisticsCard
				color="blue"
				title={props.title}
				name={props.names?.[2] || "---"}
				value={props.data?.[2] || 0}
			/>
		</div>
	);
};

export default CardRow;
