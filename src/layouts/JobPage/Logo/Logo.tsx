import { useEffect, useState } from "react";
import logoSample from "../../../images/logoSample-.png";
import { getCompanyLogo } from "../../../apis/Home/ApiLogo";

export const JobLogo: React.FC<{ jobId: number }> = ({ jobId }) => {
    const [logoUrl, setLogoUrl] = useState<string>("");
  
    useEffect(() => {
      const fetchLogo = async () => {
        try {
          const logo = await getCompanyLogo(jobId.toString());
          setLogoUrl(logo);
        } catch (error) {
          console.error("Error fetching the company logo:", error);
        }
      };
  
      fetchLogo();
    }, [jobId]);
  
    return (
      <div>
        {logoUrl ? (
              <img
                src={logoUrl}
                alt="Company Logo"
                id="logo"
                style={{ background: "transparent" }}
              />
            ) : (
              <img src={logoSample} alt="Sample Logo" id="logo" />
            )}
      </div>
    );
  };