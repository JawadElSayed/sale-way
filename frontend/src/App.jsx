import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Products from "./Pages/products.page";
import LandingPage from "./Pages/landing.page";
import AddProduct from "./Pages/addProduct.page";

const queryClient = new QueryClient();

const storePages = ["Products", "Analytics", "Profile"];

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="site-font">
					<Routes>
						<Route exact path="/" element={<LandingPage />}></Route>

						<Route
							path="/store"
							element={<Layout buttons={storePages} />}
						>
							<Route
								exact
								path="products"
								element={<Products />}
							/>
							<Route
								exact
								path="analytics"
								element={<Products />}
							/>
							<Route
								exact
								path="profile"
								element={<Products />}
							/>
							<Route
								exact
								path="add-product"
								element={<AddProduct />}
							/>
						</Route>
					</Routes>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
