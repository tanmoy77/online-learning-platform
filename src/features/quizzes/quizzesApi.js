import apiSlice from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => '/quizzes'
        }),
        getQuiz: builder.query({
            query: (id) => `/quizzes?id=${id}`,
            providesTags: (result, err, arg) => [{type: 'Quiz', id: arg}]
        }),
        addQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                dispatch(apiSlice.util.updateQueryData(
                    "getQuizzes",
                    undefined,
                    (draft) => draft.data.push(data)
                ))
            }
        }),
        editQuiz: builder.mutation({
            query: ({id, data}) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (res, err, arg) => [{type: 'Quiz', id: arg.id}],
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                // pessimistic update
                if (data?.id) {
                    dispatch(apiSlice.util.updateQueryData(
                        "getQuizzes",
                        undefined,
                        (draft) => {
                            return draft.map(q => q.id === data.id ? data : q);
                        }
                    ))
                }
            },
            
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic update
                const patchResult = dispatch(apiSlice.util.updateQueryData(
                    "getQuizzes",
                    undefined,
                    (draft) => {
                        return draft.filter(q => q.id !== arg)
                    }
                ))

                try{
                    await queryFulfilled;
                } catch(err) {
                    patchResult.undo();
                }
            }
        }),
        submitQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizMark',
                method: 'POST',
                body: data
            })
        }),
        checkQuizExist: builder.query({
            query: ({userId, videoId}) => `/quizMark?student_id=${userId}&video_id=${videoId}`
        })
    })
});

export default quizzesApi;
export const {useGetQuizQuery, 
    useEditQuizMutation, 
    useDeleteQuizMutation, 
    useSubmitQuizMutation, 
    useGetQuizzesQuery, 
    useAddQuizMutation, 
    useCheckQuizExistQuery} = quizzesApi;