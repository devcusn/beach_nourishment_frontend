import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeachNourishment from "./container/beach-nourishment";
import Scene from "./container/Scene";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BeachNourishment />,
  },
  {
    path: "/scene",
    element: <Scene />,
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
