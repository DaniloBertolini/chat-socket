import { createContext } from 'react';

type ContextType = {
  username: React.RefObject<HTMLInputElement> | null;
}

const Context = createContext<ContextType>({ username: null });

export default Context;