import { useEffect, useReducer, useState } from "react";
import { fetchPosts } from "./api/postsApi";
import { postsReducer, initialState } from "./reducer/postsReducer";
import FilterForm from "./components/FilterForm";
import PostList from "./components/PostList";

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState("");
  const { posts, loading, error } = state;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        if (err.name === "AbortError") return;
        dispatch({ type: "FETCH_ERROR", payload: err.message });
      }
    }

    loadPosts();

    return () => controller.abort();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div>
      <h1>Post Dashboard</h1>
      <FilterForm value={filter} onChange={setFilter} />

      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && filteredPosts.length === 0 && (
        <p>No posts found.</p>
      )}
      {!loading && !error && filteredPosts.length > 0 && (
        <PostList posts={filteredPosts} />
      )}
    </div>
  );
}

export default App;
