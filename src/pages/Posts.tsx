import React, { useState, useEffect, ChangeEvent } from "react";
import { Link,useNavigate } from "react-router-dom";


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


const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");



  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.org/posts");
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data: Post[] = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

   

   
    fetchPosts();
 
  }, []);

  // console.log(posts);
  // console.log(comments);
  // console.log(users);

  useEffect(() => {
    // Apply filter
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.content.toLowerCase().includes(filter.toLowerCase()) ||
        post.category.toLowerCase().includes(filter.toLowerCase()) ||
        post.status.toLowerCase().includes(filter.toLowerCase())
    );

    const sorted = sortBy
      ? [...filtered].sort((a, b) => {
          if (
            sortBy === "category" ||
            sortBy === "status" ||
            sortBy === "title" ||
            sortBy === "content"
          ) {
            return (a[sortBy] as string).localeCompare(b[sortBy] as string);
          } else if (sortBy === "id") {
            return String(a[sortBy]).localeCompare(String(b[sortBy]));
          } else {
            return 0;
          }
        })
      : filtered;

    setFilteredPosts(sorted);
  }, [posts, filter, sortBy]);

  // Calculate current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle input change for filtering
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Handle sorting change
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const createPost = () => {
     
    navigate('/create')
   
  };

 

  const deletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };


  const goToFirstPage = () => setCurrentPage(1);

  // Go to the last page
  const goToLastPage = () =>
    setCurrentPage(Math.ceil(filteredPosts.length / postsPerPage));


  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0  mr-10 ml-10 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Posts</h2>

      {/* Filtering */}

      <div className="mb-4  ">
        <input
          className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 	 "
          id="search"
          type="text"
          placeholder="Search by title or content"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      {/* <input
        type="text"
        placeholder="Filter by title"
        value={filter}
        onChange={handleFilterChange}
        className="border p-2 mb-4"
      /> */}

      <div className="inline-block relative w-64 mb-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          <option value="id">Id</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="content">Content</option>
          <option value="status">Status</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      
      <br/>
     <button onClick={createPost}>
           Create new Post
     </button>
    
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id} className="mb-5 mt-5 border-solid border-2 p-5">
            <Link
              to={`/post/${post.id}`}
              className="text-blue-500 hover:underline pb-2 visited:text-purple-600"
            >
              {post.title}
            </Link>
            <h4>{post.content}</h4>
            <p className="mt-2 mb-2">Post Category: {post.category}</p>
            <p className="mb-2">Post Status: {post.status}</p>
            <img src={post.image} className="w-30 h-20 mt-5 mb-5" alt="img"/>
            <img src={post.thumbnail} className="w-30 h-30 mb-5 mt-5" alt="img"/>
          

            <Link
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              to={`/edit/${post.id}`}
            >
              Edit
            </Link>

            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex">
        <div className="flex justify-between mt-4">
          <button
            onClick={goToFirstPage}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 "
            disabled={currentPage === 1}
          >
            First
          </button>

          {Array.from(
            { length: Math.ceil(filteredPosts.length / postsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100   dark:hover:bg-neutral-700  ${
                  currentPage === index + 1 ? "bg-blue-500 " : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={goToLastPage}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            disabled={
              currentPage === Math.ceil(filteredPosts.length / postsPerPage)
            }
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
