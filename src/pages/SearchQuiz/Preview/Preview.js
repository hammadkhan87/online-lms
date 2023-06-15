import React from "react";
import "./Preview.scss";
import { useState } from "react";

const Preview = ({ lessonName, questions }) => {
  const [showAnswers, setShowAnswers] = useState(false);

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
              <button className="save-btn">Save quiz</button>
            </div>
          </div>

          {
            <div className="show-question-min">
              <p className="total-question-text">
                Total question :{questions.length}
              </p>
              <div className="question-btns">
                <label className="correct-ans">
                  <input
                    type="checkbox"
                    checked={showCorrectAnswers}
                    onChange={handleShowCorrectAnswers}
                  />
                  Correct Answers
                </label>
                <div className="selection-div">
                  <button className="btn-allselect" onClick={handleSelectAll}>
                    Select All
                  </button>
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

                    <ul style={{ display: "flex" , }}>
                      {innerArray.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          style={{
                            margin: "5px",
                             textAlign:"center",
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
                              style={{ borderRadius: "7px", marginTop :"10px"}}
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
                    <label
                    style={{fontSize:"14px",textAlign:"center"}}
                    >
                      <input
                        style={{marginRight:"5px"}}
                        type="checkbox"
                        checked={selectedItems.includes(innerArray)}
                        onChange={() => handleSelectItem(innerArray)}
                      />
                      Select 
                    </label>
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
