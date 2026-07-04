import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import About from "../components/home/About";
import Programs from "../components/home/Programs";
import Events from "../components/home/Events";
import News from "../components/home/News";
import Partners from "../components/home/Partners";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Programs />
      <Events />
      <News />
      <Partners />
    </>
  );
}

export default Home;