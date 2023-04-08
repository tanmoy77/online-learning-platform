import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddVideoMutation } from "../../features/videos/videosApi";

const AdminAddVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  const [
    addVideo,
    { isLoading: isAddVideoLoading, isError: isAddVideoError, isSuccess },
  ] = useAddVideoMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      title,
      description,
      url,
      views,
      duration,
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/videos");
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
                disabled={isAddVideoLoading}
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

export default AdminAddVideo;
