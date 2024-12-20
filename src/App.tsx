import AppRoutes from "./routes/AppRoutes.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {

  return (
    <Provider store={store}>
      <AppRoutes/>
    </Provider>
  );
}

export default App;
