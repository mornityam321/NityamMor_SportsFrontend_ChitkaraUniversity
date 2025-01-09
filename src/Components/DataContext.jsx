import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  
  return (
    <DataContext.Provider value={{ articles, setArticles }}>
      {children}
    </DataContext.Provider>
  );
};
