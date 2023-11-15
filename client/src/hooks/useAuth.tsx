import { useState, createContext, Dispatch, SetStateAction, ReactNode, useContext, useEffect } from 'react'

interface AuthContext {
        user: {
            username: string;
            isAuthenticated: boolean;
        };
        setUser: Dispatch<SetStateAction<{username: string, isAuthenticated: boolean}>>;
        login: (username: string, password: string) => Promise<void | boolean>;
        logout: () => Promise<boolean>;
}

const AuthContext = createContext();

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<{username: string, isAuthenticated: boolean}>({
        username: '',
        isAuthenticated: false
    })
    
    const getAuthenticated = async () => {
        if (!user.isAuthenticated) {
          const response = await fetch('http://localhost:3000/api/authenticated', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              },
              credentials: 'include',
              })
              .then(res => res.json())
              .then(data => {
                return data
              }
            )
          if (response.status === 'success') {
            setUser({
              username: response.data.username,
              isAuthenticated: true
            })
          } else {
            setUser({
              username: '',
              isAuthenticated: false
            })}
          }
        }
        
      useEffect(() => {
        getAuthenticated()
      }, [user.isAuthenticated])

    const login = async (username: string, password: string) => {
        // make api call to backend to login
        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            }).then(res => res.json())

            if (res.status === 'success') {
                setUser({
                    username: res.username,
                    isAuthenticated: true
                })
            }
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }

    const logout = async () => {
        // make api call to backend to logout
        try {
            const res = await fetch('http://localhost:3000/api/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).then(res => res.json())

            if (res.status === 'success') {
                setUser({
                    username: '',
                    isAuthenticated: false
                })
            }
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
