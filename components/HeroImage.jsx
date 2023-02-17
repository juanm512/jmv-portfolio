import { motion } from "framer-motion";
import Image from "next/future/image";
import data from "../data.json";

const HeroImage = () => {
  const { proyects } = data;
  return (
    <motion.div
      className=" bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center justify-center px-5 py-16 mx-auto lg:px-20 md:flex-row">
        <div className="order-2 md:order-1 basis-full md:basis-4/12 flex flex-col items-center justify-center text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:flex md:flex-col md:justify-center">
          <div className="flex flex-col">
            <h4 className="mb-3 text-lg md:text-sm font-normal text-gray-900 uppercase">
              <span className="border-b-2 border-palette-400 text-palette-300">
                Biography
              </span>
            </h4>
            <p className="mb-12 text-base font-normal text-gray-700 md:text-md font-amiri">
              I would like to make more efficient and develop new digital
              tools/products. I am comfortable using the JavaScript stack with
              MySQL or MongoDB. <br />I consider myself a fast learner and I am
              always looking for new challenges or new technologies to learn.
              Now I am interested in the Machine Learning and Artificial
              Intelligence areas.
            </p>
          </div>
          <div className=" flex-col hidden md:flex">
            <h4 className="mb-3 text-lg md:text-sm font-normal text-gray-900 uppercase">
              <span className="border-b-2 border-palette-400 text-palette-300">
                Contact
              </span>
            </h4>
            <p className="mb-12 text-base font-normal text-gray-700 md:text-md font-amiri">
              512juanm@gmail.com <br />
              +54 9 2346-570764 <br />
              La Plata, Buenos Aires, Argentina
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div className="basis-4/12 relative p-2 w-64 md:w-full order-1 md:order-2">
          <Image
            width="500"
            height="500"
            className="relative mx-auto object-cover object-bottom delay-500"
            alt="hero"
            // src="/Creatoravatar2.svg"
            src="/Ai2.jpg"
            style={{
              "border-top-left-radius": "12rem 12rem",
              "border-top-right-radius": "12rem 12rem",
              "border-bottom-right-radius": "12rem 12rem",
              "border-bottom-left-radius": "12rem 12rem",
              border: "10px solid #fefefe",
              boxShadow:
                "0.1px 0.1px 1px 0.5px rgba(232, 58, 20, 0.4), -0.1px -0.1px 1px 0.5px rgba(232, 58, 20, 0.4)",
            }}
          />
        </div>

        <div className="order-3 md:order-3 basis-4/12 relative text-center flex flex-col items-end justify-end lg:flex-grow md:w-full lg:pl-24 md:pl-16 md:items-end md:text-rigth md:flex md:flex-col md:justify-end">
          <div className="flex flex-col md:text-right w-full">
            <h4 className="mb-3 text-sm font-normal text-gray-900 uppercase">
              <span className=" text-palette-500">
                Currently
                <br /> Learning
              </span>
            </h4>
            <p className="mb-12 text-3xl font-base text-gray-700 md:text-3xl font-amiri">
              <span className="text-palette-400 block">Typescript</span>{" "}
              <span className="text-palette-400 block">React Native</span>{" "}
              <span className="text-palette-400 block">Deno and Fresh</span>{" "}
            </p>
          </div>
          <div className="flex flex-col md:text-right w-full">
            <h4 className="mb-3 text-sm font-normal text-gray-900 uppercase">
              <span className=" text-palette-500">
                Working
                <br /> On
              </span>
            </h4>
            <p className="mb-12 text-3xl font-base text-gray-700 md:text-3xl font-amiri">
              <span className="text-palette-400 block">
                3D bone repository for medical university{" "}
              </span>{" "}
              <span className="text-palette-400 block mt-3">
                FrontEnd Animations
              </span>{" "}
            </p>
          </div>
          <div className="flex flex-col md:text-right w-full">
            <h4 className="mb-3 text-sm font-normal text-gray-900 uppercase">
              <span className=" text-palette-500">
                Proyects
                <br /> done
              </span>
            </h4>
            <p className="mb-12 font-base text-gray-700 text-4xl md:text-5xl font-amiri">
              <span className="text-palette-400 block">{proyects.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row items-center justify-center px-5 py-16 mx-auto lg:px-20 gap-4 md:gap-8 flex-wrap delay-150"> */}
      <div className="grid grid-cols-2 md:grid-cols-5 items-center justify-center px-5 py-16 mx-auto lg:px-20 gap-10 md:gap-8 flex-wrap delay-150">
        <Image
          width="200"
          height="200"
          className="relative mx-auto object-cover object-center transition-all duration-200 md:opacity-50 md:hover:opacity-100 md:hover:-translate-y-1 "
          alt="hero"
          src="/education/logo-informatica.png"
        />
        <Image
          width="250"
          height="250"
          className="relative mx-auto object-cover object-center transition-all duration-200 md:opacity-50 md:hover:opacity-100 md:hover:-translate-y-1 "
          alt="hero"
          src="/education/logo_facultad_ingenieria.png"
        />
        <Image
          width="200"
          height="200"
          className="relative mx-auto object-cover object-center transition-all duration-200 md:opacity-50 md:hover:opacity-100 md:hover:-translate-y-1 "
          alt="hero"
          src="/education/FreeCodeCamp_logo.png"
        />
        <Image
          width="200"
          height="200"
          className="relative mx-auto object-cover object-center transition-all duration-200 md:opacity-50 md:hover:opacity-100 md:hover:-translate-y-1 "
          alt="hero"
          src="/education/MDN_Web_Docs-Logo.svg"
        />
        <Image
          width="200"
          height="200"
          className="relative mx-auto object-cover object-center transition-all duration-200 md:opacity-50 md:hover:opacity-100 md:hover:-translate-y-1 "
          alt="hero"
          src="/education/W3Schools_logo.png"
        />
      </div>
    </motion.div>
  );
};

export default HeroImage;
