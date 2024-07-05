import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  LegendProps,
} from 'recharts';
import "../../../css/Manager/PieChart.css";
import { ApiReport } from '../../../apis/ManagerApis/Report/ApiReport';
const data = [
  {
    value: 50,
    labelName: 'Intern completed all tasks'
 },
  { value: 40,
    labelName: 'Intern partially completed tasks'
 },
  { value: 10,
    labelName: 'Intern did not complete any tasks'
 },
];

const MyPieChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const renderLegend: LegendProps['formatter'] = (value, entry) => {
  const { color, payload } = entry as unknown as { color: string; payload: { labelName: string } };
  return <span style={{ color, fontWeight: 'bold' }}>{payload.labelName}</span>;
  };
  const [user, setUser] = useState<{
    user_id: number;
    company_id: number;
  } | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
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
        const data = await ApiReport(user.company_id,user.user_id);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchDataResult();
}, [user]);

  return (
    <div className='application-container'>
      <h1>Pie Chart</h1>
      <PieChart width={1000} height={800}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ labelName, percent }) => `${labelName} ${(percent * 100).toFixed(0)}%`}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
          nameKey="labelName"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend formatter={renderLegend} />
      </PieChart>
    </div>
  );
};

export default MyPieChart;
