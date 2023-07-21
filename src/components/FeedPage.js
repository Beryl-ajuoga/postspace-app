import React, { useState, useEffect } from 'react';


const FeedPage = ({setAuthenticated}) =>{
    //State to store the post and user data
    const[posts, setPosts]=useState([]);
    const [user, setUser]= useState({});


    useEffect(() =>{

    //Fetched user data from the JSON Placeholder mock API
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((userData) => setUser(userData));


    //Fetched posts from the JSON Placeholder mock API
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) =>response.json())
    //limited post views to 20 for free users
    .then((postData)=> setPosts(postData.slice(0,20)));

    }, []);


    return(
        <div> 
            <h1>Welcome to Feeds!!</h1>
            <h2>Hello, {user.name}</h2>
            <h3>Enter Email : {user.email}</h3>
            <button onClick={() =>setAuthenticated(false)}>Logout</button>
            {/* {DISPLAY POSTS} */}
            {posts.map((post)=>(
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>   
            )
            )}
        </div>
    );
};

export default FeedPage;