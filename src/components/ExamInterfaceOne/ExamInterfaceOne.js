import React, { useState, useEffect } from "react";
import "./ExamInterfaceOne.css";
import apiClient from "../../api/apiClient";
import { useParams } from "react-router-dom";

const ExamInterfaceOne = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(300); // Thời gian thi là 5 phút
  const [isPaused, setIsPaused] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
  };

  const [questions, setQuestions] = useState([]);

  const { exam_id } = useParams();
  console.log("exam_id", exam_id);

  const getQuestions = async (exam_id) => {
    console.log("getQuestions is called");
    try {
      const response = await apiClient.get(`api/get_exam?exam_id=${exam_id}`);
      // assign response to questions
      setQuestions(response);
      console.log("abs<>", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("useEffect is called");
    getQuestions(exam_id);
  }, [exam_id]); // Log để kiểm tra giá trị

  useEffect(() => {
    console.log("Timer effect");
    if (!isPaused) {
      const timerId = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isPaused]);

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const handleSubmitExam = () => {
    // Xử lý nộp bài tại đây
    alert("Bài thi đã được nộp!");
  };

  return (
    <div className="exam-interface-container">
      <div className="exam-interface">
        <div className="timer">
          Thời gian còn lại: {Math.floor(timer / 60)}:{timer % 60}
        </div>
        <div className="question-progress">
          Câu hỏi {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="question">
          {questions.length > 0 ? (
            <>
              <h3>{questions[currentQuestionIndex].question}</h3>
              <ul>
                {Object.values(questions[currentQuestionIndex].answers[0]).map(
                  (answer, index) => (
                    <li key={index}>{answer}</li>
                  )
                )}
              </ul>
              {showExplanation && (
                <p>{questions[currentQuestionIndex].explanation}</p>
              )}
              <button onClick={toggleExplanation}>
                {showExplanation ? "Ẩn Giải Thích" : "Hiện Giải Thích"}
              </button>
            </>
          ) : (
            <p>Không có câu hỏi nào</p>
          )}
        </div>

        <div className="navigation">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Câu Trước
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Câu Tiếp Theo
          </button>
          <button onClick={togglePause}>
            {isPaused ? "Tiếp Tục" : "Tạm Dừng"}
          </button>
          <button onClick={handleSubmitExam} className="submit-exam">
            Nộp Bài
          </button>
        </div>
      </div>
      <div>
        <div>
          <h3>Danh Sách Câu Hỏi</h3>
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
  );
};

export default ExamInterfaceOne;

// import React, { useState, useEffect } from "react";
// import "./ExamInterfaceOne.css";
// function ExamInterfaceOne() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(300); // Thời gian thi là 5 phút
//   const [isPaused, setIsPaused] = useState(false);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const jumpToQuestion = (index) => {
//     setCurrentQuestionIndex(index);
//     setShowExplanation(false);
//   };

//   const questions = [
//     {
//       question: "Câu hỏi 1: Đây là câu hỏi 1?",
//       choices: ["A", "B", "C", "D"],
//       answer: "A",
//       explanation: "Giải thích cho câu 1",
//     },
//     {
//       question: "Câu hỏi 2",
//       choices: ["A", "B", "C", "D"],
//       answer: "B",
//       explanation: "Giải thích cho câu 2",
//     },

//     {
//       question: "Câu hỏi 3: Đây là câu hỏi 3?",
//       choices: ["A", "B", "C", "D"],
//       answer: "B",
//       explanation: "Giải thích cho câu 2",
//     },
//     // Thêm các câu hỏi khác tương tự
//   ];

//   useEffect(() => {
//     if (!isPaused) {
//       const timerId = setInterval(() => {
//         setTimer((t) => t - 1);
//       }, 1000);
//       return () => clearInterval(timerId);
//     }
//   }, [isPaused]);

//   const handleNextQuestion = () => {
//     setShowExplanation(false);
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevQuestion = () => {
//     setShowExplanation(false);
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const togglePause = () => {
//     setIsPaused(!isPaused);
//   };

//   const toggleExplanation = () => {
//     setShowExplanation(!showExplanation);
//   };

//   const handleSubmitExam = () => {
//     // Xử lý nộp bài tại đây
//     alert("Bài thi đã được nộp!");
//   };

//   return (
//     <div className="exam-interface-container">
//       <div className="exam-interface">
//         <div className="timer">
//           Thời gian còn lại: {Math.floor(timer / 60)}:{timer % 60}
//         </div>
//         <div className="question-progress">
//           Câu hỏi {currentQuestionIndex + 1} / {questions.length}
//         </div>
//         <div className="question">
//           <h3>{questions[currentQuestionIndex].question}</h3>
//           <ul>
//             {questions[currentQuestionIndex].choices.map((choice, index) => (
//               <li key={index}>{choice}</li>
//             ))}
//           </ul>
//           {showExplanation && (
//             <p>{questions[currentQuestionIndex].explanation}</p>
//           )}
//           <button onClick={toggleExplanation}>
//             {showExplanation ? "Ẩn Giải Thích" : "Hiện Giải Thích"}
//           </button>
//         </div>

//         <div className="navigation">
//           <button
//             onClick={handlePrevQuestion}
//             disabled={currentQuestionIndex === 0}
//           >
//             Câu Trước
//           </button>
//           <button
//             onClick={handleNextQuestion}
//             disabled={currentQuestionIndex === questions.length - 1}
//           >
//             Câu Tiếp Theo
//           </button>
//           <button onClick={togglePause}>
//             {isPaused ? "Tiếp Tục" : "Tạm Dừng"}
//           </button>
//           <button onClick={handleSubmitExam} className="submit-exam">
//             Nộp Bài
//           </button>
//         </div>
//       </div>
//       <div className="question-list">
//         {Array.from({ length: 42 }, (_, i) => (
//           <button
//             key={i}
//             className={`question-list-item ${
//               currentQuestionIndex === i ? "active" : ""
//             }`}
//             onClick={() => setCurrentQuestionIndex(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExamInterfaceOne;
