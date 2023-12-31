import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Admin/Dashboard";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import SelfStudy from "./pages/SelfStudy/SelfStudy";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import addArrayToFirestore from "./generator";
import Lost from "./pages/Lost/Lost";
import Explore from "./components/ClassRoom/Explore/Explore";
import MyLibrary from "./components/ClassRoom/MyLibrary/MyLibrary";
import CreateQuiz from "./components/Admin/CreateQuiz/CreateQuiz";
import CreateQuizb from "./components/ClassRoom/CreateQuiz/CreateQuiz";
import Class from "./components/ClassRoom/Class/Class";
import SelfStudyC from "./components/ClassRoom/SelfStudy/SelfStudy";
import CodeRoom from "./components/ClassRoom/CodeRoom/CodeRoom";
import Settings from "./components/ClassRoom/Settings/Settings";
import SearchQuiz from "./components/ClassRoom/Explore/SearchQuiz/SearchQuiz";
import SearchQuizb from "./pages/SearchQuiz/SearchQuiz";
import { useNavigation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SelfGround from "./pages/SelfGround/SelfGround";
import SelfPlay from "./pages/SelfPlay/SelfPlay";
import { Toaster } from "react-hot-toast";
import StudentPortal from "./pages/Studentportal/StudentPortal";
import StudentPortalB from "./components/StudentPortal/StudentPortal"
import SingleClass from "./components/ClassRoom/Class/SingleClass/SingleClass";
import CreatedByMe from "./components/ClassRoom/MyLibrary/CreatedByMe/CreatedByMe";
import Saved from "./components/ClassRoom/MyLibrary/Saved/Saved";
import Important from "./components/ClassRoom/MyLibrary/Important/Important"
import Liked from "./components/ClassRoom/MyLibrary/Liked/Liked"
import All from "./components/ClassRoom/MyLibrary/All/All"
import Folder from "./components/ClassRoom/MyLibrary/Folder/Folder"
import StudentClass from "./components/StudentPortal/StudentClass/StudentClass";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CoursesList = lazy(() => import("./pages/CoursesList/CoursesList"));
const ClassRoom = lazy(() => import("./pages/ClassRoom/ClassRoom"));

function App() {
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRole(parsedData.role);
      setIsLogin(parsedData.name);
      console.log(role);
    } else {
      setRole("user");
      setIsLogin("");
    }
  }, []);

  return (
    <>
      <Navbar role={role} isLogin={isLogin} />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="courselist/:id" element={<CoursesList />} />
            <Route path="selfstudy" element={<SelfStudy />}></Route>
            <Route path="selfstudy/ground/:id" element={<SelfGround />} />
            <Route path="selfstudy/ground/play/:id" element={<SelfPlay />} />

            {role === "Admin" || role === "Teacher" ? (
              <Route path="classroom" element={<ClassRoom />}>
                <Route path="" element={<Explore />} />
                <Route path="library" element={<MyLibrary />} >
                <Route index />
                <Route exact path="created-by-me" element={<CreatedByMe />} />
                <Route exact path="saved" element={<Saved/>} />
                <Route exact path="important" element={<Important />} />
                <Route exact path="liked" element={<Liked />} />
                  <Route exact path="all" element={<All />} />
                  <Route exact path="*" element={<Folder />} />
                  </Route>

                <Route exact path="create" element={<CreateQuizb />} />
                <Route path="class" element={<Class />} />

                <Route path="class/class-Singleclass" element={<SingleClass/>}/>
               
                <Route path="self-study" element={<SelfStudyC />} />
                <Route path="code-room" element={<CodeRoom />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            ) : null}
            <Route path="student-classes/student-class" element={<StudentClass/>}/>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/self-search-quiz" element={<SearchQuizb />} />
            <Route path="/student-classes" element={<StudentPortalB/>}/>
            <Route path="/admin-create-quiz" exact element={<CreateQuiz />} />
            <Route path="/student-portal" exact element={<StudentPortal />} />
            <Route path="classroom/search/:quiz" element={<SearchQuiz />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<Lost />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
