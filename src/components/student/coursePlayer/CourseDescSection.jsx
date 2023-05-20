import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAddAssignmentMarkMutation,
  useCheckAssignmentExistQuery,
} from "../../../features/assignments/assignmentsApi";

const CourseDescSection = ({ video, assignment, quiz }) => {
  const navigate = useNavigate();
  const { title, createdAt, description } = video || {};
  const { user } = useSelector((state) => state.auth) || {};

  // console.log("assignment", assignment);

  // local state
  const [modalIsOpen, setIsOpen] = useState(false);
  const [gitRepo, setGitRepo] = useState("");
  const [checkAssignmentRequest, setCheckAssignmentRequest] = useState(false);
  const [checkQuizRequest, setCheckQuizRequest] = useState(false);

  // query hooks
  const [addAssignmentMark, { isLoading, isSuccess }] =
    useAddAssignmentMarkMutation();
  const { data: checkAssignment } = useCheckAssignmentExistQuery(
    {
      userId: user?.id,
      assignmentId: assignment?.length > 0 && assignment[0]?.id,
    },
    { skip: !checkAssignmentRequest }
  );
  const { data: checkQuiz } = useCheckAssignmentExistQuery(
    {
      userId: user?.id,
      assignmentId: video?.id,
    },
    { skip: !checkAssignmentRequest }
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let formattedDate = "";

  if (createdAt) {
    const date = new Date(Date.parse(createdAt));
    formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(8,14,27)",
    },
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    addAssignmentMark({
      student_id: user.id,
      student_name: user.name,
      assignment_id: assignment[0].id,
      title: assignment[0].title,
      createdAt: new Date(),
      totalMark: assignment[0].totalMark,
      mark: 0,
      repo_link: gitRepo,
      status: "pending",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (assignment?.length > 0 && assignment[0]?.id) {
      setCheckAssignmentRequest(true);
    }
  }, [assignment]);

  useEffect(() => {
    if (video?.id) {
      setCheckQuizRequest(true);
    }
  }, [video]);

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {formattedDate || ""}
      </h2>

      <div className="flex gap-4">
        {assignment?.length > 0 && (
          <>
            <button
              onClick={openModal}
              disabled={checkAssignment?.length > 0}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              {checkAssignment?.length > 0
                ? "এসাইনমেন্ট জমা দিয়েছেন"
                : "এসাইনমেন্ট"}
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h1
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Submit your assignment
              </h1>
              <div className="a-add-quiz-form">
                <form onSubmit={handleSubmitAssignment} className="space-y-6">
                  <div className="fieldContainer">
                    <label for="lws-option">Git Repository</label>
                    <input
                      required
                      type="text"
                      value={gitRepo}
                      onChange={(e) => setGitRepo(e.target.value)}
                    />
                  </div>
                  <div className="text-right">
                    <button className="cursor-pointer btn btn-primary w-fit">
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </>
        )}
        {quiz && (
          <button
            disabled={checkQuiz?.length > 0}
            onClick={() => navigate(`/quiz/${video?.id}`)}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            {checkQuiz?.length > 0 ? "কুইজ দিয়েছেন" : "কুইজে অংশগ্রহণ করুন"}
          </button>
        )}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
};

export default CourseDescSection;
