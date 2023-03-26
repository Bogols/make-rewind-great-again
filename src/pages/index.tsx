import { type NextPage } from "next";
import Head from "next/head";

import Layout from "~/components/layout";
import ContextProvider from "~/context/AppContext";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Make Rewind Great Again</title>
        <meta name="description" content="Make Rewind Great Again" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <ContextProvider>
        <div className="flex h-screen w-screen items-center justify-center md:hidden">
          <h1>Nie chciało mi sie w RWD</h1>
        </div>
        <div className="hidden h-screen w-screen items-center justify-center md:flex">
          <Layout />
        </div>
      </ContextProvider>
    </>
  );
};

export default Home;
