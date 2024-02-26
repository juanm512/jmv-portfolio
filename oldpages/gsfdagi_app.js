import "../styles/globals.css"
import localFont from "next/font/local"

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../styles/Kode_Mono/KodeMono-VariableFont_wght.ttf",
  display: "auto"
})
import { AnimateSharedLayout } from "framer-motion"

function MyApp({ Component, pageProps }) {
  return (
    <AnimateSharedLayout type="crossfade">
      <Component {...pageProps} />
    </AnimateSharedLayout>
  )
}

export default MyApp
