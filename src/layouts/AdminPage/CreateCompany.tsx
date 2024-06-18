import React, { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobDetail } from "../../apis/ApiJobById";
import "../../css/JobDetail.css";
import logoSample from "../../images/logoSample-.png";
import { applyJob } from "../../apis/ApiApplyJob";
import { useToast } from "../../context/ToastContext";
import { Job } from "../../apis/ApiJob";
import { Field } from "../../model/Field";
import { postJob } from "../../apis/PostJobApi";
import { CreateCompany } from "../../apis/ApiCreateCompany";
import { Loading } from "../Loading/Loading";

export const CreateCompanyPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDiscription, setCompanyDiscription] = useState<string>(""); // Updated variable name to camelCase
  const [location, setLocation] = useState<string>("");
  const { showToast } = useToast();
  const [fields, setFields] = useState<Field[]>([]);
  const [user, setUser] = useState<{ company_id: number }>({ company_id: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
    setLoading(true);
      if (
        companyName != null &&
        companyDiscription != null &&
        location != null
      ) {
        const companyData = { companyName, companyDiscription, location };
        const response = await CreateCompany(companyData);
        showToast("success", "success");
        setCompanyDiscription("");
        setCompanyName("");
        setLocation("");
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Failed to submit job application.");
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <div className="job-detail">
      {loading ? (
        <div>
            <Loading/>
        </div>
      ) : (
        <>
          <div className="container rounded mb-5" id="job-block">
            <div className="row input-container">
              <h1 id="h1-apply-now">Create Company Now</h1>
              <form onSubmit={handleSubmit}>
                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                    <label>Company Name</label>
                  </div>
                </div>

                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={companyDiscription}
                      onChange={(e) => setCompanyDiscription(e.target.value)}
                      required
                    />
                    <label>Company Discription</label>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="styled-input wide">
                    <input
                      type="text"
                      id="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <label>Company Location</label>
                  </div>
                </div>
                <div className="col-xs-12">
                  <button
                    type="submit"
                    id="btn-apply"
                    className="btn-lrg submit-btn"
                  >
                    Create
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                    <span className="fourth"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
