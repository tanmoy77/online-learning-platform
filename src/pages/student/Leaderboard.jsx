import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/nav/Navbar";
import { useGetLeaderboardQuery } from "../../features/leaderboard/leaderboardApi";

const Leaderboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: leaderboard, isLoading } = useGetLeaderboardQuery();
  const currentUserRank = leaderboard?.find(
    (student) => student.student_id === user.id
  );
  console.log(currentUserRank);

  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {currentUserRank?.rank}
                  </td>
                  <td className="table-td text-center font-bold">
                    {currentUserRank?.student_name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {currentUserRank?.quizMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {currentUserRank?.assignMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {currentUserRank?.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard?.slice(0, 20)?.map((student) => {
                  const {
                    rank,
                    student_id,
                    student_name,
                    assignMark,
                    quizMark,
                    total,
                  } = student || {};
                  return (
                    <tr
                      className={
                        student_id === user.id
                          ? "border-2 border-white-600/50"
                          : "border-b border-slate-600/50"
                      }
                      key={student_id}
                    >
                      <td className="table-td text-center">{rank}</td>
                      <td className="table-td text-center">{student_name}</td>
                      <td className="table-td text-center">{quizMark}</td>
                      <td className="table-td text-center">{assignMark}</td>
                      <td className="table-td text-center">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
