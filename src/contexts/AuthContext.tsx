import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type AuthContextTypes = {
    isAuth: boolean;
    setIsAuth: React.Dispatch<SetStateAction<boolean>>;
};
const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export function AuthContextPorvider({ children }: { children: ReactNode }) {
    const isAuthLS: boolean = localStorage.getItem("isAuth") !== null ? JSON.parse(localStorage.getItem('isAuth') || '') : false
    const [isAuth, setIsAuth] = useState<boolean>(isAuthLS);
    
    useEffect(()=>{
        localStorage.setItem('isAuth',JSON.stringify(isAuth))
    },[isAuth])

    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}

//Custonm Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
