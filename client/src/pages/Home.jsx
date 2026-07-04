import Navbar from "../components/Layout/navbar";
import Hero from "../components/home/Hero";
import Stats from "../components/Home/Stats";
import About from "../components/Home/About";
import Programs from "../components/Home/Programs";
import Events from "../components/Home/Events";
import News from "../components/Home/News";
import Partners from "../components/Home/Partners";

function Home() {
  return (
    <>
      <navbar />
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