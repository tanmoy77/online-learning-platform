import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://mock-learning-platform.onrender.com/"
    }),
    tagTypes: ['Quiz', 'Video'],
    endpoints: (builder) => ({

    })
})

export default apiSlice;