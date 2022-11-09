import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

const Header = ({
	title,
	firstRowButtons,
	secondRowButtons,
	titles,
	showSearchBar = true,
}) => {
	//

	return (
		<div>
			<div className="pt-10 flex items-center justify-between">
				<h1>{title}</h1>
				<div>
					{firstRowButtons?.map((button) => {
						return (
							<Button
								key={button[0]}
								onClick={button[1]}
								backgroundColor="secondary"
								className="ml-10"
							>
								{button[0]}
							</Button>
						);
					})}
				</div>
			</div>

			{showSearchBar && secondRowButtons && (
				<div className="pt-8 flex items-center">
					{showSearchBar && (
						<div className="flex-grow">
							<SearchBar></SearchBar>
						</div>
					)}
					<div>
						{secondRowButtons?.map((button) => {
							return (
								<Button
									key={button[0]}
									onClick={button[1]}
									backgroundColor="secondary"
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
