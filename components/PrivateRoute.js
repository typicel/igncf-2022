import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (status !== "loading" && !session && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push("api/auth/signin");
    }
  }, [status, session, pathIsProtected]);

  if ((status === "loading" || !session) && pathIsProtected) {
    return <div></div>;
  }

  return children;
}
