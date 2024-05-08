import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeachNourishment from "./container/beach-nourishment";
import Home from "./container/home";
import MapContainer from "./container/map";
import ReportPage from "./container/report";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/map",
    element: <MapContainer />,
  },
  {
    path: "/beach-nourishment",
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
