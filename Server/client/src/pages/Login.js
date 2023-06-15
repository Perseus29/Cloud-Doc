import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';

const Login = () => {

    const { pre } = UserAuth();
    const navigate = useNavigate();

    const UsersCol = collection(db, 'users');
    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const q = query(UsersCol, where("email", "==", result.user.email));
                getDocs(q)
                    .then((snapshot) => {
                        let el = [];
                        snapshot.docs.forEach((doc) => {
                            el.push({ ...doc.data(), id: doc.id });
                        })
                        if (el.length === 0) {
                            addDoc(UsersCol,{
                                email:result.user.email,
                                docs:[],
                            })
                        }
                    });
                if (pre) {
                    navigate(pre);
                }
                else {
                    navigate('/');
                }

            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };



    return (
        <>
            <h1>Login</h1>
            <GoogleButton onClick={handleGoogleSignIn} />
        </>
    );
}

export default Login;