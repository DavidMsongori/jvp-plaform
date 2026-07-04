import "./About.css";

import {
    FaCheckCircle
} from "react-icons/fa";

import about1 from "../../assets/about/about1.jpg";
import about2 from "../../assets/about/about2.jpg";
import about3 from "../../assets/about/about3.jpg";
import about4 from "../../assets/about/about4.jpg";

function About(){

return(

<section className="about">

<div className="about-left">

<span>

WHO WE ARE

</span>

<h2>

Building Strong Communities Through
Youth Leadership & Innovation

</h2>

<p>

Jumuiya ya Vijana wa Pwani is a regional youth movement bringing together young people from Kenya's six coastal counties to create opportunities through leadership, entrepreneurship, climate action and sustainable development.

</p>

<ul>

<li>

<FaCheckCircle/>

Leadership Development

</li>

<li>

<FaCheckCircle/>

Climate Action

</li>

<li>

<FaCheckCircle/>

Youth Entrepreneurship

</li>

<li>

<FaCheckCircle/>

Community Service

</li>

</ul>

<a href="/about">

Learn More →

</a>

</div>

<div className="about-right">

<img src={about1} className="big"/>

<img src={about2}/>

<img src={about3}/>

<img src={about4} className="big"/>

</div>

</section>

);

}

export default About;