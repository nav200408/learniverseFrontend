
import CourseDetails from "../../components/ShowCourseDetails/CourseDetails"
import CourseInfoCard from "../../components/CourseCard/CourseCard"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./CourseDetailPage.css"
export function CourseDetailsPage(){
return(<>
  <div className='container'>
    <Header></Header>
    <div className='courseDetailSection'>
      <CourseInfoCard/>
      <CourseDetails></CourseDetails>
    </div>
    <Footer></Footer>
  </div>
  </>)
}