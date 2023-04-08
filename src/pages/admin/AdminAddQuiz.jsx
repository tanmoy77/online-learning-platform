import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddQuizMutation } from "../../features/quizzes/quizzesApi";
import { useGetVideosWithoutQuizQuery } from "../../features/videos/videosApi";

const AdminAddQuiz = () => {
  const [video, setVideo] = useState({});
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [isOption1Corret, setIsOption1Correct] = useState(false);
  const [isOption2Corret, setIsOption2Correct] = useState(false);
  const [isOption3Corret, setIsOption3Correct] = useState(false);
  const [isOption4Corret, setIsOption4Correct] = useState(false);
  const {
    data: videos,
    isLoading: isGetVideoLoading,
    isError: isGetVideosError,
  } = useGetVideosWithoutQuizQuery();
  const [
    addQuiz,
    { isLoading: addQuizLoading, isError: isAddQuizError, isSuccess },
  ] = useAddQuizMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video && question && option1 && option2 && option3 && option4) {
      const data = {
        question: question,
        video_id: video.id,
        video_title: video.title,
        options: [
          {
            id: 1,
            option: option1,
            isCorrect: isOption1Corret,
          },
          {
            id: 2,
            option: option2,
            isCorrect: isOption2Corret,
          },
          {
            id: 3,
            option: option3,
            isCorrect: isOption3Corret,
          },
          {
            id: 4,
            option: option4,
            isCorrect: isOption4Corret,
          },
        ],
      };
      addQuiz(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/quizzes");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="a-add-quiz">
      <main className="a-add-quiz-container">
        <h1 className="a-add-quiz-title">Add New Quiz</h1>

        <div className="a-add-quiz-form">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label
                for="lws-selectVideo"
                className="text-sm font-medium text-slate-300"
              >
                Select Video
              </label>
              <select
                id="lws-selectVideo"
                name="lws-selectVideo"
                value={video.id || ""}
                required
                onChange={(e) => {
                  const selectedVideo = videos?.find((video) => {
                    return video.id == e.target.value;
                  });
                  setVideo({
                    id: selectedVideo?.id,
                    title: selectedVideo?.title,
                  });
                }}
              >
                <option value="" hidden selected>
                  Select Video
                </option>
                {videos?.map((video) => {
                  return (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="fieldContainer">
              <label for="lws-question">Question</label>
              <input
                required
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label for="lws-option">Option 1</label>
              <div className="add-quiz-option-container">
                <input
                  required
                  type="text"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={isOption1Corret}
                  onChange={(e) => setIsOption1Correct(e.target.checked)}
                />
              </div>
            </div>
            <div className="fieldContainer">
              <label for="lws-option">Option 2</label>
              <div className="add-quiz-option-container">
                <input
                  required
                  type="text"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={isOption2Corret}
                  onChange={(e) => setIsOption2Correct(e.target.checked)}
                />
              </div>
            </div>
            <div className="fieldContainer">
              <label for="lws-option">Option 3</label>
              <div className="add-quiz-option-container">
                <input
                  required
                  type="text"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={isOption3Corret}
                  onChange={(e) => setIsOption3Correct(e.target.checked)}
                />
              </div>
            </div>
            <div className="fieldContainer">
              <label for="lws-option">Option 4</label>
              <div className="add-quiz-option-container">
                <input
                  required
                  type="text"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                />
                <input
                  type="checkbox"
                  checked={isOption4Corret}
                  onChange={(e) => setIsOption4Correct(e.target.checked)}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAddQuiz;
