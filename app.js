// Slide controller + topbar counter + PDF export
const deck = document.getElementById('deck');
const slides = Array.from(deck.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prevTop = document.getElementById('prevTop');
const nextTop = document.getElementById('nextTop');
const dotsEl = document.getElementById('dots');
const counter = document.getElementById('counter');
const restart = document.getElementById('restart');
const dlBtn = document.getElementById('downloadPdf');

let i = 0;

function renderDots() {
  dotsEl.innerHTML = '';
  slides.forEach((_, idx) => {
    const d = document.createElement('div');
    d.className = 'dot' + (idx === i ? ' active' : '');
    d.onclick = () => go(idx);
    dotsEl.appendChild(d);
  });
  counter && (counter.textContent = `${i+1}/${slides.length}`);
}

function go(n) {
  i = Math.max(0, Math.min(slides.length - 1, n));
  slides.forEach((s, idx) => { s.style.display = idx === i ? 'block' : 'none'; });
  renderDots();
  [prevBtn, prevTop].forEach(b => b && (b.disabled = i === 0));
  [nextBtn, nextTop].forEach(b => b && (b.disabled = i === slides.length - 1));
  const head = slides[i].querySelector('h1,h2'); head && head.setAttribute('tabindex','-1') && head.focus();
}

function hardRefresh(){
  slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
  i = 0; renderDots();
}

prevBtn && (prevBtn.onclick = () => go(i - 1));
nextBtn && (nextBtn.onclick = () => go(i + 1));
prevTop && (prevTop.onclick = () => go(i - 1));
nextTop && (nextTop.onclick = () => go(i + 1));
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(i + 1);
  if (e.key === 'ArrowLeft') go(i - 1);
});

restart && (restart.onclick = hardRefresh);

if (dlBtn) dlBtn.onclick = () => {
  window.print(); // quick PDF via browser print to PDF
};

// init
slides.forEach((s, idx) => s.style.display = idx === 0 ? 'block' : 'none');
renderDots();
