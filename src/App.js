import React, { useState } from 'react';
import FeedPage from './components/FeedPage';
import LoginPage from './components/LoginPage';
import MyPostsPage from './components/MyPostsPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {authenticated ? (
        <>
          <FeedPage />
          <MyPostsPage />
        </>
      ) : (
        <LoginPage setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}
   

export default App;


