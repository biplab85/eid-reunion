"use client";

import { useEffect, useState, useCallback } from "react";

// ---------------- data ----------------
const NAV = [
  { id: "home", label: "হোম" },
  { id: "about", label: "পরিচিতি" },
  { id: "schedule", label: "সময়সূচি" },
  { id: "teachers", label: "স্মৃতি" },
  { id: "gallery", label: "গ্যালারি" },
  { id: "video", label: "ভিডিও" },
  { id: "contact", label: "যোগাযোগ" },
];

const SCHEDULE = [
  { time: "৯:০০ – ১০:০০", period: "সকাল", emoji: "🎟️", title: "টোকেন সংগ্রহ" },
  { time: "১০:০০ – ১১:০০", period: "সকাল", emoji: "👕", title: "টি-শার্ট বিতরণ" },
  { time: "১১:০০ – ১১:৩০", period: "সকাল", emoji: "🎉", title: "উদ্বোধনী অনুষ্ঠান" },
  { time: "১১:৩০ – ১২:০০", period: "সকাল", emoji: "🚩", title: "আনন্দ র‍্যালি" },
  { time: "১২:০০ – ১:০০", period: "দুপুর", emoji: "🤼", title: "পুরুষদের: রশি টানা / মহিলাদের: বালিশ বদল" },
  { time: "১:০০ – ২:০০", period: "দুপুর", emoji: "🕌", title: "নামাজ ও খাবারের বিরতি" },
  { time: "২:০০ – ৩:০০", period: "বিকাল", emoji: "🏏", title: "পুরুষদের: স্ট্যাম্পে বল লাগানো / মহিলাদের: বেলুন ফাটানো" },
  { time: "৩:০০ – ৩:৩০", period: "বিকাল", emoji: "🧺", title: "পুরুষদের: ঝুড়িতে বল নিক্ষেপ" },
  { time: "৩:৩০ – ৪:৩০", period: "বিকাল", emoji: "🥁", title: "ঢালি খেলা" },
  { time: "৪:৩০ – ৫:৩০", period: "বিকাল", emoji: "☕", title: "শুভেচ্ছা বিনিময় ও কফি আড্ডা" },
  { time: "৫:৩০ – ৬:০০", period: "বিকাল", emoji: "🎙️", title: "স্মৃতিমূলক বক্তব্য" },
  { time: "৬:৩০ – ৭:০০", period: "সন্ধ্যা", emoji: "🍵", title: "বিরতি / প্রস্তুতি" },
  { time: "৭:০০ – ৯:০০", period: "সন্ধ্যা", emoji: "🎶", title: "সাংস্কৃতিক অনুষ্ঠান" },
  { time: "৯:০০ – ৯:৩০", period: "রাত", emoji: "🌙", title: "বিদায়ী বক্তব্য" },
];

const TEACHERS = [
  { name: "বাবু সত্যজিৎ বিশ্বাস", role: "শ্রদ্ধেয় শিক্ষক" },
  { name: "বাবু সত্যেন্দ্রনাথ বিশ্বাস", role: "শ্রদ্ধেয় শিক্ষক" },
  { name: "বাবু ঠাকুরদাস মল্লিক", role: "শ্রদ্ধেয় শিক্ষক" },
  { name: "বাবু রবীন্দ্রনাথ বিশ্বাস", role: "শ্রদ্ধেয় শিক্ষক" },
];

const GALLERY = Array.from({ length: 59 }, (_, i) => `/gallery/${i + 1}.jpeg`);

const VIDEOS = [
  { src: "/video/promo.mp4", poster: "/video/avatar-1.svg", title: "আয়োজকের আমন্ত্রণ বার্তা", note: "সরাসরি বিদ্যালয় প্রাঙ্গণ থেকে", len: "০:৫৮" },
  { src: "/video/message.mp4", poster: "/video/avatar-2.svg", title: "শুভেচ্ছা বার্তা", note: "প্রিয় মুখের আন্তরিক আমন্ত্রণ", len: "০:৩৭" },
];

const FORM_URL = "https://forms.gle/X5yZqpNDj9sUWo99";
const FB_GROUP = "https://www.facebook.com/groups/225722284272250/";

// ---------------- icons ----------------
const I = {
  cal: (p: any) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>),
  clock: (p: any) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>),
  pin: (p: any) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>),
  phone: (p: any) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>),
  fb: (p: any) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>),
  star: (p: any) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.4 6.9H22l-6 4.4 2.3 7-6.3-4.4L5.7 20 8 13.3 2 8.9h7.6Z"/></svg>),
  moon: (p: any) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21 13a8.5 8.5 0 1 1-9.9-9.8A7 7 0 1 0 21 13Z"/></svg>),
  list: (p: any) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M8 6h13M8 12h13M8 18h13" strokeLinecap="round"/><circle cx="3.6" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="3.6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="3.6" cy="18" r="1.3" fill="currentColor" stroke="none"/></svg>),
  grid: (p: any) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/></svg>),
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lb, setLb] = useState<number | null>(null);
  const [vid, setVid] = useState<(typeof VIDEOS)[number] | null>(null);
  const [reminder, setReminder] = useState(false);
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [schedView, setSchedView] = useState<"list" | "table">("list");

  // premium intro splash: shows on load, auto-closes after 5s
  useEffect(() => {
    if (!splash) return;
    document.body.style.overflow = "hidden";
    const tOut = setTimeout(() => setSplashOut(true), 4400);
    const tEnd = setTimeout(() => setSplash(false), 5000);
    return () => { clearTimeout(tOut); clearTimeout(tEnd); document.body.style.overflow = ""; };
  }, [splash]);

  const skipSplash = useCallback(() => {
    setSplashOut(true);
    setTimeout(() => setSplash(false), 500);
  }, []);

  // sticky nav state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [schedView]); // re-observe when schedule view toggles so new content reveals

  // lightbox keyboard nav
  const move = useCallback((d: number) => setLb((p) => (p === null ? p : (p + d + GALLERY.length) % GALLERY.length)), []);
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [lb, move]);

  // registration reminder: pops up after 2 minutes (once per browser session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dhopadi_reminder_seen")) return;
    const t = setTimeout(() => {
      setReminder(true);
      sessionStorage.setItem("dhopadi_reminder_seen", "1");
    }, 120000); // 2 minutes
    return () => clearTimeout(t);
  }, []);

  // video modal / reminder: lock scroll + close on Escape
  useEffect(() => {
    if (!vid && !reminder) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setVid(null); setReminder(false); } };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [vid, reminder]);

  const go = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      {/* ---------------- INTRO SPLASH ---------------- */}
      {splash && (
        <div className={`splash ${splashOut ? "out" : ""}`} role="dialog" aria-label="স্বাগতম">
          <div className="splash-lattice" />
          <span className="splash-moon"><I.moon /></span>
          <div className="splash-card">
            <span className="splash-kicker latin">Dhopadi · Eid Reunion 2026</span>
            <figure className="splash-frame">
              <img src="/posters/intro.jpeg" alt="ঈদ পুনর্মিলনী ২০২৬" />
            </figure>
            <p className="splash-title">ঈদ পুনর্মিলনী ২০২৬</p>
            <p className="splash-sub">স্মৃতির টানে, সবাই একসাথে</p>
            <div className="splash-bar"><span /></div>
          </div>
          <button className="splash-skip" onClick={skipSplash}>প্রবেশ করুন →</button>
        </div>
      )}

      {/* ---------------- NAV ---------------- */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <span className="brand-mark"><I.moon /></span>
          <span className="brand-text">
            <b>ঈদ পুনর্মিলনী</b>
            <span>Dhopadi · 2026</span>
          </span>
        </a>

        <nav className={`nav-links ${menu ? "open" : ""}`}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
          ))}
          <a className="nav-cta" href={FORM_URL} target="_blank" rel="noreferrer">রেজিস্ট্রেশন</a>
        </nav>

        <button className="nav-toggle" aria-label="মেনু" onClick={() => setMenu((m) => !m)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="home" className="hero">
        <div className="hero-grain" />
        <div className="hero-moon" />
        <span className="hero-lantern l1" /><span className="hero-lantern l2" /><span className="hero-lantern l3" />

        <div className="wrap hero-inner">
          <div className="reveal in">
            <p className="hero-kicker">স্মৃতির টানে, সবাই একসাথে</p>
            <h1>
              ঈদ <span className="glow latin">পুনর্মিলনী</span> ২০২৬
            </h1>
            <p className="hero-school">ধোপাদী মাধ্যমিক বিদ্যালয়ের প্রাক্তন শিক্ষক ও শিক্ষার্থীদের মিলনমেলা</p>
            <p className="hero-tag">“আসুন, ঈদের আনন্দে আবার ফিরে পাই স্মৃতির সেই দিনগুলো”</p>

            <div className="hero-meta">
              <div><I.cal /><div><b>৩০শে মে ২০২৬</b><small>শনিবার</small></div></div>
              <div><I.clock /><div><b>সকাল ৯:০০ টা</b><small>শুরু</small></div></div>
              <div><I.pin /><div><b>বিদ্যালয় প্রাঙ্গণ</b><small>ধোপাদী</small></div></div>
            </div>

            <div className="hero-actions">
              <a className="btn btn-gold" href={FORM_URL} target="_blank" rel="noreferrer">এখনই রেজিস্ট্রেশন করুন →</a>
              <a className="btn btn-ghost" href="#schedule" onClick={(e) => { e.preventDefault(); go("schedule"); }}>অনুষ্ঠান সূচি দেখুন</a>
            </div>
          </div>

          <figure className="hero-poster reveal in d2">
            <img src="/posters/invitation2.jpeg" alt="ঈদ পুনর্মিলনী ২০২৬ আমন্ত্রণপত্র" />
          </figure>
        </div>

        <div className="scroll-hint"><span className="mouse" />নিচে স্ক্রল করুন</div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="section about">
        <div className="wrap about-grid">
          <div className="reveal">
            <span className="eyebrow">আমাদের কথা</span>
            <h2 className="section-title" style={{ textAlign: "left" }}>আবার একসাথে, সেই চেনা আঙিনায়</h2>
            <p className="about-lead">বছর ঘুরে আবার ঈদ — আর ঈদের আনন্দে এবার যোগ হলো পুরোনো বন্ধুত্ব আর শৈশবের স্মৃতি।</p>
            <div className="about-body">
              <p>ধোপাদী মাধ্যমিক বিদ্যালয়ের প্রাঙ্গণে আবারও মিলিত হবেন প্রাক্তন শিক্ষক ও শিক্ষার্থীরা। দিনভর থাকছে খেলাধুলা, সাংস্কৃতিক অনুষ্ঠান, স্মৃতিচারণ আর প্রাণখোলা আড্ডা।</p>
              <p>যারা একসময় এই স্কুলের বারান্দায় হেঁটেছেন, একই মাঠে খেলেছেন, একই ক্লাসে বসেছেন — তাদের সবাইকে জানাই আন্তরিক আমন্ত্রণ।</p>
              <div className="about-quote">“স্মৃতির পাতা থেকে ফিরে আসুক হারিয়ে যাওয়া সেই দিনগুলো।”</div>
            </div>
          </div>
          <figure className="about-media reveal d2">
            <img src="/gallery/1.jpeg" alt="ধোপাদী মাধ্যমিক বিদ্যালয়" />
          </figure>
        </div>
      </section>

      {/* ---------------- DETAILS ---------------- */}
      <section className="section details">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">এক নজরে</span>
            <h2 className="section-title">অনুষ্ঠানের বিবরণ</h2>
            <div className="flourish" />
          </div>
          <div className="detail-cards">
            <div className="detail-card reveal d1"><div className="detail-ico"><I.cal /></div><h3>তারিখ</h3><p>৩০শে মে ২০২৬<br />শনিবার</p></div>
            <div className="detail-card reveal d2"><div className="detail-ico"><I.clock /></div><h3>সময়</h3><p>সকাল ৯:০০ টা থেকে<br />রাত ৯:৩০ পর্যন্ত</p></div>
            <div className="detail-card reveal d3"><div className="detail-ico"><I.pin /></div><h3>স্থান</h3><p>ধোপাদী মাধ্যমিক<br />বিদ্যালয় প্রাঙ্গণ</p></div>
          </div>
        </div>
      </section>

      {/* ---------------- SCHEDULE ---------------- */}
      <section id="schedule" className="section schedule">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">অনুষ্ঠান সূচি</span>
            <h2 className="section-title">সারাদিনের আয়োজন</h2>
            <p className="section-sub">সকাল থেকে রাত — হাসি, খেলা আর স্মৃতিতে ভরা একটি পূর্ণ দিন।</p>
          </div>
          {/* view toggle — list (default) / table */}
          <div className="sch-toggle reveal" role="tablist" aria-label="সূচি ভিউ">
            <button
              type="button" role="tab" aria-selected={schedView === "list"}
              className={schedView === "list" ? "active" : ""}
              onClick={() => setSchedView("list")}
            >
              <I.list /> তালিকা ভিউ
            </button>
            <button
              type="button" role="tab" aria-selected={schedView === "table"}
              className={schedView === "table" ? "active" : ""}
              onClick={() => setSchedView("table")}
            >
              <I.grid /> টেবিল ভিউ
            </button>
          </div>

          {schedView === "list" ? (
            <div className="timeline">
              {SCHEDULE.map((s, i) => (
                <div className="tl-row reveal" key={i}>
                  <div className="tl-time latin">{s.time}<br /><span className="badge">{s.period}</span></div>
                  <span className="tl-dot" />
                  <div className="tl-card">
                    <span className="tl-emoji">{s.emoji}</span>
                    <div><b>{s.title}</b></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="sch-table-wrap reveal">
              <table className="sch-table">
                <thead>
                  <tr>
                    <th>সময়</th>
                    <th>পর্ব</th>
                    <th>আয়োজন</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((s, i) => (
                    <tr key={i}>
                      <td className="st-time latin">{s.time}</td>
                      <td><span className="st-period">{s.period}</span></td>
                      <td className="st-event"><span className="st-emoji">{s.emoji}</span>{s.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- TEACHERS ---------------- */}
      <section id="teachers" className="section teachers">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">স্মৃতির পাতা থেকে</span>
            <h2 className="section-title">আমাদের শ্রদ্ধেয় শিক্ষকবৃন্দ</h2>
            <p className="section-sub">আমাদের জীবন গড়ার পেছনে সকল শিক্ষকের অবদান অসীম।</p>
          </div>
          <div className="teacher-grid">
            {TEACHERS.map((t, i) => (
              <div className="teacher-card reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="teacher-photo"><img src="/gallery/6.jpeg" alt={t.name} /></div>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </div>
            ))}
          </div>
          <p className="teacher-note reveal">তাদের প্রতি রইলো গভীর শ্রদ্ধা ও কৃতজ্ঞতা। 🙏</p>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section id="gallery" className="section gallery">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">মুহূর্তগুলো</span>
            <h2 className="section-title">ছবিতে আয়োজন</h2>
            <p className="section-sub">প্রচার, প্রস্তুতি আর আমন্ত্রণ — সব মিলিয়ে আমাদের পথচলা।</p>
          </div>
          <div className="masonry">
            {GALLERY.map((src, i) => (
              <figure className="reveal" key={src} onClick={() => setLb(i)}>
                <img src={src} alt={`গ্যালারি ছবি ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- VIDEO ---------------- */}
      <section id="video" className="section video-sec">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">আমন্ত্রণ ভিডিও</span>
            <h2 className="section-title">দেখুন ও শুনুন</h2>
            <p className="section-sub">আয়োজকদের কণ্ঠে সরাসরি আমন্ত্রণ।</p>
          </div>
          <div className="video-grid">
            {VIDEOS.map((v, i) => (
              <figure
                className={`video-card reveal d${i + 1}`}
                key={v.src}
                onClick={() => setVid(v)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setVid(v)}
              >
                <div className="video-thumb">
                  <img src={v.poster} alt={v.title} loading="lazy" />
                  <span className="play-btn" aria-hidden>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2Z" /></svg>
                  </span>
                  <span className="video-len latin">{v.len}</span>
                </div>
                <figcaption><b>{v.title}</b><span>{v.note}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- REGISTER ---------------- */}
      <section id="register" className="section register">
        <div className="wrap">
          <div className="register-card reveal">
            <h2>ঈদ পুনর্মিলনীতে আসছি, <br />আপনি আসছেন তো?</h2>
            <p>নিবন্ধন চলছে। নিচের বাটনে ক্লিক করে আপনার নাম নিশ্চিত করুন — আসনসংখ্যা সীমিত।</p>
            <a className="btn btn-gold" href={FORM_URL} target="_blank" rel="noreferrer">গুগল ফর্মে রেজিস্ট্রেশন করুন →</a>
            <p className="register-note">{FORM_URL}</p>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer id="contact" className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand reveal">
            <h4>ধোপাদী মাধ্যমিক বিদ্যালয়</h4>
            <b>প্রাক্তন শিক্ষক ও শিক্ষার্থী পরিবার</b>
            <p>স্মৃতির টানে, সবাই একসাথে — ঈদ পুনর্মিলনী ২০২৬। আসুন, ঈদের আনন্দ ভাগ করে নিই পুরোনো বন্ধুদের সাথে।</p>
            <a className="contact-item" href={FB_GROUP} target="_blank" rel="noreferrer" style={{ marginTop: "1rem" }}>
              <I.fb /><span>ফেসবুক গ্রুপ: ধোপাদী মাধ্যমিক বিদ্যালয় পরিবার</span>
            </a>
          </div>

          <div className="reveal d1">
            <h4>যোগাযোগ</h4>
            <div className="contact-item"><I.phone /><div><b>মো: হাসানুর রহমান</b><a href="tel:01915904851">০১৯১৫-৯০৪৮৫১</a></div></div>
            <div className="contact-item"><I.phone /><div><b>মো: আসাদুজ্জামান ইমন</b><a href="tel:01996613416">০১৯৯৬-৬১৩৪১৬</a></div></div>
            <div className="contact-item"><I.pin /><div><b>স্থান</b><span>ধোপাদী মাধ্যমিক বিদ্যালয় প্রাঙ্গণ</span></div></div>
          </div>

          <div className="footer-links reveal d2">
            <h4>দ্রুত লিংক</h4>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }}>{n.label}</a>
            ))}
            <a href={FORM_URL} target="_blank" rel="noreferrer">রেজিস্ট্রেশন</a>
          </div>
        </div>
        <div className="footer-bottom">
          © ২০২৬ ধোপাদী মাধ্যমিক বিদ্যালয় প্রাক্তন পরিবার · <span className="latin">Eid Reunion 2026</span>
        </div>
      </footer>

      {/* ---------------- LIGHTBOX ---------------- */}
      {lb !== null && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <button className="lb-close" aria-label="বন্ধ করুন" onClick={() => setLb(null)}>✕</button>
          <button className="lb-btn lb-prev" aria-label="আগের" onClick={(e) => { e.stopPropagation(); move(-1); }}>‹</button>
          <img src={GALLERY[lb]} alt={`গ্যালারি ছবি ${lb + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-next" aria-label="পরের" onClick={(e) => { e.stopPropagation(); move(1); }}>›</button>
          <div className="lb-count latin">{lb + 1} / {GALLERY.length}</div>
        </div>
      )}

      {/* ---------------- VIDEO MODAL ---------------- */}
      {vid && (
        <div className="video-modal" onClick={() => setVid(null)}>
          <button className="vm-close" aria-label="বন্ধ করুন" onClick={() => setVid(null)}>✕</button>
          <div className="vm-stage" onClick={(e) => e.stopPropagation()}>
            <div className="vm-frame">
              <video src={vid.src} controls autoPlay playsInline preload="auto" />
            </div>
            <div className="vm-cap">
              <span className="vm-dot" />
              <div><b>{vid.title}</b><span>{vid.note}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- REGISTRATION REMINDER POPUP ---------------- */}
      {reminder && (
        <div className="reminder-modal" onClick={() => setReminder(false)}>
          <div className="reminder-card" onClick={(e) => e.stopPropagation()}>
            <button className="rm-close" aria-label="বন্ধ করুন" onClick={() => setReminder(false)}>✕</button>
            <span className="rm-badge">⏳ শেষ সুযোগ</span>
            <div className="rm-ico"><I.moon /></div>
            <h3>আজই রেজিস্ট্রেশনের শেষ দিন!</h3>
            <p className="rm-en latin">Today is the last day to register</p>
            <p className="rm-sub">আসনসংখ্যা সীমিত — ঈদ পুনর্মিলনী ২০২৬-এ আপনার নাম নিশ্চিত করতে এখনই রেজিস্ট্রেশন সম্পন্ন করুন।</p>
            <a className="btn btn-gold" href={FORM_URL} target="_blank" rel="noreferrer" onClick={() => setReminder(false)}>এখনই রেজিস্ট্রেশন করুন →</a>
            <button className="rm-later" onClick={() => setReminder(false)}>পরে দেখব</button>
          </div>
        </div>
      )}
    </>
  );
}
