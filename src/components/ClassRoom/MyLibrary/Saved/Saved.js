import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useEffect, useState } from "react";

const Saved = () => {
  const [quiziz, setQuiziz] = useState([]);
  const localData = localStorage.getItem("userData");
  const id = localData ? JSON.parse(localData).userId : null;
  const fetchedQuiziz = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, collectionName), where('Folder', '==', 'Dynamic'), where('refId', '==', id))
      );
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuiziz(newData);
    } catch (error) {
      console.log('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    fetchedQuiziz("lessonQuiz");
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

export default Saved;
