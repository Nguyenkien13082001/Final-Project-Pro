import React, { useEffect, useState } from "react";
import "./Evaluater.css"; // Import CSS cho thành phần này
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import các thành phần biểu đồ từ thư viện recharts
import apiClient from "../../api/apiClient"; // Import API client để gửi yêu cầu đến server

const Evaluater = () => {
  const [studentData, setStudentData] = useState([]); // State lưu dữ liệu sinh viên
  const [scoresChartData, setScoresChartData] = useState([]); // State lưu dữ liệu biểu đồ điểm số
  const [timeChartData, setTimeChartData] = useState([]); // State lưu dữ liệu biểu đồ thời gian hoàn thành

  // useEffect để lấy dữ liệu sinh viên từ server khi component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await apiClient.get("/api/get_count_exams");
        setStudentData(response); // Lưu dữ liệu sinh viên nhận được vào state
      } catch (error) {
        console.error("Error fetching student data:", error); // Ghi lỗi nếu không thể lấy dữ liệu
      }
    };
    fetchStudentData();
  }, []);

  // useEffect để xử lý dữ liệu sinh viên khi có thay đổi
  useEffect(() => {
    if (studentData && studentData.monthlyScores) {
      setScoresChartData(processScoreData(studentData.monthlyScores)); // Xử lý và cập nhật dữ liệu điểm số
    }
    if (studentData && studentData.monthlyCompletionTime) {
      setTimeChartData(processTimeData(studentData.monthlyCompletionTime)); // Xử lý và cập nhật dữ liệu thời gian hoàn thành
    }
  }, [studentData]);

  // Xử lý dữ liệu điểm số để phù hợp với biểu đồ
  const processScoreData = (monthlyData) =>
    Object.keys(monthlyData).map((month) => ({
      month,
      Average: monthlyData[month][0],
      Min: monthlyData[month][1],
      Max: monthlyData[month][2],
    }));

  // Xử lý dữ liệu thời gian hoàn thành để phù hợp với biểu đồ
  const processTimeData = (monthlyData) =>
    Object.keys(monthlyData).map((month) => ({
      month,
      Average: monthlyData[month],
    }));

  // Phân tích xu hướng điểm số
  const scoreTrendAnalysis = () => {
    if (scoresChartData.length > 1) {
      const trend =
        scoresChartData[scoresChartData.length - 1].Average >=
        scoresChartData[0].Average
          ? "is improving"
          : "is decreasing";
      return `-> Score trend ${trend}.`;
    }
    return "Not enough data to determine trends.";
  };

  // Tìm điểm số cao nhất và thấp nhất
  const findHighsLows = () => {
    if (scoresChartData.length > 1) {
      const maxScore = Math.max(...scoresChartData.map((data) => data.Max));
      const minScore = Math.min(...scoresChartData.map((data) => data.Min));
      const maxMonth = scoresChartData.find(
        (data) => data.Max === maxScore
      ).month;
      const minMonth = scoresChartData.find(
        (data) => data.Min === minScore
      ).month;
      return `-> The highest score was in ${maxMonth} with (${maxScore}) points, and the lowest was in ${minMonth} with (${minScore}) points.`;
    }
    return "Not enough data to determine high and low scores.";
  };

  // So sánh tiến độ dựa trên dữ liệu điểm số và thời gian hoàn thành
  const compareProgress = () => {
    if (scoresChartData.length > 1 && timeChartData.length > 1) {
      const startScore = scoresChartData[0].Average;
      const endScore = scoresChartData[scoresChartData.length - 1].Average;
      const startTime = timeChartData[0].Average;
      const endTime = timeChartData[timeChartData.length - 1].Average;
      return `-> Improve word scores from ${startScore} to ${endScore} points, and from ${startTime} seconds to ${endTime} seconds.`;
    }
    return "Insufficient data for comparative analysis.";
  };

  return (
    <div className="evaluater">
      <h2>Evaluate</h2>
      {/* Hiển thị các biểu đồ nếu có dữ liệu */}
      {studentData ? (
        <div className="charts">
          {/* Biểu đồ điểm số */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={scoresChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average" fill="#8884d8" />
              <Bar dataKey="Min" fill="#82ca9d" />
              <Bar dataKey="Max" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
          {/* Biểu đồ thời gian hoàn thành */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={timeChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{
                  value: "Second",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading...</p> // Hiển thị khi dữ liệu đang được tải
      )}
      {/* Phân tích hiệu suất */}
      <div className="feedback">
        <h2>Performance Analysis</h2>
        <p>{scoreTrendAnalysis()}</p>
        <p>{findHighsLows()}</p>
        <p>{compareProgress()}</p>
      </div>
    </div>
  );
};

export default Evaluater; // Xuất thành phần để có thể sử dụng ở nơi khác
