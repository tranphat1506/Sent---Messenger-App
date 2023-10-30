import { HomePage } from '../pages/Home';
import { MessengerPage } from '../pages/Messenger';
import DefaultLayout from '../components/Layouts/Default';
type Router = Route[] | [];
type Route = {
    path: string;
    page: React.FC;
    layout: React.FC;
    props: {} | null;
};
const publicRoutes: Router = [
    {
        path: '/',
        page: HomePage,
        layout: DefaultLayout,
        props: null,
    },
    {
        path: '/messages',
        page: MessengerPage,
        layout: DefaultLayout,
        props: { hide: 'footer' },
    },
];

const privateRoutes: Router = [];

export { publicRoutes, privateRoutes };
