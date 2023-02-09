import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";

import NavBar from "../components/NavBar";
import HeroTitle from "../components/HeroTitle";
import HeroImage from "../components/HeroImage";
import Skills from "../components/Skills";
import ProyectsList from "../components/ProyectsList";
import FooterAndContact from "../components/FooterAndContact";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Juan Manuel Vila - Portfolio</title>
        <meta name="description" content="" />
        <link rel="icon" href="/Ai2.jpg" />
      </Head>

      <main className="w-full h-screen p-0 m-0">
        <NavBar />
        <HeroTitle />

        <HeroImage />

        <Skills />

        {/* Proyects */}
        <ProyectsList />

        <FooterAndContact />
      </main>
    </div>
  );
}
