"use client"

import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import User from "@/interfaces/user";
import {
    getUser,
    userLogout,
} from "@/services/userService";
import {get} from "@jridgewell/set-array";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface AuthContextType {
    auth:{
        user: User | null,
        setUser: (user: User | null) => void,
        logout: () => Promise<void> 
    }
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    //Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser : User | null = await getUser();
            if (fetchedUser) {
                setUser(fetchedUser);
            }
        };
        fetchUser();
    }, []);
    
    //Logout function, clears user state and calls the logout service
    const logout = async () => {
        try {
            await userLogout();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            router.push("/");
        }
    }

    //Memorize context value to prevent re-renders
    const value: AuthContextType = useMemo(() => ({
            auth: { user, setUser, logout },
        }), [user]
    );

    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>);
}

export const useUser = (): AuthContextType => {
    const context: AuthContextType | undefined = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within the context");
    }

    return context;
}

