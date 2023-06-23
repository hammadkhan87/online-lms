import React from "react";
import "./ClassRoom.scss";
import Sidebar from "../../components/ClassRoom/Sidebar/Sidebar";
import Explore from "../../components/ClassRoom/Explore/Explore";
import { Outlet, Route, Routes } from "react-router-dom";
import MyLibrary from "../../components/ClassRoom/MyLibrary/MyLibrary";
const ClassRoom = () => {
  return (
    <div className="classroom_container">
      <Sidebar />
      
      <Outlet />
    </div>
  );
};

export default ClassRoom;
