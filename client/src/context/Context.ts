import { createContext } from 'react';
import { ContextType } from '../types';

const Context = createContext<ContextType>({ username: '', setUsername: () => {}, userId: '', setUserId: () => {} });


export default Context;