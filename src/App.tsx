import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeachNourishment from "./container/beach-nourishment";
import Home from "./container/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/beach-nourishment",
    element: <BeachNourishment />,
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
