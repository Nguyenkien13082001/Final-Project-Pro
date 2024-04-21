import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LearningProcess.css";
import { BsCheckCircleFill, BsClockFill } from "react-icons/bs";

const StatusIcon = ({ status }) => {
  if (status === "Done")
    return <BsCheckCircleFill className="status-icon done" />;
  if (status === "In Progress")
    return <BsClockFill className="status-icon in-progress" />;
};

export default function LearningProcess() {
  // Dữ liệu giả cho Mock Exams và Practice Sessions
  const mockExamsData = [
    {
      title: "Mock Exam 1",
      status: "Done",
      score: 80,
      correctCount: 20,
      incorrectCount: 5,
      unansweredCount: 0,
    },
    {
      title: "Mock Exam 2",
      status: "In Progress",
      score: null,
      correctCount: 10,
      incorrectCount: 2,
      unansweredCount: 3,
    },
    // ... thêm dữ liệu giả định
  ];

  const practiceSessionsData = [
    {
      title: "Practice Session 1",
      status: "Done",
      score: 90,
      correctCount: 18,
      incorrectCount: 2,
      unansweredCount: 0,
    },
    {
      title: "Practice Session 2",
      status: "In Progress",
      score: 75,
      correctCount: 15,
      incorrectCount: 5,
      unansweredCount: 0,
    },
    // ... thêm dữ liệu giả định
  ];

  return (
    <div className="learning-process-container">
      <h1>Learning Process Overview</h1>
      <div className="mock-exams">
        <h2>Mock Exams</h2>
        {mockExamsData.map((exam, index) => (
          <div key={index} className="exam-session">
            <h3>{exam.title}</h3>
            <div className="status">
              <StatusIcon status={exam.status} />
              <p style={{ fontWeight: "600" }}>Status: {exam.status}</p>
            </div>
            <div className="cssp">
              {exam.score !== null && <p>Score: {exam.score}%</p>}
              <p>Correct: {exam.correctCount}</p>
              <p>Incorrect: {exam.incorrectCount}</p>
              <p>Unanswered: {exam.unansweredCount}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="practice-sessions">
        <h2>Practice Sessions</h2>
        {practiceSessionsData.map((session, index) => (
          <div key={index} className="exam-session">
            <h3>{session.title}</h3>
            <div className="status">
              <StatusIcon status={session.status} />
              <p style={{ fontWeight: "600" }}>Status: {session.status}</p>
            </div>
            <div className="cssp">
              {session.score !== null && <p>Score: {session.score}%</p>}
              <p>Correct: {session.correctCount}</p>
              <p>Incorrect: {session.incorrectCount}</p>
              <p>Unanswered: {session.unansweredCount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
