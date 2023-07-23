import React, { useState, useEffect } from 'react';

const MyPostsPage = ({ isPremiumMember }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const tenPosts = myPosts.splice(0,11)

  useEffect(() => {
    // Fetch user-specific posts from the JSON Placeholder mock API
    const fetchPosts = () => {
      const url = isPremiumMember
        ? 'https://jsonplaceholder.typicode.com/posts'
        : 'https://jsonplaceholder.typicode.com/users';

      fetch(url)
        .then((response) => response.json())
        .then((postData) => setMyPosts(postData));
    };

    fetchPosts();
  }, [isPremiumMember]);

  const handleLikePost = (postId) => {
    fetch(`/api/posts/${postId}/like/`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setMyPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };

  const getPostComments = (postId) => {
    fetch(`/api/posts/${postId}/comments/`)
      .then((response) => response.json())
      .then((commentsData) => {
        setMyPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: commentsData } : post
          )
        );
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleViewPost = (postId) => {
    fetch(`/api/posts/${postId}/view`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        setMyPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, view_count: post.view_count + 1 } : post
          )
        );
      })
      .catch((error) => {
        console.error('Error updating view count:', error);
      });
  };

  const handleSearch = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`)
      .then((response) => response.json())
      .then((postData) => setMyPosts(postData));
  };

  const handleMakePayment = () => {
    fetch('/api/make-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 100 }), 
    })
      .then((response) => response.json())
      .then((data) => {
        setPaymentStatus(data.message);
      })
      .catch((error) => {
        setPaymentStatus('Payment failed. Please try again.');
      });
  };
// Getting recommended posts based on likes
  const getRecommendedPosts = () => {
    const sortedPosts = [...myPosts].sort((a, b) => b.likes - a.likes);
    return sortedPosts.slice(0, 5);
  };

  const getRandomAd = () => {
    const ads = [
      'Advertisement 1',
      'Advertisement 2',
      'Advertisement 3',
      'Advertisement 4',
      'Advertisement 5',
    ];
    const randomIndex = Math.floor(Math.random() * ads.length);
    return ads[randomIndex];
  };

  return (
    <div id='my-post-page' className='container'>
      <h1>My Posts</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for posts....."
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
        <h3>Explore Advertisements</h3>
        <p>{getRandomAd()}</p>
      </div>
      {console.log(tenPosts)}

      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
        <h3>Recommended Posts</h3>
        {getRecommendedPosts().map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>Likes: {post.likes}</p>
          </div>
        ))}
      </div>
{isPremiumMember?
      myPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.username}</h3>
          <p>{post.body}</p>
          <p>Likes: {post.likes}</p>
          <p>View Count: {post.view_count}</p>

          {post.comments &&
            post.comments.map((comment) => (
              <div key={comment.id}>
                <p>User: {comment.user}</p>
                <p>Comment: {comment.text}</p>
              </div>
            ))}

          <button onClick={() => handleLikePost(post.id)}>Like</button>
          <button onClick={() => handleViewPost(post.id)}>View</button>
        </div>
      )):tenPosts.map((post)=>{
        <><h3>{post.title}</h3><p>{post.body}</p><p>Likezz: {post.likes}</p><p>Viewss: {post.view_count}</p></>

        {post.comments &&
          post.comments.map((comment) => (
            <div key={comment.id}>
              <p>Beryl: {comment.user}</p>
              <p>Coms: {comment.text}</p>
            </div>
          ))}

      })}

      {paymentStatus && <p>{paymentStatus}</p>}
      {!isPremiumMember && <button onClick={handleMakePayment}>Make Payment</button>}
    </div>
  );
};

export default MyPostsPage;



//var tenPosts = MyPosts.splice(0,11)
//{tenPosts}
//{member }