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
      <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex items-center justify-center h-full">
          <LoaderCircle className="animate-spin text-gray-500" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="text-xl font-bold mb-4">Livestock</h1>

      {animals.length === 0 ? (
        <p>No animals found.</p>
      ) : (
        <ul className="space-y-2">
          {animals.map((animal) => (
            <li key={animal.id} className="p-3 rounded-lg shadow bg-white text-gray-900">
              <p className="font-semibold text-xl">{animal.species}</p>
              <p className="text-sm text-gray-600">Sex: {animal.sex}</p>
              <p className="text-sm text-gray-600">Birth Date: {animal.birthDate}</p>
              <p className="text-sm text-gray-600">Cattle Id: {animal.cattleId}</p>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}

export default Livestock
