import { Registration } from "./pages/Registration/Registration";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/login",
    element: <Login />
  },
];

export default AppRoutes;
