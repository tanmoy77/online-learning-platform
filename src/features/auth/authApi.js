import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;

                localStorage.setItem("auth", JSON.stringify({
                    accessToken: res?.data?.accessToken,
                    user: res?.data?.user
                }))

                dispatch(userLoggedIn(res?.data));
                } catch(err) {
                    // Do nothing here
                }
                
            }
        }),
        adminLogin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try{
                    const {data} = await queryFulfilled;
                    if (data?.user?.role === 'admin') {
                        localStorage.setItem('auth', JSON.stringify({
                            accessToken: data?.accessToken,
                            user: data?.user
                        }));
                        dispatch(userLoggedIn(data))
                    }
                } catch(err) {

                }
            }
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
    
                localStorage.setItem("auth", JSON.stringify({
                    accessToken: res?.data?.accessToken,
                    user: res?.data?.user
                }))
    
                dispatch(userLoggedIn(res?.data));
                } catch(err) {
                    // Do nothing here
                }
            }
        }),
    })
});

export default authApi;
export const {useRegisterMutation, useLoginMutation, useAdminLoginMutation} = authApi;