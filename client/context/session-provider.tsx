"use client";

import { getToken } from "@/lib/getToken";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Session = {
  alive: boolean;
};

type SessionContextType = {
  session: Session;
  setSession: (session: Session) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>({
    alive: false,
  });

  useEffect(() => {
    getToken().then((t) => setSession({ alive: !!t }));
  }, []);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within a SessionProvider");
  return context;
};
