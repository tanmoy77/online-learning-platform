import apiSlice from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignments: builder.query({
            query: () => '/assignments'
        }),
        getAssignment: builder.query({
            query: (id) => `/assignments/${id}`,
            providesTags: (res, err, arg) => [{type: 'Assignment', id: arg}]
        }),
        getVideosWithoutAssignment: builder.query({
            async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
                const {data: videos} = await fetchWithBQ('/videos');
                const {data: assignments} = await fetchWithBQ('/assignments');
                const videoIdsInAssignments = assignments?.map((assignment) => assignment.video_id);
                const videosWithoutAssignment = videos.filter((video) => !videoIdsInAssignments.includes(video.id));
                return {data: videosWithoutAssignment};
            }
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                dispatch(apiSlice.util.updateQueryData(
                    "getAssignments",
                    undefined,
                    (draft) => draft.data.push(data)
                ))
            }
        }),
        editAssignment: builder.mutation({
            query: ({id, data}) => ({
                url: `/assignments/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (res, err, arg) => [{type: 'Assignment', id: arg.id}],
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                // pessimistic update
                if (data?.id) {
                    dispatch(apiSlice.util.updateQueryData(
                        "getAssignments",
                        undefined,
                        (draft) => {
                            return draft.map(a => a.id === data.id ? data : a);
                        }
                    ))
                }
            },
            
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic update
                const patchResult = dispatch(apiSlice.util.updateQueryData(
                    "getAssignments",
                    undefined,
                    (draft) => {
                        return draft.filter(a => a.id !== arg)
                    }
                ))

                try{
                    await queryFulfilled;
                } catch(err) {
                    patchResult.undo();
                }
            }
        }),
        getAssignmentMarks: builder.query({
            query: () => '/assignmentMark'
        }),
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: '/assignmentMark',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                dispatch(apiSlice.util.updateQueryData(
                    "getAssignmentMarks",
                    undefined,
                    (draft) => draft.data.push(data)
                ))
            }
        }),
        editAssignmentMark: builder.mutation({
            query: ({id, data}) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                // pessimistic update
                if (data?.id) {
                    dispatch(apiSlice.util.updateQueryData(
                        "getAssignmentMarks",
                        undefined,
                        (draft) => {
                            return draft.map(q => q.id === data.id ? data : q);
                        }
                    ))
                }
            },
            
        }),
        checkAssignmentExist: builder.query({
            query: ({userId, assignmentId}) => `/assignmentMark?student_id=${userId}&assignment_id=${assignmentId}`,
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // console.log('arg: ', arg)
            }
        })
    })
});

export default assignmentsApi;
export const {useGetAssignmentsQuery, 
    useGetAssignmentQuery,
    useGetVideosWithoutAssignmentQuery,
    useAddAssignmentMarkMutation, 
    useAddAssignmentMutation, 
    useDeleteAssignmentMutation,
    useEditAssignmentMarkMutation,
    useEditAssignmentMutation,
    useGetAssignmentMarksQuery,
    useCheckAssignmentExistQuery
} = assignmentsApi;