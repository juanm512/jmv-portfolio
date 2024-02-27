import Landing from "@/components/Landing"
import Description from "@/components/Description"

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
