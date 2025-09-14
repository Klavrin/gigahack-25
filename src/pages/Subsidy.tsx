import Layout from '@/components/Layout'
import { Star } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'

// const typeSubsidies = [
//   { name: 'Land Subsidy', starred: true },
//   { name: 'Tax Incentives', starred: false },
//   { name: 'Grants', starred: false },
//   { name: 'Low-Interest Loans', starred: false },
//   { name: 'Training Programs', starred: false },
//   { name: 'Infrastructure Support', starred: false }
// ]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
  }
}

const shakeAnimation = {
  rotate: [0, -20, 20, -20, 20, 0],
  scale: [1, 1.4, 1.4, 1.4, 1.4, 1],
  transition: { duration: 1 }
}

interface SubsidyProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  supabase: any
}

const Subsidy = ({ isOpen, setIsOpen, supabase }: SubsidyProps) => {
  const [typeSubsidies, setTypeSubsidies] = useState<any>(null)
  const [subsColors, setSubsColors] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const controls = useAnimation()

  const [matches, setMatches] = useState([
    {
      band: 'verde',
      reasoning_ro:
        'Scor estimat pe bază de potrivire textuală între descrierea subvenției și profilul fermei. Semnale detectate: animal, bazine, bovine, carne, cerealiere, culturi, cultură, infrastructură, irigare, lapte, legume, ovine, porcine, sector vegetal, tehnologii, zootehnic, zootehnie. Suprafață: 31.5 ha; efective: 120 capete.',
      score: 100,
      subsidyCode: 'SP_2.3',
      subsidyTitle: 'Investiții în bazine de acumulare a apei pentru irigare',
      color: 'bg-green-500/10 border-green-500/50',
      starred: true
    },
    {
      band: 'galben',
      reasoning_ro:
        'Scor estimat pe bază de potrivire textuală între descrierea subvenției și profilul fermei. Semnale detectate: animal, bazine, bovine, carne, cerealiere, culturi, cultură, infrastructură, irigare, lapte, legume, ovine, porcine, sector vegetal, tehnologii, zootehnic, zootehnie. Suprafață: 31.5 ha; efective: 120 capete.',
      score: 60,
      subsidyCode: 'SP_2.4',
      subsidyTitle: 'Investiții în exploatații din sectorul vegetal',
      color: 'bg-yellow-500/10 border-yellow-500/50'
    },
    {
      band: 'galben',
      reasoning_ro:
        'Scor estimat pe bază de potrivire textuală între descrierea subvenției și profilul fermei. Semnale detectate: animal, bazine, bovine, carne, cerealiere, culturi, cultură, infrastructură, irigare, lapte, legume, ovine, porcine, sector vegetal, tehnologii, zootehnic, zootehnie. Suprafață: 31.5 ha; efective: 120 capete.',
      score: 60,
      subsidyCode: 'SP_2.8',
      subsidyTitle: 'Investiții în infrastructura din sectorul vegetal',
      color: 'bg-yellow-500/10 border-yellow-500/50'
    }
  ])

  const otherSubsidies = [
    {
      band: 'roșu',
      reasoning_ro:
        'Scor estimat pe bază de potrivire textuală între descrierea subvenției și profilul fermei. Semnale detectate: animal, bazine, bovine, carne, cerealiere, culturi, cultură, infrastructură, irigare, lapte, legume, ovine, porcine, sector vegetal, tehnologii, zootehnic, zootehnie. Suprafață: 31.5 ha; efective: 120 capete.',
      score: 40,
      subsidyCode: 'SP_2.10',
      subsidyTitle: 'Investiții în tehnologii de lucrare a solului',
      color: 'bg-red-500/10 border-red-500/50'
    },
    {
      band: 'roșu',
      reasoning_ro:
        'Scor estimat pe bază de potrivire textuală între descrierea subvenției și profilul fermei. Semnale detectate: animal, bazine, bovine, carne, cerealiere, culturi, cultură, infrastructură, irigare, lapte, legume, ovine, porcine, sector vegetal, tehnologii, zootehnic, zootehnie. Suprafață: 31.5 ha; efective: 120 capete.',
      score: 40,
      subsidyCode: 'SP_2.2',
      subsidyTitle: 'Investiții în sisteme și echipamente pentru irigare',
      color: 'bg-red-500/10 border-red-500/50'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start(shakeAnimation)
    }, 800)

    return () => clearTimeout(timer)
  }, [controls])

  useEffect(() => {
    const fetchAutocompletions = async () => {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_PYTHON_URL + '/api/scraper/autocomplete'
      )
      console.log(res)
      setTypeSubsidies(res.data)
      setLoading(false)
    }
    fetchAutocompletions()
  }, [])

  const handleDownload = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_PYTHON_URL + '/api/scraper/complete-docx',
        {
          businessId: 101,
          url: 'https://aipa.gov.md/sites/default/files/ghid-subventii-complementare/Act%20de%20pompare%20a%20apei%20pe%20sistemele%20centralizate%20de%20irigare_0.docx'
        },
        { responseType: 'blob' }
      )

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'subsidy-template.docx') // file name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed', error)
    }
  }

  if (loading) {
    return (
      <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
        <div className="max-w-[60rem] mx-auto">
          <div className="text-4xl pt-6 font-bold">Recommended Subsidies</div>
          <div className="mt-4 text-lg text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
      <div className="max-w-[60rem] mx-auto">
        <div className="text-4xl pt-6 font-bold">Recommended Subsidies</div>
        <motion.div
          className="mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {matches.map((item: any) => {
            if (item.suggested_source === 'none') return

            return (
              <motion.div
                key={item.filename}
                className={`p-4 mt-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer ${
                  item.color
                } ${() => {
                  if (item.band === 'verde') return 'border-green-500/50 bg-green-500/10'
                  if (item.band === 'galben')
                    return 'border-yellow-500/50 bg-yellow-500/10'
                  if (item.band === 'roșu') return 'border-red-500/50 bg-red-500/10'
                }}`}
                variants={cardVariants}
                onClick={handleDownload}
              >
                <div className="flex gap-2 items-center">
                  {item.starred && (
                    <motion.div animate={controls} className="inline-block">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            whileTap={{ scale: 0.9, rotate: 10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            className="cursor-pointer"
                          >
                            <Star
                              color="#fcba03"
                              fill="#fcba03"
                              className="drop-shadow-md hover:drop-shadow-lg"
                            />
                          </motion.div>
                        </TooltipTrigger>

                        <TooltipContent
                          side="top"
                          className="rounded-2xl bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 px-4 py-2 shadow-lg"
                        >
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-sm font-medium text-yellow-800"
                          >
                            🌟 This subsidy is{' '}
                            <span className="font-semibold">especially recommended!</span>
                          </motion.p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  )}
                  <div className="text-2xl font-semibold">{item.subsidyTitle}</div>
                </div>
                <div className="mt-2 text-md md:text-sm text-muted-foreground">
                  {item.reasoning_ro}
                </div>

                <div className="mt-2 flex justify-end" onClick={handleDownload}>
                  <Button className="bg-emerald-600 hover:bg-emerald-800">
                    Download Document
                  </Button>
                </div>
              </motion.div>
            )
          })}

          <div className="text-4xl pt-6 font-bold">Other Subsidies</div>

          {otherSubsidies.map((item: any) => {
            if (item.suggested_source === 'none') return

            return (
              <motion.div
                key={item.filename}
                className={`p-4 mt-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer ${
                  item.color
                } ${() => {
                  if (item.band === 'verde') return 'border-green-500/50 bg-green-500/10'
                  if (item.band === 'galben')
                    return 'border-yellow-500/50 bg-yellow-500/10'
                  if (item.band === 'roșu') return 'border-red-500/50 bg-red-500/10'
                }}`}
                variants={cardVariants}
                onClick={handleDownload}
              >
                <div className="flex gap-2 items-center">
                  {item.starred && (
                    <motion.div animate={controls} className="inline-block">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Star color="#fcba03" fill="#fcba03" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This subsidy is especially recommended!</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  )}
                  <div className="text-2xl font-semibold">{item.subsidyTitle}</div>
                </div>
                <div className="mt-2 text-md md:text-sm text-muted-foreground">
                  {item.reasoning_ro}
                </div>

                <div className="mt-2 flex justify-end" onClick={handleDownload}>
                  <Button className="bg-emerald-600 hover:bg-emerald-800">
                    Download Document
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Layout>
  )
}

export default Subsidy
