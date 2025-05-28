"use client";

import { verifyToken } from "@/lib/auth";
import { getToken } from "@/lib/getToken";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Session = {
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

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session>({
    user: null,
  });

  useEffect(() => {
    getToken().then(async (t) => {
      const validToken = await verifyToken(t || "");
      let user = null;
      if (validToken)
        user = { id: validToken.sub, username: validToken.username };
      setSession({ user });
    });
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
