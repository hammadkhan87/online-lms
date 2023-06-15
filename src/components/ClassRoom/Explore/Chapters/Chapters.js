import React from "react";
import "./Chapters.scss";

import mathImage from "../../../../images/math-svgrepo-com.svg";
import scienceImage from "../../../../images/science-chemical-svgrepo-com.svg";
import socialImage from "../../../../images/study-svgrepo-com.svg";
import languageImage from "../../../../images/fighting-svgrepo-com.svg";

const Chapters = () => {
  return (
    <div className="explore_container_chapters">
      <div className="explore_container_chapters_item">
        <img
          src={mathImage}
          alt=""
          className="explore_container_chapters_item_el"
        />
        <div className="explore_container_chapters_item_title">math</div>
      </div>
      <div className="explore_container_chapters_item">
        <img
          src={scienceImage}
          alt=""
          className="explore_container_chapters_item_el"
        />
        <div className="explore_container_chapters_item_title">Science</div>
      </div>
      <div className="explore_container_chapters_item">
        <img
          src={socialImage}
          alt=""
          className="explore_container_chapters_item_el"
        />
        <div className="explore_container_chapters_item_title">
          Social Study
        </div>
      </div>
      <div className="explore_container_chapters_item">
        <img
          src={languageImage}
          alt=""
          className="explore_container_chapters_item_el"
        />
        <div className="explore_container_chapters_item_title">
          Language Art
        </div>
      </div>
    </div>
  );
};

export default Chapters;
