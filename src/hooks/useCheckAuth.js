import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

const useCheckAuth = () => {
    const [checkAuth, setCheckAuth] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const localAuth = localStorage.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn(auth))
            }
        }
        setCheckAuth(true);
    }, [dispatch])
  return checkAuth;
}

export default useCheckAuth