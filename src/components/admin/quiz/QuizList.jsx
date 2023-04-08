import React from "react";
import { useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";
import Error from "../../ui/Error";
import QuizItem from "./QuizItem";

const QuizList = () => {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message="Error occured while loading data" />;
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <div>No Quizzes to show</div>;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <tbody className="divide-y divide-slate-600/50">
        {quizzes.map((quiz) => (
          <QuizItem key={quiz.id} quiz={quiz} />
        ))}
      </tbody>
    );
  }

  return <div>{content}</div>;
};

export default QuizList;
