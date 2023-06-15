import React, { useState } from "react";
import "./Explore.scss";
import Chapters from "./Chapters/Chapters";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Explore = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const RedirectPage = (e) => {
    e.preventDefault();
    navigate(`/classroom/search/${search}`);
  };
  return (
    <div className="explore_container">
      <div className="explore_container_title">What will you teach today</div>
      <div className="explore_container_input">
        <form className="explore_container_input_form" onSubmit={RedirectPage}>
          <input
            placeholder="Search for any quizzez"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="explore_container_input_el"
          />

          <ArrowRight className="explore_container_input_icon" />
        </form>
      </div>
      <Chapters />
    </div>
  );
};

export default Explore;
