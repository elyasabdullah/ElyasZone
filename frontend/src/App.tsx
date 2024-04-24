import AppLoader from './AppLoader';
import store from "./state/store";
import { Provider } from "react-redux";
import "./styles/main-styles.scss";

const App = () => {
  return (
    <Provider store={store}>
      <AppLoader />
    </Provider>
  );
};

export default App;
