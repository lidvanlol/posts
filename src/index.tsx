import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PostProvider } from "./context/PostContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Post, Posts,CreatePost,EditPost } from "./pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PostProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />

        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  </PostProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
