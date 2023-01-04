import { createContext, useContext, useState } from 'react';

const RequestStatus = createContext();

export const useStatus = () => useContext(RequestStatus);

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState('success');

  return (
    <RequestStatus.Provider value={{ status, setStatus }}>
      {children}
    </RequestStatus.Provider>
  );
};
