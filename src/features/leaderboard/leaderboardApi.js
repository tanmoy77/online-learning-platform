import apiSlice from "../api/apiSlice";

const leaderboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaderboard: builder.query({
            async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
                try{
                    const {data: assignmentMarks} = await fetchWithBQ('/assignmentMark');
                    const {data: quizMarks} = await fetchWithBQ('/quizMark');
                    const {data: users} = await fetchWithBQ('/users');
                    const students = users.filter(user => user.role === 'student');

                    // get sum of the different assignment marks by student id
                    const sumAssignMarksBySId = assignmentMarks.reduce((acc, item) => {
                        acc[item.student_id] = acc[item.student_id] || {...item, mark: 0};
                        acc[item.student_id].mark += item.mark;
                        return acc;
                    }, {});
                    const mergedAssignmentMarks = Object.values(sumAssignMarksBySId);
                    // get sum of the different quizzes by student id
                    const sumQuizMarksBySId = quizMarks.reduce((acc, item) => {
                        acc[item.student_id] = acc[item.student_id] || {...item, mark: 0};
                        acc[item.student_id].mark += item.mark;
                        return acc;
                    }, {});

                    const mergedQuizMarks = Object.values(sumQuizMarksBySId);

                    const mergedMarks = students.map((student) => {
                        const assignment = mergedAssignmentMarks.find((item) => item.student_id === student.id) || {mark: 0};
                        const quiz = mergedQuizMarks.find((item) => item.student_id === student.id) || {mark: 0};
                        return {
                            student_id: student.id, 
                            student_name: student.name, 
                            assignMark: assignment.mark, 
                            quizMark: quiz.mark, 
                            total: assignment.mark + quiz.mark}
                    })

                    // sort the mergedMarks descendingly and provide rank
                     const sortedLeaderboardArray = mergedMarks.sort((a, b) => b.total - a.total);
                     let rank = 1;
                     for (let i=0; i<mergedMarks.length; i++) {  
                        if (i>0 && sortedLeaderboardArray[i].total !== sortedLeaderboardArray[i-1].total){
                            rank++;
                        }
                        sortedLeaderboardArray[i].rank = rank;
                     }
                    return {data: sortedLeaderboardArray};
                } catch(err){

                }
                
            }
        })
    })
});

export default leaderboardApi;
export const {useGetLeaderboardQuery} = leaderboardApi;