import React, { useState, useContext } from "react";
import { PostContext } from "../context/PostContext";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { setPosts, loading, error } = useContext(PostContext);

  const addPost = async () => {
    const response = await fetch("https://jsonplaceholder.org/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const post = await response.json();

    if (setPosts !== undefined) {
      setPosts((prevPosts) => [post, ...prevPosts]);
    }

    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0  mr-10 ml-10 content-center">
      <h2 className="text-center text-2xl font-bold mb-5 mt-5">
        Create New Post
      </h2>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded mt-1 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-5"
      />
      <textarea
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded mt-1 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-60"
      />
      <button
        onClick={addPost}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Post
      </button>
    </div>
  );
};

export default CreatePost;
