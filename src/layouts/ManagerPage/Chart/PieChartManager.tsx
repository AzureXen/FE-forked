import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, LegendProps } from "recharts";
import "../../../css/Manager/PieChart.css";
import { ApiReport } from "../../../apis/ManagerApis/Report/ApiReport";
import ReportResponse from "../../../model/Manager/ReportResponse";
import { motion } from "framer-motion";
import { Loading } from "../../Loading/Loading";
import Cookies from "js-cookie";

export const MyPieChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);

  const renderLegend: LegendProps["formatter"] = (value, entry) => {
    const { color, payload } = entry as unknown as {
      color: string;
      payload: { labelName: string };
    };
    return (
      <span style={{ color, fontWeight: "bold" }}>{payload.labelName}</span>
    );
  };

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchDataResult = async () => {
      try {
        setLoading(true);
        if (user) {
          const data = await ApiReport(user.company_id, user.user_id);
          setReport(
            new ReportResponse(data.internResults, data.reportParagraph)
          );
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchDataResult();
    }
  }, [user]);

  useEffect(() => {
    if (report) {
      console.log(report.reportParagraph);
    }
  }, [report]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!report) {
    return <div>No report data available</div>;
  }

  return (
    <motion.div
      className="application-container-chart mt-5 chart mb-5"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Pie Chart</h1>
      <div className=" d-flex flex-row justify-content-center">
        <PieChart width={1000} height={500}>
          <Pie
            data={report.internResults}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
            nameKey="labelName"
          >
            {report.internResults.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend formatter={renderLegend} />
        </PieChart>
      </div>
      <div
        className="report"
        dangerouslySetInnerHTML={{ __html: report.reportParagraph }}
      />
    </motion.div>
  );
};

export default MyPieChart;
