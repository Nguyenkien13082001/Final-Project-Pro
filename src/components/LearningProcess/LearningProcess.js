import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";
import "./LearningProcess.css";
import apiClient from "../../api/apiClient";

const StatusIcon = ({ status }) => {
  if (status === "Completed")
    return <BsCheckCircleFill className="status-icon done" />;
  if (status === "Inprogress")
    return <BsClockFill className="status-icon in-progress" />;
};

export default function LearningProcess() {
  const [mockExamsData, setMockExamsData] = useState([]);
  const [practiceSessionsData, setPracticeSessionsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMock = await apiClient.get(
          "/api/get_exam_result_by_user?type=M"
        );
        setMockExamsData(responseMock); // Sử dụng responseMock.data nếu response là một đối tượng
        const responsePractice = await apiClient.get(
          "/api/get_exam_result_by_user?type=P"
        );
        setPracticeSessionsData(responsePractice); // Sử dụng responsePractice.data nếu response là một đối tượng
      } catch (error) {
        console.error("Error fetching data:", error);
        setMockExamsData([]);
        setPracticeSessionsData([]);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (examId, status) => {
    if (status === "Inprogress") {
      navigate(`/creattopic/TopicInterface/${examId}`);
    } else if (status === "Completed") {
      navigate(`/PracticeResults/${examId}`);
    }
  };

  return (
    <div className="learning-process-container">
      <h1 className="Learning" style={{ color: " green" }}>
        Learning Process Overview
      </h1>
      <h2 style={{ color: "#007bff" }}>Mock Exams</h2>
      <table className="table">
        <thead>
          <tr className="csstr">
            <th>Exam ID</th>
            <th>Status</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Unanswered</th>
          </tr>
        </thead>
        <tbody>
          {mockExamsData.map((exam, index) => (
            <tr
              className="csstr"
              key={index}
              onClick={() => handleRowClick(exam.exam_id, exam.status)}
            >
              <td>{exam.exam_id}</td>
              <td>
                <StatusIcon status={exam.status} /> {exam.status}
              </td>
              <td>{exam.score !== null ? `${exam.score}/100` : "N/A"}</td>
              <td>{exam.correct_count}</td>
              <td>{exam.incorrect_count}</td>
              <td>{exam.unanswered_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ color: "#007bff" }}>Practice Sessions</h2>
      <table className="table">
        <thead>
          <tr className="csstr">
            <th>Practice ID</th>
            <th>Status</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Unanswered</th>
          </tr>
        </thead>
        <tbody>
          {practiceSessionsData.map((session, index) => (
            <tr
              className="csstr"
              key={index}
              onClick={() => handleRowClick(session.exam_id, session.status)}
            >
              <td>{session.exam_id}</td>
              <td>
                <StatusIcon status={session.status} /> {session.status}
              </td>
              <td>{session.score !== null ? `${session.score}/100` : "N/A"}</td>
              <td>{session.correct_count}</td>
              <td>{session.incorrect_count}</td>
              <td>{session.unanswered_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
