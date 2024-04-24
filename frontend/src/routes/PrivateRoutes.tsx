import { Route, Routes } from "react-router-dom";
import Home from "src/pages/home";
import Profile from "src/pages/profile";
import PostEditService from "src/pages/postEditService";
import Service from "src/pages/service";
import { PrivateLayout } from "src/layouts";
import MyService from "src/pages/myService";

const PrivateRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateLayout/>}>
        <Route 
            path="/"
            element={<Home/>}
          />
          <Route 
            path="/profile"
            element={<Profile/>}
          />
          <Route 
            path="/postEditService"
            element={<PostEditService/>}
          />
          <Route 
            path="/service"
            element={<Service/>}
          />
          <Route 
            path="/myservice"
            element={<MyService/>}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default PrivateRoutes