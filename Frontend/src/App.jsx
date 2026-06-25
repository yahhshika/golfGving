import { BrowserRouter, Route, Routes} from "react-router-dom"
import Wrapper from "./Wrapper"
import Home from "./pages/Home"
import Wiinners from "./pages/Wiinners"
import Charities from "./pages/Charities"
import Profile from "./pages/User/Profile"
import Draw from "./pages/Admin/Draw"
import NewCharity from "./pages/Admin/NewCharity"
import NewAdmin from "./pages/Admin/NewAdmin"
import UserRuote from "./routes/UserRoute"
import AdminRoute from "./routes/AdminRoute"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Subscription from "./pages/Subscription"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Wrapper/>}>
          {/* public routes */}
            <Route path="/home" element={<Home/>}/>
            <Route path="/charities" element={<Charities/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<SignUp/>}/> 
            <Route path="/subscribe" element={<Subscription/>}/> 
            <Route path="/winners" element={<Wiinners/>}/>

          {/*User Routes */}
            <Route element={<UserRuote/>}>
              <Route path="/profile" element={<Profile/>}/>
            </Route>
          {/* Admin routes */}
            <Route element={<AdminRoute/>}>
              <Route path="/admin/draw" element={<Draw/>}/>
              <Route path="/admin/charity" element={<NewCharity/>}/>
              <Route path="/admin/new" element={<NewAdmin/>}/>
            </Route>

          {/* page not found */}
            <Route path="*" element={<Home/>}/>
          </Route>


          
        </Routes>
      </BrowserRouter>  
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
      />
    </>
  )
}

export default App
