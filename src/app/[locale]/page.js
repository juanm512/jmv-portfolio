import { unstable_setRequestLocale } from "next-intl/server"
import { getAllProjects } from "@/lib/projects"

import HeroSection from "@/components/home/HeroSection"
import ChildhoodSection from "@/components/home/ChildhoodSection"
import AbstractSection from "@/components/home/AbstractSection"
import MemoryWall from "@/components/home/MemoryWall"
import ContactSection from "@/components/home/ContactSection"

export const metadata = {
  title: "Juan Manuel Vila - FullStack Developer",
  description:
    "Portfolio of Juan Manuel Vila - FullStack Developer specialized in building systems that solve real problems."
}

export default function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale)
  const projects = getAllProjects()

  return (
    <main className="bg-background-dark">
      <HeroSection />
      <div className="h-[50vh]"></div>
      <ChildhoodSection />
      <div className="h-[50vh]"></div>
      <AbstractSection />
      <div className="h-[50vh]"></div>
      <MemoryWall projects={projects} locale={locale} />
      <div className="h-[50vh]"></div>
      <ContactSection />
    </main>
  )
}
