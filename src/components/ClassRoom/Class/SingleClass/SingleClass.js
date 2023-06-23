import React from "react";
import { useLocation } from "react-router-dom";

import "./SingleClass.scss";
import { SiGoogleclassroom } from "react-icons/si";
import firebase from "firebase/compat/app";
import { HiViewGrid } from "react-icons/hi";
import {FaChalkboardTeacher} from "react-icons/fa"
import { useState } from "react";
import {
    getDoc,
    collection,
    doc,
    query,
    where,
    getDocs,
    updateDoc,
    arrayUnion,
  } from 'firebase/firestore';
  import { auth, db, firebaseConfig } from "../../../../firebase";
import { useEffect } from "react";

import DashBoard from "./ClassDashboard/DashBoard";
import ClassQuizzes from "./ClassQuizzes/ClassQuizzes";
import Settings from "./ClassSettings/Settings";
  
  
  firebase.initializeApp(firebaseConfig);
  
  const storage = firebase.storage();

const SingleClass = () => {
  const localData = localStorage.getItem("userData");

  const role = localData ? JSON.parse(localData).role : null;
  const ref_id = localData ? JSON.parse(localData).userId : null;
  const re_id = localData ? JSON.parse(localData).id : null;
  const t_name = localData ? JSON.parse(localData).name : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("classid");
  console.log("re_id", ref_id, "classid", searchQuery);
  const [classroom ,setClassroom] = useState("")

  const fetchClassroom = async () => {
    try {
      const classRef = collection(db, 'classes');
      const classDocRef = doc(classRef, searchQuery);
      const classSnapshot = await getDoc(classDocRef);

      if (classSnapshot.exists()) {
        const classData = classSnapshot.data();
        console.log(classData);
        setClassroom(classData);
      } else {
        console.log('Class not found');
      }
    } catch (error) {
      console.log('Error fetching class data:', error);
    } finally {
    //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassroom();
  }, []);


  return (
    <div className="main-singleclass-container">
      <div className="sider-bar-main">
        <div className="icon_text">
          <SiGoogleclassroom className="icon-a" />
          <p>ClassRoom</p>
        </div>
        <div className="under-class-div">
          <p
            style={{
              display: "flex",
              flexDirection: "clumn",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <HiViewGrid
              style={{ color: "blue", fontSize: "18px", marginRight: "5px" }}
            />
            Dashboard
          </p>
          <p>Quizzes</p>
          <p>Settings</p>
        </div>
      </div>
      <div className="right-side-single-class">
        <div className="right-top-bar">
            <p className="grade-text">{classroom.className}</p>
            <p className="teacher-text"> <FaChalkboardTeacher style={{ color: "blue", fontSize: "18px", marginRight: "5px" }} />{t_name}</p>

        </div>
        <div className="main-component-div">

        </div>
      </div>
    </div>
  );
};

export default SingleClass;
