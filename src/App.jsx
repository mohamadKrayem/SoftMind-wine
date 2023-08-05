import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import RequireAuth from "./layouts/RequireAuth";
import RequireAction from "./layouts/RequireAction";
import Profile from "./pages/Profile/Profile";
import Layout from "./layouts/Layout";
import Search from "./pages/Search/Search";

function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route element={<RequireAction />} >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequireAuth />} >
            <Route path="/Profile" element={<Profile />} />
            <Route element={<Layout />}> 
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home header={"Reds"} end={"/reds"} />} />
              <Route path="/whites" element={<Home header={"Whites"}/>} end={"/whites"} />
              <Route path="/reds" element={<Home header={"Reds"}/>} end={"/reds"} />
              <Route path="/sparkling" element={<Home header={"Sparkling"} />} end={"/sparkling"} />
              <Route path="/rose" element={<Home header={"Rose"}/>} end={"/rose"} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>
        </Routes>
      </Sidebar>
      <ToastContainer />
    </>
  );
}

export default App;
