import { useEffect, useState } from "react";
import { db, auth, firebaseConfig } from "../../../firebase";
import { FaSearch } from "react-icons/fa";
import { FiList } from "react-icons/fi";
import { MdGrade } from "react-icons/md";
import { useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";


import "./SelfStudy.scss";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import MaterialTable from "./MaterialTable/MaterialTable";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const SelfStudy = () => {
  
  const [users, setUsers] = useState([]);
  const fetchLessons = async () => {
    const lessonSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("classrooms", ">", [])
      .get();

    const classUsers = lessonSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUsers(classUsers);
    
  };
  useEffect(() => {
    fetchLessons();
  }, []);
  console.log(users, "classUsers");
  return (
    <div className="selfstudy_container_classroom">
      <div className="selfstudy_container_classroom_main">
        <MaterialTable users={users} />
      </div>
    </div>
  );
};

export default SelfStudy;
