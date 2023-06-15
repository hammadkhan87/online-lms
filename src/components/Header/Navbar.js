import React from "react";
import { useState, useEffect } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ role, isLogin }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  console.log(role);
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  function useCurrentWidth() {
    // save current window width in the state object
    let [width, setWidth] = useState(getWidth());

    // in this case useEffect will execute only once because
    // it does not have any dependencies.
    useEffect(() => {
      const resizeListener = () => {
        // change width from the state object
        setWidth(getWidth());
      };
      // set resize listener
      window.addEventListener("resize", resizeListener);

      // clean up function
      return () => {
        // remove resize listener
        window.removeEventListener("resize", resizeListener);
      };
    }, []);

    return width;
  }
  const newwidth = useCurrentWidth();

  const [showMenu, setShowMenu] = useState(false);
  const HandleLogout = async () => {
    localStorage.removeItem("userData");
    try {
      await auth.signOut();

      window.location.reload(true);
      // Redirect or update UI to reflect successful logout
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const handleonchange = (e) => {
    setSearch(e.target.value);
  };
  const handleEnter = (e) => {
    e.preventDefault()
    navigate(`self-search-quiz?search=${search}`);
  };

  return (
    <div className="header">
      <div className={showMenu ? (newwidth < 1023 ? "nav-2" : "nav") : "nav"}>
        <Link to={"/"}>
          <h2>Mirown</h2>
        </Link>
        {/* {name} */}
        <div className="left-side">
          <Link to="selfstudy">
            {" "}
            <p>Self Study</p>
          </Link>
          <div className="search-bar">
            <form onSubmit={handleEnter} style={{display:"flex"}}>
              <input
                className="search-text"
                value={search}
                onChange={(e) => handleonchange(e)}
                placeholder="SearchQuiz..."
              />
              <FaSearch  style={{textAlign:"center", marginTop:"10px", marginRight:"5px"}} onClick={handleEnter} />
            </form>
          </div>
        </div>
        <div className="right-side">
          {isLogin && (
            <Link className="right-side_btn" to="classroom">
              <p>Class room</p>
            </Link>
          )}

          {!isLogin && (
            <Link className="right-side_btn" to="signup">
              <p>Join us</p>
            </Link>
          )}
          {!isLogin && (
            <Link className="right-side_btn" to="login">
              <p>Sign in</p>
            </Link>
          )}
          {(role == "Teacher" || role == "admin") && (
            <Link className="right-side_btn" to="create-quiz">
              <p>Creat Quiz</p>
            </Link>
          )}

          {isLogin && (
            <div onClick={HandleLogout} className="right-side_btn">
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
      <div
        className="hamburger-menu"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <GiHamburgerMenu />
      </div>
    </div>
  );
};

export default Navbar;
