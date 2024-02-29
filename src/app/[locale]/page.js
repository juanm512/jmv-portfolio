import dynamic from "next/dynamic"

const Landing = dynamic(() => import("@/components/Landing"))
const Description = dynamic(() => import("@/components/Description"))
const Projects = dynamic(() => import("@/components/HorizontalScrollProjects"))
const Contact = dynamic(() => import("@/components/Contact"))

export default function Index() {
  return (
    <main>
      <Landing />
      <Description />
      <Projects />
      <Contact />
    </main>
  )
}
