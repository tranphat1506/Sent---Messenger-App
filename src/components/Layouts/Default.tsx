import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type DefaultLayoutProps = {
    children?: React.ReactNode;
    hide?: ['footer' | 'header'];
};
const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    return (
        <>
            {props.hide?.includes('header') ? <></> : <Header />}
            {props.children}
            {props.hide?.includes('footer') ? <></> : <Footer />}
        </>
    );
};

export default DefaultLayout;
