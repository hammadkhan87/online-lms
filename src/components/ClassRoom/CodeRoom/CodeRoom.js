import { useEffect, useState } from "react";
import { db, auth, firebaseConfig } from "../../../firebase";
import { FaSearch } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { MdGrade } from "react-icons/md";
import { useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import { LuCopy } from "react-icons/lu";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./CodeRoom.scss";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { toast } from "react-hot-toast";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const CodeRoom = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const [quiziz, setQuiziz] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [lessons, setLessons] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const localData = localStorage.getItem("userData");
  const id = localData ? JSON.parse(localData).userId : null;

  const fetchLessons = async () => {
    const lessonSnapshot = await firebase
      .firestore()
      .collection("DynamicQuiz")
      .where("quizType", "in", ["self", "public"])
      .get();

    const searchedLessons = lessonSnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((lesson) => {
        const gradeMatch =
          selectedGrades.length === 0 || selectedGrades.includes(lesson.grade);
        const subjectMatch =
          selectedSubjects.length === 0 ||
          selectedSubjects.includes(lesson.subject);
        const nameMatch = lesson.lessonName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return gradeMatch && subjectMatch && nameMatch;
      });

    setLessons(searchedLessons);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchedQuiziz = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setQuiziz(newData);
  };

  useEffect(() => {
    fetchedQuiziz("DynamicQuiz");
  }, []);

  useEffect(() => {
    if (searchTerm?.length > 2) {
      fetchLessons();
    }
  }, [searchTerm, selectedGrades, selectedSubjects]);

  const copyLessonId = (lessonId) => {
    // Copy the lesson ID to the clipboard
    navigator.clipboard.writeText(lessonId)
    .then(() => {
        toast.success("Lesson ID copied to clipboard:", lessonId);
        console.log("Lesson ID copied to clipboard:", lessonId);
        // Handle success or show a notification
      })
      .catch((error) => {
        console.error("Failed to copy lesson ID:", error);
        // Handle error or show an error notification
      });
  };

  return (
    <div className="coderoom_created">
      <div className="search-bar-main">
        <div className="search-bar">
          <div className="search-input-container">
            <input
              value={searchTerm}
              type="text"
              className="search-input"
              placeholder="Search Quiz..."
              onChange={handleSearch}
            />
            <FaSearch className="search-icon" />
          </div>
          <button className="search-button" onClick={() => fetchLessons()}>
            <FaSearch className="btn-icon" />
            Search
          </button>
        </div>
      </div>
      <div className="left-side-container">
        <div className="total-results">
          <p>{lessons.length} Results</p>
        </div>

        <div className="result-container">
          {lessons.map((lesson, index) => {
            return (
              <div
                className="result-card-main"
                key={index}
              >
                <div className="div-img">
                  <img
                    src={lesson.lessonImage}
                    alt={lesson.lessonName}
                    className="lesson-img"
                  />
                </div>
                <div
                  className="coderoom_created_item_det_dots"
                  onClick={() => copyLessonId(lesson.id)}
                >
                  <div className="coderoom_gen">
                    <LuCopy className="coderoom_gen_icon" />
                  </div>
                </div>
                <div className="card-content">
                  <p className="lesson-name-text">{lesson.lessonName}</p>
                  <div className="inner-card-content">
                    <div className="text-a">
                      <FiList className="icon" />
                      <p className="text-a">
                        {" "}
                        {lesson.questions.length} Questions
                      </p>
                    </div>
                    <div className="text-a">
                      <MdGrade className="icon" /> <p>{lesson.grade} Grade</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CodeRoom;
