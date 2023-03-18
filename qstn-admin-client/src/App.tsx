import React from "react";
// import { Store } from 'redux';
import "flowbite";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import Main from "./pages/Main/main";
import Minters from "./pages/Minters/Minters";
import Dashboard from "./pages/Dashboard/dashboard";
import Business from "./pages/Business/business";
import NavbarQstn from "./assets/components/NavbarQstn/NavbarQstn";
import FooterQstn from "./assets/components/FooterQstn";
import Badd from "../src/pages/Business/badd";

// import { Provider } from "react-redux";
// import { Store } from "./store/store";

// import "react-notifications/lib/notifications.css";

function App() {
  return (
    <BrowserRouter>
      <NavbarQstn />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business" element={<Business />} />
        <Route path="/badd" element={<Badd />} />
        <Route path="" element={<Login></Login>} />
        <Route path="main" element={<Main></Main>} />
        <Route path="minters" element={<Minters></Minters>} />
      </Routes>
      <FooterQstn />
    </BrowserRouter>
  );
}

export default App;
