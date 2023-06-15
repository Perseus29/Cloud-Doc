import { Box } from '@mui/material';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { db } from '../firebase';
import { auth } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';


const Component = styled.div`
    background: #f5f5f5;
    width:70%;
    margin-top:5px;
`


const Editor = () => {

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const [valid, setValid] = useState(false);
    const [load, setLoad] = useState(true);
    const [docName,setDocName] = useState();


    const { id } = useParams();
    const UsersCol = collection(db, 'users');

    useEffect(() => {
        const docRef = doc(db, "docs", id);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    setValid(true);
                    setDocName(docSnap.data().name)
                    if (auth.currentUser) {
                        const q = query(UsersCol, where("email", "==", auth.currentUser.email));
                        getDocs(q)
                            .then((snapshot) => {
                                let uid = snapshot.docs[0].id;
                                const userRef = doc(db, "users", uid);
                                updateDoc(userRef, {
                                    docs: arrayUnion({
                                        id: id,
                                        name: docSnap.data().name
                                    })
                                })
                            });
                    }
                } else {
                    setLoad(false);
                }
            });
    }, [])

    useEffect(() => {
        if (valid) {
            const quillServer = new Quill('#container', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            quillServer.disable();
            quillServer.setText('Loading the document...');
            setQuill(quillServer);
        }

    }, [valid]);

    useEffect(() => {
        if (valid) {
            const socketServer = io('http://localhost:3002');
            setSocket(socketServer);

            return () => {
                socketServer.disconnect();
            }
        }
    }, [valid]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta, oldData, source) => {
            if (source !== 'user') return;

            socket && socket.emit('send-changes', delta);
        }

        quill && quill.on('text-change', handleChange);

        return () => {
            quill && quill.off('text-change', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta) => {
            quill.updateContents(delta);
        }

        socket && socket.on('receive-changes', handleChange);

        return () => {
            socket && socket.off('receive-changes', handleChange);
        }
    }, [quill, socket]);

    useEffect(()=>{
        if( quill === null || socket === null ) return;

        socket && socket.once('load-document' , document => {
            quill && quill.setContents(document);
            quill &&  quill.enable();
        });

        socket && socket.emit('get-document',id);
    },[quill,socket,id])

    useEffect(()=>{
        if(socket === null || quill === null) return ;

        const interval = setInterval(() => {
            socket && socket.emit('save-document' , quill.getContents())
        },2000);

        return () => {
            clearInterval(interval);
        }

    },[socket,quill]);



    return (
        <>
            {valid ?
                <Box style={{ 'display': 'flex', 'justifyContent': 'space-evenly', 'backgroundColor': '#f5f5f5' }}>
                    <h2 style={{ 'marginTop': '0.5%', 'width': '10%', 'marginLeft': '0', 'marginRight': '0', display: 'flex', justifyContent: 'center' }} >{docName}</h2>
                    <Component>
                        <Box id='container' className='container'>
                        </Box>
                    </Component>
                    <h2 style={{ 'marginTop': '0.5%', 'width': '10%', 'marginLeft': '0', 'marginRight': '0', display: 'flex', justifyContent: 'center' }}><Link to={'/'} style={{textDecoration:'none'}}>CloudDoc</Link></h2>
                </Box>
                :
                load ? <h1> Loading</h1> :
                    <h1>Wrong Url</h1>
            }
        </>
    );
}

export default Editor;