import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";
import CourseDescSection from "../../components/student/coursePlayer/CourseDescSection";
import VideoPlayer from "../../components/student/coursePlayer/VideoPlayer";
import VideoList from "../../components/student/coursePlayer/videoListSection/VideoList";
import Error from "../../components/ui/Error";
import {
  useGetVideoQuery,
  useGetVideosQuery,
} from "../../features/videos/videosApi";

const CoursePlayer = () => {
  const { id } = useParams() || {};
  const [videoRequest, setVideoRequest] = useState(false);
  const {
    data: videos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetVideosQuery();

  const {
    data,
    isLoading: isVideoLoading,
    isError: isVideoError,
  } = useGetVideoQuery(id, { skip: !videoRequest });

  const { video, assignment, quiz } = data || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && videos?.length > 0 && !id) {
      navigate(`/course/${videos[0].id}`);
    }
  }, [isSuccess, videos, navigate, id]);

  useEffect(() => {
    if (id) {
      setVideoRequest(true);
    }
  }, [id]);

  // Decide what to render
  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <div>No videos available</div>;
  }
  if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <VideoPlayer videoSrc={video?.url} title={video?.title} />
          <CourseDescSection
            video={video}
            assignment={assignment}
            quiz={quiz}
          />
        </div>
        <VideoList videos={videos} />
      </div>
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

export default CoursePlayer;
