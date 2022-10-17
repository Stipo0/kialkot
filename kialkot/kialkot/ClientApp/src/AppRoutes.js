import { Counter } from "./pages/Counter/Counter";
import { FetchData } from "./pages/FetchData/FetchData";
import { Home } from "./pages/Home/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/counter",
    element: <Counter />
  },
  {
    path: "/fetch-data",
    element: <FetchData />
  },
];

export default AppRoutes;
