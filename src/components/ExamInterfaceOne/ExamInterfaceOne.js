import React, { useState, useEffect } from "react";
import "./ExamInterfaceOne.css";
import apiClient from "../../api/apiClient";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Link, useNavigate } from "react-router-dom";

const ExamInterfaceOne = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [timer, setTimer] = useState(300); // Thời gian thi là 5 phút
  const [timeElapsed, setTimeElapsed] = useState(0);
  // const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [showExplaination, setShowExplaination] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const { exam_id } = useParams();
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
      setAnswers(Array(response.length).fill(null));
      console.log("abs<>", response);
    } catch (error) {
      console.log(error);
    }
  };

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

  // useEffect(() => {
  //   console.log("Timer effect");
  //   if (!isPaused) {
  //     const timerId = setInterval(() => {
  //       setTimer((t) => t - 1);
  //     }, 1000);
  //     return () => clearInterval(timerId);
  //   }
  // }, [isPaused]);
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

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
    try {
      const response = await apiClient.post("/api/submit_exam", {
        exam_id: exam_id,
        time_elapsed: timeElapsed,
        exam_result: {
          question_id: questions.map((question) => question.question_id),
          user_choice: answers,
        },
      });
      console.log("Exam submitted successfully:", response.data);
      // Sau khi submit thành công, bạn có thể chuyển hướng người dùng đến trang kết quả
      navigate(`/PracticeResults/${exam_id}`, {
        replace: true,
      });
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

  return (
    <MathJaxContext config={config}>
      <div className="exam-interface-container">
        <div key={currentQuestionIndex} className="exam-interface">
          <div className="timer">
            {/* Thời gian còn lại: {Math.floor(timer / 60)}:{timer % 60} */}
            <h3>Time: {formatTime(timeElapsed)}</h3>
          </div>
          <MathJax dynamic>
            <div className="question-progress">
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="question">
              {questions.length > 0 && questions[currentQuestionIndex] ? (
                <>
                  <h3>{questions[currentQuestionIndex].question}</h3>
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
                  <button style={{ width: "auto" }} onClick={toggleExplanation}>
                    {showExplaination ? "Show Explanation" : "Hide explanation"}
                  </button>
                  {showExplaination && (
                    <p>{questions[currentQuestionIndex].explaination}</p>
                  )}
                </>
              ) : (
                <p>No Question</p>
              )}
            </div>
          </MathJax>

          <div className="navigation">
            <button onClick={handleSubmitExam} className="submit-exam">
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
