import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Layout from "./layouts/layout";
import Products from "./Pages/products.page";
import LandingPage from "./Pages/landing.page";
import AddProduct from "./Pages/addProduct.page";
import AdminStores from "./Pages/AdminStores.page";
import AddStoer from "./Pages/addStore";
import AdminUsers from "./Pages/users.page";
import AddUser from "./Pages/addUser.page";
import MapPage from "./Pages/map/map.page";
import AdminAnalytics from "./Pages/adminAnalytics.page";
import AdminStore from "./Pages/AdminStore.page";
import StoreAnalytics from "./Pages/storeAnalytics.page";

const queryClient = new QueryClient();

const storePages = ["Products", "Analytics"];
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
							<Route
								path="analytics"
								element={<StoreAnalytics />}
							/>
							<Route
								path="add-product"
								element={<AddProduct />}
							/>
						</Route>
						<Route
							path="/admin"
							element={<Layout buttons={AdminPages} />}
						>
							<Route path="stores" element={<AdminStores />} />
							<Route path="users" element={<AdminUsers />} />
							<Route
								path="analytics"
								element={<AdminAnalytics />}
							/>
							<Route path="map" element={<MapPage />} />
							<Route
								path="stores/add-store"
								element={<AddStoer />}
							/>
							<Route
								path="users/add-user"
								element={<AddUser />}
							/>
							<Route
								path="stores/edit-store/:id"
								element={<AddStoer />}
							/>
							<Route
								path="stores/store/:id"
								element={<AdminStore />}
							/>
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
