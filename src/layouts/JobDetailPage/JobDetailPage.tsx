import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderSmaller } from "../HeaderAndFooter/HeaderSmaller";
import { JobDetailList } from "./JobDetailList";

export const JobDetailPage = () =>{
    return(
        <>
        <div className="d-flex flex-column">
        <HeaderSmaller/>
        <div>
          <JobDetailList/>
        </div>
        <Footer/>
      </div>
        </>
    );
}