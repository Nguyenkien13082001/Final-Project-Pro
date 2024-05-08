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
  // Hàm nhảy đến câu hỏi cụ thể trong danh sách câu hỏi của bài kiểm tra.
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index); // Cập nhật chỉ số câu hỏi hiện tại
    setShowExplaination(false); // Ẩn giải thích của câu hỏi trước (nếu có)
  };

  // Cấu hình cho thư viện MathJax, được sử dụng để hiển thị công thức toán học
  const config = {
    loader: { load: ["input/asciimath"] }, // Cấu hình nạp định dạng ASCII math
  };

  // Hàm bất đồng bộ để lấy các câu hỏi từ server dựa trên id của bài kiểm tra
  const getQuestions = async (exam_id) => {
    console.log("getQuestions is called");
    try {
      const response = await apiClient.get(`api/get_exam?exam_id=${exam_id}`); // Yêu cầu API để lấy dữ liệu
      // Lưu trả lời của server vào state
      setQuestions(response);
      setCorrectAnswers(Array(response.length).fill(null)); // Khởi tạo mảng câu trả lời đúng
      setIsSelected(Array(response.length).fill(false)); // Khởi tạo trạng thái lựa chọn của từng câu hỏi
      setAnswers(Array(response.length).fill("")); // Khởi tạo mảng các câu trả lời
      console.log("abs<>", response); // Ghi nhận phản hồi từ server
    } catch (error) {
      console.log(error); // Ghi nhận lỗi nếu có
    }
  };

  // useEffect để gọi hàm xử lý kiểu bài kiểm tra khi exam_id thay đổi
  useEffect(() => {
    const exam_type = async () => {
      try {
        const response = await apiClient.get(`api/get_exam_type/${exam_id}`);
        setExamType(response.exam_type); // Lưu kiểu bài kiểm tra vào state
      } catch (error) {
        console.log(error); // Ghi nhận lỗi nếu có
      }
    };
    exam_type();
  }, [exam_id]);

  // useEffect để lấy câu hỏi khi exam_id thay đổi
  useEffect(() => {
    console.log("useEffect is called"); // Ghi nhận việc gọi useEffect
    getQuestions(exam_id); // Gọi hàm lấy câu hỏi
    // getAnswers(exam_id); // Có thể gọi thêm hàm lấy câu trả lời nếu cần
  }, [exam_id]);

  // Hàm kiểm tra câu trả lời cho mỗi câu hỏi
  const checkAnswer = async (question_id, index) => {
    console.log(isselected[index]); // Ghi nhận trạng thái lựa chọn của câu hỏi

    try {
      const response = await apiClient.get(
        `api/check_answer?question_id=${question_id}`
      );
      console.log("absáneer<>", response.correct); // Ghi nhận câu trả lời đúng từ server
      // Cập nhật mảng câu trả lời đúng và trạng thái lựa chọn
      const newCorrectAnswers = [...correctAnswers];
      newCorrectAnswers[index] = response.correct;
      setCorrectAnswers(newCorrectAnswers);
      const newIsSelected = [...isselected];
      newIsSelected[index] = true;
      setIsSelected(newIsSelected);
      setColor(color === "" ? "green" : "red"); // Thay đổi màu sắc dựa trên câu trả lời
    } catch (error) {
      console.log(error); // Ghi nhận lỗi nếu có
    }
  };

  // useEffect để thiết lập thời gian làm bài và thời gian đã trôi qua
  useEffect(() => {
    // Giả định thời gian làm bài là 40 phút, chuyển đổi phút thành giây
    const examDuration = 40 * 60; // 40 phút sang giây

    if (exam_type === "M") {
      setTimer(examDuration); // Thiết lập đồng hồ đếm ngược
      setTimeElapsed(0); // Khởi tạo lại thời gian đã trôi qua
    } else if (exam_type === "P") {
      setTimer(0); // Bắt đầu từ 0 cho luyện tập
      setTimeElapsed(0); // Khởi tạo lại thời gian đã trôi qua
    }
  }, [exam_type]); // useEffect này chạy khi exam_type thay đổi

  // useEffect này xử lý việc bắt đầu, dừng và cập nhật thời gian của bài kiểm tra.
  useEffect(() => {
    let timerId; // Biến lưu id của bộ đếm thời gian để có thể hủy bộ đếm.
    if (isRunning) {
      if (exam_type === "M") {
        // Nếu là kiểu bài kiểm tra có giới hạn thời gian
        timerId = setInterval(() => {
          setTimer((t) => Math.max(t - 1, 0)); // Giảm thời gian và đảm bảo không âm
          setTimeElapsed((prevTime) => prevTime + 1); // Tăng thời gian đã trôi qua
        }, 1000); // Cập nhật mỗi giây
      } else if (exam_type === "P") {
        // Nếu là kiểu luyện tập không giới hạn thời gian
        timerId = setInterval(() => {
          setTimer((t) => t + 1); // Tăng thời gian
          setTimeElapsed((prevTime) => prevTime + 1); // Tăng thời gian đã trôi qua
        }, 1000); // Cập nhật mỗi giây
      }
    } else {
      clearInterval(timerId); // Dừng bộ đếm nếu isRunning là false
    }
    return () => clearInterval(timerId); // Dọn dẹp khi component bị hủy
  }, [isRunning, exam_type]); // Phụ thuộc vào trạng thái chạy và kiểu bài kiểm tra

  // Hàm để điều hướng đến câu hỏi tiếp theo
  const handleNextQuestion = () => {
    setShowExplaination(false); // Ẩn giải thích câu hỏi hiện tại
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Tăng chỉ số câu hỏi lên nếu chưa phải câu cuối cùng
    }
  };

  // Hàm để quay lại câu hỏi trước đó
  const handlePrevQuestion = () => {
    setShowExplaination(false); // Ẩn giải thích câu hỏi hiện tại
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Giảm chỉ số câu hỏi xuống nếu không phải câu đầu tiên
    }
  };

  // Hàm để tạm dừng hoặc tiếp tục bài kiểm tra
  const togglePause = () => {
    setIsRunning(!isRunning); // Đảo trạng thái chạy của bài kiểm tra
  };

  // Hàm để chuyển đổi trạng thái hiển thị giải thích câu hỏi
  const toggleExplanation = () => {
    setShowExplaination(!showExplaination); // Đảo trạng thái hiển thị giải thích
  };

  // Hàm để nộp bài kiểm tra
  const handleSubmitExam = async () => {
    // Kiểm tra tất cả các câu hỏi đã được trả lời hay chưa
    const allAnswered =
      answers.length === questions.length &&
      answers.every((answer) => answer !== "");

    if (!allAnswered) {
      // Hiển thị thông báo xác nhận nếu chưa trả lời hết các câu hỏi
      const confirmSubmit = window.confirm(
        "Bạn chưa hoàn thành tất cả các câu hỏi. Bạn có chắc chắn muốn nộp bài không?"
      );
      if (!confirmSubmit) {
        return; // Nếu người dùng chọn không, hủy việc nộp bài
      }
    } else {
      // Hiển thị thông báo xác nhận khác nếu đã trả lời hết các câu hỏi
      const confirmSubmit = window.confirm(
        "Bạn có chắc chắn muốn nộp bài không?"
      );
      if (!confirmSubmit) {
        return; // Nếu người dùng chọn không, hủy việc nộp bài
      }
    }

    try {
      // Gửi yêu cầu POST đến server với thông tin bài kiểm tra bao gồm id, thời gian hoàn thành và lựa chọn của người dùng
      const response = await apiClient.post("/api/submit_exam", {
        exam_id: exam_id,
        time_elapsed: timeElapsed,
        user_choices: answers.map((answer, index) => ({
          question_id: questions[index].question_id,
          user_choice: answer,
        })),
      });
      console.log("Exam submitted successfully:", response); // Ghi nhận bài kiểm tra đã được nộp thành công
      navigate(`/PracticeResults/${exam_id}`, { replace: true }); // Chuyển hướng người dùng đến trang kết quả
    } catch (error) {
      console.error("Error submitting exam:", error); // Ghi nhận lỗi nếu có trong quá trình nộp bài
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60); // Tính số phút
    const seconds = time % 60; // Lấy số giây còn lại sau khi chia cho 60
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`; // Trả về chuỗi thời gian định dạng MM:SS
  };

  // Hàm xử lý khi người dùng muốn thoát khỏi bài kiểm tra
  const handleExit = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to exit? If you exit, your test will not be saved" // Hiển thị thông báo xác nhận
    );
    if (confirmExit) {
      navigate("/", { replace: true }); // Chuyển hướng người dùng về trang chủ nếu xác nhận thoát
    }
  };

  return (
    <MathJaxContext config={config}>
      <div className="exam-interface-container">
        <div key={currentQuestionIndex} className="exam-interface">
          <div className="timer">Time: {formatTime(timer)}</div>
          <MathJax dynamic>
            <div className="navigation">
              <button onClick={handleExit} className="submit-exam">
                Exit
              </button>

              <button
                className="btnthi"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </button>

              <button
                className="btnthi"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
              </button>

              <button className="btnthi" onClick={togglePause}>
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button onClick={handleSubmitExam} className="submit-exam">
                Submit
              </button>
            </div>
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
