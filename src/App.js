import React from 'react';
import './css/App.css';
import Header from "./components/Header";
import Content from "./Content";
import PreviewPage from "./PreviewPage";  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MindARScene from './mindArScene';

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
        <Route path="/mindar-scene/:contentId/:targetId" element={<MindARScene />} />
        {/* <Route path="/mindar-scene" component={MindARScene} /> */}
      </Routes>
    </Router>
  );
}

export default App;
