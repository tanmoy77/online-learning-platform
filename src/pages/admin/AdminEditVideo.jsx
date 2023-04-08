import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../components/ui/Error";
import {
  useEditVideoMutation,
  useGetSingleVideoQuery,
} from "../../features/videos/videosApi";

const AdminEditVideo = () => {
  const { videoId } = useParams() || {};

  // local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  // query hooks
  const [
    editVideo,
    { isLoading: isEditVideoLoading, isError: isEditVideoError, isSuccess },
  ] = useEditVideoMutation();
  const { data: videoForEdit, isSuccess: isVideoFetchSuccess } =
    useGetSingleVideoQuery(videoId);
  console.log(videoForEdit);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id: videoId,
      data: {
        title,
        description,
        url,
        views,
        duration,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isVideoFetchSuccess) {
      const { id, title, description, duration, views, url } =
        videoForEdit || {};
      setTitle(title);
      setDescription(description);
      setDuration(duration);
      setViews(views);
      setUrl(url);
    }
  }, [isVideoFetchSuccess, videoForEdit]);

  return (
    <div className="a-add-quiz">
      <main className="a-add-quiz-container">
        <h1 className="a-add-quiz-title">Edit Video</h1>

        <div className="a-add-quiz-form">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label
                for="lws-selectVideo"
                className="text-sm font-medium text-slate-300"
              >
                Title
              </label>
              <input
                id="lws-selectVideo"
                name="lws-selectVideo"
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label for="lws-question">Description</label>
              <input
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label for="lws-option">Url</label>
              <input
                required
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="fieldContainer">
              <label for="lws-option">Views</label>
              <input
                required
                type="text"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
            <div className="fieldContainer">
              <label for="lws-option">Duration</label>
              <input
                required
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="text-right">
              <button
                className="cursor-pointer btn btn-cancel w-fit"
                onClick={() => navigate("/admin/videos")}
              >
                Cancel
              </button>
              <button
                disabled={isEditVideoLoading}
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Submit
              </button>
              {isEditVideoError && (
                <Error message="couldn't save the changes due to server error." />
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminEditVideo;
