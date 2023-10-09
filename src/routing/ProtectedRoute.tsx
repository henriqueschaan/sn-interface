import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    if (!!localStorage.getItem('token')) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" />;
    }
}
