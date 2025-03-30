"use client"
import Auth from "@/services/Auth";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "./GlobalContextProvider";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter();
  const {user, setUser} = useContext(AuthContext);

  const logout = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (await Auth.Logout()) {
      setUser(null);
      router.push("/login");
    }
  }

  return (
    <header
      className="h-[3rem] w-full font-mono bg-skyBlue grid grid-cols-[10%_1fr_10%]">
        <div className="col-start-2 grid grid-cols-[auto_1fr_auto]">
          <h1 className="font-bold text-[1.3rem] text-white content-center cursor-pointer">
            <Link href="/">Graflow</Link>
          </h1>

          <div></div>
          
          <div className="content-center items-center flex gap-4 text-[0.9rem]">
            {user === null 
            ?<>
              <button className=" cursor-pointer hover:text-white ">
                <Link href="/login">Login</Link>
              </button>
              <button className="hover:text-white cursor-pointer">
                <Link href="/register">Register</Link>
              </button>
            </>
            :<>
              <button className="hover:text-white cursor-pointer" onClick={logout}>
                Logout
              </button>
            </>}
          </div>
        </div>
      </header>
  )
}