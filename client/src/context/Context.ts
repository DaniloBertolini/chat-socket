import { createContext } from 'react';

type ContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType>({ username: '', setUsername: () => {}, userId: '', setUserId: () => {} });


export default Context;