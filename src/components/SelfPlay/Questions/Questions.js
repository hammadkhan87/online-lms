import React, { useState, useEffect } from "react";
import "./Questions.scss";
import Question from "../Question/Question";

const Questions = ({ singleLesson }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const questions = singleLesson.questions;

  const currentQuestion = questions[currentQuestionIndex];
  const timeLimit = currentQuestion?.timeLimit || 30; // Default time limit of 30 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextQuestion();
    }, timeLimit * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuestionIndex, timeLimit]);

  const handleNextQuestion = (answer) => {
    const correctArray = currentQuestion?.options
      .filter((item) => item.correct)
      .map((item) => item.text);

    const isCorrect = correctArray?.includes(answer);

    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const onSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    handleNextQuestion(answer);
  };

  if (questions.length === 0) {
    return <div>No questions available</div>;
  }

  return (
    <>
      {currentQuestionIndex < questions.length ? (
        <Question
          question={currentQuestion.text}
          options={currentQuestion.options}
          onSelectAnswer={onSelectAnswer}
        />
      ) : (
        <div className="quiz_result">
          <h2>Quiz completed!</h2>
          <p>
            Your score: {score} out of {questions.length}
          </p>
        </div>
      )}
    </>
  );
};

export default Questions;
