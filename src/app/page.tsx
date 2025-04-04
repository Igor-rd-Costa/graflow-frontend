"use client"

import { useContext, useEffect } from "react";
import { AuthContext } from "./GlobalContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    if (userInfo !== null) {
      router.push("/editor");
    }
  }, [userInfo])

  return (
    <div>
    </div>
  );
}
