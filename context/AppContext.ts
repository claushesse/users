import React, { useContext } from 'react';
// setting up the context

export const AppContext = React.createContext<any>(undefined);

export const useAppContext = () => useContext<any>(AppContext);
