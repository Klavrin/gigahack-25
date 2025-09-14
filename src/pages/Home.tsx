import AddPopup from '@/components/AddPopup'
import Layout from '@/components/Layout'
import {
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  TrendingUp,
  Leaf,
  Sprout,
  Calendar,
  Bell,
  MapPin,
  Plus,
  ChevronRight,
  BarChart3,
  Activity,
  Users,
  File,
  Panda
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface HomeProps {
  isOpen: boolean
  setIsOpen: (item: boolean) => void
}

const Home = ({ isOpen, setIsOpen }: HomeProps) => {
  const quickActions = [
    {
      title: 'Add New',
      icon: Plus,
      color: 'bg-green-500',
      link: '/add',
      func: () => {
        setIsOpen(true)
      }
    },
    {
      title: 'Livestock Records',
      icon: Panda,
      color: 'bg-blue-500',
      link: '/livestock',
      func: () => null
    },
    {
      title: 'View Map',
      icon: MapPin,
      color: 'bg-purple-500',
      link: '/map',
      func: () => null
    },
    {
      title: 'Find Other Farmers',
      icon: Users,
      color: 'bg-orange-500',
      link: '/find-others',
      func: () => null
    }
  ]

  const recentActivities = [
    { action: 'Watered Tomato Field A', time: '2 hours ago', icon: File },
    {
      action: 'Harvested Wheat Section 3',
      time: '1 day ago',
      icon: File
    },
    {
      action: 'Applied fertilizer to Corn Field',
      time: '2 days ago',
      icon: File
    },
    { action: 'Soil analysis completed', time: '3 days ago', icon: File }
  ]

  return (
    <>
      <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="min-h-screen pt-8 max-w-[60rem] mx-auto">
          <div className="px-2 pb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link !== '/add' ? action.link : ''}
                  className="group"
                  onClick={action.func}
                >
                  <div className="bg-white/70 dark:bg-neutral-800 backdrop-blur-lg rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
                    <div
                      className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-gray-800 dark:text-white text-sm">
                      {action.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="px-2 pb-20 lg:pb-6">
            <div className="bg-white/70 dark:bg-neutral-800 backdrop-blur-lg rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  Recent History
                </h3>
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-neutral-700/50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-900/30 rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-800 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/tasks"
                className="block mt-4 text-center py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors duration-200"
              >
                View All History →
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
