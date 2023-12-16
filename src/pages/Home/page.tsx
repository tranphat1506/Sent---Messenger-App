import BottomLoginCard from '@/src/components/BottomLoginCard';
import useAuthStore from '@/src/hooks/useAuthStore';

type HomePageProps = {};
const HomePage: React.FC<HomePageProps> = () => {
    const [authStore, dispatchAuthStore] = useAuthStore();
    return (
        <div className="h-[1000px] dark:bg-[#2c2c2c]">
            {!authStore?.isLogging && <BottomLoginCard />}
        </div>
    );
};

export default HomePage;
