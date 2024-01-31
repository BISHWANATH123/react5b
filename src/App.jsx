
import React, { useState, useEffect } from 'react';
import PostItem from './components/PostItem';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevClick = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}

{/* <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>
        Previous
      </button>
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button> */}
    
    <button onClick={handlePrevClick} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasMore}>
        Next
      </button>
    
    
    </div>
  );
};

export default App;
