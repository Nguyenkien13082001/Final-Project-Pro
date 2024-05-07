import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import TopicInterface from "../../Page/TopicInterface";
import "./ClassQuestion.css";
// import Modal from "react-modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  const [indeterminateChapters, setIndeterminateChapters] = useState(new Set());
  const [expanded, setExpanded] = useState({});
  const [selectAllChapters, setSelectAllChapters] = useState(false);

  const toggleExpanded = (chapterId) => {
    setExpanded((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  useEffect(() => {
    getClass();
  }, []);
  const getClass = async () => {
    try {
      const response = await apiClient.get("api/get_class_admin");
      setListClass(response.classes);
      console.log("List class:", response.classes);
    } catch (error) {}
  };
  const getChapter = async (classId) => {
    try {
      const chapterResponse = await apiClient.get(
        `api/get_chapter_admin?class_id=${classId}`
      );
      setListChapter(chapterResponse.chapters);
      const newExpanded = chapterResponse.chapters.reduce((acc, chapter) => {
        acc[chapter.id] = false; // Mặc định đóng
        return acc;
      }, {});
      setExpanded(newExpanded);

      // Load topic cho mỗi chapter
      chapterResponse.chapters.forEach((chapter) => {
        getTopic(chapter.id);
      });
    } catch (error) {
      console.error("Error fetching chapters:", error);
      toast.error("Failed to load chapters");
    }
  };

  const getTopic = async (chapter_id) => {
    try {
      const response = await apiClient.get(
        `/api/get_topic_admin?chapter_id=${chapter_id}`
      );
      const topics = response.topics; // Đảm bảo đây là định dạng đúng của response
      // Chỉ thêm các topic mới vào listTopic, không cần cập nhật lại nếu chapter đã có
      setListTopic((prev) => {
        const existingChapter = prev.find((topic) => topic[chapter_id]);
        if (!existingChapter) {
          return [...prev, { [chapter_id]: topics }];
        }
        return prev;
      });
      // Cập nhật selectedTopic với các topic mới không trùng lặp
      // Chỉ thêm các topic mới vào listTopic, không cập nhật trạng thái đã chọn
      setListTopic((prev) => {
        const existingChapter = prev.find((topic) => topic[chapter_id]);
        if (!existingChapter) {
          return [...prev, { [chapter_id]: topics }];
        }
        return prev;
      });
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      toast.error("Failed to load topics");
    }
  };

  const handleSelectAllChapters = () => {
    setSelectAllChapters((prevSelectAll) => {
      if (!prevSelectAll) {
        // Chọn tất cả các chapter
        const allChaptersIds = listChapter.map((chapter) => chapter.id);
        setSelectedChapters(allChaptersIds);
        // Chọn tất cả các topic thuộc mọi chapter
        const allTopicIds = listTopic.flatMap((topicList) =>
          Object.values(topicList).flatMap((chapterTopics) =>
            chapterTopics.map((topic) => topic.id.toString())
          )
        );
        setSelectedTopic(allTopicIds);
        // Đặt trạng thái expanded cho tất cả các chapter là true
        const newExpandedState = allChaptersIds.reduce(
          (acc, id) => ({ ...acc, [id]: false }),
          {}
        );
        setExpanded(newExpandedState);
        // Đặt trạng thái indeterminate cho tất cả các chapter là false
        const newIndeterminate = new Set();
        setIndeterminateChapters(newIndeterminate);
      } else {
        // Bỏ chọn tất cả các chapter và topic
        setSelectedChapters([]);
        setSelectedTopic([]);
        // Đặt trạng thái đóng mở các chapter là false
        setExpanded({});
        // Đặt trạng thái indeterminate cho tất cả các chapter là false
        const newIndeterminate = new Set();
        setIndeterminateChapters(newIndeterminate);
      }
      return !prevSelectAll; // Đảo ngược trạng thái của selectAllChapters
    });
  };

  const handleChapterChange = async (chapterId, event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Chọn tất cả các topic trong chapter này
      await getTopic(chapterId); // Đảm bảo rằng các topic được lấy và cập nhật trước khi đánh dấu chọn
      const chapterTopics =
        listTopic.find((t) => t[chapterId])?.[chapterId] || [];
      setSelectedTopic((prev) => {
        const newSelectedTopics = new Set(prev);
        chapterTopics.forEach((topic) =>
          newSelectedTopics.add(topic.id.toString())
        );
        return Array.from(newSelectedTopics);
      });
      setSelectedChapters((prev) => [...prev, chapterId]);
      setIndeterminateChapters((prev) => {
        const newIndeterminate = new Set(prev);
        newIndeterminate.delete(chapterId);
        return newIndeterminate;
      });
    } else {
      // Bỏ chọn tất cả các topic trong chapter này
      const chapterTopics =
        listTopic.find((t) => t[chapterId])?.[chapterId] || [];
      setSelectedTopic((prev) =>
        prev.filter(
          (id) => !chapterTopics.some((topic) => topic.id.toString() === id)
        )
      );
      setSelectedChapters((prev) => prev.filter((id) => id !== chapterId));
      setIndeterminateChapters((prev) => {
        const newIndeterminate = new Set(prev);
        newIndeterminate.delete(chapterId);
        return newIndeterminate;
      });
    }
  };

  const handleTopicChange = (topicId, chapterId, event) => {
    const isChecked = event.target.checked;

    setSelectedTopic((prevSelectedTopics) => {
      const updatedSelectedTopics = isChecked
        ? [...prevSelectedTopics, topicId.toString()]
        : prevSelectedTopics.filter((id) => id !== topicId.toString());

      const allTopicsInChapter =
        listTopic.find((topic) => topic[chapterId])?.[chapterId] || [];

      // Kiểm tra nếu tất cả các topic trong chapter đã được chọn
      const areAllTopicsSelected = allTopicsInChapter.every((topic) =>
        updatedSelectedTopics.includes(topic.id.toString())
      );

      // Kiểm tra nếu ít nhất một topic trong chapter đã được chọn
      const isAnyTopicSelected = allTopicsInChapter.some((topic) =>
        updatedSelectedTopics.includes(topic.id.toString())
      );

      // Cập nhật trạng thái của chương
      setSelectedChapters((prev) => {
        const newChapters = new Set(prev);
        if (areAllTopicsSelected) {
          newChapters.add(chapterId);
        } else if (isAnyTopicSelected) {
          newChapters.add(chapterId); // Giữ chapter này trong danh sách đã chọn nếu có ít nhất một topic được chọn
        } else {
          newChapters.delete(chapterId); // Xóa chapter này nếu không có topic nào được chọn
        }
        return Array.from(newChapters);
      });

      // Cập nhật indeterminate status
      setIndeterminateChapters((prev) => {
        const newIndeterminate = new Set(prev);
        if (isAnyTopicSelected && !areAllTopicsSelected) {
          newIndeterminate.add(chapterId);
        } else {
          newIndeterminate.delete(chapterId);
        }
        return newIndeterminate;
      });

      return updatedSelectedTopics;
    });
  };

  const handleClassChange = async (event) => {
    const classId = event.target.value;
    if (!classId) {
      setListChapter([]);
      setListTopic([]);
      setSelectedChapters([]);
      setSelectedTopic([]);
      setExpanded({}); // Quan trọng: Đặt lại trạng thái đóng mở của các chương
      setIndeterminateChapters(new Set());
      setSelectAllChapters(false);
      setQuestionCount(1);

      return;
    }
    setChooseClass(classId);

    if (classId) {
      getChapter(classId);
      setSelectedChapters([]);
      setSelectedTopic([]);
    }
  };
  const handleQuestionCountChange = (event) => {
    setQuestionCount(parseInt(event.target.value));
  };

  const handleCreateExam = async () => {
    try {
      const response = await apiClient.post(`/api/gen_question`, {
        class_ids: [chooseClass],
        topic_ids: selectedTopic,
        chapter_ids: selectedChapters,
        num_questions: questionCount,
      });
      if (response && response.questions_count >= questionCount) {
        // Nếu số câu hỏi trả về đủ số lượng yêu cầu
        toast.success("Create exam successful!");
        // setExamQuestions(response.questions); // Cập nhật nội dung đề
        // setShowExamView(true);

        console.log("Exam questions:", response);
        // console.log get link will direct to TopicInterface
        console.log(`TopicInterface/${response.exam_id}`);

        navigate(`/creattopic/TopicInterface/${response.exam_id}`, {
          replace: true,
        });
      } else if (response && response.questions_count < questionCount) {
        // Nếu số câu hỏi trả về ít hơn số lượng yêu cầu
        if (
          window.confirm(
            `Chỉ có ${response.questions_count} câu hỏi có sẵn. Bạn có muốn tiếp tục không?`
          )
        ) {
          toast.success("Create exam successful!");
          // setExamQuestions(response.questions); // Cập nhật nội dung đề với số câu hỏi có sẵn
          // setShowExamView(true);
          navigate(`/creattopic/TopicInterface/${response.exam_id}`, {
            replace: true,
          });
        }
      } else {
        // Trường hợp không nhận được câu hỏi nào hoặc có lỗi
        console.error("Invalid response format:", response);
        toast.error("Error creating exam: Invalid response format");
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      toast.error(error.response?.data?.message || "Error creating exam");
    }
  };

  useEffect(() => {
    // Khi danh sách chương thay đổi, kiểm tra nếu không còn chương nào và reset `selectAllChapters`
    if (listChapter.length === 0) {
      setSelectAllChapters(false);
    } else {
      // Kiểm tra nếu tất cả các chương đều được chọn
      const allChaptersSelected = listChapter.every((chapter) =>
        selectedChapters.includes(chapter.id)
      );
      setSelectAllChapters(allChaptersSelected);
    }
  }, [listChapter, selectedChapters]);

  return (
    <div className="class-question-container">
      <form className="exam-builder-form">
        <div>
          <h1 className="exam-builder-title">Exam Builder</h1>
          <div className="button-container">
            <button
              type="button"
              className="btn-generate-exam"
              onClick={handleCreateExam}
            >
              Generate Exam
            </button>
          </div>
        </div>

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
                  Class {classes.name}
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

          <div className="button-container">
            {listChapter.length > 0 &&
              chooseClass && ( // Kiểm tra cả hai điều kiện
                <button
                  type="button"
                  className="select-deselect-all-btn"
                  onClick={handleSelectAllChapters}
                >
                  {selectAllChapters
                    ? "Deselect All Chapters"
                    : "Select All Chapters"}
                </button>
              )}
            {/* Các nút và thành phần khác */}
          </div>
        </div>
        <div>
          {listChapter.map((chapter) => (
            <div key={chapter.id} className="chapter-item">
              <button
                type="button"
                className={`expand-toggle ${
                  expanded[chapter.id] ? "expanded" : ""
                }`}
                onClick={() => toggleExpanded(chapter.id)}
              >
                {/* Nút sẽ tự động hiển thị "+" hoặc "-" dựa trên class */}
              </button>
              <label className="checkbox-container">
                <Checkbox
                  checked={selectedChapters.includes(chapter.id)}
                  indeterminate={indeterminateChapters.has(chapter.id)}
                  onChange={(e) => handleChapterChange(chapter.id, e)}
                  value={chapter.id}
                />
                {chapter.name}
              </label>
              {expanded[chapter.id] && ( // Chỉ hiển thị nếu expanded[chapter.id] là true
                <div className="topic-selection">
                  {listTopic.map((topicObj) =>
                    topicObj[chapter.id]?.map((item) => (
                      <label key={item.id} className="checkbox-container">
                        <Checkbox
                          checked={selectedTopic.includes(item.id.toString())}
                          onChange={(e) =>
                            handleTopicChange(item.id, chapter.id, e)
                          }
                          value={item.id}
                        />
                        {item.name}
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
