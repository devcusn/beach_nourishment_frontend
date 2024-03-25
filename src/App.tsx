import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./container/home";
import BeachNourishment from "./container/beach-nourishment";
import SoilAIApp from "./container/soilai";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/beach-nourishment",
    element: <BeachNourishment />,
  },
  {
    path: "/soil-ai",
    element: <SoilAIApp />,
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
