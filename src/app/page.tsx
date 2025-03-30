"use client"

import { useContext, useEffect } from "react";
import { AuthContext } from "./GlobalContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      router.push("/editor");
    }
  }, [user])

  return (
    <div>
    </div>
  );
}
