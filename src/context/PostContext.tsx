import React, { createContext, useState, useEffect, ReactNode } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  image: string;
  thumbnail: string;
} 

interface ContextProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  error: string;
}

export const PostContext = createContext<Partial<ContextProps>>({});

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.org/posts");
        if (!response.ok) {
          throw new Error("Posts not found");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


   



  return (
    <PostContext.Provider value={{ posts, setPosts, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};
