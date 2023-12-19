import BottomLoginCard from '@/src/components/BottomLoginCard';
import useAuthStore from '@/src/hooks/useAuthStore';
import { Link } from 'react-router-dom';

type HomePageProps = {};
const HomePage: React.FC<HomePageProps> = () => {
    const [authStore, dispatchAuthStore] = useAuthStore();
    return (
        <div className="h-[1000px] dark:bg-[#2c2c2c] pt-20">
            {!authStore?.isLogging && <BottomLoginCard />}
            <Link to="/messages" className="dark:text-white">
                Messages
            </Link>
        </div>
    );
};

export default HomePage;
