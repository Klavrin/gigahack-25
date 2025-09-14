import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import axios from 'axios'
import { LoaderCircle, BadgeInfo } from 'lucide-react'

interface ProfileProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  supabase: any
}

const Profile = ({ isOpen, setIsOpen, supabase }: ProfileProps) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const userData = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${res.data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUser(userData.data)
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
        <div className="flex items-center justify-center h-screen">
          <LoaderCircle className="animate-spin" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 mb-8">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/farmer-avatar.jpg" alt="Farmer Profile Picture" />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}{' '}
              {user.verified && <BadgeInfo className="inline-block ml-2 text-blue-500" />}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {/* Sustainable Farmer | Crop Enthusiast | Livestock Caretaker */}
              <span className="font-bold">IDNO:</span> {user.businessId} |{' '}
              <span className="font-bold">Email:</span> {user.email} |{' '}
              <span className="font-bold">Phone:</span> {user.phone}
            </p>
            <div className="mt-4 flex justify-center sm:justify-start gap-3">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-800">
                Farm Settings
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>A brief introduction about the farm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Hello! I'm {user.firstName}, a dedicated farmer focusing on sustainable
              agriculture, crop rotation, and animal welfare. My goal is to provide
              healthy produce while caring for the land and livestock.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="text-center p-4">
            <CardTitle className="text-2xl">50</CardTitle>
            <CardDescription>Hectares Farmed</CardDescription>
          </Card>
          <Card className="text-center p-4">
            <CardTitle className="text-2xl">200</CardTitle>
            <CardDescription>Livestock</CardDescription>
          </Card>
          <Card className="text-center p-4">
            <CardTitle className="text-2xl">30+</CardTitle>
            <CardDescription>Crops Grown</CardDescription>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Farming Skills</CardTitle>
            <CardDescription>Areas of expertise on the farm</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              'Crop Rotation',
              'Organic Fertilization',
              'Animal Care',
              'Irrigation Management',
              'Tractor Operation',
              'Market Selling'
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  )
}

export default Profile
