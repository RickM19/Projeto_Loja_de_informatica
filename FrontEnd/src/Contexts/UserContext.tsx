import { createContext, useState, type ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

type UserContextType = {
    user: User | null; // Onde 'User' é o tipo do seu objeto de usuário
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const defaultState = {
    user: {
        id: "",
        name: "",
        email: ""
    },
    setUser: (user: User) => {}
} as UserContextType;

export const UserContext = createContext<UserContextType>(defaultState);

type userProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: userProviderProps) {
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: ""
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
