import {Routes,Route} from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage"
import {ShowAllCoursePage } from "./pages/ShowAllCoursePage/ShowAllCoursePage"
import Login from "./components/Login/LoginComponent"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
export function Layout(){
    return(<>
    <Routes>
    <Route path="/" element={<App/>}>
       <Route 
       index 
       element={<><HomePage/></>}
       />
       <Route
       path="login"
       element={<><LoginPage/></>}
       />
       <Route
       path="sign-up"
       element={<><RegisterPage/></>}
       />
       <Route
       path="courses"
       element={<><ShowAllCoursePage/></>}
       />
       <Route
       path="detail"
       element={<></>}
       />
       <Route
       path="learn-page"
       element={<></>}
       />
       <Route
       path="wishlist"
       element={<></>}
       />

    </Route>
    </Routes>
    </>)
}