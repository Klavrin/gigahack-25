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

const AddPopup = ({ isOpen, setIsOpen, supabase }: AddPopupProps) => {
  const [activeTab, setActiveTab] = useState<'livestock' | 'finances' | 'equipment'>(
    'livestock'
  )
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

  const handleLivestockSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Livestock data:', livestockData)

    const { data, error } = await supabase
      .from('animal')
      .insert([
        {
          species: livestockData.species,
          sex: livestockData.sex,
          birthDate: livestockData.birthDate,
          cattleId: livestockData.cattleId
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting animal:', error)
    } else {
      console.log('Inserted:', data)
      setLivestockData({
        species: '',
        sex: '',
        birthDate: '',
        cattleId: ''
      })
    }

    setIsOpen(false)
  }

  const handleFinanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Finance data:', financeData)

    const { data, error } = await supabase.from('finance').insert({
      yearlyIncome: financeData.yearlyIncome,
      yearlyExpenses: financeData.yearlyExpenses,
      businessId: financeData.businessId
    })
    if (error) {
      console.error('Error inserting animal:', error)
    } else {
      console.log('Inserted:', data)
      setFinanceData({
        yearlyIncome: '',
        yearlyExpenses: '',
        businessId: ''
      })
    }
    setIsOpen(false)
  }

  const resetForms = () => {
    setLivestockData({ species: '', sex: '', birthDate: '', cattleId: '' })
    setFinanceData({ yearlyIncome: '', yearlyExpenses: '', businessId: '' })
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
                  Add livestock or financial data to your farm records
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="px-6 pb-4">
                <div className="flex bg-gray-100 dark:bg-neutral-800 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('livestock')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'livestock'
                        ? 'bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    <Beef className="w-5 h-5" />
                    <span>Livestock</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('finances')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'finances'
                        ? 'bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Finances</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('equipment')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                      activeTab === 'equipment'
                        ? 'bg-white dark:bg-neutral-700 text-green-600 dark:text-green-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    <Warehouse className="w-5 h-5" />
                    <span>Machinery</span>
                  </button>
                </div>
              </div>

              <div className="px-6 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'livestock' ? (
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
                          <Label
                            htmlFor="species"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <Beef className="w-4 h-4" />
                            Species
                          </Label>
                          <Input
                            id="species"
                            value={livestockData.species}
                            onChange={(e) =>
                              setLivestockData({
                                ...livestockData,
                                species: e.target.value
                              })
                            }
                            placeholder="e.g., Cow, Sheep, Goat"
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="sex"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            Sex
                          </Label>
                          <select
                            id="sex"
                            value={livestockData.sex}
                            onChange={(e) =>
                              setLivestockData({ ...livestockData, sex: e.target.value })
                            }
                            className="w-full h-12 px-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md focus:border-green-500 dark:focus:border-green-400 focus:outline-none text-gray-900 dark:text-white"
                          >
                            <option value="">Select sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="birthDate"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            Birth Date
                          </Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={livestockData.birthDate}
                            onChange={(e) =>
                              setLivestockData({
                                ...livestockData,
                                birthDate: e.target.value
                              })
                            }
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="cattleId"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <Hash className="w-4 h-4" />
                            Cattle ID
                          </Label>
                          <Input
                            id="cattleId"
                            type="number"
                            value={livestockData.cattleId}
                            onChange={(e) =>
                              setLivestockData({
                                ...livestockData,
                                cattleId: e.target.value
                              })
                            }
                            placeholder="Enter unique cattle ID"
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>
                      </div>

                      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsOpen(false)
                              resetForms()
                            }}
                            className="flex-1 h-12 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 h-12 bg-gradient-to-r bg-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            Add Livestock
                          </Button>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
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
                          <Label
                            htmlFor="yearlyIncome"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            Yearly Income
                          </Label>
                          <Input
                            id="yearlyIncome"
                            type="number"
                            value={financeData.yearlyIncome}
                            onChange={(e) =>
                              setFinanceData({
                                ...financeData,
                                yearlyIncome: e.target.value
                              })
                            }
                            placeholder="Enter total yearly income"
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="yearlyExpenses"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            Yearly Expenses
                          </Label>
                          <Input
                            id="yearlyExpenses"
                            type="number"
                            value={financeData.yearlyExpenses}
                            onChange={(e) =>
                              setFinanceData({
                                ...financeData,
                                yearlyExpenses: e.target.value
                              })
                            }
                            placeholder="Enter total yearly expenses"
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="businessId"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                          >
                            <Hash className="w-4 h-4" />
                            Business ID
                          </Label>
                          <Input
                            id="businessId"
                            type="number"
                            value={financeData.businessId}
                            onChange={(e) =>
                              setFinanceData({
                                ...financeData,
                                businessId: e.target.value
                              })
                            }
                            placeholder="Enter business identifier"
                            className="h-12 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 focus:border-green-500 dark:focus:border-green-400"
                          />
                        </div>

                        {financeData.yearlyIncome && financeData.yearlyExpenses && (
                          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Net Profit
                              </span>
                              <span
                                className={`text-lg font-bold ${
                                  parseInt(financeData.yearlyIncome) -
                                    parseInt(financeData.yearlyExpenses) >=
                                  0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}
                              >
                                $
                                {(
                                  parseInt(financeData.yearlyIncome) -
                                  parseInt(financeData.yearlyExpenses)
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsOpen(false)
                              resetForms()
                            }}
                            className="flex-1 h-12 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 h-12 bg-gradient-to-r bg-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            Add Finances
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
