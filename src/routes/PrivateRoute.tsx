import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PrivateRoute = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
