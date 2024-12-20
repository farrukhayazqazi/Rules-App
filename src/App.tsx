import * as Toast from "@radix-ui/react-toast";
import AppRoutes from "./routes/AppRoutes.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {

  return (
    <Provider store={store}>
      <Toast.Provider swipeDirection="right">
        <AppRoutes/>
        <Toast.Viewport />
      </Toast.Provider>
    </Provider>
  );
}

export default App;
