import { type GetServerSidePropsContext } from "next";
import Cryptr from "cryptr";
import { env } from "~/env.mjs";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { Loader } from "~/components/Loader";
import { useRouter } from "next/router";

type Props = { secret: string };

function setUserCookie(secretString: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (secretString) {
      const secret = secretString.split("-");
      setCookie("user", secret[0]);
      setCookie("userID", secret[1]);
      resolve(true);
    } else {
      reject(new Error("Invalid data"));
    }
  });
}

function ConfirmationPage({ secret }: Props) {
  const [isCookieSaved, setIsCookieSaved] = useState(false);
  const router = useRouter();
  const cryptr = new Cryptr(env.NEXT_PUBLIC_SECRET_KEY);
  const secretString = cryptr.decrypt(secret);

  useEffect(() => {
    if (secretString) {
      void setUserCookie(secretString).then((result) =>
        setIsCookieSaved(result)
      );
    }
    if (isCookieSaved) void router.push("/");
  }, [isCookieSaved, router, secretString]);

  return (
    <div className="h-screen w-screen">
      {isCookieSaved ? (
        <h2 className="text-3xl">Redirecting..</h2>
      ) : (
        <Loader message="Wait.." />
      )}
    </div>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { secret } = context.query;
  return { props: { secret } };
}
export default ConfirmationPage;
