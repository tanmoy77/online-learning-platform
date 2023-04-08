import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../components/ui/Error";
import {
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from "../../features/assignments/assignmentsApi";

const AdminEditAssignment = () => {
  const { assignmentId } = useParams() || {};
  // local State
  const [video, setVideo] = useState({});
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  // query hooks
  const { data: assignmentForEdit, isSuccess: isAssignmentFetchSuccess } =
    useGetAssignmentQuery(assignmentId);
  const [
    editAssignment,
    {
      isLoading: isEditAssignmentLoading,
      isError: isEditAssignmentError,
      isSuccess,
    },
  ] = useEditAssignmentMutation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video !== {} && title && totalMark) {
      editAssignment({
        id: assignmentId,
        data: {
          title,
          totalMark: Number(totalMark),
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignment");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isAssignmentFetchSuccess) {
      const { video_id, video_title, title, totalMark } =
        assignmentForEdit || {};
      setVideo({ id: video_id, title: video_title });
      setTitle(title);
      setTotalMark(totalMark);
    }
  }, [isAssignmentFetchSuccess, assignmentForEdit]);

  return (
    <div className="a-add-quiz">
      <main className="a-add-quiz-container">
        <div>
          <h1 className="a-quiz-title">Edit Assignment</h1>
          <h2 className="a-quiz-video-title">
            <span>Video: </span>"{video.title}"
          </h2>
        </div>

        <div className="a-add-quiz-form">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label for="lws-question">Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label for="lws-option">Total Mark</label>
              <input
                required
                type="text"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>
            <div className="text-right">
              <button
                className="cursor-pointer btn btn-cancel w-fit"
                onClick={() => navigate("/admin/assignment")}
              >
                Cancel
              </button>
              <button
                disabled={isEditAssignmentLoading}
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Save
              </button>
              {isEditAssignmentError && (
                <Error message="couldn't add assignment due to network error." />
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminEditAssignment;
