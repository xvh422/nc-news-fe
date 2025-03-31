import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";
import ArticleWrapper from "./components/ArticleWrapper.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleWrapper />} />
      </Routes>
    </>
  );
}

export default App;
