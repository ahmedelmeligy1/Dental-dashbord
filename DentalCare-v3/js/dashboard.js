/* ══ DASHBOARD JS ══ */
const chartData = {
  daily:   { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], values:[44,51,38,61,48,30,15] },
  weekly:  { labels:['W1','W2','W3','W4','W5','W6','W7'],       values:[210,265,190,310,245,185,130] },
  monthly: { labels:['Aug','Sep','Oct','Nov','Dec','Jan','Feb'], values:[820,940,870,1050,960,890,1100] },
};

const featuredList = [
  { name:'Sarah Johnson', age:32, av:'SJ', treatment:'Root Canal Therapy',  next:'2:30 PM Today',     pct:75, color:'#7c3aed' },
  { name:'Omar Farouk',   age:28, av:'OF', treatment:'Orthodontic Braces',  next:'10:00 AM Tomorrow', pct:40, color:'#3b82f6' },
  { name:'Mona Ibrahim',  age:45, av:'MI', treatment:'Dental Cleaning',     next:'3:00 PM Today',     pct:90, color:'#22c55e' },
  { name:'Karim Mahmoud', age:35, av:'KM', treatment:'Tooth Filling',       next:'11:30 AM Today',    pct:55, color:'#f97316' },
];

const todayList = [
  { name:'Ryan White',    type:'Dental Veneer',   time:'09:00 AM', color:'#3b82f6', status:'done'     },
  { name:'Brian Clark',   type:'Teeth Whitening', time:'10:00 AM', color:'#22c55e', status:'done'     },
  { name:'Mona Ibrahim',  type:'Dental Cleaning', time:'10:30 AM', color:'#f97316', status:'active'   },
  { name:'Sarah Johnson', type:'Root Canal',       time:'02:30 PM', color:'#7c3aed', status:'upcoming' },
  { name:'Omar Farouk',   type:'Orthodontics',    time:'03:00 PM', color:'#0d9488', status:'upcoming' },
];

let currentTab = 'daily';
let featIdx = 0;

function setTab(btn, tab) {
  document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentTab = tab;
  renderChart();
}

function renderChart() {
  const { labels, values } = chartData[currentTab];
  const max = Math.max(...values);
  const chartEl = document.getElementById('chart-area');
  const yEl     = document.getElementById('y-labels');
  chartEl.innerHTML = '';
  labels.forEach((label, i) => {
    const h = Math.round((values[i] / max) * 180);
    const col = document.createElement('div');
    col.className = 'bar-col';
    col.innerHTML = `<div class="bar" style="height:${h}px"><div class="bar-tooltip">${values[i]}</div></div><div class="bar-day">${label}</div>`;
    chartEl.appendChild(col);
  });
  const step = Math.ceil(max / 4 / 10) * 10;
  yEl.innerHTML = '';
  for (let v = Math.ceil(max / step) * step; v >= 0; v -= step) {
    const d = document.createElement('div');
    d.textContent = v;
    yEl.appendChild(d);
  }
}

function renderFeatured() {
  const p = featuredList[featIdx];
  document.getElementById('feat-av').textContent        = p.av;
  document.getElementById('feat-av').style.background   = p.color;
  document.getElementById('feat-name').textContent      = p.name;
  document.getElementById('feat-age').textContent       = `Age: ${p.age}`;
  document.getElementById('feat-treatment').textContent = p.treatment;
  document.getElementById('feat-next').textContent      = p.next;
  document.getElementById('feat-pct').textContent       = p.pct + '%';
  document.getElementById('feat-bar').style.width       = p.pct + '%';
}

function nextPatient() {
  featIdx = (featIdx + 1) % featuredList.length;
  renderFeatured();
}

function renderTodays() {
  const el = document.getElementById('todays-list');
  const sc = { done:'#22c55e', active:'#3b82f6', upcoming:'#94a3b8' };
  el.innerHTML = '';
  todayList.forEach(a => {
    const row = document.createElement('div');
    row.className = 'appt-item';
    row.innerHTML = `
      <div class="appt-av" style="background:${a.color}">${DC.initials(a.name)}</div>
      <div><div class="appt-name">${a.name}</div><div class="appt-type">${a.type}</div></div>
      <div class="appt-time">${a.time}</div>
      <div class="status-dot" style="background:${sc[a.status]}"></div>`;
    el.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderChart();
  renderFeatured();
  renderTodays();
});
