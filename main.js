/* Renders every page from data.js. Page type comes from <body data-page="..."> */
(() => {
const S = window.SITE;
const page = document.body.dataset.page;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const dup = h => h + h;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ARROW = '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>';
const CUR = (label, cls = '') => `<div class="cur-tag ${cls}"><svg viewBox="0 0 24 24"><path d="M3 2l7.5 19 2.6-7.9L21 10.5z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><b>${label}</b></div>`;

/* ---------- theme + accent (saved per visitor in localStorage only) ---------- */
const root = document.documentElement;
root.dataset.theme = 'light';
root.dataset.accent = 'orange';

/* ---------- shared pieces ---------- */
function specks(col) {
  const c = document.createElement('canvas'); c.width = c.height = 380; const x = c.getContext('2d');
  for (let i = 0; i < 60; i++) {
    x.save(); x.translate(Math.random() * 380, Math.random() * 380); x.rotate(Math.random() * 3);
    x.fillStyle = col.replace('A', (.1 + Math.random() * .3).toFixed(2));
    x.fillRect(0, 0, Math.random() < .75 ? 1.6 : 6, 1.6); x.restore();
  }
  return `url(${c.toDataURL()})`;
}
document.documentElement.style.setProperty('--specks', specks('rgba(60,50,40,A)'));
document.documentElement.style.setProperty('--specks-l', specks('rgba(255,255,255,A)'));

// rolling odometer number
const odo = (n, plus) => `<span class="num"><span class="odo">${n.toLocaleString('en-US').split('').map(ch => /\d/.test(ch)
  ? `<span class="col" data-d="${ch}">${'01234567890123456789'.split('').map(x => `<span>${x}</span>`).join('')}</span>`
  : `<span>${ch}</span>`).join('')}</span>${plus ? '<span class="plus">+</span>' : ''}</span>`;
const roll = (el, on) => $$('.col', el).forEach((c, i) => {
  c.style.transitionDelay = on ? i * .12 + 's' : '0s';
  c.style.transform = on ? `translateY(-${10 + +c.dataset.d}em)` : 'translateY(0)';
});

const thumb = (p, extra = '') => {
  const st = `style="--a:${p.colors[0]};--b:${p.colors[1]}"`;
  if (p.image) return `<div class="thumb ${extra}" ${st}><img src="${esc(p.image)}" alt="${esc(p.title)}"></div>`;
  if (p.type === 'phone') return `<div class="thumb phone ${extra}" ${st}><div class="mock"><i></i><i></i><i></i><i></i><i></i></div></div>`;
  const chart = p.chart === 'bars'
    ? `<g fill="${p.colors[1]}">${[30, 18, 35, 10, 24, 6].map((y, i) => `<rect x="${10 + i * 30}" y="${y}" width="16" height="${60 - y}"/>`).join('')}</g>`
    : `<path d="M0 45 C30 40 40 30 70 35 S120 15 150 20 S190 10 200 12" stroke="#7b8cff" stroke-width="2" fill="none"/><path d="M0 45 C30 40 40 30 70 35 S120 15 150 20 S190 10 200 12 V60 H0Z" fill="#7b8cff22"/>`;
  return `<div class="thumb ${extra}" ${st}><div class="mock"><aside></aside><main><div class="kpis"><i></i><i></i></div><svg viewBox="0 0 200 60" preserveAspectRatio="none">${chart}</svg><div class="rows"></div></main></div></div>`;
};
let sphereN = 0;
const sphere = (base = '#ffede6', stripe = '#ea6c11', cls = 'sphere') => {
  const id = 'sp' + (sphereN++);
  return `<svg class="${cls}" viewBox="0 0 200 200"><defs><clipPath id="${id}"><circle cx="100" cy="100" r="96"/></clipPath><radialGradient id="${id}g" cx="35%" cy="30%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>
  <g clip-path="url(#${id})"><rect width="200" height="200" fill="${base}"/><g transform="rotate(-32 100 100)"><g class="stripes">${Array.from({ length: 16 }, (_, i) => `<rect x="-120" y="${-140 + i * 28}" width="440" height="14" fill="${stripe}"/>`).join('')}</g></g><circle cx="100" cy="100" r="96" fill="url(#${id}g)"/></g></svg>`;
};

function nav() {
  const a = (href, label, key) => `<a href="${href}" class="${page === key ? 'active' : ''}">${label}</a>`;
  return `<nav><div class="frame"><a href="index.html" class="logo">${esc(S.name)}</a>
    <div class="links">${a('works.html', 'Works', 'works')}${a('about.html', 'About', 'about')}</div>

    <div class="status">${esc(S.status || 'Available for freelance')}</div></div></nav>`;
}
function contact() {
  const waves = Array.from({ length: 22 }, (_, i) => {
    let d = '';
    for (let x = -100; x <= 1700; x += 25) {
      const y = 20 + i * 13 + 9 * Math.sin(x * .008 + i * .45) + 5 * Math.sin(x * .021 + i * 1.3);
      d += (x === -100 ? 'M' : 'L') + x + ' ' + y.toFixed(1) + ' ';
    }
    return `<path d="${d}"/>`;
  }).join('');
  return `<section class="contact" id="contact"><div class="frame"><div class="contact-panel rv">
    <svg class="waves" viewBox="0 0 1600 300" preserveAspectRatio="none"><g>${waves}</g></svg>
    <form class="cform" id="cform">
      <label>Name<input name="name" placeholder="Enter your name" required></label>
      <label>Email<input name="email" type="email" placeholder="Your official email" required></label>
      <label>Subject<input name="subject" placeholder="Subject"></label>
      <label>Message<textarea name="message" placeholder="Write your message here" required></textarea></label>
      <button class="btn" type="submit">Submit</button>
    </form>
    <div class="contact-copy"><h2>Ready to Elevate Your Product Experience?</h2><p>Whether you're launching a new product or refining an existing one, I'm here to help. Share the details about your project and I'll get back to you.</p></div>
  </div></div></section>`;
}
function footer() {
  // agent network: nodes = skills, edges pulse like messages between agents
  const N = [[200, 200, 'AI'], [90, 110, 'Vision'], [310, 100, 'Agents'], [330, 260, 'Design'], [200, 340, 'Ship'], [70, 280, 'Data'], [200, 60, 'Ideas'], [360, 180, 'Scale']];
  const E = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 4], [4, 5], [5, 1]];
  const rings = E.map(([a, b], i) => `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" style="--i:${i}"/>`).join('')
    + N.map(([x, y, l], i) => `<g class="node" style="--i:${i}"><circle cx="${x}" cy="${y}" r="${i ? 6 : 12}"/><text x="${x}" y="${y + (i ? 22 : 30)}">${l}</text></g>`).join('');
  return `<footer><div class="frame">
    <div class="f-big rv">Let's build<span>incredible work together.</span></div>
    <div class="f-links"><a href="index.html">Home</a><a href="works.html">Works</a><a href="about.html">About</a><a href="#contact">Contact</a></div>
    <div class="f-sub">Social</div>
    <div class="socials">${S.social.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join('')}</div>
    <div class="f-sub">Location</div><div class="f-loc">${esc(S.location)}</div>
    <div class="f-copy"><span>© ${new Date().getFullYear()} ${esc(S.fullName)}</span><a href="#top">Back to top ↑</a></div>
    <svg class="rings" viewBox="0 0 400 400">${rings}</svg>
  </div></footer>`;
}

/* ---------- HOME ---------- */
const ICONS = {
  pen: '<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><circle cx="11" cy="11" r="2"/>',
  cursor: '<path d="M4 4l7 17 2.5-7.5L21 11z"/><path d="M14 14l6 6"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/><path d="M12 21a3 3 0 0 1 0-6h2"/>',
  bot: '<rect x="5" y="7" width="14" height="12" rx="2"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>',
  flow: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M8 6h4a4 4 0 0 1 4 4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
};
const toolImg = ([slug, col]) => `<img src="https://cdn.simpleicons.org/${slug}/${col}" alt="${slug}" loading="lazy" onerror="this.style.display='none'">`;
const CRAFT = [
  ['Hierarchy', '<rect x="8" y="8" width="40" height="12" rx="3" fill="#a5a8f5"/><rect x="8" y="26" width="28" height="8" rx="3" fill="#c9cbf8"/><rect x="8" y="40" width="18" height="6" rx="3" fill="#e1e0ff"/>'],
  ['Proximity', [0, 1, 2].flatMap(r => [0, 1, 2].map(c => `<circle cx="${12 + c * 14 + (c == 2 ? 6 : 0)}" cy="${12 + r * 14}" r="5" fill="${c == 2 ? '#ed9900' : '#ffdf92'}"/>`)).join('')],
  ['Alignment', '<rect x="8" y="6" width="3" height="44" fill="#b3b5f3"/><rect x="14" y="12" width="34" height="12" rx="2" fill="#a5a8f5"/><rect x="14" y="30" width="22" height="12" rx="2" fill="#3031b6"/>'],
  ['Colors', '<circle cx="20" cy="22" r="12" fill="#00a825" opacity=".8"/><circle cx="36" cy="22" r="12" fill="#ea6c11" opacity=".8"/><circle cx="28" cy="36" r="12" fill="#3031b6" opacity=".7"/>'],
  ['Consistency', [0, 1, 2].map(i => `<rect x="${6 + i * 16}" y="18" width="12" height="20" rx="3" fill="#ca36b2" opacity=".6"/>`).join('')],
  ['Typography', '<text x="6" y="42" font-family="Merriweather" font-size="34" fill="#1a1c1c">Aa</text>'],
];
function laurel() {
  let s = '<path d="M62 126 A52 62 0 0 1 50 22" stroke="#ed9900" stroke-width="3" fill="none" stroke-linecap="round"/>';
  for (let i = 0; i < 7; i++) {
    const deg = 105 + i * 23, a = deg * Math.PI / 180, x = (72 + 52 * Math.cos(a)).toFixed(1), y = (75 + 62 * Math.sin(a)).toFixed(1);
    s += `<ellipse cx="${x}" cy="${y}" rx="13" ry="5" transform="rotate(${deg + 60} ${x} ${y})" fill="#ed9900"/>`;
  }
  return s;
}

function home() {
  const P = S.projects, yrs = S.highlight, proj = S.shipped;
  return `
  <div id="loader" aria-hidden="true">
    <div class="cols">${'<span></span>'.repeat(6)}</div>
    <div class="stage"><div class="gridbg"></div>
      <div class="ld-name" id="ldName">${S.fullName.split(' ').map(w => `<span class="word">${[...w].map(c => `<span>${esc(c)}</span>`).join('')}</span>`).join('')}</div>
      <div class="ld-meta"><span>Portfolio — ${new Date().getFullYear()}</span><span class="ld-count" id="count">0</span></div>
      <div class="ld-bar" id="bar"></div></div>
    <div class="sel" id="sel"><i></i><i></i><i></i><i></i><span class="dim" id="dim"></span></div>
    <div class="ld-cursor" id="ldCursor">${CUR(esc(S.name))}</div>
  </div>
  ${nav()}
  <section class="hero" id="top"><div class="frame">
    <div class="hero-left">
      <div class="kicker" style="transition-delay:.05s">${esc(S.role)}</div>
      <h1 style="transition-delay:.15s">I build<br>things that<br><span class="type" id="type"></span></h1>
      <p style="transition-delay:.3s">${esc(S.intro)}</p>
      <div style="transition-delay:.45s"><a class="btn" href="${esc(S.resume)}">Download Resume ${ARROW}</a></div>
    </div>
    <div class="photo"><img src="${esc(S.photo)}" alt="Portrait of ${esc(S.fullName)}"><div class="tiles" id="tiles">${'<span></span>'.repeat(63)}</div>
      <div class="float-tag" id="orbitTag">${CUR(esc(S.name))}</div></div>
    <div class="stats">${S.stats.map((s, i) => `<div style="transition-delay:${.2 + i * .15}s"><strong>${odo(s.n, s.plus)}</strong><small>${esc(s.label)}</small></div>`).join('')}</div>
  </div></section>
  <div class="marquee"><div class="frame"><ul class="track">${dup(S.marquee.map(s => `<li>${esc(s)}</li>`).join(''))}</ul></div></div>

  <section class="services"><div class="frame"><div class="inner">
    <div class="svc-head"><div><div class="kicker rv">What I Do</div><h2 class="h2 split">Services I offer to bring your vision to life.</h2></div>
      <div class="shapes rv" style="--d:.2s"><div class="shape"><canvas id="pyr" width="520" height="520"></canvas></div><div class="shape"><canvas id="cyl" width="520" height="520"></canvas></div></div></div>
    <div class="cards">${S.services.map((s, i) => `<div class="card rv" style="--d:${(i % 3) * .1}s"><div class="ic"><svg viewBox="0 0 24 24">${ICONS[s.icon] || ICONS.pen}</svg></div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join('')}</div>
  </div></div></section>

  <section class="works" id="works"><div class="frame">
    <div class="works-head"><div class="kicker rv">Portfolio</div><h2 class="h2 split">Selected Works</h2></div>
    <div class="ribbons">${[1, 2].map(() => `<div class="ribbon"><div class="track">${dup(S.ribbon.map(s => `<span>${esc(s)}</span>`).join(''))}</div></div>`).join('')}</div>
    <div class="stack">${P.map((p, i) => `<a href="project.html?id=${p.id}" class="wcard" style="--i:${i}">${thumb(p)}
      <div class="winfo"><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class="chips">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}<span>${esc(p.duration)}</span></div><div class="arrow">${ARROW}</div></div></a>`).join('')}</div>
    <div class="center rv"><a class="btn" href="works.html">More Case Studies ${ARROW}</a></div>
  </div></section>

  <section class="expertise"><div class="frame"><div class="inner">
    <div class="exp-head"><div><div class="label rv">Expertise</div><h2 class="h2 split">I'm highly skilled in<br>the tools that matter.</h2></div>
      <div class="tools rv" style="--d:.2s"><div class="track">${dup(S.tools.map(t => `<div class="tool" style="--tb:${t[2]}">${toolImg(t)}</div>`).join(''))}</div></div></div>
    <div class="exp-cards">${S.tools.filter(t => t[3]).slice(0, 3).map((t, i) => `<div class="exp-card rv" style="--d:${i * .12}s"><div class="tool" style="--tb:${t[2]}">${toolImg(t)}</div><h3>${esc(t[3])}</h3><p>${esc(t[4])}</p></div>`).join('')}</div>
  </div></div></section>

  <section class="design"><div class="frame"><div class="inner">
    <div class="design-head"><div><div class="kicker rv">Design Systems</div><h2 class="h2 split">Interfaces that feel alive.</h2></div>
      <p class="rv">I design systems that are interactive and beautiful — dashboards, landing pages and the UI/UX inside the product itself.</p></div>
    <div class="design-grid">${S.designWork.map((d, i) => {
      const inner = `<div class="dart" style="--a:${d.colors[0]};--b:${d.colors[1]}">${d.image ? `<img src="${esc(d.image)}" alt="${esc(d.name)} screenshot" loading="lazy">` : `<div class="dmock"><i></i><i></i><i></i><i></i></div>`}</div>
        <div class="dbody"><span class="dtag">${esc(d.tag)}</span><h3>${esc(d.name)}</h3><p>${esc(d.text)}</p></div>`;
      return d.url ? `<a class="dcard rv" style="--d:${(i % 3) * .1}s" href="${esc(d.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="dcard rv" style="--d:${(i % 3) * .1}s">${inner}</div>`;
    }).join('')}</div>
  </div></div></section>

  <section class="about" id="about"><div class="frame"><div class="inner">
    <div class="about-head"><div class="kicker rv">About</div><h2 class="h2 split">A little more about me.</h2></div>
    <div class="bento">
      <div class="bx pic rv"><img src="${esc(S.photo)}" alt="${esc(S.fullName)}">${CUR("That's me")}</div>
      <div class="bx rv" style="--d:.1s"><h3>Design Thinking &amp; Craft</h3><div class="craft-track"><div class="track">${dup(CRAFT.map(([n, s]) => `<div class="craft"><svg viewBox="0 0 56 56">${s}</svg><small>${n.toUpperCase()}</small></div>`).join(''))}</div></div></div>
      <div class="bx peach rv" style="--d:.2s"><div class="lift"><h3>Craftsmanship</h3><p>${esc(S.craftLine)}</p></div></div>
      <div class="bx rv" style="--d:.1s"><div class="label">Experience</div>
        <div class="exp-years"><svg viewBox="0 0 80 150">${laurel()}</svg><div><strong>${odo(yrs.n, yrs.plus)}</strong><span class="y">${esc(yrs.label)}</span></div><svg viewBox="0 0 80 150" style="transform:scaleX(-1)">${laurel()}</svg></div>
        <h3 style="margin-bottom:12px">${esc(yrs.title)}</h3><p>${esc(yrs.text)}</p></div>
      <div class="bx col3 rv" style="--d:.2s">
        <div><div class="label">Collaboration</div><h3 style="margin:12px 0 6px">Cross-functional Workflow</h3><p>Working closely with product and engineering teams.</p>
          <div class="collab-area">${CUR('You', 'c1')}${CUR(esc(S.name), 'c2')}</div></div>
        <div class="shipped"><div><h3>Projects Shipped</h3><p>Delivered across startups &amp; growing teams.</p></div><strong>${odo(proj.n, proj.plus)}</strong></div>
      </div>
      <div class="bx rv"><div class="label">Languages</div><div class="langs">${S.languages.map(([l, w]) => `<div><small>${esc(l)}</small><div class="bar"><i data-w="${w}"></i></div></div>`).join('')}</div></div>
      <div class="bx process rv" style="--d:.1s"><div class="label">My Design Process</div>
        <div class="steps">${S.process.map((p, i) => `<div class="step" style="--d:${.2 + i * .55}s"><b><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg></b>${esc(p)}</div>`).join('')}</div></div>
    </div>
  </div></div></section>

  <section class="live" id="live"><div class="frame"><div class="inner">
    <div class="live-head"><div><div class="kicker rv">Shipped &amp; Shipping</div><h2 class="h2 split">Live Products &amp; What I'm Building</h2></div>
      <p class="rv">Real products people use today — and the next ones taking shape right now.</p></div>
    <div class="live-grid">${S.live.map((l, i) => `<a class="lcard rv" style="--d:${i * .12}s" href="${esc(l.url)}" target="_blank" rel="noopener">
      <div class="prev ${l.image ? 'has-img' : ''}" style="--a:${l.colors[0]};--b:${l.colors[1]}">${l.image ? `<img src="${esc(l.image)}" alt="${esc(l.name)} screenshot" loading="lazy">` : ''}<span class="badge">LIVE</span></div>
      <div class="body"><h3>${esc(l.name)} ${ARROW}</h3><p>${esc(l.text)}</p>
      <div class="meta"><div class="chips">${l.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div><span class="metric">${esc(l.metric)}</span></div></div></a>`).join('')}</div>
    <div class="build-grid">${S.building.map((b, i) => `<div class="bcard rv" style="--d:${i * .12}s"><span class="badge">IN PROGRESS</span><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p>
      ${b.progress != null ? `<div class="prog"><span>Progress${b.eta ? ' · ETA ' + esc(b.eta) : ''}</span><b>${b.progress}%</b></div><div class="pbar"><i data-w="${b.progress}"></i></div>` : ''}
      ${b.tasks ? `<ul class="tasks">${b.tasks.map(([t, d]) => `<li class="${d ? 'done' : ''}">${esc(t)}</li>`).join('')}</ul>` : ''}
      ${b.tags ? `<div class="tags">${b.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
      ${b.url ? `<p style="margin:18px 0 0"><a href="${esc(b.url)}" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline">View on GitHub ↗</a></p>` : ''}</div>`).join('')}</div>
  </div></div></section>

  <section class="faq"><div class="frame"><div class="inner"><div class="faq-wrap">
    <div class="side"><h2 class="h2 split">Frequently Asked Questions</h2><p class="muted rv">Common questions about working with me and getting started.</p></div>
    <div class="faq-list rv">${S.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  </div></div></div></section>
  ${contact()}${footer()}`;
}

/* ---------- WORKS PAGE ---------- */
function works() {
  return `${nav()}
  <div class="banner" id="top"><div class="blob" style="left:-5%;top:-30%;width:40%;height:160%;background:#ff4fb5"></div><div class="blob" style="left:25%;top:-20%;width:30%;height:140%;background:#c9a7ff;animation-delay:-4s"></div><div class="blob" style="left:50%;top:-40%;width:35%;height:170%;background:#ff8d4a;animation-delay:-8s"></div><div class="blob" style="right:-5%;top:-20%;width:25%;height:140%;background:#6f8cff"></div>${sphere('#ffd6ea', '#ffffffcc')}</div>
  <section><div class="frame"><div class="inner">
    <div class="page-head"><div class="kicker rv">Portfolio</div><h1 class="split">All Works</h1><p class="rv">${S.works.length} projects across AI, machine learning, full-stack, robotics and hackathons.</p></div>
    ${['AI', 'Machine Learning', 'Full-Stack', 'Robotics', 'Hackathons'].map(cat => {
      const list = S.works.filter(w => w.group === cat);
      return list.length ? `<div class="cat-head rv"><h2>${cat}</h2><small>${list.length}</small></div>
    <div class="tiles-grid">${list.map((w, i) => {
      const href = w.id ? `project.html?id=${w.id}` : (w.url || w.repo || '');
      const ext = !w.id && href ? ' target="_blank" rel="noopener"' : '';
      const cta = w.id ? 'Case study' : w.url ? 'Live site' : w.repo ? 'GitHub' : 'Coming soon';
      return `<${href ? 'a' : 'div'} class="tile rv" style="--d:${(i % 3) * .08}s" data-cats="${esc(w.cats.join('|'))}" ${href ? `href="${esc(href)}"${ext}` : ''}>
        <div class="tart" style="--a:${w.colors[0]};--b:${w.colors[1]}">${w.image ? `<img src="${esc(w.image)}" alt="${esc(w.title)} screenshot" loading="lazy">` : `<span>${esc(w.title.split(' ')[0])}</span>`}</div>
        <div class="tbody"><div class="chips">${w.cats.map(c => `<span>${esc(c)}</span>`).join('')}</div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p>
        <span class="tcta">${cta} ${href ? '↗' : ''}</span></div></${href ? 'a' : 'div'}>`;
    }).join('')}</div>` : '';
    }).join('')}
  </div></div></section>
  ${contact()}${footer()}`;
}

/* ---------- ABOUT PAGE ---------- */
function about() {
  const A = S.about, initial = s => esc(s.trim()[0] || '•');
  const exp = A.experience.map(e => `<div class="row" style="--a:${e.color[0]};--b:${e.color[1]}"><div class="logo-sq">${initial(e.company)}</div><div><h3>${esc(e.company)}</h3><small>${esc(e.role)}</small></div><span class="when">${e.from === e.to ? esc(e.to) : `${esc(e.from)} to ${esc(e.to)}`}</span></div>
    ${e.steps ? `<div class="sub-steps">${e.steps.map(([r, t]) => `<div><b>${esc(r)}</b><span>${esc(t)}</span></div>`).join('')}</div>` : ''}`).join('');
  return `${nav()}
  <section id="top"><div class="frame"><div class="inner">
    <div class="hello rv"><div class="ph"><img src="${esc(S.photo)}" alt="${esc(S.fullName)}"></div>
      <div><div class="kicker">Hello!</div><h1>This is <span class="type" id="helloType"></span></h1><div class="role">${esc(S.role)}</div></div>
      ${sphere()}</div>
    <p class="bio rv">${esc(A.bio)}</p>
    <div class="panel rv"><h2>Work Experience</h2>${exp}</div>
    <div class="panel rv"><h2>Education</h2>${A.education.map(e => `<div class="row" style="--a:#b8ffb5;--b:#00530d"><div class="logo-sq">🎓</div><div><h3>${esc(e.title)}</h3><small>${esc(e.place)}</small></div><span class="when">${e.from === e.to ? esc(e.to) : `${esc(e.from)} to ${esc(e.to)}`}</span></div>`).join('')}</div>
    <div class="panel rv"><h2>Certifications &amp; Courses</h2>${A.certs.map((c, i) => `<div class="row" style="--a:${i % 2 ? '#b8ffb5' : '#ffede6'};--b:${i % 2 ? '#00530d' : '#ea6c11'}"><div class="logo-sq">◎</div><div><h3>${esc(c.title)}</h3><small>${esc(c.place)}</small><br><a class="cred" href="${esc(c.url)}" target="_blank" rel="noopener">Show credential ↗</a></div><span class="when">${esc(c.time)}</span></div>`).join('')}</div>
    <div class="panel rv"><h2>Core Skills</h2><div class="skill-acc">${Object.entries(A.skills).map(([g, list], i) => `<details ${i ? '' : 'open'}><summary>${esc(g)}</summary><div class="chips">${list.map(s => `<span>${esc(s)}</span>`).join('')}</div></details>`).join('')}</div></div>
    <div class="panel rv"><h2>My Hobbies</h2><div class="hobbies"><div class="track">${dup(A.hobbies.map(([e, n]) => `<div class="hobby"><div>${e}</div><small>${esc(n)}</small></div>`).join(''))}</div></div></div>
  </div></div></section>
  ${contact()}${footer()}`;
}

/* ---------- CASE STUDY PAGE ---------- */
function project() {
  const id = new URLSearchParams(location.search).get('id');
  const i = Math.max(0, S.projects.findIndex(p => p.id === id)), p = S.projects[i], next = S.projects[(i + 1) % S.projects.length];
  document.title = `${p.title} — ${S.name}`;
  const slug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const secs = p.sections.map((s, k) => `<div class="cs-sec rv ${s.callout ? 'callout' : ''}" id="${slug(s.title)}"><h2>${esc(s.title)}</h2>${s.body.map(b => `<p>${esc(b)}</p>`).join('')}${s.list ? `<ul>${s.list.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}</div>
    ${k === 0 && p.stats ? `<div class="cs-stats">${p.stats.map(s => `<div class="rv"><strong>${odo(s.n, s.plus)}</strong><span class="muted">${esc(s.label)}</span></div>`).join('')}</div>` : ''}`).join('');
  return `${nav()}
  <section id="top"><div class="frame"><div class="inner">
    <div class="cs-head"><h1 class="split">${esc(p.title)}</h1><p class="rv">${esc(p.summary)}</p>
      ${p.url || p.repo ? `<div class="rv" style="display:flex;gap:12px;margin:-14px 0 34px;flex-wrap:wrap">${p.url ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">View live ${ARROW}</a>` : ''}${p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">View code ${ARROW}</a>` : ''}</div>` : ''}
      <div class="cs-meta rv">${[['Role', p.role], ['Duration', p.duration], ['Tools', p.tools], ['Team', p.team]].map(([k, v]) => `<div><span class="label">${k}</span><b>${esc(v)}</b></div>`).join('')}</div></div>
    <div class="cs-hero rv">${thumb(p)}</div>
    <div class="cs-body"><aside class="toc"><span class="label">Table of content</span>${p.sections.map(s => `<a href="#${slug(s.title)}">${esc(s.title)}</a>`).join('')}</aside>
      <div>${secs}<div class="cs-next"><span class="label">Next project</span><a href="project.html?id=${next.id}">${esc(next.title)} →</a></div></div></div>
  </div></div></section>
  ${contact()}${footer()}`;
}

/* ---------- render ---------- */
document.body.insertAdjacentHTML('afterbegin', { home, works, about, project }[page]());

/* ---------- behaviours ---------- */
// headings blur in word by word
function split(el) {
  [...el.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const f = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (/^\s+$/.test(t)) return f.append(t);
        const s = document.createElement('span'); s.className = 'w'; s.textContent = t; f.append(s);
      });
      n.replaceWith(f);
    } else if (n.nodeType === 1 && n.tagName !== 'BR') split(n);
  });
  $$('.w', el).forEach((w, i) => w.style.transitionDelay = i * 70 + 'ms');
}
$$('.split').forEach(split);

const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; el.classList.add('on'); io.unobserve(el);
  $$('[data-w]', el).forEach(b => b.style.width = b.dataset.w + '%');
}), { threshold: .15 });
$$('.rv,.split,.process').forEach(el => io.observe(el));

// numbers roll every time they come into view
const odoIO = new IntersectionObserver(es => es.forEach(e => roll(e.target, e.isIntersecting)), { threshold: .8 });
const startOdo = () => $$('.odo').forEach(el => odoIO.observe(el));

// contact form → mail client
const form = $('#cform');
form && form.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  location.href = `mailto:${S.email}?subject=${encodeURIComponent(f.get('subject') || 'Hello from your portfolio')}&body=${encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`)}`;
});

async function typeOnce(el, text, speed = 70) { for (let k = 1; k <= text.length; k++) { el.textContent = text.slice(0, k); await sleep(speed); } }
async function typeLoop(el, words) {
  for (let i = 0; ; i = (i + 1) % words.length) {
    await typeOnce(el, words[i], 90); await sleep(1800);
    for (let k = words[i].length; k >= 0; k--) { el.textContent = words[i].slice(0, k); await sleep(45); }
    await sleep(300);
  }
}

/* ---------- custom cursor: comet trail (ingrassiadaniel.it) + lagging ring (moonshot.ai) ---------- */
(function cursor() {
  if (!matchMedia('(pointer:fine)').matches || reduce) return;
  document.documentElement.classList.add('has-cursor');
  const cv = document.createElement('canvas'); cv.id = 'cursorTrail';
  const ring = document.createElement('div'); ring.className = 'c-ring';
  const dot = document.createElement('div'); dot.className = 'c-dot';
  document.body.append(cv, ring, dot);
  const ctx = cv.getContext('2d'); let dpr = 1;
  const size = () => { dpr = devicePixelRatio || 1; cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; };
  size(); addEventListener('resize', size);
  let mx = -200, my = -200, rx = mx, ry = my, hx = mx, hy = my, shown = false;
  const pts = [], sparks = [];
  // On leaving the window, hide everything and drop the trail; on return, restart at the pointer
  // so no line is drawn from where the pointer left to where it came back.
  const hide = () => { shown = false; pts.length = 0; sparks.length = 0; ring.style.opacity = dot.style.opacity = 0; };
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!shown) { rx = hx = mx; ry = hy = my; pts.length = 0; shown = true; ring.style.opacity = dot.style.opacity = 1; }
  });
  document.addEventListener('mouseout', e => { if (!e.relatedTarget) hide(); });
  addEventListener('blur', hide);
  hide();
  addEventListener('mousedown', () => ring.classList.add('down'));
  addEventListener('mouseup', () => ring.classList.remove('down'));
  document.addEventListener('mouseover', e => ring.classList.toggle('hover', !!e.target.closest('a,button,summary,.card,.tool,.exp-card')));
  (function loop() {
    rx += (mx - rx) * .16; ry += (my - ry) * .16;   // ring lags behind
    hx += (mx - hx) * .45; hy += (my - hy) * .45;   // comet head follows closely
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    dot.style.transform = `translate(${mx}px,${my}px)`;
    if (shown) { pts.unshift([hx, hy]); if (pts.length > 26) pts.pop(); }
    else if (pts.length) pts.pop();
    if (!pts.length) pts.push([hx, hy]);
    const speed = Math.hypot(pts[0][0] - (pts[1] || pts[0])[0], pts[0][1] - (pts[1] || pts[0])[1]);
    if (speed > 6 && sparks.length < 80) sparks.push({ x: hx, y: hy, vx: (Math.random() - .5) * 1.6, vy: (Math.random() - .5) * 1.6, life: 1 });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.lineCap = 'round'; ctx.strokeStyle = '#fff'; ctx.shadowColor = '#fff';
    for (let i = 0; i < pts.length - 1; i++) {
      const k = 1 - i / pts.length;
      ctx.globalAlpha = k * .9; ctx.lineWidth = k * 7; ctx.shadowBlur = k * 14;
      ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); ctx.stroke();
    }
    ctx.shadowBlur = 0; ctx.fillStyle = '#fff';
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]; s.x += s.vx; s.y += s.vy; s.life -= .025;
      if (s.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = s.life; ctx.fillRect(s.x, s.y, 1.8, 1.8);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();

/* ---------- page-specific behaviour ---------- */
if (page === 'home') {
  // stippled 3D shapes
  const stipple = (cv, fn, n = 55000) => { const x = cv.getContext('2d'); x.fillStyle = '#1a1c1c'; for (let i = 0; i < n; i++) { const px = Math.random() * cv.width, py = Math.random() * cv.height, d = fn(px, py); if (d > 0 && Math.random() < d) x.fillRect(px, py, 2, 2); } };
  const side = (p, a, b) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);
  const inTri = (p, a, b, c) => { const s1 = side(p, a, b), s2 = side(p, b, c), s3 = side(p, c, a); return (s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0); };
  const P1 = [40, 160], P2 = [450, 50], P3 = [150, 470], Q = [120, 410];
  stipple($('#pyr'), (x, y) => inTri([x, y], P1, P2, Q) ? .92 : inTri([x, y], Q, P2, P3) ? .15 + .55 * (1 - (x - 120) / 330) * (y / 470) : 0);
  const A = [120, 120], B = [390, 390], R = 105, L = Math.hypot(B[0] - A[0], B[1] - A[1]), U = [(B[0] - A[0]) / L, (B[1] - A[1]) / L];
  stipple($('#cyl'), (x, y) => {
    const vx = x - A[0], vy = y - A[1], t = vx * U[0] + vy * U[1], d = U[0] * vy - U[1] * vx, e = R * .42, shade = .2 + .75 * Math.pow((d / R + 1) / 2, 1.4);
    if (Math.abs(d) <= R && t >= 0 && t <= L) return shade;
    if ((t / e) ** 2 + (d / R) ** 2 <= 1) return .3;
    if (((t - L) / e) ** 2 + (d / R) ** 2 <= 1) return shade;
    return 0;
  });

  // stacking cards shrink as the next one slides over
  const wcards = $$('.wcard');
  const stack = () => wcards.forEach((c, i) => {
    const next = wcards[i + 1]; if (!next) return;
    const p = Math.min(Math.max(1 - (next.getBoundingClientRect().top - parseFloat(getComputedStyle(c).top)) / c.offsetHeight, 0), 1);
    c.style.transform = `scale(${1 - p * .06})`; c.style.filter = `brightness(${1 - p * .12})`;
  });
  if (!reduce) addEventListener('scroll', () => requestAnimationFrame(stack), { passive: true });

  // name tag sweeps a 180° arc over the head, ear to ear and back (never across the face)
  (function arc() {
    const tag = $('#orbitTag'), box = $('.photo');
    (function step() {
      if (!tag.isConnected) return;
      const w = box.clientWidth, h = box.clientHeight;
      const cx = w * .5, cy = h * .3, rx = w * .36, ry = h * .2;
      const k = reduce ? .5 : (Math.sin(performance.now() * .00018) + 1) / 2;   // 0..1, eases at both ends
      const a = Math.PI + k * Math.PI;                                           // π..2π = upper half
      const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      tag.style.transform = `translate(${x - 11}px,${y - 11}px)`;
      requestAnimationFrame(step);
    })();
  })();

  // hero tiles flicker back under the mouse
  $('#tiles').addEventListener('mousemove', e => {
    const t = e.target.closest('span'); if (!t) return;
    t.style.transition = 'none'; t.style.opacity = .6;
    requestAnimationFrame(() => { t.style.transition = 'opacity .9s'; t.style.opacity = 0; });
  });

  // loader: name rises, cursor selects it, clicks, curtains lift
  const reveal = () => {
    const loader = $('#loader');
    $('.stage').style.opacity = 0; $('#ldCursor').style.opacity = 0; $('#sel').style.opacity = 0;
    $$('.cols span', loader).forEach((c, i) => { c.style.transitionDelay = i * 70 + 'ms'; c.style.transform = 'scaleY(0)'; });
    document.body.classList.remove('loading');
    setTimeout(() => {
      document.body.classList.add('revealed');
      $$('#tiles span').forEach(t => setTimeout(() => t.style.opacity = 0, reduce ? 0 : 200 + Math.random() * 1400));
      setTimeout(startOdo, 400);
      typeLoop($('#type'), S.heroWords);
    }, 350);
    setTimeout(() => loader.remove(), reduce ? 0 : 1400);
  };
  (async () => {
    document.body.classList.add('loading');
    await document.fonts.ready;
    const name = $('#ldName'), cur = $('#ldCursor'), sel = $('#sel');
    $$('.word span', name).forEach((s, i) => s.style.transitionDelay = i * 50 + 'ms');
    if (reduce) return reveal();
    // ponytail: first visit ~2.8s, repeat visits this tab (e.g. logo click) ~1.2s
    const f = sessionStorage.getItem('seenLoader') ? .35 : .75; sessionStorage.setItem('seenLoader', 1);
    const nap = ms => sleep(ms * f);
    const t0 = performance.now();
    (function tick(t) {
      const c = $('#count'); if (!c) return;
      const p = Math.min((t - t0) / (3000 * f), 1), e = 1 - Math.pow(1 - p, 3);
      c.textContent = Math.round(e * 100); $('#bar').style.width = e * 100 + '%';
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    await nap(200); name.classList.add('in');
    await nap(1300);
    const r = name.getBoundingClientRect();
    cur.style.transform = `translate(${r.left - 6}px,${r.top - 6}px)`;
    await nap(1000);
    Object.assign(sel.style, { left: r.left + 'px', top: r.top + 'px', width: 0, height: 0, opacity: 1, transition: `width ${.7 * f}s, height ${.7 * f}s` });
    cur.style.transition = `transform ${.7 * f}s cubic-bezier(.65,0,.35,1)`;
    requestAnimationFrame(() => { sel.style.width = r.width + 'px'; sel.style.height = r.height + 'px'; cur.style.transform = `translate(${r.right - 6}px,${r.bottom - 6}px)`; });
    $('#dim').textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
    await nap(900);
    cur.classList.add('click'); await sleep(150); cur.classList.remove('click');
    await nap(250);
    reveal();
  })();
} else {
  startOdo();
}

if (page === 'works') {
  const tiles = $$('.tile');
  $$('.filters button').forEach(b => b.addEventListener('click', () => {
    $$('.filters button').forEach(x => x.classList.toggle('on', x === b));
    tiles.forEach(t => {
      const show = b.dataset.cat === 'All' || t.dataset.cats.split('|').includes(b.dataset.cat);
      t.classList.toggle('hide', !show);
      if (show) t.classList.add('on');
    });
  }));
}

if (page === 'about') sleep(500).then(() => typeOnce($('#helloType'), S.fullName + '.', 80));

if (page === 'project') {
  const links = $$('.toc a');
  const tio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-30% 0px -60% 0px' });
  $$('.cs-sec').forEach(s => tio.observe(s));
}
})();
