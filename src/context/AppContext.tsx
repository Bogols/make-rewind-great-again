import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { type FormValues } from "~/components/PasteForm";
import { hasCookie } from "cookies-next";

interface IAppContext {
  rewind: FormValues[];
  setRewind: Dispatch<SetStateAction<FormValues[]>>;
  isLoggedIn: boolean;
}

function createCtx<ContextType extends object | null>() {
  const ctx = createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const context = useContext(ctx);
    if (context === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return context;
  }
  return [useCtx, ctx.Provider] as const;
}

export const [useAppContext, AppContextProvider] = createCtx<IAppContext>();

function ContextProvider({ children }: { children: ReactNode }) {
  const [rewind, setRewind] = useState<FormValues[]>([]);
  const isLoggedIn = hasCookie("userID");

  const value = { rewind, setRewind, isLoggedIn };

  return <AppContextProvider value={value}>{children}</AppContextProvider>;
}

export default ContextProvider;
