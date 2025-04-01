import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";
import ArticleWrapper from "./components/ArticleWrapper.jsx";
import ArticlePage from "./components/ArticlePage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleWrapper />} />
        <Route path="/articles/:article_id" element={<ArticlePage />}/>
      </Routes>
    </>
  );
}

export default App;
