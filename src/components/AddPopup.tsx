import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  X,
  Beef,
  DollarSign,
  Calendar,
  Hash,
  User,
  TrendingUp,
  TrendingDown,
  Warehouse
} from 'lucide-react'

interface AddPopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  supabase?: any
}

interface LivestockData {
  species: string
  sex: string
  birthDate: string
  cattleId: string
}

interface FinanceData {
  yearlyIncome: string
  yearlyExpenses: string
  businessId: string
}

interface VehicleData {
  vehicleType: string
  fabricationDate: string
  brand: string
  vehicleGroupId: string
}

const AddPopup = ({ isOpen, setIsOpen, supabase }: AddPopupProps) => {
  const [activeTab, setActiveTab] = useState<'livestock' | 'finances' | 'vehicle'>('livestock')

  const [livestockData, setLivestockData] = useState<LivestockData>({
    species: '',
    sex: '',
    birthDate: '',
    cattleId: ''
  })

  const [financeData, setFinanceData] = useState<FinanceData>({
    yearlyIncome: '',
    yearlyExpenses: '',
    businessId: ''
  })

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    vehicleType: '',
    fabricationDate: '',
    brand: '',
    vehicleGroupId: ''
  })

  const token = localStorage.getItem('accessToken')

  // ---- Submits ----
  const handleLivestockSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/animal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          species: livestockData.species,
          sex: livestockData.sex,
          birthDate: livestockData.birthDate || null,
          cattleId: Number(livestockData.cattleId)
        })
      })
      if (!res.ok) throw new Error(await res.text())
      console.log('Inserted:', await res.json())
      setLivestockData({ species: '', sex: '', birthDate: '', cattleId: '' })
      setIsOpen(false)
    } catch (error) {
      console.error('Error inserting animal:', error)
    }
  }

  const handleFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.from('finance').insert({
      yearlyIncome: financeData.yearlyIncome,
      yearlyExpenses: financeData.yearlyExpenses,
      businessId: financeData.businessId
    })
    if (error) console.error('Error inserting finance:', error)
    else console.log('Inserted:', data)
    setFinanceData({ yearlyIncome: '', yearlyExpenses: '', businessId: '' })
    setIsOpen(false)
  }

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/vehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleType: vehicleData.vehicleType,
          fabricationDate: Number(vehicleData.fabricationDate),
          brand: vehicleData.brand,
          vehicleGroupId: Number(vehicleData.vehicleGroupId)
        })
      })
      if (!res.ok) throw new Error(await res.text())
      console.log('Inserted:', await res.json())
      setVehicleData({ vehicleType: '', fabricationDate: '', brand: '', vehicleGroupId: '' })
      setIsOpen(false)
    } catch (err) {
      console.error('Error inserting vehicle:', err)
    }
  }

  const resetForms = () => {
    setLivestockData({ species: '', sex: '', birthDate: '', cattleId: '' })
    setFinanceData({ yearlyIncome: '', yearlyExpenses: '', businessId: '' })
    setVehicleData({ vehicleType: '', fabricationDate: '', brand: '', vehicleGroupId: '' })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-screen h-screen bg-black/40 fixed z-50 flex justify-center items-center backdrop-blur-sm font-['Nunito']"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setIsOpen(false)
            resetForms()
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-[95vw] max-w-2xl h-[90vh] max-h-[700px]"
          >
            <Card className="w-full h-full bg-gradient-to-b bg-neutral-100 dark:bg-neutral-900 border border-green-200 dark:border-neutral-700 shadow-2xl overflow-hidden p-0 pb-6">
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-green-200 dark:border-neutral-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-neutral-800 dark:to-neutral-800">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    resetForms()
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-700 flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>

                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                  Add New Record
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Add livestock, financial, or vehicle data to your farm records
                </p>
              </div>

              {/* Tabs */}
              <div className="px-6 pb-4">
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  {['livestock', 'finances', 'vehicle'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      {tab === 'livestock' && <Beef className="w-5 h-5" />}
                      {tab === 'finances' && <DollarSign className="w-5 h-5" />}
                      {tab === 'vehicle' && <Warehouse className="w-5 h-5" />}
                      <span className="capitalize">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {/* Livestock Form */}
                  {activeTab === 'livestock' && (
                    <motion.form
                      key="livestock"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleLivestockSubmit}
                      className="space-y-6"
                    >
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="species" className="text-sm font-medium flex gap-2">
                            <Beef className="w-4 h-4" /> Species
                          </Label>
                          <Input
                            id="species"
                            value={livestockData.species}
                            onChange={(e) => setLivestockData({ ...livestockData, species: e.target.value })}
                            placeholder="e.g., Cow, Sheep"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sex" className="text-sm font-medium flex gap-2">
                            <User className="w-4 h-4" /> Sex
                          </Label>
                          <select
                            id="sex"
                            value={livestockData.sex}
                            onChange={(e) => setLivestockData({ ...livestockData, sex: e.target.value })}
                            className="w-full h-12 px-3 border rounded-md"
                          >
                            <option value="">Select sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="birthDate" className="text-sm font-medium flex gap-2">
                            <Calendar className="w-4 h-4" /> Birth Date
                          </Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={livestockData.birthDate}
                            onChange={(e) => setLivestockData({ ...livestockData, birthDate: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cattleId" className="text-sm font-medium flex gap-2">
                            <Hash className="w-4 h-4" /> Cattle ID
                          </Label>
                          <Input
                            id="cattleId"
                            type="number"
                            value={livestockData.cattleId}
                            onChange={(e) => setLivestockData({ ...livestockData, cattleId: e.target.value })}
                            placeholder="Enter unique cattle ID"
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1 bg-emerald-600 text-white">
                            Add Livestock
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  )}

                  {/* Finance Form */}
                  {activeTab === 'finances' && (
                    <motion.form
                      key="finances"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleFinanceSubmit}
                      className="space-y-6"
                    >
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="yearlyIncome" className="text-sm font-medium flex gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" /> Yearly Income
                          </Label>
                          <Input
                            id="yearlyIncome"
                            type="number"
                            value={financeData.yearlyIncome}
                            onChange={(e) => setFinanceData({ ...financeData, yearlyIncome: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="yearlyExpenses" className="text-sm font-medium flex gap-2">
                            <TrendingDown className="w-4 h-4 text-red-600" /> Yearly Expenses
                          </Label>
                          <Input
                            id="yearlyExpenses"
                            type="number"
                            value={financeData.yearlyExpenses}
                            onChange={(e) => setFinanceData({ ...financeData, yearlyExpenses: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessId" className="text-sm font-medium flex gap-2">
                            <Hash className="w-4 h-4" /> Business ID
                          </Label>
                          <Input
                            id="businessId"
                            type="number"
                            value={financeData.businessId}
                            onChange={(e) => setFinanceData({ ...financeData, businessId: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1 bg-emerald-600 text-white">
                            Add Finances
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  )}

                  {/* Vehicle Form */}
                  {activeTab === 'vehicle' && (
                    <motion.form
                      key="vehicle"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleVehicleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="vehicleType" className="text-sm font-medium flex gap-2">
                            Vehicle Type
                          </Label>
                          <Input
                            id="vehicleType"
                            value={vehicleData.vehicleType}
                            onChange={(e) => setVehicleData({ ...vehicleData, vehicleType: e.target.value })}
                            placeholder="e.g., Tractor, Truck"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fabricationDate" className="text-sm font-medium flex gap-2">
                            Fabrication Year
                          </Label>
                          <Input
                            id="fabricationDate"
                            type="number"
                            value={vehicleData.fabricationDate}
                            onChange={(e) => setVehicleData({ ...vehicleData, fabricationDate: e.target.value })}
                            placeholder="e.g., 2020"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand" className="text-sm font-medium flex gap-2">
                            Brand
                          </Label>
                          <Input
                            id="brand"
                            value={vehicleData.brand}
                            onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                            placeholder="e.g., John Deere"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="vehicleGroupId" className="text-sm font-medium flex gap-2">
                            Vehicle Group ID
                          </Label>
                          <Input
                            id="vehicleGroupId"
                            type="number"
                            value={vehicleData.vehicleGroupId}
                            onChange={(e) => setVehicleData({ ...vehicleData, vehicleGroupId: e.target.value })}
                            placeholder="Group ID reference"
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t">
                        <div className="flex gap-3">
                          <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1 bg-emerald-600 text-white">
                            Add Vehicle
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddPopup
