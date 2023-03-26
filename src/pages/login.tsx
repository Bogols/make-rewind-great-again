import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { env } from "~/env.mjs";

type LoginValue = { username: string };
type SocketResponse = { message: string; error: unknown };
function Login() {
  const [socketResponse, setSocketResponse] = useState<SocketResponse>();
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<LoginValue>();
  const router = useRouter();
  const socket = io(env.NEXT_PUBLIC_WEBSOCKET);
  const isLoggedIn = hasCookie("userID");

  useEffect(() => {
    if (isLoggedIn) void router.push("/");
  }, [isLoggedIn, router]);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    const onSocketConnect = () => setIsSocketConnected(true);
    const onSocketDisconnect = () => setIsSocketConnected(false);

    const onSocketResponse = (value: SocketResponse) =>
      setSocketResponse(value);

    socket.on("connect", onSocketConnect);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("response", onSocketResponse);

    return () => {
      socket.off("connect", onSocketConnect);
      socket.off("disconnect", onSocketDisconnect);
      socket.off("response", onSocketResponse);
    };
  }, [isSocketConnected, socket, socketResponse]);

  const onSubmit = (data: LoginValue) => {
    console.log(data);
    if (isSocketConnected) {
      socket.emit("loginUsername", data.username);
    } else {
      console.log("not connected");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-72 flex-col gap-y-5"
      >
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          className="input-bordered input-info input w-full w-full max-w-xs"
        />
        <input
          type="submit"
          value="Login"
          className="btn-outline btn-primary btn-accent btn w-full"
        />
      </form>
    </div>
  );
}

export default Login;
