import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import { LoaderCircle } from 'lucide-react'

const Livestock = ({ isOpen, setIsOpen, supabase }: any) => {
  const [animals, setAnimals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('animal').select('*')
      if (error) {
        console.error('Error fetching animals:', error.message)
      } else {
        setAnimals(data)
      }
      setLoading(false)
    }

    fetchAnimals()
  }, [supabase])

  if (loading) {
    return (
      <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
        <div className="flex items-center justify-center h-full">
          <LoaderCircle className="animate-spin text-gray-500" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen} supabase={supabase}>
      <div className="max-w-[60rem] mx-auto">
        <h1 className="text-3xl font-bold mb-4">Livestock</h1>

        {animals.length === 0 ? (
          <p>No animals found.</p>
        ) : (
          <ul className="space-y-2">
            {animals.map((animal) => (
              <li
                key={animal.id}
                className="p-3 rounded-lg shadow bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <p className="font-semibold text-xl">{animal.species}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-200">
                  Sex: {animal.sex}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-200">
                  Birth Date: {animal.birthDate}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-200">
                  Cattle Id: {animal.cattleId}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default Livestock
