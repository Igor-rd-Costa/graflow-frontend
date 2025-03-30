'use client'
import MainButton from "../components/MainButton";
import FormInput from "../components/FormInput";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../GlobalContextProvider";
import Auth from "@/services/Auth";

export default function Home() {
  
  const router = useRouter();
  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      router.push("/editor");
      return;
    }
  }, [user])

  const goToRegister = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/register");
  };


  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (event.target === null || (event.target as HTMLElement).id !== 'submitform') {
      return;
    }
  
    const form = event.target as HTMLElement;
    
    const inputs = form.querySelectorAll('input');
  
    const username = inputs[0].value;
    const password = inputs[1].value;
  
    const u = await Auth.Login(username, password);
    if (u !== null) {
      setUser(u);
      router.push("/editor");
    } else {
      console.log("Bad login!");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center font-mono text-skyBlue">
      <form id="submitform" className="h-auto w-[20rem] bg-darkBright shadow-card p-4 grid gap-4 auto-rows-auto" onSubmit={onLoginSubmit}>
        <h2 className="text-[2rem] text-center mb-4">Login</h2>
        <FormInput label="Username" type="text"></FormInput>
        <FormInput label="Password" type="password"></FormInput>
        
        <div className="mt-2">
          <MainButton type="submit">Login</MainButton>
        </div>
        <div className="w-full grid">
          <p className="text-[0.8rem]">Don't have an account?</p>
            <MainButton type="button" onClick={goToRegister}>
              Register
            </MainButton>
        </div>  
      </form> 
    </div>
  )
}