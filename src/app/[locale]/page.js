import { useTranslations } from "next-intl"
import Landing from "@/components/Landing"

export default function Index() {
  const t = useTranslations("Index")
  return (
    <main>
      <Landing />
      <div className="h-[300vh]"></div>
      {/* <Description />
      <Projects />
      <SlidingImages />
      <Contact /> */}
    </main>
  )
}
