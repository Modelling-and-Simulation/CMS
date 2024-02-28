import React from 'react';
import './css/App.css';
import Header from "./components/Header";
import Content from "./Content";
import PreviewPage from "./PreviewPage";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/storage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header title='Content Management System'/>
              <Content />
            </div>
          }
        />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
