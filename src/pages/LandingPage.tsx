import FlipText from '@/components/FlipText'
import { motion, useScroll, useTransform } from 'framer-motion'

const LandingPage = () => {
  return (
    <div>
      <section className="fixed overflow-hidden h-[100vh] w-screen bg-[url(/src/assets/farmhouse.jpg)] bg-cover bg-center z-0">
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
            <h1 className="text-[2.2vw] tracking-tight text-balance w-[35vw] font-sans leading-[2.5vw]">
              FarmXpert combines solid data with rewarding work experience, bringing
              together the farmers and the development of Moldovan technology.
            </h1>
            <p className="uppercase text-white">(Scroll Down)</p>
          </div>
        </div>
      </section>

      <div className="h-screen"></div>

      <div className="bg-white z-20 relative">
        <section className="pt-6">
          <h1 className="uppercase text-9xl font-sans font-medium leading-[7vw] tracking-tighter m-8 w-[80vw] text-[9vw]">
            Make applying effortless
          </h1>

          <div className="flex">
            <div className="w-1/3" />
            <div className="w-[28%] text-xl">
              <img src="/src/assets/sheep.jpg" alt="sheep" className="mb-6" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              <FlipText
                childDivClassName="underline"
                className="cursor-pointer underline mt-6"
              >
                Learn more about us
              </FlipText>
            </div>
          </div>
        </section>

        <section className="px-8 flex pt-[15rem]">
          <div className="w-1/4">
            <img src="src/assets/sheep.jpg" alt="solution" />

            <div className="flex flex-col text-xl mt-8">
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-6 font-mono -tracking-[3px]">
                  (1)
                </span>{' '}
                Solution 1
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-6 font-mono -tracking-[3px]">
                  (2)
                </span>{' '}
                Solution 2
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-6 font-mono -tracking-[3px]">
                  (3)
                </span>{' '}
                Solution 3
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-6 font-mono -tracking-[3px]">
                  (4)
                </span>{' '}
                Solution 4
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-6 font-mono -tracking-[3px]">
                  (5)
                </span>{' '}
                Solution 5
              </div>
            </div>
          </div>

          <div className="w-[50rem] ml-[12rem] text-6xl font-sans font-semibold indent-32">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam.
            <br />
            <br />
            Vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit.
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage
