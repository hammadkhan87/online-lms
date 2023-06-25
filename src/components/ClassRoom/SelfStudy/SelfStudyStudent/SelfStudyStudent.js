import React, { useEffect, useState } from "react";
import "./SelfStudyStudent.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import fetchData from "../../functions/getData";
// import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import Sidebar from "./Sidebar/Sidebar";

import { useParams } from "react-router-dom";
import SelfSingleChapter from "./SelfSingleChapter/SelfSingleChapter";

const SelfStudyStudent = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [result, setResult] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [grade, setGrade] = useState("K");
  const [value, setValue] = useState("1");
  let chapterName;

  if (value == 1) {
    chapterName = "math";
  }
  if (value == 2) {
    chapterName = "language art";
  }
  if (value == 3) {
    chapterName = "science";
  }
  if (value == 4) {
    chapterName = "socialstudy";
  }
  const getGrade = (event) => {
    setGrade(event.target.getAttribute("value"));
  };
  const fetchedDataChapters = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setChapters(newData);
  };
  const fetchedDataLessons = async (collectionName) => {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where("quizType", "==", "self"))
    );
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLessons(newData);
  };
  const fetchedDataResult = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setResult(newData);
  };
  useEffect(() => {
    fetchedDataChapters("chapters");
    fetchedDataLessons("lessonQuiz");
    fetchedDataResult("result");
  }, []);

  useEffect(() => {
    const filteredData = chapters.filter((chap) => {
      return chap.subject == chapterName && chap.grade.includes(grade);
    });

    setFilterArray(filteredData);
  }, [chapters, chapterName, grade, result]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // if (chapters.length === 0) {
  //   return <LoadingScreen />;
  // }
  return (
    <div className="selfstudy_container">
      <Sidebar getGrade={getGrade} grade={grade} setGrade={setGrade} />
      <div className="selfstudy_container_tab">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", margin: "auto" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Math" value="1" />
              <Tab label="Language Arts" value="2" />
              <Tab label="Science" value="3" />
              <Tab label="Social Studies" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="tabpanel_container">
              <div className="tabpanel_container_title">
                {grade} grade {chapterName}
              </div>
              <div className="tabpanel_container_chapters">
                {filterArray.map((element, id) => {
                  return (
                    <SelfSingleChapter
                      lessons={lessons}
                      element={element}
                      key={id}
                      result={result}
                      setResult={setResult}
                    />
                  );
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="tabpanel_container">
              <div className="tabpanel_container_title">
                {grade} grade {chapterName}
              </div>
              <div className="tabpanel_container_chapters">
                {filterArray.map((element, id) => {
                  return (
                    <SelfSingleChapter
                      lessons={lessons}
                      element={element}
                      key={id}
                      result={result}
                      setResult={setResult}
                    />
                  );
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="tabpanel_container">
              <div className="tabpanel_container_title">
                {grade} grade {chapterName}
              </div>
              <div className="tabpanel_container_chapters">
                {filterArray.map((element, id) => {
                  return (
                    <SelfSingleChapter
                      lessons={lessons}
                      element={element}
                      key={id}
                      result={result}
                      setResult={setResult}
                    />
                  );
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div className="tabpanel_container">
              <div className="tabpanel_container_title">
                {grade} grade {chapterName}
              </div>
              <div className="tabpanel_container_chapters">
                {filterArray.map((element, id) => {
                  return (
                    <SelfSingleChapter
                      lessons={lessons}
                      element={element}
                      key={id}
                      result={result}
                      setResult={setResult}
                    />
                  );
                })}
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default SelfStudyStudent;
