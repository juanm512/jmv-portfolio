// About timeline, newest first. In `text`, [[slug]] or [[slug|label]] renders a
// ProjectMention (hover card). A blank line starts a new paragraph.
// `subtitle` is optional. `kind: "life"` marks entries that are not projects (grey dot).
export const timeline = [
  {
    kind: "life",
    locales: {
      es: {
        title: "Hoy",
        subtitle: "IA, Effect e inglés",
        text: "Hoy estoy enfocado en aprender a usar bien la IA para programar: qué prácticas funcionan, cuáles no y cómo darle contexto para que el resultado sea confiable. En paralelo exploro cómo llevarla a otros ámbitos, donde puede ordenar procesos y sacarle trabajo repetitivo a la gente. Para mí eso es la ingeniería en su esencia: mejorar la vida cotidiana.\n\nTambién estudio Effect, una librería de TypeScript con un ecosistema grande que me da lo que neverthrow y byethrow no me dieron: errores tipados de punta a punta, del servidor al cliente. Y tomo clases de inglés para subir mi nivel."
      },
      en: {
        title: "Today",
        subtitle: "AI, Effect and English",
        text: "Today I am focused on learning to use AI well for programming: which practices work, which do not, and how to give it context so the result can be trusted. In parallel I explore how to take it to other fields, where it can bring order to processes and take repetitive work off people's hands. To me that is engineering at its core: making everyday life better.\n\nI am also studying Effect, a TypeScript library with a large ecosystem that gives me what neverthrow and byethrow did not: errors typed end to end, from server to client. And I take English classes to raise my level."
      }
    }
  },
  {
    locales: {
      es: {
        title: "El título y Copon",
        text: "En la segunda mitad del primer semestre me concentré en rendir lo que me faltaba para recibirme. A la vez, a través de un conocido, tomé un proyecto para un cliente: [[copon]], una plataforma para armar torneos privados de prode.\n\nAprendí a construir una web mobile first desde el primer día, con una UI bien definida antes de escribir pantallas, sobre el T3 stack y trabajando con IA mediante las skills de Matt Pocock.\n\nLo que cambiaría: tendría el proyecto terminado antes, sobre una base sólida, y recién después lo expandiría con features nuevas."
      },
      en: {
        title: "The degree and Copon",
        text: "In the second half of the first semester I focused on passing the exams I still needed to graduate. At the same time, through an acquaintance, I took on a client project: [[copon]], a platform to run private football prediction tournaments.\n\nI learned to build a mobile first web app from day one, with a well defined UI before writing screens, on the T3 stack and working with AI through Matt Pocock's skills.\n\nWhat I would change: I would have the project finished earlier, on a solid base, and only then expand it with new features."
      }
    }
  },
  {
    locales: {
      es: {
        title: "Mudarg, TUERCA y el cierre de la carrera",
        text: "A principio de año, mientras esperaba notas para cerrar materias, me propuse armar proyectos sobre ideas que venía mirando: Gaussian Splatting y tiempos de viaje.\n\nLa segunda terminó en [[mudarg]]. La idea era ver qué zonas son viables para vivir según cuánto tardás en llegar al trabajo, o a otro punto que te importe, en cada medio de transporte. Es una extensión de navegador sobre un portal inmobiliario, y lo más difícil fue dibujar sobre un mapa que no podés tocar. Tuvo unos cinco usuarios: con una extensión cuesta crecer, pero el objetivo era llevar a producción una extensión completa sobre un stack parecido a T3.\n\nTambién quise lanzar un producto propio: [[tuerca]]. Tardé en sacarlo porque nunca lo consideraba terminado y seguía sumando features. Una versión llegó a Google Play y tuvo unos 20 usuarios activos durante algunos meses, pero cerrar la facultad me dejó sin tiempo para sostenerlo. Es lo mismo que aprendí con Copon, desde el otro lado: terminar primero, crecer después."
      },
      en: {
        title: "Mudarg, TUERCA and finishing my degree",
        text: "At the start of the year, while waiting for grades to close some courses, I set out to build projects around ideas I had been watching: Gaussian Splatting and travel times.\n\nThe second one became [[mudarg]]. The idea was to see which areas are viable to live in, based on how long it takes you to get to work, or to any place that matters to you, by each mode of transport. It is a browser extension on top of a real estate portal, and the hardest part was drawing on a map you cannot touch. It had about five users: an extension is hard to grow, but the goal was to ship a complete extension to production on a stack similar to T3.\n\nI also wanted to launch a product of my own: [[tuerca]]. It took me a long time to ship because I never considered it finished and kept adding features. One version reached Google Play and had about 20 active users for a few months, but finishing my degree left me no time to keep it going. It is the same lesson as Copon, from the other side: finish first, grow later."
      }
    }
  },
  {
    locales: {
      es: {
        title: "Aprender a trabajar con IA",
        subtitle: "Monorepos, T3 y documentación para agentes",
        text: "Después del proyecto del restaurante me interesé por los monorepos y por el T3 stack. De ahí salió [[multitenant-saas-base]]. Aprendí que un monorepo sirve mucho cuando el sistema tiene usuarios con jerarquías, y aprendí bastante de gestión de usuarios: organizaciones, roles y permisos. También dediqué tiempo a armar skills y documentación para que la IA trabaje sobre un proyecto con el mismo contexto que tendría una persona.\n\n[[gsp]] fue un experimento para mí: una plataforma donde subís un video o un zip de imágenes y el Gaussian Splatting se calcula en la nube, alquilando una GPU en un pod. El flujo funcionó de punta a punta. Lo difícil fue que el resultado se viera bien: requiere prueba y error una y otra vez, y en la nube cada intento cuesta caro. Con una GPU propia es más viable, porque podés ajustar los parámetros sin mirar el reloj."
      },
      en: {
        title: "Learning to work with AI",
        subtitle: "Monorepos, T3 and docs for agents",
        text: "After the restaurant project I got interested in monorepos and the T3 stack. That is where [[multitenant-saas-base]] came from. I learned that a monorepo pays off when the system has users with hierarchies, and I learned a lot about user management: organizations, roles and permissions. I also spent time writing skills and documentation so that AI works on a project with the same context a person would have.\n\n[[gsp]] was an experiment for myself: a platform where you upload a video or a zip of images and the Gaussian Splatting is computed in the cloud, on a GPU rented in a pod. The flow worked end to end. The hard part was making the result look good: it takes trial and error again and again, and in the cloud every attempt is expensive. With your own GPU it is more viable, because you can tune the parameters without watching the clock."
      }
    }
  },
  {
    locales: {
      es: {
        title: "Un sistema para un restaurante",
        subtitle: "Docker y un VPS propio",
        text: "En el tiempo libre tomé un trabajo: un sistema de gestión para un restaurante, [[single-resto]]. Fue antes del boom de la IA para programar. Copilot existía pero casi no lo usaba, así que lo escribí todo a mano y me llevó varios meses, de cero a producto terminado. Tomó pedidos reales durante un tiempo.\n\nLo más difícil fue Docker: usarlo bien, achicar las imágenes y hacer andar Next.js adentro, que entonces estaba mucho menos documentado. Después, un VPS propio, donde hacés a mano todo lo que Vercel resuelve solo. Peleé mucho, pero me quedó una buena sensación: con tu propia máquina sabés cuánto gastás y entendés qué pasa debajo del deploy. También probé neverthrow en los server actions; el hueco de serializar los errores me lo resolvió Effect años después."
      },
      en: {
        title: "A system for a restaurant",
        subtitle: "Docker and my own VPS",
        text: "In my spare time I took on a job: a management system for a restaurant, [[single-resto]]. It was before the AI coding boom. Copilot existed but I barely used it, so I wrote everything by hand, and it took me several months to go from zero to a finished product. It took real orders for a while.\n\nThe hardest part was Docker: using it well, shrinking the images and getting Next.js to run inside it, which was far less documented back then. Then my own VPS, where you do by hand everything Vercel does for you. I struggled a lot, but it left me with a good feeling: with your own machine you know what you spend and you understand what happens under the deploy. I also tried neverthrow in the server actions; the gap of serializing errors was solved for me by Effect years later."
      }
    }
  },
  {
    kind: "life",
    locales: {
      es: {
        title: "Volver a la facultad",
        subtitle: "Proyectos en equipo",
        text: "Después de varios proyectos propios había perdido el rumbo y descuidado la facultad, así que volví a enfocarme. Hice proyectos en grupo con Rust sobre Polkadot, Django, Flask y NestJS, uno de ellos consumiendo APIs de otros grupos.\n\nMe gusta trabajar en equipo y ayudar a los demás. Aprendí que un equipo rinde cuando cada uno toma lo que mejor sabe hacer y los issues están escritos antes de empezar, para que el trabajo fluya."
      },
      en: {
        title: "Back to university",
        subtitle: "Team projects",
        text: "After several personal projects I had lost my way and neglected university, so I refocused. I built team projects with Rust on Polkadot, Django, Flask and NestJS, one of them consuming APIs built by other teams.\n\nI like working in a team and helping others. I learned that a team performs when each person takes what they do best and the issues are written before the work starts, so the work flows."
      }
    }
  },
  {
    locales: {
      es: {
        title: "Huesos en 3D",
        subtitle: "Un atlas de anatomía y React Native",
        text: "A mitad de la carrera, un amigo que preparaba un libro para una cátedra de anatomía de la Facultad de Medicina me propuso una web para ver los huesos del cuerpo humano en 3D, con anotaciones. Así nació [[atlas-3d]], que hice desde cero.\n\nLo difícil no fue el código: fue conseguir modelos con el detalle suficiente. Probamos escanear y fotografiar huesos reales para que un profesional los modelara, pero era lento y caro. Al final estuvieron todos los huesos, con anotaciones en los más importantes, como los del cráneo, y lo usaron más de 100 alumnos. Hoy, con Gaussian Splatting, esas mismas fotos darían un resultado mucho mejor.\n\nEn esa época también aprendí React Native con [[f1-stats]], y que no perdona lo que React sí, sobre todo en los estilos."
      },
      en: {
        title: "Bones in 3D",
        subtitle: "An anatomy atlas and React Native",
        text: "Halfway through my degree, a friend who was preparing a textbook for an anatomy department at a medical school asked me for a website to view the bones of the human body in 3D, with annotations. That is how [[atlas-3d]] was born, built from scratch.\n\nThe hard part was not the code: it was getting models with enough detail. We tried scanning and photographing real bones so a professional could model them, but it was slow and expensive. In the end every bone was there, with annotations on the most important ones, like the skull, and more than 100 students used it. Today, with Gaussian Splatting, those same photos would give a much better result.\n\nAround that time I also learned React Native with [[f1-stats]], and that it does not forgive what React does, especially with styles."
      }
    }
  },
  {
    locales: {
      es: {
        title: "Proyectos para aprender",
        subtitle: "Donatelo, Ventas A Services y Crafteadle",
        text: "[[donatelo]] nació para que los streamers pudieran recibir donaciones en criptomonedas. En ese momento, en Argentina, una donación por otros medios perdía cerca del 80 % de su valor.\n\nDespués me propusieron un trabajo, [[vas-ecommerce]], con el que aprendí lo básico de AWS S3. Para practicar React, Next.js y animaciones hice proyectos chicos como Crafteadle, una mezcla de Minecraft con Wordle, y [[bmmusic]]. React me costó: venía de renderizar en el servidor con Node.js, que me parecía más simple."
      },
      en: {
        title: "Projects to learn",
        subtitle: "Donatelo, Ventas A Services and Crafteadle",
        text: "[[donatelo]] was born so streamers could receive donations in cryptocurrency. At the time, in Argentina, a donation through other channels lost about 80 % of its value.\n\nThen I was offered a job, [[vas-ecommerce]], where I learned the basics of AWS S3. To practice React, Next.js and animations I built small projects like Crafteadle, a mix of Minecraft and Wordle, and [[bmmusic]]. React was hard for me: I came from server side rendering with Node.js, which seemed simpler."
      }
    }
  },
  {
    kind: "life",
    locales: {
      es: {
        title: "De Electrónica a Analista Programador",
        subtitle: "MercadoService",
        text: "Empecé con Ingeniería Electrónica y me gustó muchísimo la física y la matemática. Pero en la pandemia la electrónica se volvió teoría sin práctica, y la materia de programación en C me dio lo que faltaba: ver el resultado en el momento, probar, fallar y corregir.\n\nEse verano aprendí JavaScript y Node.js y armé MercadoService, una plataforma para pedir un técnico a domicilio. Aprendía solo y sin buenas prácticas, pero descubrí que era bueno resolviendo problemas, y que Stack Overflow era el paraíso. Me quedé atrapado por la idea de resolver problemas cotidianos con software, y me cambié a Analista Programador Universitario."
      },
      en: {
        title: "From Electronics to Programming",
        subtitle: "MercadoService",
        text: "I started with Electronics Engineering and I loved the physics and the math. But during the pandemic electronics turned into theory without practice, and the C programming course gave me what was missing: seeing the result right away, trying, failing and fixing.\n\nThat summer I learned JavaScript and Node.js and built MercadoService, a platform to book a technician at home. I was self taught and had no good practices, but I found out I was good at solving problems, and that Stack Overflow was paradise. I got hooked on the idea of solving everyday problems with software, and I switched to a University Programmer Analyst degree."
      }
    }
  },
  {
    kind: "life",
    locales: {
      es: {
        title: "Chivilcoy",
        subtitle: "El origen",
        text: "Crecí en Chivilcoy, atrás de mi viejo en cada laburo: reparaciones, instalaciones de aire acondicionado en casas, lo que apareciera. También pasaba tiempo en talleres de amigos mecánicos. Le alcanzaba las herramientas y miraba cómo abría un equipo hasta encontrar por qué no arrancaba.\n\nDe ahí me quedó una idea que sigo usando: todo es prueba y error. Resolvés un problema, aprendés de lo que salió mal, y la próxima vez lo reconocés enseguida. El conocimiento se junta así, resolviendo cosas."
      },
      en: {
        title: "Chivilcoy",
        subtitle: "Where it started",
        text: "I grew up in Chivilcoy, following my dad on every job: repairs, air conditioning installs in people's homes, whatever came up. I also spent time in friends' mechanic shops. I handed him the tools and watched him open a unit until he found why it would not start.\n\nThat left me with an idea I still use: everything is trial and error. You solve a problem, you learn from what went wrong, and next time you recognize it right away. Knowledge builds up that way, by solving things."
      }
    }
  }
]
