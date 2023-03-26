import ChatView from "./ChatView";
import PasteForm from "./PasteForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppContext } from "~/context/AppContext";

function Layout() {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) void router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <>
      <PasteForm />
      <ChatView />
    </>
  );
}

export default Layout;
