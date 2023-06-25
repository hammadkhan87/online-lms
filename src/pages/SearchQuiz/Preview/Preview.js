import React from "react";
import "./Preview.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { auth, db, firebaseConfig } from "../../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const Preview = ({ lessonName, questions ,lessonid,chapterid,lessonimage,
  subject,
  grade,
  totalDuration,
  totalMarks}) => {
  console.log(lessonid)
  console.log(chapterid)
  const localData = localStorage.getItem("userData");
  const role = localData ? JSON.parse(localData).role : null;
  const ref_id = localData ? JSON.parse(localData).id: null;
  const [showAnswers, setShowAnswers] = useState(false);
  const [totalduration, setDuration] = useState("1.0");
  const [totalmark, setMark] = useState("1.0");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem !== item)
      );
    } else {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleShowCorrectAnswers = () => {
    setShowCorrectAnswers(!showCorrectAnswers);
  };

  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };
  const handleSelectAll = (e) => {
    e.preventDefault();
    if (selectedItems.length === questions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(questions);
    }
  };

  const storeData = async (
  ) => {
    try {

      // Create a document in the "lessons" collection

      if (
        selectedItems.length <= 0
        
      ) {
        console.log("enter complete input");
        toast.error("Select the Question");
      } else {
        const timestamp = serverTimestamp();

        const docRef = collection(db, "lessonQuiz");
        const querySnapshot = await getDocs(query(docRef));

        if (querySnapshot) {
          const docData = {
            chapterid,
            lessonName,
            lessonImage:lessonimage,
            totalMarks:totalmark*selectedItems.length,
            totalDuration:totalduration*selectedItems.length,          
            grade,
            subject,
            questions: selectedItems,
            playCounter: "",
            Folder:"Dynamic",
            role:role,
            refId:ref_id, 
            createdAt: timestamp,
          };

          const newDocRef = await addDoc(docRef, docData);
          //alert();
          toast.success("Quiz added successfully");
          console.log("Data added to Firestore");
        } else {
          //alert("Chapter already exists");
          toast.error("quiz already exists");
          console.log("Duplicate data");
        }
      }
      console.log("Data stored successfully!");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };


  const handleSaveQuiz =()=>{
    storeData();
  }

  console.log(questions);
  return (
    <div className="preview-main-container">
      {lessonName && (
        <div className="inner-preview-container">
          <div className="lesson-detail">
            <div className="lesson-name-pre">
              <p className="lesson-name-e">{lessonName}</p>
              <p className="teacher-name">teacher</p>
            </div>

            <div className="right-div">
              <button className="play-btn">Play</button>
              {(role === "Teacher" || role === "Admin") && (
                <button className="save-btn" onClick={handleSaveQuiz}>Save quiz</button>
              )}
            </div>
          </div>

          {
            <div className="show-question-min">

              <div style={{display:"flex", justifyContent:"space-around"}}>
              <p className="total-question-text">
                Total question :{questions.length}
              </p>
              <p className="total-question-text">
                Total Duration :{totalDuration}
                {(selectedItems.length > 0) && (
                <p style={{  fontSize: "14px",
                  color: "gray",
                  fontFamily: "bold"}}>New Duration :{totalduration * selectedItems.length}</p>
             
             ) }
              </p>
              <p className="total-question-text">
                Total Marks :{totalMarks}
                {(selectedItems.length > 0) && (
                <p style={{  fontSize: "14px",
                  color: "gray",
                  fontFamily: "bold"}}>New Marks :{totalmark * selectedItems.length}</p>
             
             ) }
              </p>
              </div>
              <div className="question-btns">
                <label className="correct-ans">
                  <input
                    type="checkbox"
                    checked={showCorrectAnswers}
                    onChange={handleShowCorrectAnswers}
                  />
                  Correct Answers
                </label>
                {(role === "Teacher" || role === "Admin") && (
                 <div style={{display:"flex", flexDirection:"column"}} >
                 <label htmlFor="" style={{fontSize:"12px",fontWeight:"bold", color:"gray",marginBottom:"5px" }} >Duration Per Question?</label>
                 <select
                   defaultValue={"1.0"}
                   onChange={(e) => setDuration(e.target.value)}
                   className="select"
                   required
                 >
                   <option value={"0.5"}>0.5 min</option>
                   <option value={"1.0"}>1.0 min</option>
                   <option value={"1.5"}>1.5 min</option>
                   <option value={"2.0"}>2.0 min</option>
                   <option value={"2.5"}>2.5 min</option>
                   <option value={"3.0"}>3.0 min</option>
                   <option value={"4.0"}>4.0 min</option>
                   <option value={"5.0"}>5.0 min</option>
                 </select>
               </div>  )}
               {(<div style={{display:"flex", flexDirection:"column"}}>
                  <label htmlFor="" style={{fontSize:"12px",fontWeight:"bold", color:"gray",marginBottom:"5px" }}>Marks Per Question?</label>
                  <select
                    defaultValue={"1"}
                    onChange={(e) => setMark(e.target.value)}
                    className="select"
                    required
                  >
                    <option value={"0.5"}>0.5</option>
                    <option value={"1.0"}>1.0</option>
                    <option value={"1.5"}>1.5</option>
                    <option value={"2.0"}>2.0</option>
                    <option value={"2.5"}>2.5</option>
                    <option value={"3.0"}>3.0</option>
                    <option value={"4.0"}>4.0</option>
                    <option value={"5.0"}>5.0</option>
                  </select>
                </div>         )}

               
                
                <div className="selection-div">
                {(role === "Teacher" || role === "Admin") && (
                  <button className="btn-allselect" onClick={handleSelectAll}>
                    Select All
                  </button>              )}
                  
                </div>
              </div>
              <div className="show-question-div">
                {questions.map((innerArray, index) => (
                  <div key={index}>
                    {console.log(innerArray)}
                    <p className="show-q-name">
                      Q {index + 1}:{innerArray.text}
                    </p>

                    {innerArray.image && (
                      <img
                        src={innerArray.image && innerArray.image}
                        alt="Question"
                        width="100px"
                        style={{ borderRadius: "7px" }}
                      />
                    )}

                    <ul style={{ display: "flex" }}>
                      {innerArray.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          style={{
                            margin: "5px",
                            textAlign: "center",
                            fontSize: "16px",

                            color:
                              showCorrectAnswers && option.correct
                                ? "#019267"
                                : "black",
                          }}
                        >
                          {optionIndex + 1}:{option.text}
                          {option.image && (
                            <img
                              src={option.image && option.image}
                              alt=""
                              width="100px"
                              style={{ borderRadius: "7px", marginTop: "10px" }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                    {showCorrectAnswers &&
                    innerArray.answerdetail.length > 0 ? (
                      <p style={{ fontSize: "16px", color: "red" }}>
                        Answer Explanation: {innerArray.answerdetail}
                      </p>
                    ) : (
                      ""
                    )}
                     {(role === "Teacher" || role === "Admin") && (
                 <label style={{ fontSize: "14px", textAlign: "center" }}>
                 <input
                   style={{ marginRight: "5px" }}
                   type="checkbox"
                   checked={selectedItems.includes(innerArray)}
                   onChange={() => handleSelectItem(innerArray)}
                 />
                 Select
               </label>              )}
                    
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Preview;
