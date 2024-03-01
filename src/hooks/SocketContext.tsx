import React, { createContext, useContext, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Poll, Option } from '../models/Poll';

import io from 'socket.io-client';

interface SocketContextData {
  polls: Record<string, Poll>;
  getPollById: (id: string) => Poll | undefined;
}

interface SocketResponse {
  type: string;
  data: any;
}

const SocketContext = createContext<SocketContextData>({
  polls: {},
  getPollById: () => undefined,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [polls, setPolls] = useState<Record<string, Poll>>({});

  useEffect(() => {
    const socketInstance = io('http://localhost:3003');

    socketInstance.on('voteUpdate', (response: SocketResponse) => {
      setPolls((prevPolls) => ({
        ...prevPolls,
        [response.data.id]: {
          id: response.data.id,
          title: response.data.title,
          options: response.data.options.map((option: Option) => ({
            ...option,
            votesCount: option.votesCount,
          })),
        },
      }));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const getPollById = (id: string): Poll | undefined => {
    return polls[id];
  };

  return (
    <SocketContext.Provider value={{ polls, getPollById }}>
      {children}
    </SocketContext.Provider>
  );
};
