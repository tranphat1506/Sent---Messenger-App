import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type DefaultLayoutProps = {
    children?: React.ReactNode;
};
const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};

export default DefaultLayout;
