import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer autoClose={2500} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
