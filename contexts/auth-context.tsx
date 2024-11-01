'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth'
import { auth } from '@/config/firebase'

export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  metadata?: {
    creationTime: string;
  };
}

export interface UpdateUserProfileData {
  displayName?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  updateUserProfile: (data: UpdateUserProfileData) => Promise<void>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          metadata: {
            creationTime: firebaseUser.metadata?.creationTime || ''
          }
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    setUser({
      id: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      metadata: {
        creationTime: userCredential.user.metadata?.creationTime || ''
      }
    })
  }

  const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    setUser({
      id: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      metadata: {
        creationTime: userCredential.user.metadata?.creationTime || ''
      }
    })
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  const updateUserProfile = async (data: UpdateUserProfileData) => {
    // Implement updateUserProfile logic
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        updateUserProfile,
        logout,
        login,
        register,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
