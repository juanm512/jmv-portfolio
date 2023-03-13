

const HeroTitle = () => {
  return (

    <div className="flex flex-col items-center justify-center px-5 pt-16 pb-8 mx-auto lg:px-20 md:flex-row show-on-scroll">
        <h1 className="mb-4 text-3xl text-gray-900 lg:text-6xl md:text-3xl text-center font-normal ">
            Hi, I{"'"}m <span className="text-palette-400">Juan Manuel Vila</span> <br /><span className="text-palette-400">Full Stack Developer</span> <br className="hidden md:block" />from <span className="text-palette-400">Argentina</span>
        </h1>
    </div>
  );
};

export default HeroTitle;