import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PublicRoute = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return user ? <Navigate to="/conversations/1" /> : <Outlet />;
};

export default PublicRoute;
