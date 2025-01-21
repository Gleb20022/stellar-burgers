import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type TProtectedRoute = {
  unAuthOnly?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  unAuthOnly = false,
  children
}: TProtectedRoute) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  if (!unAuthOnly && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuthOnly && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
