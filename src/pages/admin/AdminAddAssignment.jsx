import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../components/ui/Error";
import {
  useAddAssignmentMutation,
  useGetVideosWithoutAssignmentQuery,
} from "../../features/assignments/assignmentsApi";

const AdminAddAssignment = () => {
  const [video, setVideo] = useState({});
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  const [
    addAssignment,
    {
      isLoading: isAddAssignmentLoading,
      isError: isAddAssignmentError,
      isSuccess,
    },
  ] = useAddAssignmentMutation();

  const {
    data: videos,
    isLoading: isGetVideoLoading,
    isError: isGetVideosError,
  } = useGetVideosWithoutAssignmentQuery();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (video !== {} && title && totalMark) {
      addAssignment({
        video_id: video.id,
        video_title: video.title,
        title,
        totalMark: Number(totalMark),
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/assignment");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="a-add-quiz">
      <main className="a-add-quiz-container">
        <h1 className="a-add-quiz-title">Add New Video</h1>

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
                disabled={isAddAssignmentLoading}
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Submit
              </button>
              {isAddAssignmentError && (
                <Error message="couldn't add assignment due to network error." />
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAddAssignment;
