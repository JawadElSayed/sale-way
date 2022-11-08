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
								backgroundColor="secondary"
								className="mt-0 ml-10"
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
									key={button}
									backgroundColor="secondary"
									className="mt-0 ml-10"
								>
									{button}
								</Button>
							);
						})}
					</div>
				</div>
			)}
			{titles && (
				<div className="pt-8 flex items-center justify-around">
					{titles?.map((title) => {
						return <h2 key={title}>{title}</h2>;
					})}
				</div>
			)}
		</div>
	);
};

export default Header;
