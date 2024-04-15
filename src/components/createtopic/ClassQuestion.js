import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import TopicInterface from "../../Page/TopicInterface";
import "./ClassQuestion.css";
// import Modal from "react-modal";

export default function ClassQuestion() {
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [chooseClass, setChooseClass] = useState();
  // const [chapterTopics, setChapterTopics] = useState({});
  const [questionCount, setQuestionCount] = useState(1); // Default value
  const [listClass, setListClass] = useState([]);
  const [listChapter, setListChapter] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const navigate = useNavigate();
  const [examQuestions, setExamQuestions] = useState([]); // State để lưu nội dung đề thi
  const [showExamView, setShowExamView] = useState(false);
  // const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getClass();
  }, []);
  const getClass = async () => {
    try {
      const response = await apiClient.get("/class");
      setListClass(response);
    } catch (error) {}
  };
  const getChapter = async (classId) => {
    try {
      const response = await apiClient.get(`/chapter?class_id=${classId}`);
      setListChapter(response);
    } catch (error) {}
  };
  const getTopic = async (chapter_id) => {
    try {
      const response = await apiClient.get(`/topic?chapter_id=${chapter_id}`);
      let newList = listTopic;
      const index = newList.findIndex(
        (item) => Object.keys(item)[0] === chapter_id
      );
      if (index === -1) {
        setListTopic([...newList, { [chapter_id]: response }]);
      }
    } catch (error) {}
  };

  // const handleSelectAll = () => {
  //   const newSelectAll = !selectAll;
  //   setSelectAll(newSelectAll);

  //   if (newSelectAll) {
  //     // Chọn tất cả các chapter và topic
  //     const allChapters = listChapter.map((chapter) => chapter.id);
  //     const allTopics = listTopic.reduce((acc, topicList) => {
  //       const topics = Object.values(topicList).flat();
  //       return [...acc, ...topics.map((topic) => topic.id)];
  //     }, []);
  //     setSelectedChapters(allChapters);
  //     setSelectedTopic(allTopics);
  //   } else {
  //     // Bỏ chọn tất cả
  //     setSelectedChapters([]);
  //     setSelectedTopic([]);
  //   }
  // };

  const handleChapterChange = (e) => {
    if (e.target.checked) {
      setSelectedChapters([...selectedChapters, e.target.value]);
      getTopic(e.target.value);
      console.log("chapter>>>", selectedChapters);
    } else {
      let newList = listTopic;
      let newListChapter = selectedChapters;
      const index = newList.findIndex(
        (item) => Object.keys(item)[0] === e.target.value
      );
      const indexChapter = newListChapter.findIndex(
        (item) => item === e.target.value
      );
      if (indexChapter !== -1) {
        setSelectedChapters(
          newListChapter.filter((item) => item !== e.target.value)
        );
      }
      if (index !== -1) {
        setListTopic(
          newList.filter((item) => Object.keys(item)[0] !== e.target.value)
        );
      }
    }
  };
  const handleTopicChange = (e) => {
    if (e.target.checked) {
      setSelectedTopic([...selectedTopic, e.target.value]);
      console.log("topic>>>", selectedTopic);
    } else {
      let newListTopic = selectedTopic;

      const indexChapter = newListTopic.findIndex(
        (item) => item === e.target.value
      );
      if (indexChapter !== -1) {
        setSelectedTopic(
          newListTopic.filter((item) => item !== e.target.value)
        );
        console.log(selectedTopic);
      }
    }
  };

  const handleClassChange = async (event) => {
    if (listClass.length !== 0) {
      getChapter(event.target.value);
      setChooseClass(event.target.value);
      setSelectedChapters([]);
      setSelectedTopic([]);
    }
  };
  const handleQuestionCountChange = (event) => {
    setQuestionCount(parseInt(event.target.value));
  };

  const handleCreateExam = async () => {
    try {
      const response = await apiClient.post(`/generate-questions`, {
        class_ids: [chooseClass],
        topic_ids: selectedTopic,
        chapter_ids: selectedChapters,
        num_questions: questionCount,
      });
      if (response && response.question) {
        toast.success("Create exam successful!");
        setExamQuestions(response.question); // Cập nhật nội dung đề
        setShowExamView(true);
        console.log("Exam questions:", response.question);
      } else {
        console.error("Invalid response format:", response);
        toast.error("Error creating exam: Invalid response format");
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error(error.response?.data?.message || "Error creating exam");
    }
  };
  return (
    <div className="class-question-container">
      <form className="exam-builder-form">
        <h1 className="exam-builder-title">Exam Builder</h1>
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="class-select" className="form-label">
              Select Class:
            </label>
            <select
              id="class-select"
              className="form-select"
              onChange={handleClassChange}
            >
              <option value="">-- Select Class --</option>
              {listClass.map((classes) => (
                <option key={classes.id} value={classes.id}>
                  Grade {classes.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="question-count" className="form-label">
              Total Questions:
            </label>
            <input
              id="question-count"
              className="form-input"
              type="number"
              min={1}
              max={100}
              value={questionCount}
              onChange={handleQuestionCountChange}
            />
          </div>
          {/* <button type="button" onClick={handleSelectAll}>
            {selectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
          </button> */}
        </div>
        <div className="chapter-selection">
          {listChapter.map((chapter) => (
            <div key={chapter.id} className="chapter-item">
              <label className="checkbox-container">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  value={chapter.id}
                  onChange={(e) => handleChapterChange(e, chapter.id)}
                  // checked={selectedChapters.includes(chapter.id)}
                />

                <span className="checkbox-label"> {chapter.name}</span>
              </label>

              <div className="topic-selection">
                {listTopic.map(
                  (topic) =>
                    topic[chapter.id] &&
                    topic[chapter.id].map((item) => (
                      <label key={item.id} className="checkbox-container">
                        <input
                          className="checkbox-input"
                          type="checkbox"
                          value={item.id}
                          onChange={handleTopicChange}
                          // checked={selectedTopic.includes(item.id)}
                        />
                        {item.name}
                      </label>
                    ))
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button
            type="button"
            className="btn-generate-exam"
            onClick={handleCreateExam}
          >
            Generate Exam
          </button>
        </div>
      </form>
    </div>
  );
}
