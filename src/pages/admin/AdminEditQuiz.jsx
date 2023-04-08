import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../components/ui/Error";
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from "../../features/quizzes/quizzesApi";
import { useGetVideosWithoutQuizQuery } from "../../features/videos/videosApi";

const AdminEditQuiz = () => {
  const { quizId } = useParams() || {};

  // local states
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

  // query hooks
  const { data: quizForEdit, isSuccess: isGetEditQuizSuccess } =
    useGetQuizQuery(quizId);
  const { data: videos } = useGetVideosWithoutQuizQuery();
  const [
    editQuiz,
    {
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      isError: isEditError,
    },
  ] = useEditQuizMutation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video && question && option1 && option2 && option3 && option4) {
      const data = {
        id: quizId,
        data: {
          question: question,
          // video_id: editQuiz.video.id,
          // video_title: editQuiz.video.title,
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
        },
      };
      editQuiz(data);
    }
  };

  useEffect(() => {
    if (isEditSuccess) {
      navigate("/admin/quizzes");
    }
  }, [isEditSuccess, navigate]);

  useEffect(() => {
    if (isGetEditQuizSuccess) {
      const { question, video_id, video_title, options } = quizForEdit[0] || {};
      setVideo({ id: video_id, title: video_title });
      setQuestion(question);
      setOption1(options[0].option);
      setOption2(options[1].option);
      setOption3(options[2].option);
      setOption4(options[3].option);
      setIsOption1Correct(options[0].isCorrect);
      setIsOption2Correct(options[1].isCorrect);
      setIsOption3Correct(options[2].isCorrect);
      setIsOption4Correct(options[3].isCorrect);
    }
  }, [isGetEditQuizSuccess, quizForEdit]);

  return (
    <div className="a-add-quiz">
      <main className="a-add-quiz-container">
        <div>
          <h1 className="a-quiz-title">Edit Quiz</h1>
          <h2 className="a-quiz-video-title">
            <span>Video: </span>"{video.title}"
          </h2>
        </div>

        <div className="a-add-quiz-form">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                className="cursor-pointer btn btn-cancel w-fit"
                onClick={() => navigate("/admin/quizzes")}
              >
                Cancel
              </button>
              <button
                disabled={isEditLoading}
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Save
              </button>
              {isEditError && (
                <Error message="Adding quiz failed due to network error." />
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminEditQuiz;
