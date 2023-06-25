import React, { useEffect, useState } from "react";
import "./Explore.scss";
import Chapters from "./Chapters/Chapters";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { BsSearch } from "react-icons/bs";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      const q = query(
        collection(db, "lessonQuiz"),
        where("lessonName", ">=", searchQuery),
        where("lessonName", "<=", searchQuery + "\uf8ff")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const suggestions = snapshot.docs.map((doc) => doc.data().lessonName);
        setSuggestions(suggestions);
      });

      return () => unsubscribe();
    };

    if (searchQuery.length > 0) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
    console.log(suggestions);
    console.log(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const RedirectPage = (e) => {
    e.preventDefault();
    navigate(`/classroom/search?search=${search}`);
  };

  return (
    <div className="explore_container">
      <div className="explore_container_title">What will you teach today</div>
      <div className="explore_container_input">
        <form
          className="explore_container_input_form"
          onSubmit={(e) => RedirectPage(e)}
        >
          <input
            placeholder="Search for any quizzes"
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="explore_container_input_el"
          />
          <ArrowRight className="explore_container_input_icon" />
        </form>
      </div>
      <div className="suggestions_container">
        {suggestions.map((suggestion, index) => (
          <div
            className="suggestions_container_item"
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <BsSearch className="suggestions_container_item_icon" />
            {suggestion}
          </div>
        ))}
      </div>
      <Chapters />
    </div>
  );
};

export default Explore;
