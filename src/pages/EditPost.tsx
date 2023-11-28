import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../service/PostService";

interface Post {
  id: number;
  title: string;
  content: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>({ id: 0, title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(Number(id));
      setPost(post);
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   

    try {
      await updatePost(Number(id), post);
      if (!updatePost) {
        throw new Error("Could not be completed");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 container mx-auto  mr-10 ml-10 content-center">
      <h1 className="text-center text-2xl font-bold mb-5 mt-5">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
        />
        <input
          className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          value={post.content}
          onChange={(event) =>
            setPost({ ...post, content: event.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
