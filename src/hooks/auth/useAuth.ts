import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export function useAuth() {
    const [currentUserData, setCurrentUserData] = useState<User | null>(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUserData(user)
        });
    }, []);
    return { currentUserData } as { currentUserData: User };
}
