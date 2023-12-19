import { ReactNode } from 'react';

type PublicRouteProps = {
    children?: ReactNode;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    return children;
};

export default PublicRoute;
