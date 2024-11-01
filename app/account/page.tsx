'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Cloud, User, Settings } from "lucide-react"
import { useAuth } from '@/contexts/auth-context'
import { CloudSavesList } from '@/components/cloud-saves-list'
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"
import { ApiService } from '@/services/api-service'
import Image from 'next/image'

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  metadata?: {
    creationTime: string;
  };
}

interface UpdateUserProfileData {
  displayName?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  updateUserProfile: (data: UpdateUserProfileData) => Promise<void>;
  logout: () => Promise<void>;
}

export default function AccountManagement() {
  const { user, updateUserProfile, logout } = useAuth() as AuthContextType
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('cloud-saves')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Form states
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    newPassword: '',
    confirmPassword: '',
    avatar: undefined as string | undefined
  })

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || ''
      }))
    }
  }, [user])

  if (!user) {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Account Required</h1>
          <p className="mb-4">Please log in to access account management.</p>
          <Link href="/">
            <Button>Return to Game</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'avatar' && files && files[0]) {
      // Convert image to base64
      const file = files[0]
      if (file.size > 500000) { // 500KB limit
        toast({
          title: "Error",
          description: "Image size should be less than 500KB",
          variant: "destructive"
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setFormData(prev => ({ ...prev, avatar: base64String }))
      }
      reader.readAsDataURL(file)
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (name === 'newPassword') {
      setShowConfirmPassword(value.length > 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate passwords match if changing password
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive"
        })
        return
      }

      // Update profile
      await updateUserProfile({
        displayName: formData.displayName,
        email: formData.email,
        password: formData.newPassword || undefined,
        avatar: formData.avatar
      })

      toast({
        title: "Success",
        description: "Profile updated successfully"
      })

      // Reset password fields
      setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }))
      setShowConfirmPassword(false)

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.header 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2 text-blue-300">Account Management</h1>
            <p className="text-gray-400">Manage your profile, saves, and settings</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center bg-transparent border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Game
            </Button>
          </Link>
        </motion.header>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="mb-8 bg-gray-800">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center"
              >
                {user.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt={user.displayName || 'User avatar'} 
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-gray-900" />
                )}
              </motion.div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold mb-1 text-blue-300">{user.displayName || 'Anonymous User'}</h2>
                <p className="text-gray-400 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since: {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="cloud-saves" className="data-[state=active]:bg-blue-500 data-[state=active]:text-gray-900">
              Cloud Saves
            </TabsTrigger>
            <TabsTrigger value="account-settings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-gray-900">
              Account Settings
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="cloud-saves">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-blue-300">
                      <Cloud className="mr-2 h-6 w-6" /> Cloud Saves
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CloudSavesList />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account-settings">
                <Card className="bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl text-blue-300">
                      <Settings className="mr-2 h-6 w-6" /> Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Label htmlFor="displayName" className="text-sm font-medium text-gray-300">Display Name</Label>
                        <Input 
                          id="displayName"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </motion.div>

                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">New Password</Label>
                        <Input 
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </motion.div>

                      <AnimatePresence>
                        {showConfirmPassword && (
                          <motion.div 
                            className="space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                              Confirm Password
                            </Label>
                            <Input 
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Label htmlFor="avatar" className="text-sm font-medium text-gray-300">Avatar Image</Label>
                        <Input 
                          id="avatar"
                          name="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleInputChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </motion.div>

                      <div className="flex justify-between space-x-4">
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-500 text-gray-900 hover:bg-blue-600"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={logout}
                          className="flex-1"
                        >
                          Logout
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <Separator className="my-8 bg-gray-700" />

        <footer className="text-center text-gray-400">
          <p>&copy; 2024 Hardware Tycoon. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  )
}
