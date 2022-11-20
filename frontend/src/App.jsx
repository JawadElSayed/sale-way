import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import Products from "./Pages/products.page";
import LandingPage from "./Pages/landing.page";
import AddProduct from "./Pages/addProduct.page";
import AdminStores from "./Pages/AdminStores.page";

const queryClient = new QueryClient();

const storePages = ["Products", "Analytics", "Profile"];
const AdminPages = ["Stores", "Users", "Analytics", "Map"];

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="site-font">
					<Routes>
						<Route path="/" element={<LandingPage />}></Route>

						<Route
							path="/store"
							element={<Layout buttons={storePages} />}
						>
							<Route path="products" element={<Products />} />
							<Route path="analytics" element={<Products />} />
							<Route path="profile" element={<Products />} />
							<Route
								path="add-product"
								element={<AddProduct />}
							/>
						</Route>
						<Route
							path="/Admin"
							element={<Layout buttons={AdminPages} />}
						>
							<Route path="stores" element={<AdminStores />} />
							<Route path="users" element={null} />
							<Route path="analytics" element={null} />
							<Route path="map" element={null} />
							<Route path="stores/add-store" element={null} />
							<Route
								path="stores/edit-store/:id"
								element={null}
							/>
							<Route path="stores/store/:id" element={null} />
						</Route>
						<Route path="*" element={null} />
					</Routes>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
