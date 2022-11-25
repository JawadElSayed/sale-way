import { baseUrl } from "../config/config";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Button from "./Button";

const Table = ({ titles, data, imageClick, edit, deleteClick, view }) => {
	const styleTitle = (data, index) => {
		if (index === 0) return "pr-4";
		if (index === data.length - 2) return "text-center";
		if (index === data.length - 1 && !view) return "text-right";
		else if (index === data.length - 1 && view) return "text-right pr-16";

		return "";
	};

	return (
		<>
			<table className="w-full">
				<thead>
					<tr className="text-left">
						{titles?.map((title, index) => {
							return (
								<th key={title}>
									<h2 className={styleTitle(titles, index)}>
										{title}
									</h2>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data?.map((item) => {
						return (
							<tr
								key={item?.[0]}
								className="text-left border-b-2 "
							>
								<td>
									<img
										src={`${baseUrl}${item?.[1]}`}
										alt="product"
										className="w-16 h-16 rounded-full my-2 border-secondary"
										onClick={() =>
											imageClick != null &&
											imageClick(item?.[5])
										}
									/>
								</td>
								<td>{item?.[2]}</td>
								<td>{item?.[3]}</td>
								<td className="text-center">
									{item?.[4]?.map((i) => {
										return <div key={i}>{i}</div>;
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Table;
