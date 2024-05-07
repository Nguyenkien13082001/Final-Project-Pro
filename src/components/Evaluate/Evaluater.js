import React, { useEffect, useState } from "react";
import "./Evaluater.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../../api/apiClient";

const Evaluater = () => {
  const [studentData, setStudentData] = useState([]);
  const [scoresChartData, setScoresChartData] = useState([]);
  const [timeChartData, setTimeChartData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await apiClient.get("/api/get_count_exams");
        setStudentData(response);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentData && studentData.monthlyScores) {
      setScoresChartData(processScoreData(studentData.monthlyScores));
    }
    if (studentData && studentData.monthlyCompletionTime) {
      setTimeChartData(processTimeData(studentData.monthlyCompletionTime));
    }
  }, [studentData]);

  const processScoreData = (monthlyData) =>
    Object.keys(monthlyData).map((month) => ({
      month,
      Average: monthlyData[month][0],
      Min: monthlyData[month][1],
      Max: monthlyData[month][2],
    }));

  const processTimeData = (monthlyData) =>
    Object.keys(monthlyData).map((month) => ({
      month,
      Average: monthlyData[month],
    }));

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
      return `-> The highest score was in  ${maxMonth} with (${maxScore}) points, and the lowest was in ${minMonth} with (${minScore}) points.`;
    }
    return "Not enough data to determine high and low scores.";
  };

  const compareProgress = () => {
    if (scoresChartData.length > 1 && timeChartData.length > 1) {
      const startScore = scoresChartData[0].Average;
      const endScore = scoresChartData[scoresChartData.length - 1].Average;
      const startTime = timeChartData[0].Average;
      const endTime = timeChartData[timeChartData.length - 1].Average;
      return `-> Improve word scores ${startScore} to ${endScore} points, and from ${startTime} seconds to ${endTime} seconds.`;
    }
    return "Insufficient data for comparative analysis.";
  };

  return (
    <div className="evaluater">
      <div>
        <h1>Evaluate</h1>
      </div>
      {studentData ? (
        <div className="charts">
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
        <p>Loading...</p>
      )}
      <div className="feedback">
        <h2>Performance Analysis</h2>
        <p>{scoreTrendAnalysis()}</p>
        <p>{findHighsLows()}</p>
        <p>{compareProgress()}</p>
      </div>
    </div>
  );
};

export default Evaluater;
