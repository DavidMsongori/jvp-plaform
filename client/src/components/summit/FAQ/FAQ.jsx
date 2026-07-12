import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "Who can attend the Coastal Youth Summit?",
    answer:
      "The summit welcomes students, youth leaders, entrepreneurs, professionals, policymakers, development partners and anyone passionate about youth empowerment.",
  },
  {
    question: "Is registration required?",
    answer:
      "Yes. All participants are required to register through the official summit website before attending.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Every registered participant who attends the summit will receive an official Certificate of Participation.",
  },
  {
    question: "Are meals provided?",
    answer:
      "Yes. Tea, refreshments and lunch will be provided to all registered participants.",
  },
  {
    question: "How can I become a speaker?",
    answer:
      "Speaker nominations and applications will be announced through the official summit communication channels.",
  },
  {
    question: "How can my organization partner with the summit?",
    answer:
      "Organizations can become sponsors or strategic partners by contacting the organizing committee through the Partnership page.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq" id="faq">

      <div className="faq-container">

        <div className="faq-header">

          <span className="section-tag">
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2>Questions?</h2>

          <p>
            Everything you need to know before attending the Coastal
            Youth Summit 2026.
          </p>

        </div>

        <div className="faq-grid">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className={`faq-item ${
                active === index ? "active" : ""
              }`}
            >

              <button
                className="faq-question"
                onClick={() => toggle(index)}
              >

                <span>{faq.question}</span>

                {active === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}

              </button>

              <div
                className={`faq-answer ${
                  active === index ? "show" : ""
                }`}
              >

                <p>{faq.answer}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}