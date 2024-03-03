import { getProjectById } from "@/lib/useData.js"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const Image = dynamic(() => import("@/components/ProjectComponents/Image"))

export default function Images({ params }) {
  const { id, images } = getProjectById(params.project, params.locale)

  const number = params.number ? parseInt(params.number) : 0

  return (
    <>
      <div className="relative w-full max-h-screen h-auto flex items-center justify-center overflow-y-auto overflow-x-hidden z-30 backdrop-blur">
        <div className="relative w-full md:w-4/5 min-h-dvh flex justify-center">
          <Suspense fallback={<span>Loading image . . .</span>}>
            <Image
              id={id}
              imgSrc={"/" + images[number]}
            />
          </Suspense>
        </div>
      </div>

      <Link
        href={"/" + id}
        className="fixed z-50 flex items-center gap-2 right-2 md:right-8 top-2 py-4 px-4 text-white hover:ring-2 ring-white bg-black/50 md:bg-transparent"
      >
        <p className="hidden sm:inline-block m-0 text-sm font-normal ring-1 ring-white px-1">
          Esc
        </p>
        <div className={`invert inline-block my-2 burger burgerActive `} />
      </Link>
      <Link
        href={
          "/" +
          id +
          "/images/" +
          (number - 1 == -1 ? images.length - 1 : number - 1)
        }
        className="fixed z-40 w-fit h-fit px-1 py-1 left-1 bottom-2 md:bottom-1/2 text-white"
      >
        <div className="w-fit h-fit flex items-center py-4 md:py-2 px-4 hover:ring-2 ring-white bg-black/50 md:bg-transparent">
          <p className="inline-block md:mr-2 m-0 text-sm font-normal ring-1 ring-white px-1">
            {"<"}
          </p>
          <span className="hidden md:inline-flex ">prev</span>
        </div>
      </Link>
      <Link
        href={
          "/" + id + "/images/" + (number + 1 == images.length ? 0 : number + 1)
        }
        className=" fixed z-40 w-fit h-fit px-1 py-1 left-[99%] md:left-[98.5%] -translate-x-[100%] bottom-2 md:bottom-1/2 text-white"
      >
        <div className=" w-fit h-fit flex items-center py-4 md:py-2 px-4 hover:ring-2 ring-white bg-black/50 md:bg-transparent">
          <span className="hidden md:inline-flex ">next</span>
          <p className="inline-flex md:ml-2 m-0 text-sm font-normal ring-1 ring-white px-1">
            {">"}
          </p>
        </div>
      </Link>
    </>
  )
}
