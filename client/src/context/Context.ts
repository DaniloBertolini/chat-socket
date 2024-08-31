import { createContext } from 'react';

type ContextType = {
  username: React.RefObject<HTMLInputElement> | null;
  userId: string | null;
}

const Context = createContext<ContextType>({ username: null, userId: null });

export default Context;