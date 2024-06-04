import { Fade } from "react-awesome-reveal";
import { AboutUs } from "../HeaderAndFooter/AboutUs";
import { Footer } from "../HeaderAndFooter/Footer";
import { Header } from "../HeaderAndFooter/Header";
import JobCategory from "../HeaderAndFooter/JobCategory";
export const HomePage = () => {

  
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
      </div>
      <div>
        <JobCategory/>
      </div>
      <div>
       <Fade direction="down" cascade>
       <AboutUs />
       </Fade>
      </div>
      <Footer />
    </>
  );
};
