# Assignment 6 - Post Dashboard

## File Organization

- `src/api/postsApi.js`: data-fetching only (`fetchPosts`), no React or JSX.
- `src/reducer/postsReducer.js`: pure reducer and initial state for async state.
- `src/components/Post.jsx`: presentational component for a single post.
- `src/components/PostList.jsx`: renders the list with `.map()` and stable keys.
- `src/components/FilterForm.jsx`: controlled input for filtering by title.
- `src/App.jsx`: owns state (`useReducer` + filter `useState`) and fetches on mount.
- `src/main.jsx`: app entry point.

## Challenges

- Cleaning up the fetch in `useEffect` with `AbortController` so no state
  update happens after unmount (also handles StrictMode's double mount).
- Keeping filtering as derived state instead of storing filtered posts.
- Handling loading, error, and empty states separately.

## Run

npm install
npm run dev
