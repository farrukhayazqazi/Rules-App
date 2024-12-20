import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import RootLayout from "../RootLayout.tsx";
import ViewMode from "../pages/ViewMode.tsx";
import EditMode from "../pages/EditMode.tsx";


function AppRoutes(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="rules" element={<RootLayout/>}>
            <Route index element={<ViewMode/>}/>
            {/*<Route path=':id' element={<ViewMode/>}/>*/}
            <Route path='edit/:id' element={<EditMode/>}/>
          </Route>
          <Route
            path="*"
            element={<Navigate to="/rules" replace/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;