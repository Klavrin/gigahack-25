import Layout from '@/components/Layout'
import { Star } from 'lucide-react'

const typeSubsidies = [
  { name: 'Land Subsidy', starred: true },
  { name: 'Tax Incentives', starred: false },
  { name: 'Grants', starred: false },
  { name: 'Low-Interest Loans', starred: false },
  { name: 'Training Programs', starred: false },
  { name: 'Infrastructure Support', starred: false }
]

const Subsidy = () => {
  return (
    <Layout>
      <div className="text-4xl pt-6 font-bold">Recommended Subsidies</div>
      <div>
        {typeSubsidies.map((item) => (
          <div
            key={item.name}
            className="p-4 mt-4 border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              {item.starred && <Star color="#fcba03" fill="#fcba03" />}
              <div className="text-2xl font-semibold">{item.name}</div>
            </div>
            <div className="mt-2 text-md md:text-sm text-muted-foreground">
              Detailed information about {item.name} including eligibility criteria,
              application process, and benefits.
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Subsidy
