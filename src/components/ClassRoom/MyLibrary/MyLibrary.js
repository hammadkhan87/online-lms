
import React from "react";
import "./MyLibrary.scss";
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
const MyLibrary = () => {
  return (
    <div className="classroom_mylibrary">
      <div className="classroom_mylibrary_header">My Library</div>
      <div className="classroom_mylibrary_body">
        <Sidebar/>
        <Outlet/>
      </div>

    </div>
  );
};

export default MyLibrary;
