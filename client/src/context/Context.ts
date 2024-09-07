import { createContext } from 'react';
import { ContextType } from '../types';

const Context = createContext<ContextType>({
  username: null,
  setUsername: () => {},
  userId: null,
  setUserId: () => {}
});

export default Context;