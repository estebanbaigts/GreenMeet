import React, { useState } from 'react';
import AppNavigator from './components/AppNavigator';
import { UserContext } from './components/MainPage/UserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
};

export default App;
