import React from "react";
import "./PracticeResults.css"; // Sử dụng CSS module cho việc style tốt hơn
import { useParams } from "react-router-dom";
export default function PracticeResults() {
  // Fake data giả định
  const fakeResults = {
    score: 85,
    correctCount: 17,
    incorrectCount: 3,
    unansweredCount: 0,
    timeTaken: 1800, // giả sử thời gian là 30 phút
    questions: [
      {
        question: "What is the capital of France?",
        userAnswer: "Paris",
        correctAnswer: "Paris",
      },
      // ...thêm các câu hỏi giả định khác
    ],
  };

  // Chuyển đổi thời gian làm bài từ giây sang định dạng phút:giây
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="results-container">
      <h1 className="results-title">Exam Results</h1>
      <div className="scoreboard">
        <div className="score-item">
          <div className="score-value">{fakeResults.score}/100</div>
          <div className="score-label">Score</div>
        </div>
        <div className="score-item">
          <div className="score-value">{fakeResults.correctCount}</div>
          <div className="score-label">Correct</div>
        </div>
        <div className="score-item">
          <div className="score-value">{fakeResults.incorrectCount}</div>
          <div className="score-label">Incorrect</div>
        </div>
        <div className="score-item">
          <div className="score-value">{fakeResults.unansweredCount}</div>
          <div className="score-label">Unanswered</div>
        </div>
        <div className="score-item">
          <div className="score-value">{formatTime(fakeResults.timeTaken)}</div>
          <div className="score-label">Time Taken</div>
        </div>
      </div>
      <div className="questions-results">
        {fakeResults.questions.map((question, index) => (
          <div key={index} className="question-result-item">
            <div className="question-content">
              <div className="question-text">
                Q{index + 1}: {question.question}
              </div>
              <div className="question-answers">
                <div className="user-answer">
                  Your Answer:{" "}
                  <span>{question.userAnswer || "Not answered"}</span>
                </div>
                <div className="correct-answer">
                  Correct Answer: <span>{question.correctAnswer}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
