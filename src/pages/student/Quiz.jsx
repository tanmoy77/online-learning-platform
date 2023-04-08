import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";
import QuestionList from "../../components/student/quiz/QuestionList";
import Error from "../../components/ui/Error";
import {
  useGetQuizQuery,
  useSubmitQuizMutation,
} from "../../features/quizzes/quizzesApi";

const Quiz = () => {
  const { videoId } = useParams() || {};
  const navigate = useNavigate();

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetQuizQuery(videoId);

  const [
    submitQuiz,
    {
      isLoading: submitLoading,
      isSuccess: submitSuccess,
      isError: isSubmitError,
      error: submitError,
    },
  ] = useSubmitQuizMutation();

  const { user } = useSelector((state) => state.auth);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (qId, optionId) => {
    const newSelectedOptions = [...selectedOptions];
    if (!newSelectedOptions[qId]) {
      newSelectedOptions[qId] = { [optionId]: true };
    } else {
      if (newSelectedOptions[qId][optionId] === true) {
        newSelectedOptions[qId][optionId] = false;
      } else {
        newSelectedOptions[qId][optionId] = true;
      }
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    quizzes.forEach((quiz) => {
      let isCorrect = true;
      quiz.options.forEach((option) => {
        const isSelected =
          selectedOptions[quiz.id] && selectedOptions[quiz.id][option.id];
        if (isSelected !== option.isCorrect) {
          isCorrect = false;
        }
      });
      if (isCorrect) {
        score += 5;
      }
    });
    const quizMarkPerQ = 5;
    const totalQuiz = quizzes?.length;
    const totalCorrect = score / quizMarkPerQ;
    const totalWrong = totalQuiz - totalCorrect;
    const totalMark = totalQuiz * quizMarkPerQ;
    submitQuiz({
      student_id: user.id,
      student_name: user.name,
      video_id: Number(videoId),
      video_title: quizzes[0].video_title,
      totalQuiz,
      totalCorrect,
      totalWrong,
      totalMark,
      mark: score,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const initialState = quizzes.reduce((acc, quiz) => {
        acc[quiz.id] = quiz.options.reduce((optionsAcc, option) => {
          optionsAcc[option.id] = false;
          return optionsAcc;
        }, {});
        return acc;
      }, []);
      setSelectedOptions(initialState);
    }
  }, [isSuccess, quizzes]);

  useEffect(() => {
    if (submitSuccess) {
      navigate("/leaderboard");
    }
  }, [submitSuccess, navigate]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message={error} />;
  }

  if (!isLoading && isSuccess) {
    content = (
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{quizzes[0].video_title}</h1>
          <p className="text-sm text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>
        <QuestionList
          questions={quizzes}
          handleOptionClick={handleOptionClick}
          selectedOptions={selectedOptions}
        />

        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          Submit
        </button>
        {isSubmitError && <Error message={submitError} />}
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </>
  );
};

export default Quiz;
