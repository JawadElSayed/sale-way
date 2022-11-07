import { Link } from "react-router-dom";
import Button from "../components/Button";
import logo from "../logo.png";

const Layout = ({ buttons }) => {
	return (
		<div className="w-80 bg-primary h-screen fixed">
			<img src={logo} alt="logo" className="w-36 pt-9 mx-auto" />
			<div className="text-center mt-36">
				{buttons.map((button) => {
					return (
						<Link
							key={button.toLowerCase()}
							to={`${button.toLowerCase()}`}
						>
							<Button className="w-full mt-0 mb-2 py-3">
								{button}
							</Button>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Layout;
