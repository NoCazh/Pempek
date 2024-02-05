import "@/styles/globals.css";
// import { store, wrapper } from "../stores/store";
// import { Provider } from "react-redux";
import { store, persistor } from "../stores/store";
import withRedux from "next-redux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Raleway } from "next/font/google";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

const raleway = Raleway({ subsets: ["latin"] });

function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    // <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <div className={`    ${raleway.className}`}>
          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
    </PersistGate>
    // </Provider>
  );
}

const makeStore = () => store;
export default withRedux(makeStore)(App);
