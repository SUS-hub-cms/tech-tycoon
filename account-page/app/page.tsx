'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/contexts/auth-context'
import { CloudSavesList } from '@/account-page/components/cloud-saves-list'

export default function Page() {
  const { user, login, register, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isRegistering) {
        await register(email, password)
      } else {
        await login(email, password)
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Hardware Tycoon Account Management
        </h1>

        {!user ? (
          <Card className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {isRegistering ? 'Create Account' : 'Login'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {isRegistering ? 'Register' : 'Login'}
              </Button>
              <Button
                type="button"
                variant="link"
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full"
              >
                {isRegistering ? 'Already have an account?' : 'Need an account?'}
              </Button>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Welcome, {user.email}</h2>
              <Button onClick={logout}>Logout</Button>
            </div>
            <CloudSavesList />
          </div>
        )}
      </div>
    </div>
  )
}
