import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";

import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/ReduxStore";
import Router from "./pages/Router";

function App() {
	return (
		<Provider store={store}>
			<PrimeReactProvider>
				<Router />
			</PrimeReactProvider>
		</Provider>
	);
}

export default App;
