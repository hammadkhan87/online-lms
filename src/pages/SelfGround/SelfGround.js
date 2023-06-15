import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SelfGround.scss";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const SelfGround = () => {
  let params = useParams();
  const { id } = params;

  const [lessons, setLessons] = useState([]);
  const [singleLesson, setSingleLesson] = useState({});
  const fetchedDataLessons = async (collectionName) => {
    const docRef = doc(db, collectionName, id);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setSingleLesson({ ...data, id: docSnapshot.id });
    } else {
      console.log("Document not found!");
    }
  };
  useEffect(() => {
    
    fetchedDataLessons("lessonQuiz");
    setSingleLesson(
      lessons.find((lesson) => {
        return lesson.id == id;
      })
    );
  }, []);
 
  return (
    <div className="self_ground_container">
      <div className="self_ground_container_block">
        <div className="self_ground_total">
          Questions {singleLesson?.questions?.length}
        </div>
        <Link to={`/selfstudy/ground/play/${id}`}>
          <div className="self_ground_play">Play</div>
        </Link>
      </div>
    </div>
  );
};

export default SelfGround;
