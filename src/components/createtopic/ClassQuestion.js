import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TopicInterface from "../../Page/TopicInterface";

export default function ClassQuestion() {
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [chooseClass, setChooseClass] = useState();
  const [chapterTopics, setChapterTopics] = useState({});
  const [questionCount, setQuestionCount] = useState(1); // Default value
  const [listClass, setListClass] = useState([]);
  const [listChapter, setListChapter] = useState([]);
  const [listTopic, setListTopic] = useState([]);
  const navigate = useNavigate();
  const [examQuestions, setExamQuestions] = useState([]); // State để lưu nội dung đề thi
  const [showExamView, setShowExamView] = useState(false);
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
        (item) => Object.keys(item)[0] == chapter_id
      );
      if (index == -1) {
        setListTopic([...newList, { [chapter_id]: response }]);
      }
    } catch (error) {}
  };

  const handleChapterChange = (e) => {
    if (e.target.checked) {
      setSelectedChapters([...selectedChapters, e.target.value]);
      getTopic(e.target.value);
    } else {
      let newList = listTopic;
      let newListChapter = selectedChapters;
      const index = newList.findIndex(
        (item) => Object.keys(item)[0] == e.target.value
      );
      const indexChapter = newListChapter.findIndex(
        (item) => item == e.target.value
      );
      if (indexChapter != -1) {
        setSelectedChapters(
          newListChapter.filter((item) => item != e.target.value)
        );
      }
      if (index != -1) {
        setListTopic(
          newList.filter((item) => Object.keys(item)[0] != e.target.value)
        );
      }
    }
  };
  const handleTopicChange = (e) => {
    if (e.target.checked) {
      setSelectedTopic([...selectedTopic, e.target.value]);
    } else {
      let newListTopic = selectedTopic;

      const indexChapter = newListTopic.findIndex(
        (item) => item == e.target.value
      );
      if (indexChapter != -1) {
        setSelectedTopic(newListTopic.filter((item) => item != e.target.value));
        console.log(selectedTopic);
      }
    }
  };

  const handleClassChange = async (event) => {
    if (listClass.length != 0) {
      getChapter(event.target.value);
      setChooseClass(event.target.value);

      // const selectedClass = event.target.value;
      // setSelectedClass(selectedClass);
      // setSelectedChapters([]); // Reset selected chapters
      // setChapterTopics({}); // Reset chapter topics
      // setQuestionCount(0); // Reset question count
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
    <div className="ClassQuestionChoose">
      <form className="form-create-exam">
        <h1 style={{ textAlign: "center" }}>Exam Builder</h1>
        <div>
          <div>
            <label>Select Class:</label>
            <select
              onChange={(e) => {
                handleClassChange(e);
              }}
            >
              <option value="">-- Select Class --</option>
              {listClass.length != 0 &&
                listClass.map((classes) => {
                  return (
                    <option value={classes.id}>grade {classes.name}</option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>Total Questions:</label>
            <input
              min={1}
              max={100}
              className="TotalQuestion"
              type="number"
              value={questionCount}
              onChange={handleQuestionCountChange}
            />
          </div>
        </div>
        {listChapter && (
          <div>
            {listChapter.map((chapter) => (
              <div key={chapter.id}>
                <input
                  className="CheckboxCss"
                  type="checkbox"
                  value={chapter.id}
                  onChange={(e) => handleChapterChange(e, chapter.id)}
                />
                {chapter.name}
                {listTopic.length != 0 &&
                  listTopic.map((topic) => {
                    if (topic[chapter.id]) {
                      return topic[chapter.id].map((item) => {
                        return (
                          <div key={item.id}>
                            <input
                              className="CheckboxCss1"
                              value={item.id}
                              type="checkbox"
                              onChange={handleTopicChange}
                            />
                            {item.name}
                          </div>
                        );
                      });
                    }
                  })}
              </div>
            ))}
          </div>
        )}
        <div className="btn-center">
          {" "}
          <button
            type="button"
            className="btn-exam"
            style={{ width: "150px" }}
            onClick={handleCreateExam}
          >
            Generate Exam
          </button>
          {showExamView && <TopicInterface examQuestions={examQuestions} />}
        </div>
      </form>
    </div>
  );
}
