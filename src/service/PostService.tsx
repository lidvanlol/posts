//import axios from "axios";

const API_URL = "https://jsonplaceholder.org/posts";

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

interface Create {
  title: string;
  content: string;
 
}
interface Edit {
  title: string;
  content: string;
  id: number;
}



// export const getPosts = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// export const getPost = async (id: number) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// export const createPost = async (post: { title: string; content: string }) => {
//   const response = await axios.post(API_URL, post);
//   return response.data;
// };

// export const updatePost = async (
//   id: number,
//   post: { title: string; content: string }
// ) => {
//   const response = await axios.put(`${API_URL}/${id}`, post);
//   return response.data;
// };

// export const deletePost = async (id: number) => {
//   await axios.delete(`${API_URL}/${id}`);
// };


export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }

 
};
 
export const getPost = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/${postId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post with ID ${postId}`);
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
};

export const createPost = async (newPost: Create): Promise<Post> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const createdPost = await response.json();
    return createdPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (postId: number, updatedPost: Edit): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error(`Failed to update post with ID ${postId}`);
    }

    const modifiedPost = await response.json();
    return modifiedPost;
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};