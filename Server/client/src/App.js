import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/docs' element={<Editor />} />
      </Routes>
    </>
  );
}

export default App;
