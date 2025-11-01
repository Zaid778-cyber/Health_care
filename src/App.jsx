import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import HealthCondition from "./components/HealthCondition";

function App() {
  const router = createBrowserRouter([
    {
      path: "/", // base URL → shows RegisterForm
      element: <div> <RegisterForm /></div> 
    },
    {
      path: "/dashboard", // navigate here to show Dashboard
      element: <div><Navbar></Navbar><Dashboard />,
      </div>       
    
    },
    {
      path:'/HealthCondition',
      element:<div><Navbar></Navbar> <HealthCondition></HealthCondition></div>
    },
    {
      path:'/Login',
      element:<div>
        <Login/>
      </div>
    }
  
  ]);

  return <RouterProvider router={router} />;
}

export default App;
