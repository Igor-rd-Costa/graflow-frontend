"use client"

import MainButton from "../components/MainButton";
import FormInput from "../components/FormInput";
import Auth from "@/services/Auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../GlobalContextProvider";


export default function Home() {
  const router = useRouter();
  const {userInfo, setUserInfo} = useContext(AuthContext);

  useEffect(() => {
    if (userInfo !== null) {
      router.push("/editor");
    }
  }, [userInfo])

  const goToLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/login");
  }

  const onRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (event.target === null || (event.target as HTMLElement).id !== 'submitform') {
      return;
    }
    
    const form = event.target as HTMLElement;
    
    const inputs = form.querySelectorAll('input');
    
    const username = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    
    const u = await Auth.Register(username, email, password);
    if (u !== null) {
      setUserInfo({user: u, preferences: {}});
      router.push('/editor');
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center font-mono text-skyBlue">
      <form id="submitform" className="h-auto w-[20rem] bg-darkBright shadow-card p-4 grid gap-4 auto-rows-auto" onSubmit={onRegisterSubmit}>
        <h2 className="text-[2rem] text-center mb-4">Register</h2>
        
        <FormInput label="Username" type="text"></FormInput>
        <FormInput label="Email" type="email"></FormInput>
        <FormInput label="Password" type="password"></FormInput>

        <div className="mt-2">
          <MainButton type="submit">Register</MainButton>
        </div>
        <div className="w-full grid">
          <p className="text-[0.8rem]">Already have an account?</p>
            <MainButton type="button" onClick={goToLogin}>
              Login
            </MainButton>
        </div>
      </form>
    </div>
  )
}