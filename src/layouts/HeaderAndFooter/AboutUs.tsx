import aboutUsImage from "../../images/aboutUs.png";
import '../../css/AboutUs.css'
export const AboutUs = () => {
  return (
    <div className="container-fluid mb-5 mt-5">
      <h1 className="text-center py-3" id="h1-aboutUs">
        About Us
      </h1>

      <div className="d-flex flex-wrap justify-content-between" id="about-us-body">
        <img id="img-about-us" src={aboutUsImage} alt="aboutus" />
        <div id="aboutUs-content">
          <div>
            <p>
              Welcome to InternBridge, where we bridge the gap between
              passionate interns and leading companies.
            </p>
          </div>
          <div>
            <p>
              We are a dedicated team of professionals with a shared vision to
              create a platform that fosters growth, learning, and career
              advancement.{" "}
            </p>
          </div>
          <div>
            <p>
              With extensive experience in both the corporate and education
              sectors, we understand the challenges and opportunities that lie
              ahead for interns and employers alike.
            </p>
          </div>
          <div>
            <p>
              Our platform offers a streamlined and user-friendly experience
              for both interns seeking meaningful opportunities and companies
              looking to find fresh talent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
