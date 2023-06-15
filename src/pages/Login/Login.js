import React, { useEffect, useState } from "react";
import "./login.scss";
import quiz from "../../images/quiz-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getUser = () => {};
  useEffect(() => {
    getUser();
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const Signeduser = userCredential.user;
        const collectionRef = collection(db, "users");
        getDocs(collectionRef).then((data) => {
          const users = data.docs.map((item) => {
            return { ...item.data(), id: item.id };
          });
          // Match the user within the collection
          const matchedUser = users.find((user) => {
            return user.email === Signeduser.email;
          });
          // Update the login count
          const userDocRef1 = doc(collection(db, "users"), matchedUser.id);
          updateDoc(userDocRef1, {
            loginCount: matchedUser.loginCount + 1,
          })
            .then(() => {
              console.log("User login count updated successfully!");
            })
            .catch((error) => {
              console.log("Error updating user login count:", error);
            });
          const userDocRef2 = doc(collection(db, "student"), matchedUser.id);
          updateDoc(userDocRef2, {
            loginCount: matchedUser.loginCount + 1,
          })
            .then(() => {
              console.log("User login count updated successfully!");
            })
            .catch((error) => {
              console.log("Error updating user login count:", error);
            });
          const userDocRef3 = doc(collection(db, "teacher"), matchedUser.id);
          updateDoc(userDocRef3, {
            loginCount: matchedUser.loginCount + 1,
          })
            .then(() => {
              console.log("User login count updated successfully!");
            })
            .catch((error) => {
              console.log("Error updating user login count:", error);
            });
          localStorage.setItem("userData", JSON.stringify(matchedUser));
          navigate(`/`);
          window.location.reload(true);
          // Do something with the matched user
        });

        setError(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
      });
  };
  return (
    <div className="container">
      <div className="left-side">
        <div className="content">
          <h1>Login</h1>
        </div>
        <div className="image">
          <img src={quiz} alt="" style={{ height: "380px", width: "400px" }} />
        </div>
      </div>
      <div className="right-side">
        <div className="inner-content">
          <div className="already">
            <p>Create an account?</p>
            <Link to={"/signup"}>
              <button>Signup</button>
            </Link>
          </div>
          <div className="inner-content-2">
            <h3>Welcome to QuizKarooo</h3>
            <p>Login& start playing</p>
          </div>
          <div className="form">
            <form onSubmit={handleLogin}>
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
              <p>Forgot password?</p>
              <button className="btn">Login</button>
            </form>
            {error && <span>Wrong Email an password!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
