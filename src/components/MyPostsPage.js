import React, { useState, useEffect } from 'react';

const MyPostsPage = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // Fetch user-specific posts from the JSON Placeholder mock API
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1') // Replace '1' with the actual user ID after login
      .then((response) => response.json())
      .then((postData) => setMyPosts(postData));
  }, []);

  return (
    <div> 
      <h1>My Posts</h1>
      {/* Display the user-specific posts */}
      {myPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
