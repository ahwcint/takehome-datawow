'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Session = {
  user: {
    username: string;
    id: string;
  } | null;
};

type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: Session;
}) => {
  const [session, setSession] = useState<Session>({ user: initialValue.user });
  return (
    <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within a SessionProvider');
  return context;
};
