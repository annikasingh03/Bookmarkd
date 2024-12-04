import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Card from './components/Card';
import Review from './components/Review'



import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from './components/profile';

function App() {
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path = "review" element = {<Review />} />
      <Route path = "profile" element = {<Profile />} />

    </Routes>
    </BrowserRouter>
   

    </>
  );
}

export default App;


