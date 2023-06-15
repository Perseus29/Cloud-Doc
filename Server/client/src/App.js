import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './Protected';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Protected> <Home /> </Protected>} />
          <Route path='/login' element={<Login />} />
          <Route path='/docs' element={<Protected> <Editor /> </Protected>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
