import React from "react";
import Card from "react-bootstrap/Card";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone! I'm <span className="purple">Rashmi Singh</span>, from{" "}
            <span className="purple">Varanasi, India</span>.
            <br />
            <br />
            I'm a <span className="purple">Technical Consulting Engineer at Palo Alto Networks</span>,
            working in the <span className="purple">Focused Services team</span>, where I help
            enterprise customers navigate complex network security challenges, manage technical
            escalations, and strengthen their security posture.
            <br />
            <br />
            My professional journey started at <span className="purple">Cisco</span>, where I
            developed a strong foundation in computer networking, VPN technologies, and network
            security. Over time, my interests evolved from traditional networking and VPN
            infrastructure to{" "}
            <span className="purple">Zero Trust, SASE, and cloud-delivered security</span>.
            <br />
            <br />
            Today, I'm also exploring the intersection of{" "}
            <span className="purple">AI and cybersecurity</span>, working on internal automation
            initiatives using Python, REST APIs, automated log analysis, and AI-assisted
            troubleshooting.
            <br />
            <br />
            Apart from coding and network security, here are a few things I love doing:
          </p>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className="about-activity">🏓 Playing Table Tennis</li>
            <li className="about-activity">📚 Reading self-help books</li>
            <li className="about-activity">💃 Dancing</li>
            <li className="about-activity">✈️ Travelling and exploring new places</li>
            <li className="about-activity">🥾 Hiking and learning new things</li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Speak in such a way that others love to listen to you.Listen in such a way that others love to speak to you!"{" "}
          </p>
          <footer className="blockquote-footer">Rashmi</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
