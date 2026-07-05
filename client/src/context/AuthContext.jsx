import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [member, setMember] = useState(() => {

    const saved = localStorage.getItem("member");

    return saved ? JSON.parse(saved) : null;

  });

  const [token, setToken] = useState(

    localStorage.getItem("token")

  );

  const [loading] = useState(false);

  const login = (memberData, jwt) => {

    localStorage.setItem("token", jwt);

    localStorage.setItem(

      "member",

      JSON.stringify(memberData)

    );

    setToken(jwt);

    setMember(memberData);

  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("member");

    setToken(null);

    setMember(null);

  };

  return (

    <AuthContext.Provider

      value={{

        member,

        token,

        loading,

        login,

        logout

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth(){

    return useContext(AuthContext);

}