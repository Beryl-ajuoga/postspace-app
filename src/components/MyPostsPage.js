import React, { useState, useEffect } from 'react';



const MyPostsPage = ({ isPremiumMember }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() => {
    // Fetch user-specific posts from the JSON Placeholder mock API
    if (isPremiumMember) {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((postData) => setMyPosts(postData));
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then((response) => response.json())
        .then((postData) => setMyPosts(postData));
    }
  }, [isPremiumMember]);


  // Function to handle liking posts
  const handleLikePost = (postId) =>{
    fetch('/api/posts/${postId}/like/', {
      method: 'POST',
    })
    .then((response) => response.json())
    .then ((data) =>{

      setMyPosts((prevPosts) =>
      prevPosts.map((post) =>
       post.id === postId ? {...post, likes: post.likes +1 } : post
      )
      );                 
    })
    .catch((error) =>{
      console.error('Error liking post:' , error);
    });
    
  };


   // Getting post comments and fetching comments for specific post from the API
   const getPostComments = (postId) => {
    fetch('/api/posts/${postId}/comments/')
    .then((response) =>response.json())
    .then((commentsData) =>{
      setMyPosts((prevPosts)=>
      prevPosts.map((post) =>
      post.id === postId ? {...post, comments: commentsData } : post
      )
      )

    })
    .catch((error)=>{
      console.error('Error fetching comments:', error);
    });

  };


  //Handling viewing a post and update view count
  const handleViewPost = (postId) => {
    fetch('/api/posts/${postId}/view',{
      method: 'POST',
    })
    .then((response)=> response.json())
    .then((data)=>{
      setMyPosts((prevPosts)=>
      prevPosts.map((post)=>
      post.id === postId ? {...post, view_count: post.view_count +1} : post

      )) 
    }) 
    .catch((error) =>{
      console.error('Error updating view count:', error);
    }
    )
  }

  // function for the  search Query
  const handleSearch = () =>{
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`)
     .then((response) =>response.json())
     .then((postData) => setMyPosts(postData));
  };



  // function for handling the payment making
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


  // Displaying random advertisements
  const getRandomAd = () =>{
    const ads =[
      'Advertisement 1',
      'Advertisement 2',
      'Advertisement 3',
      'Advertisement 4',
      'Advertisement 5',

    ];
    const randomIndex = math.floor(Math.random() *ads.length);
    return ads[randomIndex];
  };


  return (
    <div>
      <h1>My Posts</h1>
      <input
      type='text'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder='Search for posts...'
      />
      <button onClick={handleSearch}>Search</button>

      {/* Advert space */}
      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
        <h3>Explore Advertisements</h3>
        <p>{getRandomAd()}</p>
       </div> 

      {/* Display the user-specific posts */}
      {myPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p>Likes: {post.likes}</p>
          <p>view Count: {post.view_count}</p>

           {/* Display Comments for the post */}
           {post.comments && 
          post.comments.map((comment)=>(
            <div key={comment.id}>
              <p>User: {comment.user}</p>
              <p>Comment: {comment.text}</p>
            </div>

          ))}

          {/* button to lik          <button onClick={() => getPostComments(post.id)}>Show Comments</button>
e and comment post */}
          <button onClick={()=>handleLikePost(post.id)}>Like</button>
    
          {post.comments && 
          post.comments.map((comment)=>(
            <div key={comment.id}>
              <p>User: {comment.user}</p>
              <p>Comment: {comment.text}</p>
            </div>
          ))}

          <button onClick={()=> handleViewPost(post.id)}>View</button>  
        </div>
        
      ))}

      {paymentStatus && <p>{paymentStatus}</p>}
      {!isPremiumMember && <button onClick={handleMakePayment}>Make Payment</button>}
    </div>
  );

};

export default MyPostsPage;
