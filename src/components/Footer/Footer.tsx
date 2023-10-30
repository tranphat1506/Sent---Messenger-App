import Container from '../Common/Container';

type FooterProps = {};
const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div
            id="footer"
            className="dark:bg-[#222] dark:border-[#222] border-t-2 py-4"
        >
            <Container>
                <h1 className="dark:text-white text-center">
                    2023 &copy; lechautranphat@gmail.com
                </h1>
            </Container>
        </div>
    );
};

export default Footer;
