import React, { useState } from "react";

import {createPost} from '../service/PostService'
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
 
  content: string;
}

function CreatePost() {
  const [posts, setPosts] = useState<Post[]>([]);
 
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({ title: "", content: "" });


    const handleCreatePost = async (

      event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
      try {
        const createdPost = await createPost(post);
        setPosts((prevPosts) => [...prevPosts, createdPost]);
        navigate("/");
      } catch (error) {
        console.error("Error creating post in App:", error);
      }
    };



  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0  mr-10 ml-10 content-center">
      <h1 className="text-center text-2xl font-bold mb-5 mt-5">Create Post</h1>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-5"
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
        />
        <textarea
          value={post.content}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm h-60"
          onChange={(event) =>
            setPost({ ...post, content: event.target.value })
          }
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
