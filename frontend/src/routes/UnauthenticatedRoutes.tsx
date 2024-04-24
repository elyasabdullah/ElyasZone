import { Route, Routes } from "react-router-dom";
import Home from "src/pages/home";
import SignUp from "src/pages/signUp";
import Login from "src/pages/login";
import { UnauthenticatedLayout } from "src/layouts";

const UnauthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<UnauthenticatedLayout/>}>
          <Route 
            path="/"
            element={<Home/>}
          />
          <Route 
            path="/login"
            element={<Login/>}
          />
          <Route 
            path="/signup"
            element={<SignUp/>}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default UnauthenticatedRoutes