import React from "react";
export default function TopicInterface({ examQuestions }) {
  return (
    <div className="exam-view">
      <h1>Đề thi</h1>
      <div className="questions-container">
        {examQuestions.map((question) => (
          <div key={question.id} className="question">
            <h3>Câu hỏi {question.id}</h3>
            <h3>{question.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
