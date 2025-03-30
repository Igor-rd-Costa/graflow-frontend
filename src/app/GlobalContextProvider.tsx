import React, { createContext, useEffect, useState } from "react";
import Auth, { User } from "@/services/Auth";
import Http from "@/services/Http";
import PopUpLayer from "./components/popUps/PopUpLayer";

function initServices() {
  Http.Init();
  Auth.Init();
}

export type AuthContextType = {
  user: User|null,
  setUser: (value: User|null) => void
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

export default function GlobalContextProvider({children} : {children?: React.ReactNode}) {

  const [user, setUser ] = useState<User|null>(null);

  useEffect(() => {
    initServices();
    Auth.User().then(u => {
      if ((u === null && user === null) || (user?.id === u?.id)) {
        return;
      }
      setUser(u);
    });
  });
  
  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        <PopUpLayer>
          {children}
        </PopUpLayer>
      </AuthContext.Provider>
    </>
  )
}