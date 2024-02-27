import dynamic from "next/dynamic"
const Landing = dynamic(() => import("@/components/Landing"), {})
const Description = dynamic(() => import("@/components/Description"), {})

export default function Index() {
  return (
    <main>
      <Landing />
      <Description />
      <div className="h-[300vh]"></div>
      {/* <Projects />
      <SlidingImages />
      <Contact /> */}
    </main>
  )
}
