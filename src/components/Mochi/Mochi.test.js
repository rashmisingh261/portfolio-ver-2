import React from "react";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import Mochi from "./Mochi";
import { NODES, MENUS, FALLBACKS, GREETING, matchTopic, pickFallback } from "./mochiData";

const EXACT_FALLBACK =
  "Oh nooo! You've officially exceeded my tiny brain capacity. 🥲\n\nMy AI budget is currently ₹0, so I can't answer that one yet. Maybe ask Rashmi directly?\n\n💌 rashmiisingh261@gmail.com";

function Where() {
  return <div data-testid="where">{useLocation().pathname}</div>;
}

function setup() {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="*" element={<Where />} />
      </Routes>
      <Mochi />
    </MemoryRouter>
  );
}

const openChat = () => fireEvent.click(screen.getByLabelText("Open Mochi chat"));
const wait = () => act(() => void jest.advanceTimersByTime(800));
const chip = (label) => screen.getByRole("button", { name: label });
const click = (label) => {
  fireEvent.click(chip(label));
  wait();
};
const type = (text) => {
  fireEvent.change(screen.getByLabelText("Type your message"), { target: { value: text } });
  fireEvent.click(screen.getByLabelText("Send message"));
  wait();
};
const log = () => screen.getByRole("log");

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe("script data", () => {
  test("signature fallback is the exact required text and comes first", () => {
    expect(FALLBACKS[0]).toBe(EXACT_FALLBACK);
    expect(pickFallback(0)).toBe(EXACT_FALLBACK);
    FALLBACKS.forEach((f) => expect(f).toContain("rashmiisingh261@gmail.com"));
    expect(FALLBACKS.length).toBeGreaterThanOrEqual(4);
  });

  test("every menu option points at a real node", () => {
    Object.values(MENUS).forEach((opts) =>
      opts.forEach((o) => expect(NODES[o.next]).toBeDefined())
    );
    Object.values(NODES).forEach((n) =>
      (n.options || []).forEach((o) => expect(NODES[o.next]).toBeDefined())
    );
  });

  test("keyword matching, case-insensitive, with priority", () => {
    const cases = {
      "Who is Rashmi?": "about",
      "who is rashmi": "about",
      CISCO: "cisco",
      "cisco?": "cisco",
      "Palo Alto": "paloalto",
      "palo-alto": "paloalto",
      VPN: "vpn",
      "tell me about VPNs": "vpn",
      DMVPN: "dmvpn", // more specific than vpn
      SASE: "sase",
      "prisma access": "sase",
      Python: "pyauto",
      Projects: "projects",
      "your resume please": "resume",
      CV: "resume",
      LinkedIn: "linkedin",
      Contact: "contact",
      "email?": "contact",
      Hire: "recruiter",
      "would you hire her?": "wouldHire",
      Sherlock: "sherlock",
      certifications: "certs",
      skills: "skills",
      hi: "greetingAgain",
      "Hello!": "greetingAgain",
      "thanks!": "thanks",
      "do you like anime": "funFacts",
    };
    Object.entries(cases).forEach(([q, node]) => expect([q, matchTopic(q)]).toEqual([q, node]));
  });

  test("unrelated questions match nothing", () => {
    [
      "what's the weather today",
      "how tall is mount everest",
      "write me a poem",
      "what is 2+2",
      "can you build me a website",
      "   ",
      "asdfghjkl",
    ].forEach((q) => expect([q, matchTopic(q)]).toEqual([q, null]));
  });
});

describe("Mochi widget", () => {
  test("starts closed, no greeting until opened, shows invite without opening", () => {
    setup();
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveClass("mochi-open");
    act(() => void jest.advanceTimersByTime(4000));
    expect(screen.getByText(/Want a tiny tour/)).toBeInTheDocument();
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveClass("mochi-open");
  });

  test("opens with the exact greeting and four options; close & reopen keep state", () => {
    setup();
    openChat();
    const dlg = screen.getByRole("dialog");
    expect(dlg).toHaveClass("mochi-open");
    expect(log().textContent).toContain("Hiii! Welcome to Rashmi's little corner of the internet!");
    expect(log().textContent).toContain("who are you? 👀");
    expect(GREETING[0]).toMatch(/^Hiii! Welcome/);
    [
      "Recruiter / Hiring Manager 🧑‍💼",
      "Fellow Engineer 💻",
      "Potential Collaborator 🤝",
      "Just a curious visitor 🌷",
    ].forEach((l) => expect(chip(l)).toBeInTheDocument());

    click("Fellow Engineer 💻");
    fireEvent.click(screen.getByLabelText("Close chat"));
    expect(screen.getByRole("dialog", { hidden: true })).not.toHaveClass("mochi-open");
    fireEvent.click(screen.getByLabelText("Open Mochi chat"));
    expect(log().textContent).toContain("A fellow techie!");
  });

  test("recruiter: intro, every option, resume download, would-I-hire branches", () => {
    setup();
    openChat();
    click("Recruiter / Hiring Manager 🧑‍💼");
    expect(log().textContent).toContain("Ooooh, a potential hiring manager!");

    click("Professional Experience");
    let t = log().textContent;
    ["Palo Alto Networks", "August 2026 – Present", "Manages 10+ enterprise customer accounts",
      "Increased error identification by 30%", "Security Consulting Engineer | January 2023 – August 2026",
      "1,000+ endpoints and 300+ sites", "Authored Cisco Knowledge Base articles"].forEach((s) =>
      expect(t).toContain(s)
    );
    fireEvent.click(screen.getByRole("button", { name: "Explore full experience" }));
    expect(screen.getByTestId("where")).toHaveTextContent("/resume");

    click("Technical Skills");
    t = log().textContent;
    ["TCP/IP, BGP, OSPF", "PAN-OS, Prisma Access", "Netmiko, Multithreading", "Wireshark, tcpdump"].forEach(
      (s) => expect(t).toContain(s)
    );

    click("Projects");
    t = log().textContent;
    expect(t).toContain("DMVPN Deployment Automation");
    expect(t).toContain("Reduced manual effort by 70%");
    expect(t).toContain("Network Monitoring & Diagnostics Toolkit");

    click("Certifications");
    t = log().textContent;
    expect(t).toContain("CCNP Security — Valid until October 2028.");
    expect(t).toContain("Cisco DevNet Associate — Valid until June 2028.");

    click("Download Resume");
    const dl = within(log()).getAllByRole("link", { name: /Download Resume/ }).pop();
    expect(dl).toHaveAttribute("download", "rashmi_singh_resume.pdf");
    expect(dl.getAttribute("href")).toMatch(/rashmi_singh_resume\.pdf$/);

    click("Would I hire Rashmi?");
    expect(log().textContent).toContain("Rashmi pays my imaginary salary");
    expect(log().textContent).toContain("worth an interview");
    ["Absolutely! Show me her resume.", "Interesting! I want to know more.", "I need more convincing!"].forEach(
      (l) => expect(chip(l)).toBeInTheDocument()
    );
    click("I need more convincing!");
    expect(log().textContent).toContain("receipts");
    click("Would I hire Rashmi?");
    click("Interesting! I want to know more.");
    expect(log().textContent).toContain("Pick a topic");
    click("Would I hire Rashmi?");
    click("Absolutely! Show me her resume.");
    expect(
      within(log()).getAllByRole("link", { name: /Download Resume/ }).pop()
    ).toHaveAttribute("download");
  });

  test("engineer: every topic answers", () => {
    setup();
    openChat();
    click("Fellow Engineer 💻");
    expect(log().textContent).toContain("things that make networks cry");
    const expectations = {
      "VPN Technologies": "IPsec, IKEv1/v2, SSL VPN, AnyConnect",
      "DMVPN Automation": "1,000+ tunnels",
      "Network Security": "PAN-OS",
      "SASE and Prisma Access": "Prisma Access",
      "Python Automation": "35–45%",
      "Project Sherlock": "TAC automation workflows",
    };
    Object.entries(expectations).forEach(([label, text]) => {
      click(label);
      expect(log().textContent).toContain(text);
    });
  });

  test("collaborator: every option, with email button", () => {
    setup();
    openChat();
    click("Potential Collaborator 🤝");
    expect(log().textContent).toContain("new connections");
    ["Technical Projects", "Automation Ideas", "Cybersecurity Discussions", "Something Else"].forEach(
      (label) => {
        click(label);
        const emailLinks = within(log()).getAllByRole("link", { name: /Email Rashmi/ });
        expect(emailLinks.pop()).toHaveAttribute("href", "mailto:rashmiisingh261@gmail.com");
      }
    );
  });

  test("curious visitor: every option, confirmed fun facts only", () => {
    setup();
    openChat();
    click("Just a curious visitor 🌷");
    expect(log().textContent).toContain("Just exploring? That's perfectly fine!");
    click("Who is Rashmi?");
    expect(log().textContent).toContain("Varanasi, India");
    click("What does she do?");
    expect(log().textContent).toContain("technical escalations");
    click("What does she enjoy?");
    expect(log().textContent).toContain("table tennis");
    click("Show me something interesting.");
    ["represented her state in professional table tennis", "anime and manga", "travelling and hiking",
      "cooking and learning new technologies"].forEach((s) => expect(log().textContent).toContain(s));
    click("Contact Rashmi.");
    const links = within(log()).getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("mailto:rashmiisingh261@gmail.com");
    expect(hrefs).toContain("https://www.linkedin.com/in/rashmi-singh-5610b31b9/");
    expect(hrefs).toContain("https://github.com/Rashmi1526");
    expect(hrefs).toContain("https://rashmisingh.netlify.app/");
  });

  test("typed keywords work and unknown questions get the exact fallback with mailto", () => {
    setup();
    openChat();
    type("Cisco");
    expect(log().textContent).toContain("Security Consulting Engineer");
    type("palo alto");
    expect(log().textContent).toContain("Focused Services team");
    type("linkedin");
    expect(
      within(log()).getAllByRole("link", { name: "LinkedIn" }).pop()
    ).toHaveAttribute("href", "https://www.linkedin.com/in/rashmi-singh-5610b31b9/");

    type("what is the capital of France?");
    const bubbles = log().querySelectorAll(".mochi-bubble-bot");
    const last = bubbles[bubbles.length - 1];
    expect(last.textContent).toContain("You've officially exceeded my tiny brain capacity. 🥲");
    expect(last.textContent).toContain("My AI budget is currently ₹0, so I can't answer that one yet. Maybe ask Rashmi directly?");
    const mail = within(last).getByRole("link", { name: "rashmiisingh261@gmail.com" });
    expect(mail).toHaveAttribute("href", "mailto:rashmiisingh261@gmail.com");

    // second unknown uses a funny variant (still with email)
    type("what is the capital of Spain?");
    const b2 = log().querySelectorAll(".mochi-bubble-bot");
    expect(b2[b2.length - 1].textContent).not.toContain("exceeded my tiny brain");
    expect(b2[b2.length - 1].textContent).toContain("rashmiisingh261@gmail.com");
  });

  test("Enter key submits; empty/whitespace messages are blocked", () => {
    setup();
    openChat();
    const input = screen.getByLabelText("Type your message");
    const send = screen.getByLabelText("Send message");
    expect(send).toBeDisabled();
    fireEvent.change(input, { target: { value: "   " } });
    expect(send).toBeDisabled();
    fireEvent.submit(input.closest("form"));
    wait();
    expect(log().querySelectorAll(".mochi-bubble-user")).toHaveLength(0);

    fireEvent.change(input, { target: { value: "python" } });
    fireEvent.submit(input.closest("form")); // what Enter does
    // typing indicator shows before the reply
    expect(screen.getByLabelText("Mochi is typing")).toBeInTheDocument();
    wait();
    expect(screen.queryByLabelText("Mochi is typing")).toBeNull();
    expect(log().textContent).toContain("Python is Rashmi's automation sidekick");
  });

  test("reset restores the greeting and options", () => {
    setup();
    openChat();
    click("Fellow Engineer 💻");
    click("VPN Technologies");
    fireEvent.click(screen.getByLabelText("Reset conversation"));
    expect(log().querySelectorAll(".mochi-bubble-user")).toHaveLength(0);
    expect(log().textContent).toContain("Hiii! Welcome");
    expect(chip("Recruiter / Hiring Manager 🧑‍💼")).toBeInTheDocument();
  });
});
