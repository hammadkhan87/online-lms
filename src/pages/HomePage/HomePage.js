import React from "react";
import "./HomePage.scss";
import HeroPage from "../../components/HomePage/HeroPage/HeroPage";
import Testimonials from "../../components/HomePage/Testimonials/Testimonials";
import Courses from "../../components/CoursesList/Courses/Courses";
import Reviews from "../../components/HomePage/Reviews/Reviews";
import OurAims from "../../components/HomePage/OurAims/OurAims";

const HomePage = () => {
  return (
    <>
      <div className="homepage_container">
        <HeroPage />
        <Testimonials />
        <Reviews />
        <Courses category="languages" />
        <Courses category="english" />
        <Courses category="math" />
        <Courses category="science" />
        <OurAims />
      </div>
    </>
  );
};

export default HomePage;
