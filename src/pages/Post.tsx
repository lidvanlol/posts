import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  category: string;
  status: string;
  content: string;
  image: string;
  thumbnail: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  comment: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.org/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., redirect to a not-found page
      }
    };
    
      const fetchComments = async () => {
        try {
          const response = await fetch("https://jsonplaceholder.org/comments");
          if (!response.ok) {
            throw new Error("Comment not found");
          }
          const data: Comment[] = await response.json();
          setComments(data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchUsers = async () => {
        try {
          const response = await fetch(
            "https://jsonplaceholder.org/users"
          );
          if (!response.ok) {
            throw new Error("Comment not found");
          }
          const data: User[] = await response.json();
          setUsers(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchComments();
      fetchUsers();
      fetchPost();


  }, [id]);



 const getUserInfo = (userId: number): User | undefined => {
   return users.find((user) => user.id === userId);
 };

 const getCommentsForPost = (postId: number): Comment[] => {
   return comments.filter((comment) => comment.postId === postId);
 };


  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0  mr-10 ml-10 content-center">
      {post ? (
        <div>
          <h2 className="mt-2 mb-5 text-center">{post.title}</h2>
          <p className="mt-2 mb-2">{post.content}</p>
          <p className="mt-2 mb-2">Category: {post.category}</p>
          <p className="mt-2 mb-2">Status: {post.status}</p>
          <p className="text-gray-500 mt-2 mb-2">
            by {getUserInfo(post.id)?.name}
          </p>
          <div className="mt-5 mb-5">
            <h4 className="text-sm font-bold">Comments:</h4>
            <ul>
              {getCommentsForPost(post.id).map((comment) => (
                <li key={comment.id} className="ml-4">
                  <p className="text-gray-600">{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PostDetails;
