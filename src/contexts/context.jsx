// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUsername] = useState('');
  const [option,setOption] = useState('all');

  return (
    <UserContext.Provider value={{ userName, setUsername , option, setOption}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
