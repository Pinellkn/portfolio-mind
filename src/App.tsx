import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import Brain, { type Side } from "./Brain";
import { CAPS, CREDITS, EXPS, FORMS, ME, PROJECTS, SKILLS } from "./data";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad = (n: number, l = 2) => String(n).padStart(l, "0");
const secP = (el: Element) => {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
};

function useProg(ref: RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => ref.current && setP(secP(ref.current));
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, [ref]);
  return p;
}

function useClock() {
  const f = (tz?: string) =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(new Date());
  const [t, setT] = useState([f(), f(ME.tz)]);
  useEffect(() => {
    const id = setInterval(() => setT([f(), f(ME.tz)]), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useHash() {
  const [h, setH] = useState(window.location.hash);
  useEffect(() => {
    const f = () => {
      setH(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return h;
}

/* ---------- petits effets texte ---------- */
function Split({ text }: { text: string }) {
  let k = 0;
  return (
    <>
      {text.split(" ").map((w, wi) => (
        <span key={wi} className="w">
          {[...w].map((c) => {
            const i = k++;
            return (
              <span key={i} className="ch" style={{ animationDelay: `${i * 15}ms` }}>
                {c}
              </span>
            );
          })}{" "}
        </span>
      ))}
    </>
  );
}

function Scr({ text, run }: { text: string; run: boolean }) {
  const [s, setS] = useState("\u00a0");
  useEffect(() => {
    if (!run) {
      setS("\u00a0");
      return;
    }
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#";
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const e = clamp((now - t0) / 700);
      const n = Math.floor(e * text.length);
      setS(
        e >= 1
          ? text
          : text.slice(0, n) +
              [...text.slice(n)].map((c) => (c === " " ? " " : glyphs[Math.floor(Math.random() * glyphs.length)])).join(""),
      );
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, text]);
  return <>{s}</>;
}

/* ---------- boot + curseur ---------- */
function Boot({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(100, v + 1 + Math.floor(Math.random() * 6))), 60);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n < 100) return;
    const a = setTimeout(() => setOut(true), 250);
    const b = setTimeout(onDone, 900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [n, onDone]);
  return (
    <div className={"boot" + (out ? " out" : "")}>
      <div className="bootcard">
        <div className="mono">{ME.code} · BOOT</div>
        <div className="disp bootn">{pad(n, 3)}</div>
        <div className="bootline" style={{ width: `${n}%` }} />
        <div className="mono bootref">C03/S4/0028</div>
      </div>
    </div>
  );
}

function Cursor() {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const m = (e: MouseEvent) => {
      const el = r.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      el.classList.toggle("big", !!(e.target as HTMLElement).closest?.("a,button"));
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return <div ref={r} className="cur" />;
}

/* ---------- header / footer / cadre fixes ---------- */
const CH: [string, string][] = [
  ["A/00 · LANDING", "SCROLL TO OPEN ↓"],
  ["A/01 · WELCOME", "SCROLL ↓"],
  ["A/01 · NATIVE PROMPT", ""],
  ["A/02 · WHO I AM", "→ SIDEWAYS"],
  ["A/03 · CREDITS", ""],
  ["A/04 · PICK A SIDE", "CLICK A SIDE TO ENTER"],
];

function Chrome({ fixed }: { fixed?: { chap: string; hint: string } }) {
  const [s, setS] = useState({ i: 0, pct: 0, hint: CH[0][1] });
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? clamp(window.scrollY / max) : 0;
      if (fixed) return setS((v) => ({ ...v, pct }));
      const els = [...document.querySelectorAll<HTMLElement>("[data-chap]")];
      let i = 0;
      els.forEach((el, k) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) i = k;
      });
      let hint = CH[i][1];
      const p = els[i] ? secP(els[i]) : 0;
      if (i === 2) hint = `LINE ${pad(Math.min(4, Math.floor(p * 4) + 1))} / 04`;
      if (i === 4) hint = `ROLLING · ${pad(Math.min(6, Math.floor(p * 6) + 1))} / 06`;
      setS({ i, pct, hint });
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, [fixed?.chap]);

  return (
    <>
      <div className="cols" />
      <div className="frame" />
      <header className="hdr">
        <a className="c logo disp" href="#/">
          {ME.mono}
        </a>
        <div className="c mono say">
          <span>SAY HI</span>
          <a href={ME.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={14} />
          </a>
          <a href={ME.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={14} />
          </a>
          <a href={ME.waUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle size={14} />
          </a>
          <a href={`mailto:${ME.email}`} aria-label="Email">
            <Mail size={14} />
          </a>
        </div>
        <div className="c mono chap">{fixed ? fixed.chap : CH[s.i][0]}</div>
        <div className="c mono end">
          <span>SCROLL {pad(Math.round(s.pct * 100), 3)}%</span>
          <span className="city">
            {ME.city}, {ME.country}
          </span>
        </div>
      </header>
      {!fixed && s.i >= 2 && s.i < 5 && (
        <div className="vig">
          <div className="mono tiny">{ME.code} · PARKED</div>
          <div className="vigbox">
            <Brain size={200} />
          </div>
        </div>
      )}
      <footer className="ftr mono">
        <span>{fixed ? fixed.hint : s.hint}</span>
        <span>100% HUMAN / INTENT.</span>
      </footer>
    </>
  );
}

/* ---------- A/00 landing ---------- */
const POS: [number, number][] = [
  [-26, -14], [22, 8], [-6, 16], [28, -16], [-30, 12], [8, -22], [-16, -26], [18, 22], [-2, -6], [32, 2],
];

function Landing() {
  const ref = useRef<HTMLElement>(null);
  const p = useProg(ref);
  const [m, setM] = useState({ x: 0, y: 0 });
  const N = PROJECTS.length;
  const cam = p * (N - 0.4);
  const act = clamp(Math.round(cam), 0, N - 1);
  const ap = PROJECTS[act];
  return (
    <section ref={ref} data-chap="0" style={{ height: "520vh" }}>
      <div
        className="stage radar"
        onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
      >
        <div className="field">
          {PROJECTS.map((pr, i) => {
            const d = i - cam;
            const op = d > 4.2 ? 0 : clamp(1 - Math.max(0, d) / 4.2) * (d < 0 ? clamp(1 + d / 0.7) : 1);
            const [x, y] = POS[i % POS.length];
            const k = 1 + (i % 3);
            return (
              <article
                key={pr.id}
                className="mem"
                style={{
                  width: 200 + (i % 3) * 50,
                  opacity: op,
                  zIndex: 100 - i,
                  transform: `translate(-50%,-50%) translate3d(calc(${x}vw + ${m.x * -40 * k}px), calc(${y}vh + ${m.y * -30 * k}px), ${-d * 650}px) rotate(${(i % 2 ? 1 : -1) * (2 + (i % 4))}deg)`,
                }}
              >
                <div className="mono tiny">
                  {pad(i)}-{(i % 3) + 1} · MEMORY
                </div>
                <img src={pr.images[0]} alt="" loading="lazy" />
                <div className="disp mt">{pr.kind}</div>
                <div className="it ms">{pr.name}</div>
              </article>
            );
          })}
        </div>
        <div className="lbl l">
          <div className="mono">
            MEMORY {pad(act + 1)} / {pad(N)}
          </div>
          <div className="disp lt">{ap.kind}</div>
          <div className="it">{ap.name}</div>
        </div>
        <div className="lbl r">
          <div className="mono">DEPTH {pad(Math.round(p * 100), 3)} / 100</div>
          <div className="dline">
            <i style={{ width: `${p * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- A/01 welcome ---------- */
function Welcome() {
  const ref = useRef<HTMLElement>(null);
  const p = useProg(ref);
  const L = [..."WELCOME"];
  return (
    <section ref={ref} data-chap="1" style={{ height: "260vh" }}>
      <div className="stage radar center">
        <h2
          className="wide"
          style={{ transform: `scale(${1 + clamp((p - 0.55) / 0.45) * 2.2})`, opacity: 1 - clamp((p - 0.72) / 0.28) }}
        >
          {L.map((c, i) => {
            const o = clamp(p * L.length * 1.6 - i);
            return (
              <span key={i} style={{ opacity: o, filter: `blur(${(1 - o) * 8}px)` }}>
                {c}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

/* ---------- A/01 native prompt ---------- */
function Prompt() {
  const ref = useRef<HTMLElement>(null);
  const p = useProg(ref);
  const [vis, me] = useClock();
  const step = Math.min(3, Math.floor(p * 4));
  const T: ["a" | "s", string][] = [
    ["a", `IT'S ${vis} WHERE YOU ARE, ${me} IN ${ME.city},`],
    ["s", "and I'm glad it's you"],
    ["a", "SO TAKE YOUR TIME"],
    ["s", "this is the way I think →"],
  ];
  return (
    <section ref={ref} data-chap="2" style={{ height: "440vh" }}>
      <div className="stage radar">
        <div className="rail">
          {T.map((_, i) => (
            <div key={i} className={"mono" + (i === step ? " on" : "")}>
              L{i + 1}
            </div>
          ))}
        </div>
        <div className="plc">
          {T[step][0] === "a" ? (
            <div key={step} className="pa dots fade">
              {T[step][1]}
            </div>
          ) : (
            <div key={step} className="ps">
              <Split text={T[step][1]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- A/02 who i am ---------- */
function Who() {
  const ref = useRef<HTMLElement>(null);
  const p = useProg(ref);
  const pos = clamp(p * 1.15) * 2;
  const shown = Math.ceil(clamp((pos - 0.7) / 0.45) * 6);
  const e = clamp((pos - 1.5) / 0.4);
  const nums: [string, number, string, string][] = [
    ["PROJECTS BUILT", PROJECTS.length, "from zero", ""],
    ["ACADPAY PORTALS", 5, "one platform, five roles", ""],
    ["FLUTTER APPS", 3, "shipped to mobile", ""],
    ["MOBILE-MONEY OPERATORS", 3, "MTN, Moov & Celtiis in FriPay", ""],
  ];
  return (
    <section ref={ref} data-chap="3" style={{ height: "520vh" }}>
      <div className="stage">
        <div className="track" style={{ transform: `translateX(${-pos * 100}vw)` }}>
          <div className="panel p1">
            <div className="mono muted">A/02 · WHO I AM · 01 / 03</div>
            <h2 className="disp big">IN THIS STORY, I'M {ME.first.toUpperCase()}</h2>
            <p className="it bio">{ME.bio}</p>
            <p className="it bio2">I'm a story of all the people I've been.</p>
            <p className="mono muted note">
              // thinking —<br />
              the engineer never left.
              <br />
              it learned to ship.
            </p>
          </div>
          <div className="panel p2">
            <div className="shotwrap">
              <div className="shot">
                <img src={ME.portrait} alt={`Portrait de ${ME.name}`} />
                <i className="k1" />
                <i className="k2" />
                <i className="k3" />
                <i className="k4" />
              </div>
              <div className="mono tiny cap">{ME.code} / FIELD-BUILT</div>
            </div>
            <div className="p2r">
              <div className="mono muted">A/02 · WHO I AM · 02 / 03</div>
              <h2 className="disp h64">
                AS A <em>full-stack developer,</em> I BUILD PRODUCTS, AND THEN I BUILD THE SYSTEMS THAT KEEP THEM ALIVE.
              </h2>
              <div className="mono muted bec">BECAUSE</div>
              <p className="it because">
                Web, mobile, API, cloud, it all runs as one practice for me, and it always starts with the user.
              </p>
              <div className="caps">
                <div className="mono caphead">
                  <span>MODEL CAPABILITIES</span>
                  <span>REF {ME.code}/CAP</span>
                  <span>{pad(shown)} / 06</span>
                </div>
                {CAPS.map((c, i) => (
                  <div key={c[0]} className="mono caprow">
                    <Scr text={`${c[0]} · ${c[1]} · ${c[2]}`} run={i < shown} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="panel p3">
            <div className="notice">
              <div className="mono nhead">
                <span>NOTICE</span>
                <span>C-LOS / 0028</span>
              </div>
              <div className="ngrid">
                {nums.map((n) => (
                  <div key={n[0]} className="ncell">
                    <div className="mono muted">{n[0]}</div>
                    <div className="disp nbig">{Math.round(n[1] * e)}</div>
                    <div className="it">{n[2]}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mono muted note r">
              // thinking —<br />
              numbers first.
              <br />
              then the code that makes them move.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- A/03 credits ---------- */
function Credits() {
  const ref = useRef<HTMLElement>(null);
  const p = useProg(ref);
  const a = Math.min(5, Math.floor(p * 6));
  const row = (i: number, on: boolean) => (
    <div className={"crow" + (on ? " on" : " dots")} key={CREDITS[i][0]}>
      <span className="mono">{pad(i)}-1</span>
      <span className="disp cname">{CREDITS[i][0]}</span>
      <span className="it cproj">{CREDITS[i][1].join(" · ")}</span>
    </div>
  );
  return (
    <section ref={ref} data-chap="4" style={{ height: "640vh" }}>
      <div className="stage radar">
        <div className="chead">
          <h2 className="disp">WHAT THE MIND CAN DO · CREDITS</h2>
          <p className="it">every skill, and where it has been used</p>
        </div>
        <div className="clist">
          {row(a, true)}
          <div className="sep" />
          {a < 5 ? row(a + 1, false) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- A/04 pick a side ---------- */
function Contacts() {
  return (
    <div className="mono contacts">
      <a href={`mailto:${ME.email}`}>{ME.email}</a>
      <a href={ME.waUrl} target="_blank" rel="noreferrer">
        WhatsApp {ME.whatsapp}
      </a>
      <a href={ME.telUrl}>{ME.tel}</a>
      <a href={ME.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={ME.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={ME.cv} target="_blank" rel="noreferrer">
        CV ↗
      </a>
    </div>
  );
}

function Pick() {
  const [side, setSide] = useState<Side>(null);
  const size = window.innerWidth < 700 ? 230 : 340;
  return (
    <section data-chap="5" className="pick">
      <div className="ptop">
        <p className="it">Dive deeper into {ME.first}'s mind</p>
        <h2 className="disp pbig">
          PICK A<br />
          SIDE
        </h2>
      </div>
      <div className="pgrid">
        <a
          className="side sa"
          href="#/analytical"
          onMouseEnter={() => setSide("a")}
          onMouseLeave={() => setSide(null)}
        >
          <div className="disp sn">ANALYTICAL</div>
          <div className="more it">
            Dive in to see the quiet, precise thought process. Architecture, performance, tests: the reason the products
            actually scale.
          </div>
          <div className="mono go">ENTER ⟶</div>
        </a>
        <div className="brainc">
          <Brain size={size} side={side} />
          <div className="btns">
            <a className="mono" href="#/analytical" onMouseEnter={() => setSide("a")} onMouseLeave={() => setSide(null)}>
              ANALYTICAL ▾
            </a>
            <a className="mono" href="#/creative" onMouseEnter={() => setSide("c")} onMouseLeave={() => setSide(null)}>
              CREATIVE ▾
            </a>
          </div>
        </div>
        <a
          className="side sc"
          href="#/creative"
          onMouseEnter={() => setSide("c")}
          onMouseLeave={() => setSide(null)}
        >
          <div className="disp sn">CREATIVE</div>
          <div className="more it">
            Dive in to see the loud, generative parts. Side projects, UI experiments, the things I build when nobody asked
            me to.
          </div>
          <div className="mono go">ENTER ⟶</div>
        </a>
      </div>
      <Contacts />
    </section>
  );
}

/* ---------- sous-pages ---------- */
function Shell({ tone, title, sub, children }: { tone: "a" | "c"; title: string; sub: string; children: ReactNode }) {
  return (
    <>
      <Chrome fixed={{ chap: `A/05 · ${title}`, hint: "← BACK TO THE MIND" }} />
      <main className={"page t" + tone}>
        <a className="mono back" href="#/">
          ← BACK TO THE MIND
        </a>
        <h1 className="disp ptitle">{title}</h1>
        <p className="it psub">{sub}</p>
        {children}
        <Contacts />
      </main>
    </>
  );
}

function Timeline({ items }: { items: { role: string; org: string; period: string; points: string[] }[] }) {
  return (
    <div className="tl">
      {items.map((e) => (
        <div key={e.role + e.period} className="tli">
          <div className="mono muted">{e.period}</div>
          <h4 className="disp">{e.role}</h4>
          <div className="it">{e.org}</div>
          <ul>
            {e.points.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Analytical() {
  return (
    <Shell tone="a" title="ANALYTICAL" sub="the quiet, precise thought process">
      <p className="lead it">{ME.bio}</p>
      <p className="mono avail">{ME.availability} · {ME.place}</p>
      {PROJECTS.map((p, i) => (
        <article className="case" key={p.id}>
          <div className="mono muted">
            CASE {pad(i + 1)} · {p.kind}
            {p.status === "live" ? " · EN PRODUCTION" : p.status === "wip" ? " · EN DÉVELOPPEMENT" : ""}
          </div>
          <h3 className="disp">{p.name}</h3>
          <div className="it role">{p.role}</div>
          <p className="prob">{p.problem}</p>
          {p.metrics && (
            <div className="mets">
              {p.metrics.map((m) => (
                <div key={m.v}>
                  <b className="disp">{m.k}</b>
                  <span className="mono">{m.v}</span>
                </div>
              ))}
            </div>
          )}
          <ul>
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="chips">
            {p.stack.map((s) => (
              <span className="mono" key={s}>
                {s}
              </span>
            ))}
          </div>
          {p.liveUrl && (
            <a className="mono ext" href={p.liveUrl} target="_blank" rel="noreferrer">
              VOIR LE SITE ↗
            </a>
          )}
        </article>
      ))}
      <h2 className="disp sect">COMPÉTENCES</h2>
      <div className="skg">
        {SKILLS.map(([t, it]) => (
          <div key={t}>
            <div className="mono muted">{t}</div>
            <div className="chips">
              {it.map((s) => (
                <span className="mono" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="disp sect">EXPÉRIENCE</h2>
      <Timeline items={EXPS} />
      <h2 className="disp sect">FORMATIONS</h2>
      <Timeline items={FORMS} />
      <p className="mono muted langs">
        LANGUES — {ME.languages}
        <br />
        CENTRES D'INTÉRÊT — {ME.interests}
      </p>
    </Shell>
  );
}

function Creative() {
  return (
    <Shell tone="c" title="CREATIVE" sub="the loud, generative parts">
      <div className="gal">
        {PROJECTS.flatMap((p) =>
          p.images.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noreferrer" className="gi">
              <img src={src} alt={`${p.name} — capture ${i + 1}`} loading="lazy" />
              <span className="mono">
                {p.name} · {pad(i + 1)}
              </span>
            </a>
          )),
        )}
      </div>
      <h2 className="disp sect">EN LIGNE</h2>
      <div className="chips big">
        {PROJECTS.filter((p) => p.liveUrl).map((p) => (
          <a className="mono" key={p.id} href={p.liveUrl} target="_blank" rel="noreferrer">
            {p.name} ↗
          </a>
        ))}
        <a className="mono" href={ME.cv} target="_blank" rel="noreferrer">
          MON CV ↗
        </a>
      </div>
    </Shell>
  );
}

function Home() {
  return (
    <>
      <Chrome />
      <main className="home">
        <Landing />
        <Welcome />
        <Prompt />
        <Who />
        <Credits />
        <Pick />
      </main>
    </>
  );
}

export default function App() {
  const hash = useHash();
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
  }, [booted]);
  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      <Cursor />
      {hash === "#/analytical" ? <Analytical /> : hash === "#/creative" ? <Creative /> : <Home />}
    </>
  );
}

export type _Style = CSSProperties;
