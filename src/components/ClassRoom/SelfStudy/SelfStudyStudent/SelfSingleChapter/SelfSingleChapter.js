import React from "react";
import "./SelfSingleChapter.scss";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { useState } from "react";
const SelfSingleChapter = ({ element, lessons ,result}) => {
  const localData = localStorage.getItem("userData");
  const userId = localData ? JSON.parse(localData).userId : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredLessonsArray,setFilteredLessonsArray]=useState([])
  const [lessonsArrayWithResult,setLessonsArrayWithResult]=useState([])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const id = element.id;
  const filteredLessons = lessons.filter((lesson) => {
    return lesson.chapterId == id;
  });
  const filteredResult=result.filter((item)=>{
    return item.userId==userId
  })

  const newFilteredLessons=[...filteredLessons]
  // console.log(userId,"userId");
  // console.log(result,"result");
  // console.log(filteredResult,"filteredResult");
  // console.log(filteredLessons,"filteredLessons");
  newFilteredLessons.findIndex((index)=>{
    // return index.id==
  })
  // setFilteredLessonsArray(filteredLessons)
  // setLessonsArrayWithResult([...filteredLessonsArray])
  
  

  return (
    <div className="selfsinglechapter_container">
      <div className="selfsinglechapter_container_heading">{element.title}</div>
      <div className="selfsinglechapter_container_heading_lessons">
        {filteredLessons.map((lesson, key) => {
          const res=filteredResult.find((item)=>{
            console.log(item,"item");
            console.log(lesson,"lesson");
            return item.lessonId==lesson.id
          })
          console.log(res,"res");
          return (
            <>
              <div
                key={key}
                onClick={showModal}
                className="selfsinglechapter_container_lesson"
              >
                <p className="selfsinglechapter_container_lesson_name"> {lesson.lessonName}</p>
              
                { res && <p className="selfsinglechapter_container_lesson_score" >{res.percentage}</p>} 
              </div>
              
              <Modal
                title=""
                className="self_modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="self_modal_header">
                  <img src={lesson.lessonImage} alt="" />
                </div>
                <div className="self_modal_body">
                  <div className="self_modal_body_length">
                    Total Question {lesson.questions.length}
                  </div>
                  <div className="self_modal_body_difficulty"></div>
                  <Link to={`/selfstudy/ground/${lesson.id}`}>
                    <div className="self_modal_body_play">Play</div>
                  </Link>{" "}
                </div>
              </Modal>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default SelfSingleChapter;
