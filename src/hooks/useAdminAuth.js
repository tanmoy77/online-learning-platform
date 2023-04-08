import { useSelector } from 'react-redux';

const useAdminAuth = () => {
    const auth = useSelector(state => state.auth);

    if (auth?.accessToken && auth?.user && auth?.user?.role === 'admin')
        return true;
    return false;
}

export default useAdminAuth