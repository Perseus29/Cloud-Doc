import { UserAuth } from '../context/AuthContext';
import { addDoc, collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const [newDocName, setNewDocName] = useState("");

    const [run, setRun] = useState(false);

    const { logOut, user } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    const DocsCol = collection(db, 'docs');
    const UsersCol = collection(db, 'users');

    const addDocument = () => {
        addDoc(DocsCol, {
            name: newDocName,
            text: "",
        })
            .then((result) => {
                const newId = result.id;
                const q = query(UsersCol, where("email", "==", user.email));
                getDocs(q)
                    .then((snapshot) => {
                        let uid = snapshot.docs[0].id;
                        const userRef = doc(db, "users", uid);
                        updateDoc(userRef, {
                            docs: arrayUnion({
                                id: newId,
                                name: newDocName
                            })
                        })
                            .then(() => {
                                setRun(!run);
                            })
                    });
            })
    }




    const [documents, setDocuments] = useState()

    useEffect(() => {
        const UsersCol = collection(db, 'users');
        const q = query(UsersCol, where("email", "==", `${user.email}`));
        getDocs(q)
            .then((snapshot) => {
                let el = [];
                snapshot.docs.forEach((doc) => {
                    el.push({ ...doc.data() });
                })
                if (el.length !== 0) {
                    setDocuments(el[0].docs);
                }
            });
    }, [run, user]);

    return (
        <>
            <h1>Home</h1>
            <p>Welcome, {user.displayName}</p>
            <div>
                <label htmlFor="doc-imp">Enter New Document Name: </label>
                <input type="text" id='doc-inp' onChange={(e) => { setNewDocName(e.target.value) }} style={{ margin: '15px' }} />
                <button onClick={addDocument}>Add Document</button>
            </div>

            <div className="orgss" style={{ display: "flex", overflowX: "auto" }}>
                {documents && documents.map((object) => (
                    <Link to={`/docs/${object.id}`} style={{ fontStyle: "none", marginLeft: "3%", textDecoration: "none" }} key={object.id}>
                        <div className="org-details"  style={{ backgroundColor: '#e1e6e1' }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <h4>{object.name}</h4>
                            </div>
                        </div>
                    </Link>

                ))}
            </div >
            <button onClick={handleSignOut}>
                Logout
            </button>
        </>
    );
}

export default Home;