import React from "react";
// import { Store } from 'redux';
import "flowbite";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import Main from "./pages/Main/main";

import Dashboard from "./pages/Dashboard/dashboard";
import Business from "./pages/Business/business";
import NavbarQstn from "./assets/components/NavbarQstn/NavbarQstn";
import FooterQstn from "./assets/components/FooterQstn";
import Badd from "../src/pages/Business/badd";
import Layout from "./pages/Layout";
import Surveys from "./pages/Business/Surveys";
import CreateSurvey from "./pages/Business/CreateSurvey";
import SurveysObjectives from "./pages/Business/SurveysObjectives";
import UploadMedia from "./pages/media/uploadMedia/UploadMedia";

// import { Provider } from "react-redux";
// import { Store } from "./store/store";

// import "react-notifications/lib/notifications.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="minters" element={<Minters></Minters>} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route index element={<Dashboard />} />
          <Route path="business" element={<Business />} />
          <Route path="badd" element={<Badd />} />
          <Route path="survey-list" element={<Surveys />} />
          <Route path="create-survey" element={<CreateSurvey />} />
          <Route path="surveys-objectives" element={<SurveysObjectives />} />
          <Route path="upload-media" element={<UploadMedia />} />
        </Route>
        <Route path="/main" element={<Main></Main>} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
