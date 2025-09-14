import Layout from '@/components/Layout'
import MapFields from '@/components/MapFields'
import { useState, useEffect } from 'react'

const Map = () => {
  const [token, setToken] = useState<string | null>(null)
  const [businessId, setBusinessId] = useState<number | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedBusinessId = localStorage.getItem('businessId')
    if (storedToken) setToken(storedToken)
    if (storedBusinessId) setBusinessId(Number(storedBusinessId))
  }, [])

  console.log(businessId, token)

  if (!token || !businessId) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Fields Map</h1>
        <MapFields businessId={businessId} token={token} />
      </div>
    </Layout>
  )
}

export default Map
