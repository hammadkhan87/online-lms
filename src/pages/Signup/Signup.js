import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import "./Signup.scss";
import quiz from "../../images/quiz-logo.png";
import { Link } from "react-router-dom";
const Signup = () => {
  const options = ["Student", "Teacher"];
  const [role, setRole] = useState("Student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Submithandler = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;

        try {
          const docRef = await addDoc(collection(db, "users"), {
            name,
            email,
            role,
            loginCount: 1,
            userId: `${result.user.uid}`,
            createdAt: serverTimestamp(),
          });
          if (role == "Student") {
            const docRef = await addDoc(collection(db, "student"), {
              name,
              email,
              role,
              loginCount: 1,
              userId: `${result.user.uid}`,
              createdAt: serverTimestamp(),
            });
          }
          if (role == "Teacher") {
            const docRef = await addDoc(collection(db, "teacher"), {
              name,
              email,
              role,
              loginCount: 1,
              userId: `${result.user.uid}`,
              createdAt: serverTimestamp(),
            });
          }
          alert("Welcome user created sucessfully");
          console.log("document written with id", docRef);
          // Store data in local storage
          const userData = {
            name,
            email,
            role,
            loginCount: 1,
            userId: result.user.uid,
            createdAt: serverTimestamp(),
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          navigate(`/`);
          window.location.reload(true);
        } catch (e) {
          console.log("Error in adding document", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="container">
      <div className="left-side">
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
            <p>Already have an account?</p>
            <Link to={"/login"}>
              {" "}
              <button>Login</button>
            </Link>
          </div>
          <div className="inner-content-2">
            <h3>Welcome to QuizKarooo</h3>
            <p>Register your account</p>
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
                <option value={"Student"}>Student</option>
                <option value={"Teacher"}>Teacher</option>
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
              <button className="btn">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
