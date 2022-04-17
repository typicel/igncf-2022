import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import PrivateRoute from "../components/PrivateRoute";

function MyApp({ Component, pageProps }) {
  let protectedRoutes = ["/create"];
  return (
    <SessionProvider session={pageProps.session}>
      <PrivateRoute protectedRoutes={protectedRoutes}>
        <Component {...pageProps} />
      </PrivateRoute>
    </SessionProvider>
  );
}

export default MyApp;
