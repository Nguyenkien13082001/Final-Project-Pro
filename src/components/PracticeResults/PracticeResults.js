import React from "react";
import "./PracticeResults.css"; // Sử dụng CSS module cho việc style tốt hơn
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { MathJax, MathJaxContext } from "better-react-mathjax";
export default function PracticeResults() {
  const { exam_id } = useParams();
  const [results, setResults] = useState(null);
  const config = {
    loader: { load: ["input/asciimath"] }, //mathjax config
  };
  // Fake data giả định
  // const fakeResults = {
  //   score: 85,
  //   correctCount: 17,
  //   incorrectCount: 3,
  //   unansweredCount: 0,
  //   timeTaken: 1800, // giả sử thời gian là 30 phút
  //   questions: [
  //     {
  //       question: "What is the capital of France?",
  //       userAnswer: "Paris",
  //       correctAnswer: "Paris",
  //     },
  //     // ...thêm các câu hỏi giả định khác
  //   ],
  // };

  // Chuyển đổi thời gian làm bài từ giây sang định dạng phút:giây
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const fetchExamResults = async () => {
    try {
      const response = await apiClient.get(
        `/api/get_exam_result?exam_id=${exam_id}`
      );
      setResults(response);
      console.log("Exam results:", response);
    } catch (error) {
      console.error("Error fetching exam results:", error);
    }
  };
  //gọi api lấy ra kết quả bài thi
  useEffect(() => {
    fetchExamResults();
  }, [exam_id]);

  return (
    results && (
      <MathJaxContext config={config}>
        <MathJax dynamic>
          <div className="results-container">
            <h1 className="results-title">Exam Results</h1>
            <div className="scoreboard">
              <div className="score-item">
                <div className="score-value">{results.score}/100</div>
                <div className="score-label">Score</div>
              </div>
              <div className="score-item">
                <div className="score-value">{results.correct_count}</div>
                <div className="score-label">Correct</div>
              </div>
              <div className="score-item">
                <div className="score-value">{results.incorrect_count}</div>
                <div className="score-label">Incorrect</div>
              </div>
              <div className="score-item">
                <div className="score-value">{results.unanswer_count}</div>
                <div className="score-label">Unanswered</div>
              </div>
              <div className="score-item">
                <div className="score-value">
                  {formatTime(results.time_taken)}
                </div>
                <div className="score-label">Time Taken</div>
              </div>
            </div>
            <div className="questions-results">
              {results.detail.map((question, index) => (
                <div
                  style={{
                    borderLeft:
                      question.user_choice === question.correct
                        ? "4px solid #4ae263"
                        : "4px solid red",
                  }}
                  key={index}
                  className="question-result-item"
                >
                  <div className="question-content">
                    <div className="question-text">
                      Q{index + 1}: {question.question}
                    </div>
                    <div className="question-answers">
                      <div className="user-answer">
                        Your Answer:{" "}
                        <span>{question.user_choice || "Not answered"}</span>
                      </div>
                      <div className="correct-answer">
                        Correct Answer: <span>{question.correct}</span>
                      </div>
                      <div className="correct-answer">
                        Expaination: <span>{question.explaination}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MathJax>
      </MathJaxContext>
    )
  );
}
