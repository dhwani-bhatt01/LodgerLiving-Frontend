import { BrowserRouter } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "./app.scss";
import { AppRoutes } from "./routes/routes";

function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
