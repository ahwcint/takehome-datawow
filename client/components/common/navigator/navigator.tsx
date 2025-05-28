"use client";
import { PropsWithChildren } from "react";
import SignInBtn from "../auth/sign-in-button";
import { useSession } from "@/context/session-provider";
import { usePathname } from "next/navigation";
import Paper from "../paper/paper";

export default function Navigator({ children }: PropsWithChildren) {
  const { session } = useSession();

  const pathName = usePathname();
  const isAuthPage = pathName.startsWith("/auth");
  return (
    <>
      {!isAuthPage && (
        <header className="bg-main-1 h-[3rem] shrink-0 flex items-center px-4">
          <p className="text-base-2">A Board</p>
          {!session.user && (
            <div className="w-[5rem] ml-auto">
              <SignInBtn redirect username={undefined} />
            </div>
          )}
        </header>
      )}
      <Paper className="grow">{children}</Paper>
    </>
  );
}
