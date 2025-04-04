import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Header from "./components/Header.jsx";
import ArticleWrapper from "./components/ArticleWrapper.jsx";
import ArticlePage from "./components/ArticlePage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<ArticleWrapper />} />
        <Route exact path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
