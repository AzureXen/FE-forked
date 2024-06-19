import React, { useEffect, useState } from "react";
import { Job } from "../../apis/ApiJob";
import "../../css/category.css";
import { Footer } from "./Footer";
import { Fade } from "react-awesome-reveal";

interface JobList {
  fieldName: string;
}

const JobCategory = () => {
  const [listJob, setListJob] = useState([]);
  const [hasFaded, setHasFaded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    Job().then((data) => setListJob(data));
  }, []);

  useEffect(() => {
    if (listJob.length > 0 && !hasFaded) {
      setHasFaded(true);
    }
  }, [listJob]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  console.log(listJob);

  return (
    <div>
      <h1 className="text-center py-3" id="h1-aboutUs">
        Job By Category
      </h1>
      <div className="container">
        <div className="row">
          {listJob.map((i: JobList) => (
            <div className="col-md-4" id="square" key={i.fieldName}>
              {scrollDirection === "down" && (
                <Fade direction="down">
                  <p>{i.fieldName}</p>
                </Fade>
              )}
              {scrollDirection === "up" && (
                <div>
                  <p>{i.fieldName}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCategory;
