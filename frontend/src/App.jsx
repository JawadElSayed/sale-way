import Form from "./components/Form";
import Users from "./Pages/users.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="site-font">
					<Routes>
						<Route exact path="/" element={<Form />}></Route>
						<Route exact path="/users"></Route>
					</Routes>
				</div>
			</Router>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
