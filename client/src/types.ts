import { Socket } from "socket.io-client";

export type LoginProps = {
  setSocket: (socket: Socket) => void
  setUserId: (id: string) => void;
}

export type ChatProps = {
  socket: Socket | null
}

export type MessagesType = {
  content: string;
  author: string;
  authorId: string;
}

export type ContextType = {
  username: string;
  userId: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}