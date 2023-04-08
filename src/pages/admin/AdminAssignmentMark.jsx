import React, { useState } from "react";
import AdminNavbar from "../../components/nav/AdminNavbar";
import Error from "../../components/ui/Error";
import {
  useEditAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from "../../features/assignments/assignmentsApi";

const AdminAssignmentMark = () => {
  // local state
  const [inputMark, setInputMark] = useState("");

  // query hooks
  const [
    editAssignmentMark,
    { isLoading: isEditAssignMarkLoading, isSuccess: isEditAssginMarkSuccess },
  ] = useEditAssignmentMarkMutation();

  let formattedDate = "";
  let formattedTime = "";

  const {
    data: assignmentMarks,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssignmentMarksQuery();

  const handleSubmit = (id) => {
    console.log("id", id);
    editAssignmentMark({
      id,
      data: {
        mark: Number(inputMark),
        status: "published",
      },
    });
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <Error message="couldn't load due to network error." />;
  }
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <div>No assignments found.</div>;
  }
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Assignment</th>
            <th className="table-th">Date</th>
            <th className="table-th">Student Name</th>
            <th className="table-th">Repo Link</th>
            <th className="table-th">Mark</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {assignmentMarks?.map((assignMark) => {
            const {
              id,
              title,
              student_name,
              repo_link,
              createdAt,
              status,
              mark,
            } = assignMark || {};
            if (createdAt) {
              const date = new Date(Date.parse(createdAt));
              formattedDate = new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(date);
              formattedTime = date.toLocaleString().split(",")[1];
            }
            return (
              <tr key={id}>
                <td className="table-td">{title}</td>
                <td className="table-td">
                  {formattedDate}
                  {formattedTime}
                </td>
                <td className="table-td">{student_name}</td>
                <td className="table-td">{repo_link}</td>
                {status === "pending" && (
                  <td className="table-td input-mark">
                    <input
                      required
                      max="300"
                      value={inputMark}
                      onChange={(e) => setInputMark(e.target.value)}
                    />
                    <button
                      disabled={isEditAssignMarkLoading}
                      onClick={() => handleSubmit(id)}
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </button>
                  </td>
                )}
                {status === "published" && <td className="table-td">{mark}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMarks?.length}</span>
              </li>
              <li>
                Pending{" "}
                <span>
                  {
                    assignmentMarks?.filter((a) => a.status === "pending")
                      .length
                  }
                </span>
              </li>
              <li>
                Mark Sent{" "}
                <span>
                  {
                    assignmentMarks?.filter((a) => a.status === "published")
                      .length
                  }
                </span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAssignmentMark;
