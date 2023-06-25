import React, { useEffect, useState } from "react";
import "./Settings.scss";
import { auth, db } from "../../../firebase";
import {
  updateProfile as updateAuthProfile,
  updateEmail as updateAuthEmail,
  signInWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const Settings = () => {
  const localData = localStorage.getItem("userData");
  const userData = localData ? JSON.parse(localData) : null;
  const userId = localData ? JSON.parse(localData).userId : null;
  const id = localData ? JSON.parse(localData).id : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState(""); // Add password state

  const updateUserData = async (id, data) => {
    try {
      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, data);
      console.log("User data updated successfully!");

      // Sign in the user again to refresh the authentication token
      try {
        // const userCredential = await signInWithEmailAndPassword(
        //   auth,
        //   email,
        //   password
        // );

        // Update user data in Firebase Authentication
        // const user = userCredential.user;
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        updateAuthEmail(user, data.email)
          .then(() => {
            // Email updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        console.log(
          "User profile and email updated successfully in Firebase Authentication!"
        );
        if (userData) {
          userData.name = name;
          userData.email = email;
        }

        // Save the updated object back to localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        // Handle password change
        if (newPassword) {
          await updatePassword(auth, newPassword);
          console.log("Password updated successfully!");
        }

        // Handle any additional actions after successful update
      } catch (signInError) {
        console.error("Error signing in the user:", signInError);
        // Handle sign-in error scenario
      }
    } catch (updateDocError) {
      console.error("Error updating user data:", updateDocError);
      // Handle update document error scenario
    }
  };

  useEffect(() => {
    // Fetch the user data from Firestore and update the state
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", id);
        console.log("userDocRef", userDocRef);

        const userDocSnapshot = await getDoc(userDocRef);
        console.log("userDocSnapshot", userDocSnapshot);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("userData", userData);

          setName(userData.name);
          setEmail(userData.email);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error scenario
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async (e) => {
    // Make the function async
    e.preventDefault();

    // Prepare the data to update in Firestore
    const data = {
      name: name,
      email: email,
    };

    // Update the user information in Firestore and Firebase Authentication
    try {
      await updateUserData(id, data);
      console.log("User data updated successfully!");
      // Handle any additional actions after successful update
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error scenario
    }
  };

  return (
    <div className="settings_container">
      <form className="settings_form" onSubmit={handleSaveChanges}>
        <div className="settings_title">Settings</div>
        <div className="settings_title_sec">Account</div>

        <div className="settings_input_container">
          <div className="settings_input_item">
            <label className="settings_input_label">Name</label>
            <input
              className="settings_input_elem"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="settings_input_item">
            <label className="settings_input_label">Email</label>
            <input
              className="settings_input_elem"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="settings_input_item">
            <label className="settings_input_label">Password</label>
            <input
              className="settings_input_elem"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="settings_input_item">
            <button type="submit" className="settings_input_item_btn">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
