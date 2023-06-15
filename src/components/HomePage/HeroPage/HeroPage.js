import React from "react";
import "./HeroPage.scss";
const HeroPage = () => {
  return (
    <div className="heropage_container">
      <div className="heropage_content">
        <div className="heropage_content_heading">
          Getting <span className="special_words">Quality</span> <br />{" "}
          Education is now <br /> more
          <span className="special_words"> easy</span>
        </div>
        <div className="heropage_content_des">
          provide you with the latest online learning system and material that
          help you knowledge growing
        </div>
        <input
          type="text"
          placeholder="Enter Code ..."
        
          className="heropage_content_input"
        />
      </div>
      <div className="heropage_img">
        <img src="./assets/bachi.png" alt="" />
      </div>
    </div>
  );
};

export default HeroPage;
