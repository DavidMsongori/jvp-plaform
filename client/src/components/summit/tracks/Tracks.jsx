import "./Tracks.css";

import {
  Landmark,
  Briefcase,
  Lightbulb,
  Leaf,
  HeartHandshake,
  Globe,
  ArrowRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tracks = [
  {
    icon: <Landmark size={42} />,
    title: "Leadership & Governance",
    description:
      "Explore ethical leadership, public governance, accountability, civic participation and youth representation in decision-making processes.",
    audience:
      "Student leaders, youth leaders, government officials and policymakers.",
  },

  {
    icon: <Briefcase size={42} />,
    title: "Entrepreneurship & Jobs",
    description:
      "Discover opportunities in entrepreneurship, agribusiness, digital economy, MSMEs, financial inclusion and employment creation.",
    audience:
      "Entrepreneurs, graduates, SMEs, investors and business owners.",
  },

  {
    icon: <Leaf size={42} />,
    title: "Blue Economy & Climate Action",
    description:
      "Unlock opportunities in fisheries, marine resources, tourism, conservation, climate resilience and sustainable coastal development.",
    audience:
      "Environmentalists, researchers, NGOs and coastal communities.",
  },

  {
    icon: <Lightbulb size={42} />,
    title: "Innovation & Technology",
    description:
      "Experience AI, digital transformation, smart solutions, innovation hubs and emerging technologies transforming Africa.",
    audience:
      "Tech innovators, startups, students and developers.",
  },

  {
    icon: <HeartHandshake size={42} />,
    title: "Health & Social Inclusion",
    description:
      "Promote mental health, gender equality, disability inclusion, youth wellbeing and community resilience.",
    audience:
      "Health professionals, CSOs, youth advocates and development partners.",
  },

  {
    icon: <Globe size={42} />,
    title: "Partnerships & Investment",
    description:
      "Build collaborations between government, academia, NGOs, donors and the private sector to accelerate youth development.",
    audience:
      "Investors, NGOs, universities, partners and institutions.",
  },
];

export default function Tracks() {
  return (
    <section className="tracks" id="tracks">

      <div className="tracks-container">

        <div className="tracks-header">

          <span className="section-tag">
            SUMMIT TRACKS
          </span>

          <h2>
            Six Transformative Conversations
          </h2>

          <p>
            The Coastal Youth Summit is structured around six high-impact
            thematic tracks designed to inspire collaboration, innovation,
            leadership and practical solutions for sustainable development
            across Kenya's Coast Region.
          </p>

        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {tracks.map((track) => (

            <SwiperSlide key={track.title}>

              <div className="track-card">

                <div className="track-icon">
                  {track.icon}
                </div>

                <h3>
                  {track.title}
                </h3>

                <p className="track-description">
                  {track.description}
                </p>

                <div className="track-audience">

                  <span>Ideal For</span>

                  <p>{track.audience}</p>

                </div>

                <div className="track-footer">

                  <a href="#" className="track-btn">

                    Learn More

                    <ArrowRight size={18} />

                  </a>

                </div>

              </div>

            </SwiperSlide>

          ))}
        </Swiper>

      </div>

    </section>
  );
}