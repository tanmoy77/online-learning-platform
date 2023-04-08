import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos'
        }),
        getSingleVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (res, err, arg) => [{type: 'Video', id: arg}]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                dispatch(apiSlice.util.updateQueryData(
                    "getVideos",
                    undefined,
                    (draft) => draft.data.push(data)
                ))
            }
        }),
        editVideo: builder.mutation({
            query: ({id, data}) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (res, err, arg) => [{type: 'Video', id: arg.id}],
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                const {data} = await queryFulfilled;
                // pessimistic update
                if (data?.id) {
                    dispatch(apiSlice.util.updateQueryData(
                        "getVideos",
                        undefined,
                        (draft) => {
                            return draft.map(q => q.id === data.id ? data : q);
                        }
                    ))
                }
            },
            
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                // optimistic update
                const patchResult = dispatch(apiSlice.util.updateQueryData(
                    "getVideos",
                    undefined,
                    (draft) => {
                        return draft.filter(v => v.id !== arg)
                    }
                ))

                try{
                    await queryFulfilled;
                } catch(err) {
                    patchResult.undo();
                }
            }
        }),
        getVideosWithoutQuiz: builder.query({
            async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
                const {data: videos} = await fetchWithBQ('/videos');
                const {data: quizzes} = await fetchWithBQ('/quizzes');
                const videoIdsInQuizzes = quizzes?.map((quiz) => quiz.video_id);
                const videosWithoutQuiz = videos.filter((video) => !videoIdsInQuizzes.includes(video.id));
                return {data: videosWithoutQuiz};
            }
        }),
        getVideo: builder.query({
            // query: (id) => `/videos/${id}`
            async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
                // get a single video with assignment and quiz
                const {data: video, error: videoFetchError} = await fetchWithBQ(`/videos/${id}`);
                if (videoFetchError) return {error: videoFetchError};
                const {data: assignment} = await fetchWithBQ(`/assignments?video_id=${id}`);
                const {data: quiz} = await fetchWithBQ(`/quizzes?video_id=${id}`);
                    return {
                        data: {
                            video,
                            assignment,
                            quiz: quiz?.length > 0 ? true : false,
                        }
                    }
            }   
        })
    })
});

export default videosApi;
export const {useGetVideosQuery, 
    useGetVideosWithoutQuizQuery, 
    useGetSingleVideoQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation,
    useGetVideoQuery} = videosApi;