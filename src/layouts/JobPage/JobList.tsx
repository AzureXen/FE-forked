import React, { useState, useEffect } from "react";
import { getJobs, Job, SearchJobsResponse } from "../../apis/getJobs";
import "../../css/jobList.css";
import logoSample from "../../images/logoSample-.png";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
interface JobListProps {
  search: string;
}

export const JobList: React.FC<JobListProps> = ({ search }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [roundedCount, setRoundedCount] = useState<number>(0);
  useEffect(() => {
    const unsubscribe = rounded.onChange((v) => setRoundedCount(v));
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search") || " ";

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data: SearchJobsResponse = await getJobs(
          searchTerm,
          pageNo,
          pageSize
        );
        setJobs(data.jobs);
        setTotalItems(data.totalItems);
        animate(count, data.totalItems, { duration: 1 });
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [location.search, pageNo, pageSize]);

  useEffect(() => {
    setPageSize(5);
  }, [search]);

  const handleJobClick = (id: number) =>{
    navigate(`/jobs/${id}`)
  }

  return (
    <div>
      <h1 className="text-start py-3" id="h1-aboutUs">
        {roundedCount} jobs in Vietnam
      </h1>
      <ul>
        {jobs.map((job) => (
          <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          >
          <div key={job.id} id="job" onClick={() => handleJobClick(job.id)}>
            <div className="container-fluid rounded mt-5 mb-5" id="job-block">
              <div className="row">
                <div className="col-md-2">
                  <img src={logoSample} alt="" id="logo" />
                </div>
                <div className="col-md-10">
                <div className="row">
                <div className="col-md-9">
                  <p className="fw-bold" id="p-job">
                    {job.jobName}
                  </p>
                  <p id="p-location">{job.company.location}</p>
                  <p>Company: {job.company.companyName}</p>
                  </div>
                  <div className="col-md-3">
                  <button id="btn-apply" onClick={() => handleJobClick(job.id)}>
                  Apply
                      <span className="first"></span>
                      <span className="second"></span>
                      <span className="third"></span>
                      <span className="fourth"></span>
                    </button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </motion.div>

        ))}
      </ul>
      <div>
        {jobs.length > 0 && (
          <button
            className="btn btn-1"
            onClick={() => setPageSize(pageSize + 5)}
            id="btn-show-more"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};
