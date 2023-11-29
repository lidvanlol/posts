import React, { useContext, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const Posts: React.FC = () => {
  const { posts, loading, error,setPosts } = useContext(PostContext);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

   const deletePost = async (id: number) => {
     try {
       await fetch(`https://jsonplaceholder.org/posts/${id}`, {
         method: "DELETE",
       });
       if(setPosts !== undefined){
        setPosts((prevPosts: any) =>
          prevPosts.filter((post: any) => post.id !== id)
        );
       }
     } catch (error) {
       console.error("Failed to delete post:", error);
     }
   };

  // Filter posts
  const filteredPosts =
    posts &&
    posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    );

  // Sort posts
  const sortedPosts =
    filteredPosts &&
    filteredPosts.sort((a: any, b: any) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      } else if (sort === "content") {
        return a.content.localeCompare(b.content);
      } else if (sort === "status") {
        return a.status.localeCompare(b.status);
      } else if (sort === "category") {
        return a.category.localeCompare(b.category);
      } else {
        return a.id - b.id;
      }
    });


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    sortedPosts && sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const goToFirstPage = () => setCurrentPage(1);


  const goToLastPage = () => {
    if (sortedPosts !== undefined) {
      setCurrentPage(Math.ceil(sortedPosts.length / postsPerPage));
    }
  };


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="relative isolate overflow-hidden bg-white  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0  mr-10 ml-10">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
      />
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

      <Link
        to={`/create`}
        className="text-blue-500 hover:underline pb-2 visited:text-purple-600"
      >
       Create New Post
      </Link>

      {currentPosts &&
        currentPosts.map((post: any) => (
          <div
            key={post.id}
            className="p-4 border-b border-gray-200 mb-5 mt-5 border-solid border-2 p-5"
          >
            <Link
              to={`/post/${post.id}`}
              className="text-blue-500 hover:underline pb-2 visited:text-purple-600"
            >
              {post.title}
            </Link>
            <h4>{post.content}</h4>
            <h5>{post.id}</h5>
            <p className="mt-2 mb-2">Post Category: {post.category}</p>
            <p className="mb-2">Post Status: {post.status}</p>
            <img src={post.image} className="w-30 h-20 mt-5 mb-5" alt="img" />
            <img
              src={post.thumbnail}
              className="w-30 h-30 mb-5 mt-5"
              alt="img"
            />

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
          </div>
        ))}

      <div className="flex">
        <button
          onClick={goToFirstPage}
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400 "
          disabled={currentPage === 1}
        >
          First
        </button>

        {sortedPosts &&
          Array.from(
            { length: Math.ceil(sortedPosts.length / postsPerPage) },
            (_, number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100   dark:hover:bg-neutral-700  ${
                  currentPage === number + 1 ? "bg-gray-500 " : "bg-gray-200"
                }`}
              >
                {number + 1}
              </button>
            )
          )}

        <button
          onClick={goToLastPage}
          className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          disabled={
            sortedPosts &&
            currentPage === Math.ceil(sortedPosts.length / postsPerPage)
          }
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Posts;

