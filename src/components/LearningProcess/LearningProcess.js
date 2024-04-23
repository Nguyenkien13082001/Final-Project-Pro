import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LearningProcess.css";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";

const StatusIcon = ({ status }) => {
  if (status === "Completed")
    return <BsCheckCircleFill className="status-icon done" />;
  if (status === "Inprogress")
    return <BsClockFill className="status-icon in-progress" />;
};

export default function LearningProcess() {
  // Dữ liệu giả cho Mock Exams và Practice Sessions

  // const mockExamsData = [
  //   {
  //     title: "Mock Exam 1",
  //     status: "Submited",
  //     score: 80,
  //     correctCount: 20,
  //     incorrectCount: 5,
  //     unansweredCount: 0,
  //   },
  //   {
  //     title: "Mock Exam 2",
  //     status: "Submited",
  //     score: null,
  //     correctCount: 10,
  //     incorrectCount: 2,
  //     unansweredCount: 3,
  //   },
  //   // ... thêm dữ liệu giả định
  // ];

  // const practiceSessionsData = [
  //   {
  //     title: "Practice Session 1",
  //     status: "Submited",
  //     score: 90,
  //     correctCount: 18,
  //     incorrectCount: 2,
  //     unansweredCount: 0,
  //   },
  //   {
  //     title: "Practice Session 2",
  //     status: "Submited",
  //     score: 75,
  //     correctCount: 15,
  //     incorrectCount: 5,
  //     unansweredCount: 0,
  //   },
  //   // ... thêm dữ liệu giả định
  // ];
  const [mockExamsData, setMockExamsData] = useState([]);
  const [practiceSessionsData, setPracticeSessionsData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchMockExamsData = async () => {
      try {
        const response = await apiClient.get(
          "/api/get_exam_result_by_user?type=M"
        );
        setMockExamsData(response);
      } catch (error) {
        console.error("Error fetching mock exams data:", error);
      }
    };
    const fetchPracticeSessionsData = async () => {
      try {
        const response = await apiClient.get(
          "/api/get_exam_result_by_user?type=P"
        );
        setPracticeSessionsData(response);
      } catch (error) {
        console.error("Error fetching practice sessions data:", error);
      }
    };
    fetchPracticeSessionsData();
    fetchMockExamsData();
  }, []);

  return (
    <div className="learning-process-container">
      <h1>Learning Process Overview</h1>
      <div className="mock-exams">
        <h2>Mock Exams </h2>
        {mockExamsData.map((exam, index) => (
          <div
            onClick={() => {
              if (exam.status === "Inprogress") {
                Navigate(`/creattopic/TopicInterface/${exam.exam_id}`);
              } else if (exam.status === "Completed") {
                Navigate(`/PracticeResults/${exam.exam_id}`);
              }
            }}
            key={index}
            className="exam-session"
          >
            <h3> Mock Exams {index + 1}</h3>
            <div className="status">
              <StatusIcon status={exam.status} />
              <p style={{ fontWeight: "600" }}>Status: {exam.status}</p>
            </div>
            <div className="cssp">
              {exam.score !== null && <p>Score: {exam.score}/100</p>}
              <p>Correct: {exam.correct_count}</p>
              <p>Incorrect: {exam.incorrect_count}</p>
              <p>Unanswered: {exam.unanswered_count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="practice-sessions">
        <h2>Practice Sessions</h2>
        {practiceSessionsData.map((practice, index) => (
          <div
            onClick={() => {
              if (practice.status === "Inprogress") {
                Navigate(`/creattopic/TopicInterface/${practice.exam_id}`);
              } else if (practice.status === "Completed") {
                Navigate(`/PracticeResults/${practice.exam_id}`);
              }
            }}
            key={index}
            className="exam-session"
          >
            <h3>Practice: {index + 1}</h3>
            <div className="status">
              <StatusIcon status={practice.status} />
              <p style={{ fontWeight: "600" }}>Status: {practice.status}</p>
            </div>
            <div className="cssp">
              {practice.score !== null && <p>Score: {practice.score}/100</p>}
              <p>Correct: {practice.correct_count}</p>
              <p>Incorrect: {practice.incorrect_count}</p>
              <p>Unanswered: {practice.unanswered_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
