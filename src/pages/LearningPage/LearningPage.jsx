import ContentMenu from "../../components/ContentMenu/ContentMenu";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import VideoComponent from "../../components/VideoComponent/VideoComponent";
import "./LearningPage.css"

export function LearningPage(){
    return(<>
    <Header/>
    <div className="learning-page-container">
         <ContentMenu/>
         <VideoComponent/>
    </div>
    <Footer/>
    </>)
}