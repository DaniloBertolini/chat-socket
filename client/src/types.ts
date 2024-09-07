import { Socket } from "socket.io-client";

export type LoginProps = {
  setSocket: (socket: Socket) => void;
  setUserId: (id: string) => void;
}

export type ChatProps = {
  socket?: Socket | null
}

export type Message = {
  content: string;
  author: string;
  authorId: string;
}

export type ContextType = {
  username: string | null;
  userId: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}