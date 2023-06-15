import React from "react";
import "./SelfSingleChapter.scss";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { useState } from "react";
const SelfSingleChapter = ({ element, lessons }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="selfsinglechapter_container">
      <div className="selfsinglechapter_container_heading">{element.title}</div>
      <div className="selfsinglechapter_container_heading_lessons">
        {filteredLessons.map((lesson, key) => {
          return (
            <>
              <div
                key={key}
                onClick={showModal}
                className="selfsinglechapter_container_lesson"
              >
                {lesson.lessonName}
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
