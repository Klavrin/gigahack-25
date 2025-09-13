import Layout from '@/components/Layout'

const typeSubsidies = [
  'Land Subsidy',
  'Tax Incentives',
  'Grants',
  'Low-Interest Loans',
  'Training Programs',
  'Infrastructure Support'
]

const Subsidy = () => {
  return (
    <Layout>
      <div className="text-4xl pt-6 font-bold">Recommended Subsidies</div>
      <div>
        {typeSubsidies.map((item) => (
          <div
            key={item}
            className="p-4 mt-4 border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-2xl font-semibold">{item}</div>
            <div className="mt-2 text-md md:text-sm text-muted-foreground">
              Detailed information about {item} including eligibility criteria,
              application process, and benefits.
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Subsidy
