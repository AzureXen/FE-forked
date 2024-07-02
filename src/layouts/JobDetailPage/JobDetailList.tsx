import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../apis/ApiJobById";
import { Job } from "../../model/type";
import "../../css/JobDetail.css";
import logoSample from "../../images/logoSample-.png";
import { applyJob } from "../../apis/ApiApplyJob";
import { useToast } from "../../context/ToastContext";
import { Loading } from "../Loading/Loading";

export const JobDetailList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cv, setCv] = useState<File | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        if (id) {
          const data: Job = await getJobDetail(parseInt(id));
          console.log(data);
          setJob(data);
        }
      } catch (error) {
        console.error("Error fetching job detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id]);

  const formatParagraphs = (text: string) => {
    return text.split("\\n").map((str, index) => <p key={index}>{str}</p>);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCv(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cv || !id) return;
    setLoading(true);
    try {
      const response = await applyJob(parseInt(id), email, fullName, cv);
      showToast("success","success");
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Failed to submit job application.");
    }finally{
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="job-detail">
      <div className="container rounded mt-5 mb-5" id="job-block">
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
                <button id="btn-apply">
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
      <div
        className="container rounded mt-5 mb-5 col-md-12"
        id="job-description-block"
      >
        <h1 id="h1-job-description">Job Description</h1>
        {formatParagraphs(job.jobDescription)}
      </div>
      <div className="container rounded mb-5" id="job-block">
        <div className="row input-container">
          <h1 id="h1-apply-now"> Apply Now</h1>
        {loading ? (
          <Loading/>
        ):(
          <form onSubmit={handleSubmit}>
          <div className="col-xs-12">
            <div className="styled-input wide">
              <input
                type="text"
                id="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label>Name</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="styled-input">
              <input
                type="text"
                id="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <input type="hidden" value={job.id} onChange={(e) => e.target.value}/>
            <div className="styled-input" style={{ float: "right" }}>
              <input
                className=""
                type="file"
                id="input-cv"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
            </div>
          </div>
          <div className="col-xs-12">
            <div className="styled-input wide">
              <textarea></textarea>
              <label>Message</label>
            </div>
          </div>
          <div className="col-xs-12">
            <button type="submit" id="btn-apply" className="btn-lrg submit-btn">
                Apply
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
          </div>
        </form>
        )}
        </div>
      </div>
    </div>
  );
};
