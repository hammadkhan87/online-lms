import React from 'react';
import "./StudentClass.scss";
import image from "../../../images/pngegg.png";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { db, firebaseConfig } from "../../../firebase";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  ref,
  query,
  where,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { writeBatch } from "firebase/firestore";

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const StudentClass = () => {
  const localData = localStorage.getItem("userData");
  const roleA = localData ? JSON.parse(localData).role : null;
  const ref_id = localData ? JSON.parse(localData).userId : null;
  const re_id = localData ? JSON.parse(localData).id : null;
  const sname = localData ? JSON.parse(localData).name : null;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("classid");

  const [classData, setClassData] = useState(null);
  const [value, setValue] = useState(0);
  const [play,setPlay]=useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchClass = async () => {
    try {
      const classRef = doc(collection(db, 'classes'), searchQuery);
      const classSnapshot = await getDoc(classRef);

      if (classSnapshot.exists()) {
        setClassData({ id: classSnapshot.id, ...classSnapshot.data() });
      } else {
        console.log('Class does not exist');
      }
    } catch (error) {
      console.error('Error fetching class:', error);
    }
  };

  useEffect(() => {
    fetchClass();
  }, []);

  const currentTime = new Date();
  const availableQuizzes = classData?.quizes
  .filter((quiz) => new Date(quiz.end) > currentTime)
  .map((quiz) => {
    const startTime = new Date(quiz.start);
    const endTime = new Date(quiz.end);
    const isPlayable = endTime > currentTime && startTime <= currentTime;
    return { ...quiz, play: isPlayable };
  });

  console.log(availableQuizzes)
  const handlePlayButtonClick = (quiz) => {
    // Handle play button click
  };

  return (
    <div className='student-class-main-div'>
      <div className='side-bar-student-class'>
        <img src={image} className='side-image' alt="" />
        <p className='student-class-s-name'>{sname}</p>
        {classData && (
          <>
            <p className='student-class-name'> Class :{classData.className}</p>
            <p className='student-class-b-name'>Created by</p>
            <p className='student-class-t-name'>{classData.teachername}</p>
          </>
        )}
      </div>
      <div className='right-side-student-class'>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Available Quizzes" />
              <Tab label="Results" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {availableQuizzes && availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <div key={quiz.quizId}>
                  <p>{quiz.lessonName}</p>
                  {quiz.play && (
                    <Button variant="contained" onClick={() => handlePlayButtonClick(quiz)}>
                    Start
                  </Button>
                  )}
                  
                </div>
              ))
            ) : (
              <p>No available quizzes</p>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Results
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default StudentClass;
