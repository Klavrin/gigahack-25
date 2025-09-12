import FlipText from '@/components/FlipText'

const LandingPage = () => {
  return (
    <div>
      <div className="relative overflow-hidden h-[100vh] bg-[url(/src/assets/farmhouse.jpg)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative flex flex-col justify-between p-6 z-10 text-white h-screen">
          <div className="flex justify-between items-center">
            <div className="w-1/3" />

            <div className="flex h-6">
              <FlipText className="cursor-pointer uppercase">Beliefs</FlipText>,
              <FlipText className="cursor-pointer uppercase ml-2">Solution</FlipText>,
              <FlipText className="cursor-pointer uppercase ml-2">Get Started</FlipText>,
              <FlipText className="cursor-pointer uppercase ml-2">Contact Us</FlipText>
            </div>

            <div className="flex cursor-pointe group cursor-pointer">
              <FlipText className="w-full bg-black text-3xl">Get Started</FlipText>
              <div className="min-w-8 min-h-4 flex justify-center items-center bg-black">
                <div className="rounded-full min-w-2 min-h-2 group-hover:min-w-3 group-hover:min-h-3 group-hover:bg-black border-2 border-white bg-white transition-all" />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-lg">
            <span>Subsidies</span>
            <span>EU Compliance</span>
            <span>Property & Livestock sharing</span>
            <span className="underline">All in one place</span>
          </div>

          <div className="relative text-white flex justify-between items-end">
            <h1 className="text-4xl tracking-tight text-balance w-[35rem] font-sans leading-[2.5rem]">
              FarmXpert combines solid data with rewarding work experience, bringing
              together the farmers and the development of Moldovan technology.
            </h1>
            <p className="uppercase text-white">(Scroll Down)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
