import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainComponent from "./components/MainComponent";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
