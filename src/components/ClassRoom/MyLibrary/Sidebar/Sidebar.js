import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCompass,
  FiBookOpen,
  FiUsers,
  FiBook,
  FiCode,
  FiSettings,
} from "react-icons/fi";
import "./Sidebar.scss";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineFolder } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const localData = localStorage.getItem("userData");
  const id = localData ? JSON.parse(localData).userId : null;
  const [userFolders, setUserFolders] = useState([]);

  const fetchedQuiziz = async (collectionName) => {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where("userId", "==", id))
    );
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFolders(newData);
  };

  useEffect(() => {
    fetchedQuiziz("teacherFolders");
    console.log(folders);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFolderName("");
  };

  const handleCreateFolder = () => {
    if (folderName && id) {
      const newFolder = {
        name: folderName,
        userId: id,
      };
      const foldersRef = collection(db, "teacherFolders");
      addDoc(foldersRef, newFolder)
        .then((docRef) => {
          const createdFolder = { id: docRef.id, ...newFolder };
          setFolders((prevFolders) => [...prevFolders, createdFolder]);
          setUserFolders((prevUserFolders) => [
            ...prevUserFolders,
            createdFolder,
          ]);
          handleClose();
        })
        .catch((error) => {
          console.log("Error creating folder:", error);
        });
    }
  };
  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };
  return (
    <div className="classroom_library_sidebar">
      <div className="classroom_library_sidebar_main">
        <NavLink
          to="/classroom/library/created-by-me"
          className="classroom_library_sidebar_main_item"
          activeClassName="active"
          activeKey="/classroom/library/created-by-me"
        >
          <FiCompass />
          <span className="classroom_sidebar_main_title">Created By Me</span>
        </NavLink>
        <NavLink
          to="/classroom/library/saved"
          className="classroom_library_sidebar_main_item"
          activeClassName="active"
        >
          <FiCompass />
          <span className="classroom_sidebar_main_title">Saved</span>
        </NavLink>
        <NavLink
          to="/classroom/library/important"
          className="classroom_library_sidebar_main_item"
          activeClassName="active"
        >
          <FiBookOpen />
          <span className="classroom_sidebar_main_title">Important</span>
        </NavLink>
        <NavLink
          to="/classroom/library/liked"
          className="classroom_library_sidebar_main_item"
          activeClassName="active"
        >
          <FiUsers />
          <span className="classroom_sidebar_main_title">Liked By Me</span>
        </NavLink>
        <NavLink
          to="/classroom/library/all"
          className="classroom_library_sidebar_main_item"
          activeClassName="active"
        >
          <FiBook />
          <span className="classroom_sidebar_main_title">All My Content</span>
        </NavLink>
      </div>
      <div className="folders_container">
        <div className="folders_header classroom_library_sidebar_main_item">
          <div className="folders_header_title">All Folders</div>
          <Button
            sx={{ fontSize: "12px", color: "black", padding: "0px" }}
            className="create_folder"
            onClick={handleOpen}
          >
            Create
          </Button>
        </div>
        <div className="all_folders">
          {folders.map((folder, id) => (
            <NavLink
              to={`/classroom/library/${folder.id}?folderName=${folder.name}&id=${folder.id}`}
              key={id}
              className="all_folders_item"
            >
              <AiOutlineFolder />
              <div className="all_folders_item_title">{folder.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="folder_modal_container">
              <div className="folder_modal_container_header">
                <AiOutlineFolderAdd className="folder_modal_container_header_icon" />
                Create A Folder
              </div>
              <div className="folder_modal_container_body">
                <div className="folder_modal_container_body_title">
                  Enter Folder Name
                </div>
                <input
                  type="text"
                  className="folder_modal_container_body_input"
                  value={folderName}
                  onChange={handleFolderNameChange}
                />
              </div>
              <div className="folder_modal_container_footer">
                <div className="folder_modal_container_footer_btns">
                  <div
                    onClick={handleClose}
                    className="folder_modal_container_footer_close"
                  >
                    Close
                  </div>
                  <div
                    onClick={handleCreateFolder}
                    className="folder_modal_container_footer_create"
                  >
                    Create
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Sidebar;
