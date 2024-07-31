import React from "react";
import Login from "./components/Logins";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Post from "./components/Posts";
import UpdatePosts from "./components/UpdatePost";
import Navbar1 from "./components/Navbar1";
import IsNotAuthenticated from "./components/IsNotAuthenticated";
import IsAuthenticated from "./components/IsAuthenticated";

// import IsNotAuthenticated from "./components/IsNotAuthenticated.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route element={<IsNotAuthenticated />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
        <Route element={<Navbar1 />}>
          <Route element={<IsAuthenticated />}></Route>
          <Route path="/post" element={<Profile />} />
          <Route path="/createPost" element={<Post />} />
          <Route path="/updatePost/:id" element={<UpdatePosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
