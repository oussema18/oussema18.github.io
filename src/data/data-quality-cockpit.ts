/**
 * Data Quality Cockpit – animated dashboard illustration.
 *
 * Framework-agnostic: inject `dataQualityCockpitStyles` once, render
 * `dataQualityCockpitMarkup` into a host element, then call
 * `mountDataQualityCockpit(host)` to start the animation. Give the host the
 * `dq-host` class so the layout responds to its width. The returned
 * function stops all timers/observers (use it as a React effect cleanup).
 */

export const DATA_QUALITY_TARGET_SCORE = 97.62

export const dataQualityCockpitStyles = /* css */ `
  .dq {
    --bg: #f4f3ef;
    --card: #faf9f6;
    --border: #dddbd5;
    --ink: #121212;
    --skel: #d3d1cb;
    --skel-dark: #4a4e4d;
    --blue: #1a56db;
    --green: #3d9a5f;
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--ink);
    background: var(--bg);
    padding: clamp(16px, 4vw, 48px);
    box-sizing: border-box;
  }
  .dq *, .dq *::before, .dq *::after { box-sizing: border-box; }

  .dq-frame {
    max-width: 1520px;
    margin: 0 auto;
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
  }

  /* ---------- reveal helpers ---------- */
  .dq .rv {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1);
    transition-delay: calc(var(--d, 0) * 1ms);
  }
  .dq.play .rv { opacity: 1; transform: none; }

  .dq .ln {
    display: block;
    height: 6px;
    border-radius: 4px;
    background: var(--skel);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .7s cubic-bezier(.2,.8,.2,1);
    transition-delay: calc(var(--d, 0) * 1ms + 150ms);
  }
  .dq .ln.dk { background: var(--skel-dark); height: 7px; }
  .dq.play .ln { transform: scaleX(1); }

  /* ---------- header ---------- */
  .dq-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 26px 36px;
    border-bottom: 1.5px solid var(--border);
  }
  .dq-head h2 { margin: 0; font-size: clamp(22px, 2.4vw, 34px); font-weight: 700; letter-spacing: -.01em; }
  .dq-nav { display: flex; gap: 38px; }
  .dq-nav .ln { width: 74px; height: 4px; }

  /* ---------- stats ---------- */
  .dq-stats {
    display: grid;
    grid-template-columns: 2.1fr 1fr 1.1fr;
    gap: 20px;
    padding: 22px 28px 0;
  }
  .dq .stat {
    display: flex; align-items: center; gap: 20px;
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 20px 22px;
    min-height: 92px;
  }
  .dq .ico {
    flex: none; width: 48px; height: 48px;
    border: 1.5px solid var(--border); border-radius: 10px;
    display: grid; place-items: center; background: #fff;
  }
  .dq .ico svg { width: 26px; height: 26px; stroke: #3a3d3c; fill: none; stroke-width: 2; stroke-linecap: round; }
  .dq .stat .lines { display: grid; gap: 12px; flex: 1; }
  .dq .stat .bar { width: 34%; }
  .dq .score { justify-content: space-between; }
  .dq .score small { display: block; font-size: clamp(14px, 1.2vw, 18px); font-weight: 600; }
  .dq .score strong { display: block; font-size: clamp(30px, 3.2vw, 46px); font-weight: 800; letter-spacing: -.01em; line-height: 1.05; font-variant-numeric: tabular-nums; }

  /* ---------- tabs ---------- */
  .dq-tabs {
    display: flex; align-items: center; gap: 28px;
    padding: 22px 36px 0;
    border-bottom: 1.5px solid var(--border);
  }
  .dq .tab {
    position: relative; padding-bottom: 14px;
    font-size: clamp(17px, 1.6vw, 24px); font-weight: 700;
  }
  .dq .tab::after {
    content: ""; position: absolute; left: 0; bottom: -1.5px; height: 3px; width: 100%;
    background: var(--blue); border-radius: 3px;
    transform: scaleX(0); transform-origin: left;
    transition: transform .6s cubic-bezier(.2,.8,.2,1) .7s;
  }
  .dq.play .tab::after { transform: scaleX(1); }
  .dq-tabs .ln { width: 74px; height: 4px; margin-bottom: 14px; }

  /* ---------- body ---------- */
  .dq-body {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 24px;
    padding: 26px 28px 32px;
  }
  .dq .filters {
    border: 1.5px solid var(--border); border-radius: 12px;
    padding: 26px 24px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .dq .f-title { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
  .dq .f-title svg { width: 26px; height: 26px; stroke: #3a3d3c; fill: none; stroke-width: 1.8; stroke-linejoin: round; }
  .dq .f-row { display: flex; align-items: center; gap: 16px; }
  .dq .cb {
    flex: none; width: 22px; height: 22px; border-radius: 5px;
    border: 1.5px solid #c9c7c1; background: #fff;
    display: grid; place-items: center;
    transition: background .25s ease, border-color .25s ease;
  }
  .dq .cb svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  .dq .cb path { stroke-dasharray: 14; stroke-dashoffset: 14; transition: stroke-dashoffset .3s ease .1s; }
  .dq .cb.on { background: var(--blue); border-color: var(--blue); }
  .dq .cb.on path { stroke-dashoffset: 0; }
  .dq .f-sep { height: 1.5px; background: var(--border); margin: 10px 0; }

  .dq .rules {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .dq .rule {
    position: relative;
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 26px 26px 24px;
    display: flex; flex-direction: column; gap: 12px;
    transition: border-color .35s ease, box-shadow .35s ease, opacity .6s ease, transform .6s cubic-bezier(.2,.8,.2,1);
  }
  .dq .rule.active { border-color: var(--blue); box-shadow: 0 0 0 1px var(--blue), 0 10px 30px -18px rgba(26,86,219,.6); }
  .dq .rule h3 { margin: 0 0 4px; font-size: clamp(18px, 1.8vw, 27px); font-weight: 700; }
  .dq .rule .t { width: 55%; height: 8px; margin: 10px 0 12px; }
  .dq .rule .divider { height: 1.5px; background: var(--border); margin: 18px 0 14px; }
  .dq .rule-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; }

  .dq .bar {
    position: relative; flex: 1; max-width: 210px;
    height: 9px; border-radius: 6px; background: #d9d7d1; overflow: hidden;
  }
  .dq .bar span {
    position: absolute; inset: 0 auto 0 0; width: 0;
    border-radius: 6px; background: var(--skel-dark);
    transition: width 1.2s cubic-bezier(.2,.8,.2,1), background .35s ease;
    transition-delay: calc(var(--d, 0) * 1ms + 350ms), 0s;
  }
  .dq.play .bar span { width: var(--w); }
  .dq .rule.active .bar span { background: var(--blue); }
  .dq .bar span::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent);
    transform: translateX(-100%);
  }
  .dq .rule.active .bar span::after { animation: dq-shimmer 1.4s ease .2s; }
  @keyframes dq-shimmer { to { transform: translateX(100%); } }

  .dq .pill {
    flex: none; width: 64px; height: 26px; border-radius: 14px;
    border: 1.5px solid #c9c7c1; display: grid; place-items: center;
  }
  .dq .pill::before { content: ""; width: 26px; height: 3px; border-radius: 2px; background: #c9c7c1; }

  .dq .dot {
    position: absolute; top: 34px; right: 30px;
    width: 12px; height: 12px; border-radius: 50%; background: var(--green);
  }
  .dq .dot::after {
    content: ""; position: absolute; inset: 0; border-radius: 50%;
    background: var(--green); opacity: .5;
    animation: dq-pulse 2.4s ease-out infinite;
  }
  .dq .score .dot { position: relative; top: auto; right: auto; flex: none; }
  @keyframes dq-pulse { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(2.8); opacity: 0; } }

  /* ---------- responsive (sized to the host, not the viewport) ---------- */
  .dq-host { container-type: inline-size; }
  @container (max-width: 900px) {
    .dq-stats { grid-template-columns: 1fr 1fr; }
    .dq-stats .stat:first-child { grid-column: 1 / -1; }
    .dq-body { grid-template-columns: 1fr; }
    .dq .filters { display: none; }
    .dq .rules { grid-template-columns: repeat(2, 1fr); }
  }
  @container (max-width: 560px) {
    .dq-nav { display: none; }
    .dq-stats { grid-template-columns: 1fr; }
    .dq .rules { grid-template-columns: 1fr; }
    .dq-head, .dq-tabs { padding-left: 22px; padding-right: 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .dq *, .dq *::before, .dq *::after { transition: none !important; animation: none !important; }
  }
`

const checkbox = `<span class="cb"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l2.8 2.8L12.5 5"/></svg></span>`

export const dataQualityCockpitMarkup = /* html */ `
<section class="dq" aria-label="Animated illustration of a data quality dashboard">
  <div class="dq-frame">

    <div class="dq-head">
      <h2 class="rv" style="--d:0">Data Quality</h2>
      <div class="dq-nav">
        <i class="ln" style="--d:100"></i><i class="ln" style="--d:180"></i><i class="ln" style="--d:260"></i>
      </div>
    </div>

    <div class="dq-stats">
      <div class="stat rv" style="--d:150">
        <div class="ico"><svg viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14"/></svg></div>
        <div class="lines">
          <i class="ln dk" style="width:46%;--d:200"></i>
          <i class="ln" style="width:72%;--d:260"></i>
        </div>
        <div class="bar"><span style="--w:62%;--d:300"></span></div>
      </div>
      <div class="stat rv" style="--d:250">
        <div class="ico"><svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6"/></svg></div>
        <div class="lines">
          <i class="ln dk" style="width:50%;--d:300"></i>
          <i class="ln" style="width:70%;--d:360"></i>
        </div>
      </div>
      <div class="stat score rv" style="--d:350">
        <div>
          <small>Average Score</small>
          <strong data-dq-score>0.00%</strong>
        </div>
        <span class="dot"></span>
      </div>
    </div>

    <div class="dq-tabs">
      <div class="tab rv" style="--d:450">Quality Rules</div>
      <i class="ln" style="--d:500"></i><i class="ln" style="--d:560"></i>
    </div>

    <div class="dq-body">
      <aside class="filters rv" style="--d:550">
        <div class="f-title">
          <svg viewBox="0 0 24 24"><path d="M3 4h18l-7 8.5V19l-4 2v-8.5z"/></svg>
          <i class="ln dk" style="width:110px;--d:600"></i>
        </div>
        <div class="f-row">${checkbox}<i class="ln" style="width:124px;--d:640"></i></div>
        <div class="f-row">${checkbox}<i class="ln" style="width:100px;--d:680"></i></div>
        <div class="f-row">${checkbox}<i class="ln" style="width:130px;--d:720"></i></div>
        <div class="f-sep"></div>
        <i class="ln dk" style="width:90px;--d:760"></i>
        <div class="f-row">${checkbox}<i class="ln" style="width:124px;--d:800"></i></div>
        <div class="f-row">${checkbox}<i class="ln" style="width:100px;--d:840"></i></div>
        <div class="f-row">${checkbox}<i class="ln" style="width:114px;--d:880"></i></div>
        <div class="f-sep"></div>
        <i class="ln" style="width:100px;--d:920"></i>
        <i class="ln" style="width:150px;--d:960"></i>
      </aside>

      <div class="rules">
        <article class="rule rv" style="--d:600">
          <h3>Completeness</h3><span class="dot"></span>
          <i class="ln" style="width:82%;--d:650"></i><i class="ln" style="width:60%;--d:700"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:70%;--d:700"></span></div><span class="pill"></span></div>
        </article>
        <article class="rule rv" style="--d:700">
          <h3>Consistency</h3>
          <i class="ln" style="width:82%;--d:750"></i><i class="ln" style="width:65%;--d:800"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:55%;--d:800"></span></div><span class="pill"></span></div>
        </article>
        <article class="rule rv" style="--d:800">
          <h3>Accuracy</h3><span class="dot"></span>
          <i class="ln" style="width:82%;--d:850"></i><i class="ln" style="width:55%;--d:900"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:80%;--d:900"></span></div><span class="pill"></span></div>
        </article>
        <article class="rule rv" style="--d:900">
          <i class="ln dk t" style="--d:950"></i>
          <i class="ln" style="width:82%;--d:980"></i><i class="ln" style="width:60%;--d:1010"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:59%;--d:1000"></span></div><span class="pill"></span></div>
        </article>
        <article class="rule rv" style="--d:1000">
          <i class="ln dk t" style="--d:1050"></i><span class="dot"></span>
          <i class="ln" style="width:88%;--d:1080"></i><i class="ln" style="width:57%;--d:1110"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:74%;--d:1100"></span></div><span class="pill"></span></div>
        </article>
        <article class="rule rv" style="--d:1100">
          <i class="ln dk t" style="width:44%;--d:1150"></i>
          <i class="ln" style="width:82%;--d:1180"></i><i class="ln" style="width:62%;--d:1210"></i>
          <div class="divider"></div>
          <div class="rule-foot"><div class="bar"><span style="--w:48%;--d:1200"></span></div><span class="pill"></span></div>
        </article>
      </div>
    </div>

  </div>
</section>
`

/**
 * Starts the illustration's animation inside `host` (which must already
 * contain `dataQualityCockpitMarkup`). Returns a cleanup function.
 */
export function mountDataQualityCockpit(
  host: HTMLElement,
  targetScore: number = DATA_QUALITY_TARGET_SCORE,
): () => void {
  const root = host.querySelector<HTMLElement>('.dq')
  const score = host.querySelector<HTMLElement>('[data-dq-score]')
  if (!root || !score) return () => {}

  const rules = Array.from(root.querySelectorAll<HTMLElement>('.rule'))
  const boxes = Array.from(root.querySelectorAll<HTMLElement>('.cb'))
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const timeouts: number[] = []
  let intervalId: number | undefined
  let frameId: number | undefined
  let observer: IntersectionObserver | undefined
  let idx = 0
  let started = false

  const formatScore = (value: number) => `${value.toFixed(2)}%`

  function countUp(el: HTMLElement, to: number, duration: number) {
    let startTime: number | null = null
    const step = (t: number) => {
      if (startTime === null) startTime = t
      const p = Math.min((t - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = formatScore(to * eased)
      if (p < 1) frameId = requestAnimationFrame(step)
    }
    frameId = requestAnimationFrame(step)
  }

  function select(i: number) {
    rules.forEach((r) => r.classList.remove('active'))
    boxes.forEach((b) => b.classList.remove('on'))
    rules[i]?.classList.add('active')
    boxes[i]?.classList.add('on')
  }

  function start() {
    if (started) return
    started = true
    root!.classList.add('play')

    if (reduce) {
      score!.textContent = formatScore(targetScore)
      select(0)
      return
    }

    timeouts.push(window.setTimeout(() => countUp(score!, targetScore, 1800), 500))
    timeouts.push(window.setTimeout(() => select(0), 1800))
    // Cycle the highlighted rule like a user browsing the checks
    intervalId = window.setInterval(() => {
      idx = (idx + 1) % rules.length
      select(idx)
    }, 2800)
  }

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start()
          observer?.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(root)
  } else {
    start()
  }

  return () => {
    observer?.disconnect()
    timeouts.forEach((id) => window.clearTimeout(id))
    if (intervalId !== undefined) window.clearInterval(intervalId)
    if (frameId !== undefined) cancelAnimationFrame(frameId)
  }
}
