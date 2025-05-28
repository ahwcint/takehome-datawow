"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/context/session-provider";
import { signInApi } from "@/service/user.service";
import { useRouter } from "next/navigation";

export default function SignInBtn({
  username,
  redirect = false,
}: {
  username: string | undefined;
  redirect?: boolean;
}) {
  const { setSession } = useSession();
  const router = useRouter();
  const handleSingIn = () => {
    if (redirect) return router.replace("/auth");

    if (username)
      signInApi({ username: username }).then((user) => {
        setSession({ user });
        router.replace("/dashboard");
      });
  };
  return (
    <Button className="w-full font-semibold bg-base-6" onClick={handleSingIn}>
      Sign in
    </Button>
  );
}
