import { Box } from '@mui/material';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import styled from '@emotion/styled';

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

    useEffect(() => {
        const quillServer = new Quill('#container', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
    }, []);

    return (
        <Box style={{'display':'flex' , 'justifyContent':'space-evenly','backgroundColor':'#f5f5f5'}}>
            <h1 style={{'marginTop':'0' }} >Name</h1>
            <Component>
                <Box id='container' className='container'>
                </Box>
            </Component>
            <h1 style={{'marginTop':'0'}}>Profile</h1>
        </Box>
    );
}

export default Editor;