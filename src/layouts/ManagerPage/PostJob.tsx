import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../apis/ApiJobById";
import "../../css/JobDetail.css";
import logoSample from "../../images/logoSample-.png";
import { applyJob } from "../../apis/ApiApplyJob";
import { useToast } from "../../context/ToastContext";
import { getField } from "../../apis/ApiJob";
import { Field } from "../../model/Field";
import { postJob } from "../../apis/PostJobApi";
import { motion} from "framer-motion";
import Cookies from "js-cookie";

export const PostJob: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobName, setJobName] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>(""); // Updated variable name to camelCase
  const { showToast } = useToast();
  const [fields, setFields] = useState<Field[]>([]);
  const [user, setUser] = useState<{ company_id: number }>({ company_id: 0 });
  
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [fieldId, setFieldId] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getField();
        setFields(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formattedDescription = jobDescription.replace(/\n/g, '\\n');
    const jobData = {
      field_id: parseInt(fieldId),
      company_id: user?.company_id,
      job_name: jobName,
      job_description: formattedDescription, // Ensure jobDescription is used correctly
    };
    try {
      const response = await postJob(jobData);
      showToast("success", "success");
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Failed to submit job application.");
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.0 }}
    className="job-detail">
      <div className="container rounded mb-5 mt-5 d-flex justify-content-center align-items-center" id="job-block">
        <div className="row input-container">
          <h1 id="h1-apply-now">Post Recruitment Now</h1>
          <form onSubmit={handleSubmit}>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input"
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                  required
                />
                <label>Job Name</label>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  value={jobDescription} // Use jobDescription variable
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                ></textarea>
                <label>Job Description</label> {/* Fixed label text */}
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <select
                  id="input"
                  required
                  value={fieldId}
                  onChange={(e) => setFieldId(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select Field
                  </option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.fieldName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-xs-12">
              <button
                type="submit"
                id="btn-apply"
                className="btn-lrg submit-btn"
              >
                Post
                <span className="first"></span>
                <span className="second"></span>
                <span className="third"></span>
                <span className="fourth"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
