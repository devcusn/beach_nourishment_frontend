import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeachNourishment from "./container/beach-nourishment";
import Home from "./container/home";
import MapContainer from "./container/map";
import ReportPage from "./container/report";
import LandingPage from "./container/Landing";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/project",
    element: <Home />,
  },
  {
    path: "/map",
    element: <MapContainer />,
  },
  {
    path: "/analysis",
    element: <BeachNourishment />,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
