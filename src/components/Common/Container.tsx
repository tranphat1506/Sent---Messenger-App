import clsx from 'clsx';

const Container: React.FC<{
    children?: React.ReactNode;
    className?: string;
}> = ({ children, className }) => {
    return (
        <div className={clsx('max-w-screen-2xl mx-auto w-full', className)}>
            {children}
        </div>
    );
};

export default Container;
