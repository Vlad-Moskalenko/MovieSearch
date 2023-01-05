import { createContext, useContext, useState } from 'react';

const ErrorStatus = createContext();

export const useError = () => useContext(ErrorStatus);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(false);

  return (
    <ErrorStatus.Provider value={{ error, setError }}>
      {children}
    </ErrorStatus.Provider>
  );
};
