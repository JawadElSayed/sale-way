import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import DropList from "../components/DropList";
import { baseUrl } from "../config/config";

const Header = ({
	title,
	firstRowButtons,
	secondRowButtons,
	filters,
	titles,
	showSearchBar = true,
	image,
	onChange,
}) => {
	//

	return (
		<div>
			<div className="pt-10 flex items-center justify-between">
				<div className="flex items-center">
					{image && (
						<img
							src={`${baseUrl}${image}`}
							alt="Store img"
							className="w-28 h-28 mr-4 rounded-full border-secondary"
						/>
					)}
					<h1>{title}</h1>
				</div>
				<div>
					{firstRowButtons?.map((button) => {
						return (
							<Button
								key={button[0]}
								onClick={button[1]}
								backgroundColor={
									button[0] === "Delete" ? "red" : "secondary"
								}
								className="ml-10"
								style={{
									width: "8.75vw",
									minWidth: "fit",
								}}
							>
								{button[0]}
							</Button>
						);
					})}
				</div>
			</div>

			{showSearchBar && (secondRowButtons || filters) && (
				<div className="pt-8 flex items-center">
					{showSearchBar && (
						<div className="flex-grow">
							<SearchBar onChange={onChange}></SearchBar>
						</div>
					)}
					<div>
						{filters?.map((filter) => {
							return (
								<DropList
									key={filter[0][0]}
									value={filter[1]}
									onChange={filter[2]}
									options={filter[0]}
									className="ml-10"
								/>
							);
						})}
					</div>
					<div>
						{secondRowButtons?.map((button) => {
							return (
								<Button
									key={button[0]}
									onClick={button[1]}
									backgroundColor={
										button[0] === "Delete"
											? "red"
											: "secondary"
									}
									className="ml-10"
								>
									{button[0]}
								</Button>
							);
						})}
					</div>
				</div>
			)}

			{titles && (
				<div className="pt-8 flex items-center gap-6 justify-between">
					{titles?.map((title) => {
						return (
							<h2 key={title} className="text-clip text-center">
								{title}
							</h2>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Header;
