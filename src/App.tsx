import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

const App: React.FC = () => {
  return (
    <>
      <header
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem", textAlign: "center" }}>
          News App
        </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
