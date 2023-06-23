import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db, firebaseConfig } from "../../firebase";
import firebase from "firebase/compat/app";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc
} from "firebase/firestore";

import "./Signup.scss";
import quiz from "../../images/quiz-logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Tune } from "@mui/icons-material";
import { ClipLoader } from "react-spinners";
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const Signup = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('classref');
  const options = ["Student", "Teacher"];
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingb, setLoadingB] = useState(false);
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signupCompleted, setSignupCompleted] = useState(false);
  const[newdata,setnewData]=useState(null)
  const navigate = useNavigate();

  const Submithandler = async (e) => {
    e.preventDefault();
    setLoadingB(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        loginCount: 1,
        id: user.uid,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      if (role === "Student") {
        await setDoc(doc(db, "student", user.uid), {
          name,
          email,
          role,
          loginCount: 1,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
      }

      if (role === "Teacher") {
        await setDoc(doc(db, "teacher", user.uid), {
          name,
          email,
          role,
          loginCount: 1,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
      }

      toast.success("Welcome user created successfully");
      // Store data in local storage
      const userData = {
        name,
        email,
        role,
        loginCount: 1,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      
      setSignupCompleted(true);
      setnewData(userData)
     if(!classroom){
      navigate('/')
         window.location.reload(true);
     }
    } catch (error) {
      console.log("Error in creating user:", error);
      toast.error("Error in creating user:", error);
    }
  };

  const handleJoinNow = async (user) => {
    try {
      // Check if the student is already in the class
      if (classroom.students.includes(user.userId)) {
        toast.error('You are already in the class!');
        navigate(`/`);
        return;
      }

      // Add ref_id to the students array in the class document
      const classDocRef = doc(db, 'classes', searchQuery);
      await updateDoc(classDocRef, {
        students: firebase.firestore.FieldValue.arrayUnion(user.userId),
      });

      // Add classid to the classrooms array in the student document
      const studentDocRef = doc(db, 'student', user.userId);
      await updateDoc(studentDocRef, {
        classrooms: firebase.firestore.FieldValue.arrayUnion({
          classid: searchQuery,
          classname: classroom.className,
          teacherid: classroom.teacherRef,
        }),
      });

      toast.success('Successfully joined the class!');

      
      navigate('/')
      window.location.reload(true);
    } catch (error) {
      console.log('Error joining the class:', error);
      toast.error('Failed to join the class');
      
        navigate('/')
         window.location.reload(true);

      

    }
  };

  const fetchClassroom = async () => {
    try {
      const classRef = collection(db, 'classes');
      const classDocRef = doc(classRef, searchQuery);
      const classSnapshot = await getDoc(classDocRef);

      if (classSnapshot.exists()) {
        const classData = classSnapshot.data();
        console.log(classData);
        setClassroom(classData);
        console.log(classroom);
      } else {
        console.log('Class not found');
      }
    } catch (error) {
      console.log('Error fetching class data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchClassroom();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (signupCompleted && classroom) {
      handleJoinNow(newdata);
    }
  }, [signupCompleted, classroom]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-page" style={{ height: "60vh", alignItems: "center", textAlign: "center" }}>
          <p>Loading...</p>
        </div>
      ) : (<>        <div className="left-side">
          <div className="content">
            <h1>Sign Up</h1>
          </div>
          <div className="image">
            <img src={quiz} alt="" style={{ height: "380px", width: "400px" }} />
          </div>
        </div>
        <div className="right-side">
          <div className="inner-content">
            <div className="already">
              {searchQuery ? (
                ""
              ) : (
                <>
                  <p>Already have an account?</p>
                  <Link to={"/login"}>
                    <button>Login</button>
                  </Link>
                </>
              )}
            </div>
            <div className="inner-content-2">
              <h3>Welcome to QuizKarooo</h3>
              <p>Register your account</p>
              {searchQuery ? (
                <p>To join the {classroom.className} Class</p>
              ) : (
                ""
              )}
            </div>
            <div className="form">
              <form action="" onSubmit={Submithandler}>
                <label htmlFor="">Enter name</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="">Choose Your Role ?</label>
                <select
                  defaultValue={"Student"}
                  onChange={(e) => setRole(e.target.value)}
                  className="select"
                >
                  {searchQuery ? (
                    <option value={"Student"}>Student</option>
                  ) : (
                    <>
                      <option value={"Student"}>Student</option>
                      <option value={"Teacher"}>Teacher</option>
                    </>
                  )}
                </select>
                <label htmlFor="">Enter Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="">Enter Password</label>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn">
                  {loading ? <ClipLoader color="#36d7b7" size={15} /> : "Sign Up"}
                </button>
              </form>
            </div>
          </div>
        </div>
        </>
)}
    </div>
  );
};

export default Signup;
