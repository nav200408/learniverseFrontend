import {Routes,Route} from "react-router-dom"
import App from "./App"
import { HomePage } from "./pages/HomePage"
import {ShowAllCoursePage } from "./pages/ShowAllCoursePage/ShowAllCoursePage"
import Login from "./components/Login/LoginComponent"
import { LoginPage } from "./pages/LoginPage/LoginPage"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage"
import CourseInfoCard from "./components/CourseCard/CourseCard"
import CourseDetails from "./components/ShowCourseDetails/CourseDetails"
import { CourseDetailsPage } from "./pages/CourseDetailPage/CourseDetailPage"
import WishList from "./components/ShowWishlist/ShowWishlist"
import { WishlistPage } from "./pages/WishlistPage/WishlistPage"
import Dashboard from "./components/ShowMyCourse/ShowMyCourse"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import ContentMenu from "./components/ContentMenu/ContentMenu"
import { LearningPage } from "./pages/LearningPage/LearningPage"
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
       element={<><CourseDetailsPage/></>}
       />
       <Route
       path="learn-page"
       element={<><LearningPage/></>}
       />
       <Route
       path="wishlist"
       element={<><WishlistPage/></>}
       />
       <Route
       path="my-courses"
       element={<><Header></Header><Dashboard/></>}
       />

    </Route>
    </Routes>
    </>)
}