import './globalStyle.sass'
import { Provider } from "react-redux";
import store from "./redux";
import { AppRoutes } from "./pages/pages";

function App() {
  return (
    <Provider store={store}>
        <AppRoutes/>
    </Provider>

  );
}

export default App;
