import { Link, Outlet } from "react-router-dom";
import Button from "../components/Button";
import logo from "../logo.png";

const Layout = ({ buttons }) => {
	return (
		<>
			<div
				style={{ width: "23vw" }}
				className="bg-primary h-screen fixed"
			>
				<img src={logo} alt="logo" className="w-5/12 pt-9 mx-auto" />
				<div className="text-center mt-36">
					{buttons.map((button) => {
						return (
							<Link
								key={button.toLowerCase()}
								to={`${button.toLowerCase()}`}
							>
								<Button
									className="w-full mb-2 py-3"
									backgroundColor=""
								>
									{button}
								</Button>
							</Link>
						);
					})}
				</div>
			</div>
			<div style={{ marginLeft: "23vw" }} className="px-12">
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
