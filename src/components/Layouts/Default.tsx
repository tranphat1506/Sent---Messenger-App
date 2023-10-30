import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type DefaultLayoutProps = {
    children?: React.ReactNode;
    hide?: 'footer' | 'header';
};
const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    return (
        <>
            {props.hide === 'header' ? <></> : <Header />}
            {props.children}
            {props.hide === 'footer' ? <></> : <Footer />}
        </>
    );
};

export default DefaultLayout;
