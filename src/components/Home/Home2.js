import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//import myImg from "../../Assets/avatar.svg";
//import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
            I started my journey in technology with a curiosity for building things through code. My early interest in frontend development introduced me to programming through C++, JavaScript, and Python, where I enjoyed turning ideas into tangible products.
              <br />
              <br />
              During my internship and subsequent full-time experience at <b className="purple">Cisco</b>, I discovered my passion for computer networking and cybersecurity. What started with traditional networking and infrastructure gradually evolved into a specialization in VPN technologies, network security, Zero Trust, and Secure Access Service Edge (SASE).
              <br />
              <br />
              Today, I work at <b className="purple">Palo Alto Networks as a Technical Consulting Engineer in the Focused Services team</b>, managing enterprise customer accounts, owning complex TAC escalations, and helping customers resolve critical security challenges. I also work on internal AI-driven automation initiatives involving Python, REST APIs, automated log analysis, and AI-assisted troubleshooting.
              <br />
              <br />
              My journey has taken me from building web interfaces to troubleshooting complex enterprise networks and now working at the intersection of <b className="purple">SASE, cybersecurity, cloud networking, and AI automation</b>.
              <br />
              <br />
              I continue to explore modern technologies, build automation solutions, and learn how emerging technologies can make networks more secure, intelligent, and resilient.
            </p>
          </Col>
          {/* <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col> */}
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Rashmi1526"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://mobile.twitter.com/RashmiSingh_"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/rashmi-singh-5610b31b9/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
