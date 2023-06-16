import { UserAuth } from '../context/AuthContext';
import { addDoc, collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TiDocumentAdd } from 'react-icons/ti'
import { AiFillDelete } from 'react-icons/ai'
import { doc, deleteDoc } from "firebase/firestore";

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

        if (newDocName === "") {
            return;
        }

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

        setNewDocName("");
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

    const handleDelete = async (docId) =>{
        await deleteDoc(doc(db, "docs", docId));              
    }

    return (
        <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '2%' }}>
            <div className='home'>
                <h1>CloudDoc</h1>
                <button type="button" class="btn btn-secondary text-center" onClick={handleSignOut}>Logout</button>
            </div>
            <h2 style={{ marginTop: '3%', fontWeight: '600', marginBottom: '3%' }} >
                Welcome! {user.displayName}
            </h2>
            <div class="modal fade" id="Create-Doc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" >
                    <div class="modal-content style={{backgroundColor:'gray'}}">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel" style={{fontWeight:'700'}}>Create New Document</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-body">
                                <div class="mb-3 row">
                                    <label for="inputDescription" class="col-sm-12 col-form-label" style={{fontWeight:'700'}}>Name of Document:</label>
                                    <div class="col">
                                        <input type="text" class="form-control" id="inputdescription" value={newDocName} onChange={(e) => { setNewDocName(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addDocument} >Add Document</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row row-cols-md-3 rows-cols-sm-1 row-cols-lg-4 g-4'>
                <div className='col' style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#Create-Doc">
                    <div className='card h-100 text-center'>
                        <div className='card-body'>
                            <h5 className='card-title ' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                <TiDocumentAdd style={{ marginTop: '2.5%'}} /> 
                                <div style={{ marginTop: '3.5%', marginLeft: '1%' }}>Create New Document</div>
                            </h5>
                        </div>
                    </div>
                </div>
                {documents && documents.map((object) => (
                    <div className='col' key={object.id}>
                        <div className='card h-100 text-center'>
                            <div className='card-body'>
                                <div className='card-title' style={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                    <Link to={`/docs/${object.id}`} style={{ width: '80%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' , marginTop:'2%' ,fontStyle: "none", textDecoration: "none" ,fontSize:'1.5em' ,color:'#333' }} >{object.name}</Link>
                                    <div style={{display:'flex' , alignItems:'center' ,cursor:'pointer' , marginTop:'2.5%'}}><AiFillDelete onClick={()=>{handleDelete(object.id)}}/></div> 
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div >
    );
}

export default Home;