import { UserAuth } from '../context/AuthContext';

const Home = () => {

    const { logOut, user } = UserAuth();
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Home</h1>
            <p>Welcome, {user?.displayName}</p>
            <button onClick={handleSignOut}>
                Logout
            </button>
        </>
    );
}

export default Home;