import React from "react";
import "./Process.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { db, firebaseConfig } from "../../../../../../firebase";

import {
  addDoc,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const Process = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("classid");
  const [processedobjects, setProcessedObjects] = useState([]);

  const fetchFutureObjects = async (documentId) => {
    const classRef = doc(db, "classes", documentId);

    const documentSnapshot = await getDoc(classRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();

      const futureObjects = data.quizes.filter((quiz) => {
        const startDateTime = new Date(quiz.start);
        const endDateTime = new Date(quiz.end);
        const currentDateTime = new Date();

        return currentDateTime > startDateTime && currentDateTime < endDateTime;
      });

      setProcessedObjects(futureObjects);
      console.log("Future Objects:", futureObjects);
    } else {
      console.log("Document not found.");
    }
  };
  useEffect(() => {
    fetchFutureObjects(searchQuery);
  }, []);
  return (
    <div className="main-div-quizes-d">
      {processedobjects.map((classItem, index) => (
        <div key={index} className="inner-class-div-a-d">
          <div className="inner-class-bar-a-d">
            <p className="single-class-name-a-d">{classItem.lessonName}</p>
            <p className="show-student-text-a-d">
              Started : {classItem.start.replace("T", " ")}
            </p>
            <p className="show-student-text-b">
              End at : {classItem.end.replace("T", " ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Process;
