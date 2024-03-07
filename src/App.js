import React from "react";
import "./css/App.css";
import Header from "./components/Header";
import Content from "./Content";
import PreviewPage from "./PreviewPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MindARScene from "./mindArScene";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header title="Content Management System" />
              <Content />
            </div>
          }
        />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/mindar-scene/:targetId" element={<MindARScene />} />
        {/* <Route path="/mindar-scene" component={MindARScene} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
