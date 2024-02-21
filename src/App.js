import React from 'react';
import Header from "./Header";
import Content from "./Content";
import PreviewPage from "./Preview";  // Make sure to import your PreviewPage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
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
