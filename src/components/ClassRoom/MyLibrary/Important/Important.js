import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useEffect, useState } from "react";

const Important = () => {
  const [quiziz, setQuiziz] = useState([]);
  const localData = localStorage.getItem("userData");
  const id = localData ? JSON.parse(localData).userId : null;
  const fetchedQuiziz = async (collectionName) => {
    const querySnapshot = collection(db, collectionName);
    const q = query(querySnapshot, where('userId', '==',id));
    const snapshot = await getDocs(q);

    const newData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setQuiziz(newData);
  };

  useEffect(() => {
    fetchedQuiziz("important");
    console.log(quiziz, "liked");
  }, []);
  return (
    <div className="mylibrary_created">
      {quiziz.map((item, key) => {
        return (
          <div key={key} className="mylibrary_created_item">
            <img className="mylibrary_created_item_img" src="" alt="" />
            <div className="mylibrary_created_item_det">
              <div className="mylibrary_created_item_det_dots">
                {/* <Menu
                  handleLikeQuiz={handleLikeQuiz}
                  id={item.id}
                  chapterId={item.chapterId}
                /> */}
              </div>
              <div className="mylibrary_created_item_det_header">{}</div>
              <div className="mylibrary_created_item_det_name">
                {item.lessonName}
              </div>
              <div className="mylibrary_created_item_det_det">
                <div className="mylibrary_created_item_det_det_total">
                  {item.subject}
                </div>
                <div className="mylibrary_created_item_det_det_class">
                  {item.grade}
                </div>
              </div>
              <div className="mylibrary_created_item_det_name">
                {item.chapterId}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Important;
