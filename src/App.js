import React, { useState } from 'react';
import FeedPage from './components/FeedPage';
import LoginPage from './components/LoginPage';
import MyPostsPage from './components/MyPostsPage';
import PremiumPage from './components/PremiumPage';
import FollowingPage from './components/FollowingPage';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isPremiumMember, setIsPremiumMember] = useState(false);

  return (
    <div className="App">
      {authenticated ? (
        <>
        {isPremiumMember? <FeedPage setAuthenticated={setAuthenticated} /> : <PremiumPage/>} 
        {/* { Conditional rendering} */}
          <FeedPage />
          <MyPostsPage />
          <MyPostsPage isPremiumMember = {isPremiumMember}/>
          <FollowingPage/>
        </>
      ) : (
        <><LoginPage setAuthenticated={setAuthenticated} /><LoginPage setAuthenticated={setAuthenticated} setIsPremiumMember={setIsPremiumMember} /></>  
      )}
    </div>
  );
}

export default App;
