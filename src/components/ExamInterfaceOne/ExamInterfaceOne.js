import React, { useState, useEffect } from "react";
import "./ExamInterfaceOne.css";
import apiClient from "../../api/apiClient";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Link, useNavigate } from "react-router-dom";
import { set } from "date-fns";

const ExamInterfaceOne = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  // const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [showExplaination, setShowExplaination] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { exam_id } = useParams();
  const [exam_type, setExamType] = useState("M");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isselected, setIsSelected] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowExplaination(false);
  };
  const [score, setScore] = useState(0);

  const config = {
    loader: { load: ["input/asciimath"] }, //mathjax config
  };

  const getQuestions = async (exam_id) => {
    console.log("getQuestions is called");
    try {
      const response = await apiClient.get(`api/get_exam?exam_id=${exam_id}`);
      // assign response to questions
      setQuestions(response);
      setCorrectAnswers(Array(response.length).fill(null));
      setIsSelected(Array(response.length).fill(false));
      setAnswers(Array(response.length).fill(""));
      console.log("abs<>", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const exam_type = async () => {
      try {
        const response = await apiClient.get(`api/get_exam_type/${exam_id}`);
        setExamType(response.exam_type);
      } catch (error) {
        console.log(error);
      }
    };
    exam_type();
  }, [exam_id]);

  useEffect(() => {
    console.log("useEffect is called");
    getQuestions(exam_id);
    // getAnswers(exam_id);
  }, [exam_id]);

  const checkAnswer = async (question_id, index) => {
    console.log(isselected[index]);

    try {
      const response = await apiClient.get(
        `api/check_answer?question_id=${question_id}`
      );
      console.log("absáneer<>", response.correct);
      // assign response to questions
      const newCorrectAnswers = [...correctAnswers];
      newCorrectAnswers[index] = response.correct;
      setCorrectAnswers(newCorrectAnswers);
      const newIsSelected = [...isselected];
      newIsSelected[index] = true;
      setIsSelected(newIsSelected);
      setColor(color === "" ? "green" : "red");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Assuming 40 minutes for an exam, converting minutes to seconds
    const examDuration = 40 * 60; // 40 minutes in seconds

    if (exam_type === "M") {
      setTimer(examDuration); // Set for countdown
      setTimeElapsed(0); // Reset time elapsed for new session
    } else if (exam_type === "P") {
      setTimer(0); // Start from zero for practice
      setTimeElapsed(0); // Reset time elapsed for new session
    }
  }, [exam_type]); // This effect runs when exam_type changes

  useEffect(() => {
    let timerId;
    if (isRunning) {
      if (exam_type === "M") {
        timerId = setInterval(() => {
          setTimer((t) => Math.max(t - 1, 0)); // Ensure timer does not go below 0
          setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);
      } else if (exam_type === "P") {
        timerId = setInterval(() => {
          setTimer((t) => t + 1);
          setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);
      }
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isRunning, exam_type]);

  // useEffect(() => {
  //   let interval;

  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTimeElapsed((prevTime) => prevTime + 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // }, [isRunning]);

  const handleNextQuestion = () => {
    setShowExplaination(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    setShowExplaination(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const togglePause = () => {
    // setIsPaused(!isPaused);
    setIsRunning(!isRunning);
  };

  const toggleExplanation = () => {
    setShowExplaination(!showExplaination);
  };

  const handleSubmitExam = async () => {
    // Kiểm tra xem tất cả câu hỏi đã được trả lời hay chưa
    const allAnswered =
      answers.length === questions.length &&
      answers.every((answer) => answer !== "");

    if (!allAnswered) {
      // Nếu chưa trả lời hết, hiển thị thông báo xác nhận
      const confirmSubmit = window.confirm(
        "You have not completed all the questions. Are you sure you want to submit your assignment?"
      );
      if (!confirmSubmit) {
        return; // Nếu người dùng chọn không nộp, hủy hàm
      }
    } else {
      // Nếu đã trả lời hết, hiển thị thông báo xác nhận khác
      const confirmSubmit = window.confirm(
        "Are you sure you want to submit your assignment?"
      );
      if (!confirmSubmit) {
        return; // Nếu người dùng chọn không nộp, hủy hàm
      }
    }

    try {
      const response = await apiClient.post("/api/submit_exam", {
        exam_id: exam_id,
        time_elapsed: timeElapsed,
        user_choices: answers.map((answer, index) => ({
          question_id: questions[index].question_id,
          user_choice: answer,
        })),
      });
      console.log("Exam submitted successfully:", response);
      navigate(`/PracticeResults/${exam_id}`, { replace: true });
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? If you exit, your test will not be saved"
    );
    if (confirmExit) {
      navigate("/", { replace: true });
    }
  };

  return (
    <MathJaxContext config={config}>
      <div className="exam-interface-container">
        <div key={currentQuestionIndex} className="exam-interface">
          <div className="timer">
            {/* Thời gian còn lại: {Math.floor(timer / 60)}:{timer % 60} */}
            {/* <h3>Time: {formatTime(timeElapsed)}</h3> */}
            Time: {formatTime(timer)}
          </div>
          <MathJax dynamic>
            <div className="question-progress">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="question">
              {questions.length > 0 && questions[currentQuestionIndex] ? (
                <>
                  <h3>{questions[currentQuestionIndex].question}</h3>

                  {exam_type === "P" ? (
                    <ul>
                      {Object.keys(
                        questions[currentQuestionIndex].answers[0]
                      ).map((key, index) => {
                        const answer =
                          questions[currentQuestionIndex].answers[0][key];
                        return (
                          <React.Fragment key={key}>
                            <li
                              style={{
                                backgroundColor: "#f3f3f3",
                                border:
                                  answers[currentQuestionIndex] === answer
                                    ? correctAnswers[currentQuestionIndex] ===
                                      answer
                                      ? "2px solid green"
                                      : "2px solid red"
                                    : correctAnswers[currentQuestionIndex] ===
                                      answer
                                    ? "2px solid green"
                                    : "none",
                              }}
                              onClick={() => {
                                if (!isselected[currentQuestionIndex]) {
                                  // Check and resume timer if paused
                                  if (!isRunning) {
                                    setIsRunning(true);
                                  }
                                  checkAnswer(
                                    questions[currentQuestionIndex].question_id,
                                    currentQuestionIndex
                                  );
                                  setAnswers((prev) => {
                                    const newAnswers = [...prev];
                                    newAnswers[currentQuestionIndex] = answer;
                                    return newAnswers;
                                  });
                                }
                              }}
                            >
                              <span className="option-letter">
                                {String.fromCharCode(65 + index)}.{" "}
                              </span>
                              {answer}
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul>
                      {Object.keys(
                        questions[currentQuestionIndex].answers[0]
                      ).map((key, index) => {
                        const answer =
                          questions[currentQuestionIndex].answers[0][key];
                        return (
                          <React.Fragment key={key}>
                            <li
                              style={{
                                backgroundColor: "#f3f3f3",
                                border:
                                  answers[currentQuestionIndex] === answer
                                    ? "2px solid green"
                                    : "none",
                              }}
                              onClick={() => {
                                if (!isRunning) {
                                  setIsRunning(true);
                                }
                                setAnswers((prev) => {
                                  const newAnswers = [...prev];
                                  newAnswers[currentQuestionIndex] = answer;
                                  return newAnswers;
                                });
                              }}
                            >
                              <span className="option-letter">
                                {String.fromCharCode(65 + index)}.{" "}
                              </span>
                              {answer}
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  )}

                  {exam_type === "P" ? (
                    <>
                      <button
                        style={{ width: "auto" }}
                        onClick={toggleExplanation}
                      >
                        {showExplaination
                          ? "Hide Explanation"
                          : "Show explanation"}
                      </button>
                      {showExplaination && (
                        <p>{questions[currentQuestionIndex].explaination}</p>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <p>No Question</p>
              )}
            </div>
          </MathJax>

          <div className="navigation">
            <button onClick={handleExit} className="submit-exam">
              Exit
            </button>
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next Question
            </button>
            <button onClick={togglePause}>
              {isRunning ? "Pause" : "Continue"}
            </button>
            <button onClick={handleSubmitExam} className="submit-exam">
              Submit
            </button>
          </div>
        </div>
        <div>
          <div>
            <h3>List Of Questions</h3>
          </div>
          <div className="question-list">
            {/* Danh sách câu hỏi */}
            {Array.from({ length: questions.length }, (_, i) => (
              <button
                key={i}
                style={answers[i] ? { backgroundColor: "#4caf50" } : {}}
                className={`question-list-item ${
                  currentQuestionIndex === i ? "active" : ""
                }`}
                onClick={() => jumpToQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default ExamInterfaceOne;
