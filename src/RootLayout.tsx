import {Outlet} from "react-router";


function RootLayout(props) {
  return (
    <div className="px-8 py-2">
      <Outlet />
    </div>
  );
}

export default RootLayout;