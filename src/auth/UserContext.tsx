import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from '../../firebaseConfig.ts'

interface UserContextType {
  user: User | null
  loading: boolean
}

interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext<UserContextType>({user: null, loading: true})

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={{user, loading}}>{children}</UserContext.Provider>
}



