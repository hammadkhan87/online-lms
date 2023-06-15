import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiBookOpen,
  FiUsers,
  FiBook,
  FiCode,
  FiSettings,
} from "react-icons/fi";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="classroom_sidebar">
      <div className="classroom_sidebar_aid">
        Hi, We are spending $1000 every week for you. You can also help us.
      </div>
      <div className="classroom_sidebar_main">
        <NavLink
          exact
          to="/classroom/create"
          className="classroom_sidebar_main_item_create"
          activeClassName="active"
        >
          <FiHome />
          <span className="classroom_sidebar_main_title">Create</span>
        </NavLink>
        <NavLink
          to="/classroom"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiCompass />
          <span className="classroom_sidebar_main_title">Explore</span>
        </NavLink>
        <NavLink
          to="/classroom/library"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiBookOpen />
          <span className="classroom_sidebar_main_title">My Library</span>
        </NavLink>
        <NavLink
          to="/classroom/class"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiUsers />
          <span className="classroom_sidebar_main_title">Classroom</span>
        </NavLink>
        <NavLink
          to="/classroom/self-study"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiBook />
          <span className="classroom_sidebar_main_title">Self Study</span>
        </NavLink>
        <NavLink
          to="/classroom/code-room"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiCode />
          <span className="classroom_sidebar_main_title">Code Room</span>
        </NavLink>
        <NavLink
          to="/classroom/settings"
          className="classroom_sidebar_main_item"
          activeClassName="active"
        >
          <FiSettings />
          <span className="classroom_sidebar_main_title">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
