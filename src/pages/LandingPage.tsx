import CurvedLoop from '@/components/CurvedLoop'
import FlipText from '@/components/FlipText'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const LandingPage = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getUTCSeconds()).padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

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
              We work closely with farmers, making sure they are heard and their needs are
              met. We also work closely with the government, assuring met quotas and
              seamless processing of data. Our belief also stands on hopes, dreams and
              making them a reality for the hard working people out there.
              <br />
              <br />
              While we seem a friendly and intuitive platform, it's in our goals that we
              reach the peaks of organizational perfection. Helping others is the same as
              helping yourself and that's why we motivate others to help each other,
              because in the end we make our own lives better.
              <FlipText
                childDivClassName="underline"
                className="cursor-pointer underline mt-6"
              >
                Learn more about us
              </FlipText>
            </div>
          </div>
        </section>

        <section className="relative px-8 flex pt-[15rem] z-20">
          <div className="w-1/4">
            <img src="src/assets/tractor.jpg" alt="solution" />

            <div className="flex flex-col text-xl mt-8">
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-3 font-mono -tracking-[3px]">
                  (1)
                </span>{' '}
                AI Document Completions
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-3 font-mono -tracking-[3px]">
                  (2)
                </span>{' '}
                Subsidy Informational Support
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-3 font-mono -tracking-[3px]">
                  (3)
                </span>{' '}
                Intuitive UI
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-3 font-mono -tracking-[3px]">
                  (4)
                </span>{' '}
                Security
              </div>
              <div className="border-b border-neutral-300 py-1">
                <span className="text-neutral-400 mr-3 font-mono -tracking-[3px]">
                  (5)
                </span>{' '}
                Data Tracking
              </div>
            </div>
          </div>

          <div className="w-[50rem] ml-[12rem] text-6xl font-sans font-semibold indent-32 flex flex-col">
            Our approach is designed to ease the work of every farmer in Moldova,
            regardless of the size of their business, by implementing an AI assistant to
            help with the beaurocratic processes.
            <br />
            <br />
            Our subsidies informational program motivates the user by giving specified
            data to their field of work, this way prioritising the quality of life of the
            user, productivity and motivation.
            <div className="indent-0">
              <Button
                className="mt-12 cursor-pointer text-lg px-0 overflow-hidden"
                size="lg"
              >
                <FlipText childDivClassName="py-6 px-8" className="py-6 px-8">
                  Get Started Now
                </FlipText>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full -z-10 bg-white h-[70vw]">
          <div className="invert relative bottom-[25vw]">
            <CurvedLoop
              marqueeText="Focused ✦ On ✦ Making ✦ Your ✦ Life ✦ Easier ✦ "
              speed={1}
              curveAmount={400}
              direction="right"
              interactive={false}
              className="text-black"
            />
          </div>

          <div className="flex relative bottom-[34vw] border-t pt-[5vw]">
            <div className="w-1/3 px-12">
              <img src="/src/assets/hands.jpg" alt="hands" />
            </div>

            <div className="w-1/3">
              <div>
                <p className="uppercase">(navigation)</p>

                <div className="flex flex-col text-[3vw] gap-2 font-sans font-semibold mt-6 tracking-[-0.05vw] leading-[3vw] ">
                  <FlipText className="cursor-pointer uppercase">Beliefs</FlipText>
                  <FlipText className="cursor-pointer uppercase">Solution</FlipText>
                  <FlipText className="cursor-pointer uppercase">Get Started</FlipText>
                  <FlipText className="cursor-pointer uppercase">Contact Us</FlipText>
                  <FlipText className="cursor-pointer uppercase">Login</FlipText>
                  <FlipText className="cursor-pointer uppercase">Register</FlipText>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bottom-[36.5vw] px-8 font-sans font-semibold tracking-tight flex uppercase">
            <div className="w-1/3" />

            <div className="w-1/3">
              <p className="text-[0.875vw]">© 2025 FarmXpert</p>
              <p className="text-[0.875vw]">Chisinau {time}</p>
            </div>

            <div className="w-1/3 flex justify-between">
              <div className="flex flex-col">
                <FlipText className="text-[0.875vw] cursor-pointer">
                  Privacy Policy
                </FlipText>
                <FlipText className="text-[0.875vw] cursor-pointer">
                  Terms of Service
                </FlipText>
              </div>

              <p className="text-[0.875vw] cursor-pointer">Careless Whispers</p>
            </div>

            <p className="text-sm cursor-pointer">Careless Whispers</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage
