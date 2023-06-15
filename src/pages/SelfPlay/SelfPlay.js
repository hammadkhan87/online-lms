import React, { useEffect, useState } from "react";
import "./SelfPlay.scss";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Timer from "../../components/SelfPlay/Timer/Timer";
import Questions from "../../components/SelfPlay/Questions/Questions";

const SelfPlay = () => {
  let params = useParams();
  const { id } = params;
  const [timer, setTimer] = useState(true);
  const [count, setCount] = useState(5);
  const [singleLesson, setSingleLesson] = useState({});
  // switch (count) {
  //   case 5:
  //     setTimer(true);
  //     break;
  //   case 4:
  //     setTimer(true);
  //     break;
  //   case 3:
  //     setTimer(true);
  //     break;
  //   case 2:
  //     setTimer(true);
  //     break;
  //   case 1:
  //     setTimer(true);
  //     break;
  //   default:
  //     setTimer(false);
  //     break;
  // }
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
  }, []);

  return (
    <div className="self_play_container">
      {count === 5 ||
      count === 4 ||
      count === 3 ||
      count === 2 ||
      count === 1 ? (
        <Timer count={count} setCount={setCount} />
      ) : (
        <Questions singleLesson={singleLesson} />
      )}
    </div>
  );
};

export default SelfPlay;
