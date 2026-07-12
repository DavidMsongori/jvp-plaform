import "./WhyAttend.css";
import {
  Users,
  Lightbulb,
  Briefcase,
  Globe,
  Award,
  Handshake,
} from "lucide-react";

const reasons = [
  {
    icon: <Users size={40} />,
    title: "Network with Leaders",
    description:
      "Meet thousands of young leaders, professionals, policymakers and changemakers from across Kenya's Coast Region.",
  },
  {
    icon: <Lightbulb size={40} />,
    title: "Discover New Ideas",
    description:
      "Explore innovative solutions, emerging technologies and practical approaches to youth empowerment and sustainable development.",
  },
  {
    icon: <Briefcase size={40} />,
    title: "Career & Business Growth",
    description:
      "Connect with employers, investors, mentors and entrepreneurship support programmes.",
  },
  {
    icon: <Globe size={40} />,
    title: "Regional Impact",
    description:
      "Contribute to discussions shaping the future of the Blue Economy, climate action and regional development.",
  },
  {
    icon: <Award size={40} />,
    title: "Learn from Experts",
    description:
      "Hear from inspiring keynote speakers, innovators, entrepreneurs and experienced industry professionals.",
  },
  {
    icon: <Handshake size={40} />,
    title: "Build Partnerships",
    description:
      "Create meaningful collaborations with organizations, institutions and development partners.",
  },
];

export default function WhyAttend() {
  return (
    <section id="why-attend" className="why-attend">

      <div className="why-container">

        <div className="section-header">

          <span className="section-tag">
            WHY ATTEND
          </span>

          <h2>
            Why You Should Attend
          </h2>

          <p>
            The Coastal Youth Summit brings together ideas,
            opportunities and partnerships that inspire action and
            accelerate youth-led transformation.
          </p>

        </div>

        <div className="why-grid">

          {reasons.map((reason, index) => (

            <div
              className="why-card"
              key={index}
            >

              <div className="why-icon">

                {reason.icon}

              </div>

              <h3>

                {reason.title}

              </h3>

              <p>

                {reason.description}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}