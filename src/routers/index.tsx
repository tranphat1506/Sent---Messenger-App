type Router = [Route] | [];
type Route = {
    path: string;
    page: React.FC;
    layout: React.FC;
    props: any;
};
const publicRoutes: Router = [];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
