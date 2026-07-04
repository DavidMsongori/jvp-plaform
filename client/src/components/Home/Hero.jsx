import { useEffect, useState } from "react";
import "./Hero.css";

import hero1 from "../../assets/hero/hero1.jpg";
import hero2 from "../../assets/hero/hero2.jpg";
import hero3 from "../../assets/hero/hero3.jpg";
import hero4 from "../../assets/hero/hero4.jpg";
import hero5 from "../../assets/hero/hero5.jpg";

import {
  FaArrowRight,
  FaPlayCircle,
  FaChevronDown,
} from "react-icons/fa";

const heroImages = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">

      {/* Background Slideshow */}

      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${
            index === currentImage ? "active" : ""
          }`}
          style={{
            backgroundImage: `linear-gradient(
              rgba(8,22,42,.45),
              rgba(8,22,42,.35)
            ), url(${image})`,
          }}
        />
      ))}

      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-tag">
            Empowering Coastal Youth
          </span>

          <h1>
            Empowering Coastal Youth.
            <br />

            <span>
              Transforming Our Communities.
            </span>

          </h1>

          <p>
            JVP Connect is the official platform of
            Jumuiya ya Vijana wa Pwani, bringing together
            young people across Kenya's Coast Region through
            leadership, innovation, entrepreneurship,
            climate action and sustainable development.
          </p>

          <div className="hero-buttons">

            <a href="/register" className="hero-btn primary">

              Join JVP

              <FaArrowRight />

            </a>

            <a href="/about" className="hero-btn secondary">

              Learn More

              <FaPlayCircle />

            </a>

          </div>

        </div>

      </div>

      <div className="scroll-indicator">

        <FaChevronDown />

      </div>

      <div className="hero-wave">

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,96L80,101C160,107,320,117,480,112C640,107,800,85,960,80C1120,75,1280,85,1360,90L1440,96L1440,160L0,160Z"
          />
        </svg>

      </div>

    </section>
  );
}

export default Hero;