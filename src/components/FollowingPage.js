import React, { useState, useEffect } from 'react';

const FollowingPage = () => {
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from users the authenticated user is following (Replace '1,2,3' with the actual user IDs)
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1,2,3') // Replace '1,2,3' with the actual user IDs of those the user is following
      .then((response) => response.json())
      .then((postData) => setFollowingPosts(postData));
  }, []);

  return (
    <div>
      <h1>Following</h1>
      {/* Display posts from users the authenticated user is following */}
      {followingPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowingPage;
