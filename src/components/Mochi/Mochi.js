import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BsX, BsArrowCounterclockwise } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import resumePdf from "../../Assets/rashmi_singh_resume.pdf";
import {
  GREETING,
  NODES,
  matchTopic,
  pickFallback,
  optionsFor,
  startOptions,
} from "./mochiData";
import "./mochi.css";

const TYPING_MS = 650;
const INVITE_DELAY_MS = 3500;
const INVITE_VISIBLE_MS = 9000;

// ---- tiny rich-text renderer: **bold**, "- " bullets, auto-linked emails/URLs ----
const TOKEN = /(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.-]+|https?:\/\/[^\s)]+)/g;

function inline(text, keyPrefix) {
  return text.split(TOKEN).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
      return (
        <a key={key} href={`mailto:${part}`}>
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={key} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

function RichText({ text }) {
  const blocks = [];
  let bullets = [];
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`}>
          {bullets.map((b, i) => (
            <li key={i}>{inline(b, `li-${blocks.length}-${i}`)}</li>
          ))}
        </ul>
      );
      bullets = [];
    }
  };
  text.split("\n").forEach((line) => {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
    } else {
      flush();
      if (line.trim()) {
        blocks.push(<p key={`p-${blocks.length}`}>{inline(line, `p-${blocks.length}`)}</p>);
      }
    }
  });
  flush();
  return <>{blocks}</>;
}

let uid = 0;
const nextId = () => ++uid;

function botEntry(node, role) {
  return {
    id: nextId(),
    from: "bot",
    texts: node.texts,
    actions: node.actions || [],
    options: optionsFor(node, role),
  };
}

function greetingEntry() {
  return {
    id: nextId(),
    from: "bot",
    texts: GREETING,
    actions: [],
    options: startOptions(),
  };
}

export default function Mochi() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [role, setRole] = useState(null);
  const [invite, setInvite] = useState(false);

  const logRef = useRef(null);
  const timerRef = useRef(null);
  const fallbackCount = useRef(0);
  const inputRef = useRef(null);
  const everOpened = useRef(false);

  // Subtle welcome invitation: appears once, never opens the chat by itself.
  useEffect(() => {
    const show = setTimeout(() => setInvite(true), INVITE_DELAY_MS);
    const hide = setTimeout(() => setInvite(false), INVITE_DELAY_MS + INVITE_VISIBLE_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Keep the newest message in view (scroll the log only, not the page).
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  const openChat = () => {
    setInvite(false);
    setOpen(true);
    if (!everOpened.current) {
      everOpened.current = true;
      setMessages([greetingEntry()]);
    }
    setTimeout(() => inputRef.current && inputRef.current.focus(), 250);
  };

  const closeChat = () => setOpen(false);

  const reset = () => {
    clearTimeout(timerRef.current);
    setTyping(false);
    setRole(null);
    setInput("");
    fallbackCount.current = 0;
    setMessages([greetingEntry()]);
  };

  // Show the typing indicator, then deliver the bot reply.
  const reply = useCallback((buildEntry) => {
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, buildEntry()]);
      setTyping(false);
    }, TYPING_MS);
  }, []);

  const goToNode = (nodeId, userText) => {
    const node = NODES[nodeId];
    if (!node || typing) return;
    const nextRole = "role" in node ? node.role : role;
    setRole(nextRole);
    setMessages((m) => [...m, { id: nextId(), from: "user", text: userText }]);
    reply(() => botEntry(node, nextRole));
  };

  const submitText = (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    const nodeId = matchTopic(text);
    if (nodeId) {
      setInput("");
      goToNode(nodeId, text);
      return;
    }
    // Nothing in the script matches: signature "₹0 AI budget" fallback.
    const msg = pickFallback(fallbackCount.current++);
    setInput("");
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
    reply(() => ({
      id: nextId(),
      from: "bot",
      texts: [msg],
      actions: [],
      options: optionsFor({}, role),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitText(input);
  };

  const onAction = (a) => {
    if (a.to) {
      navigate(a.to);
      if (window.innerWidth <= 576) setOpen(false);
    }
  };

  const lastBotId = messages.length ? messages[messages.length - 1].id : null;

  const renderAction = (a, i) => {
    if (a.resume) {
      return (
        <a
          key={i}
          className="mochi-action"
          href={resumePdf}
          download="rashmi_singh_resume.pdf"
        >
          {a.label}
        </a>
      );
    }
    if (a.to) {
      return (
        <button key={i} type="button" className="mochi-action" onClick={() => onAction(a)}>
          {a.label}
        </button>
      );
    }
    return (
      <a
        key={i}
        className="mochi-action"
        href={a.href}
        {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {a.label}
      </a>
    );
  };

  return (
    <div className="mochi-root">
      {/* Chat window */}
      <section
        className={`mochi-window ${open ? "mochi-open" : ""}`}
        role="dialog"
        aria-label="Chat with Mochi"
        aria-hidden={!open}
      >
        <header className="mochi-header">
          <span className="mochi-avatar" aria-hidden="true">
            🌸
          </span>
          <div className="mochi-title">
            <strong>Mochi 🌸</strong>
            <small>Rashmi's tiny digital assistant</small>
          </div>
          <button
            type="button"
            className="mochi-icon-btn"
            onClick={reset}
            aria-label="Reset conversation"
            title="Reset conversation"
            tabIndex={open ? 0 : -1}
          >
            <BsArrowCounterclockwise />
          </button>
          <button
            type="button"
            className="mochi-icon-btn"
            onClick={closeChat}
            aria-label="Close chat"
            title="Close"
            tabIndex={open ? 0 : -1}
          >
            <BsX />
          </button>
        </header>

        <div className="mochi-log" ref={logRef} role="log" aria-live="polite">
          {messages.map((msg) =>
            msg.from === "user" ? (
              <div key={msg.id} className="mochi-row mochi-row-user">
                <div className="mochi-bubble mochi-bubble-user">{msg.text}</div>
              </div>
            ) : (
              <div key={msg.id} className="mochi-row mochi-row-bot">
                <span className="mochi-mini-avatar" aria-hidden="true">
                  🌸
                </span>
                <div className="mochi-group">
                  {msg.texts.map((t, i) => (
                    <div key={i} className="mochi-bubble mochi-bubble-bot">
                      <RichText text={t} />
                    </div>
                  ))}
                  {msg.actions.length > 0 && (
                    <div className="mochi-actions">{msg.actions.map(renderAction)}</div>
                  )}
                  {msg.id === lastBotId && !typing && (
                    <div className="mochi-options">
                      {msg.options.map((o) => (
                        <button
                          key={o.label}
                          type="button"
                          className="mochi-chip"
                          onClick={() => goToNode(o.next, o.label)}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
          {typing && (
            <div className="mochi-row mochi-row-bot">
              <span className="mochi-mini-avatar" aria-hidden="true">
                🌸
              </span>
              <div className="mochi-bubble mochi-bubble-bot mochi-typing" aria-label="Mochi is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <form className="mochi-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="mochi-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question for Mochi…"
            aria-label="Type your message"
            maxLength={200}
            autoComplete="off"
            tabIndex={open ? 0 : -1}
          />
          <button
            type="submit"
            className="mochi-send"
            aria-label="Send message"
            disabled={!input.trim() || typing}
            tabIndex={open ? 0 : -1}
          >
            <IoSend />
          </button>
        </form>
      </section>

      {/* Welcome invitation (never auto-opens the chat) */}
      {invite && !open && (
        <div className="mochi-invite" role="status">
          <button
            type="button"
            className="mochi-invite-text"
            onClick={openChat}
          >
            Hi! I'm Mochi 🌸 Want a tiny tour?
          </button>
          <button
            type="button"
            className="mochi-invite-close"
            onClick={() => setInvite(false)}
            aria-label="Dismiss"
          >
            <BsX />
          </button>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        className={`mochi-launcher ${open ? "mochi-launcher-open" : ""}`}
        onClick={open ? closeChat : openChat}
        aria-label={open ? "Close Mochi chat" : "Open Mochi chat"}
        aria-expanded={open}
      >
        <span className="mochi-launcher-icon">{open ? <BsX /> : "🌸"}</span>
        {!open && <span className="mochi-sparkle" aria-hidden="true">✦</span>}
      </button>
    </div>
  );
}
