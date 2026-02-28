/* ══ DOCTORS JS ══ */
let filterQ = '', filterSpec = '', filterAvail = '';

function renderDoctors() {
  const grid = document.getElementById('doctors-grid');
  grid.innerHTML = '';

  const list = DC.doctorsData.filter(d => {
    const matchQ = !filterQ || d.name.toLowerCase().includes(filterQ) || d.spec.toLowerCase().includes(filterQ);
    const matchS = !filterSpec || d.spec === filterSpec;
    const matchA = filterAvail === '' || String(d.online) === filterAvail;
    return matchQ && matchS && matchA;
  });

  list.forEach(d => {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    const stars = '★'.repeat(Math.floor(d.rating));
    card.innerHTML = `
      <div class="dc-header">
        <div class="dc-avatar" style="background:${d.color}">${d.av}</div>
        <div class="dc-status-wrap">
          <div class="dc-online"><span class="dc-dot ${d.online?'on':'off'}"></span>${d.online?'Available':'Unavailable'}</div>
          <div class="dc-rating">${stars} ${d.rating}</div>
        </div>
      </div>
      <div class="dc-name">${d.name}</div>
      <div class="dc-spec">${d.spec} · ${d.exp}</div>
      <div class="dc-stats">
        <div class="dc-stat"><div class="dc-stat-val">${d.patients}</div><div class="dc-stat-lbl">Patients</div></div>
        <div class="dc-stat"><div class="dc-stat-val">${d.appts}</div><div class="dc-stat-lbl">Appts</div></div>
        <div class="dc-stat"><div class="dc-stat-val">${d.rating}</div><div class="dc-stat-lbl">Rating</div></div>
      </div>
      <div class="dc-footer">
        <button class="btn btn-primary btn-sm" style="flex:1">View Profile</button>
        <button class="btn btn-danger btn-sm" onclick="deleteDoctor('${d.id}')">Remove</button>
      </div>`;
    grid.appendChild(card);
  });
}

function filterDoctors(q)  { filterQ = q.toLowerCase(); renderDoctors(); }
function filterBySpec(s)   { filterSpec = s; renderDoctors(); }
function filterByAvail(a)  { filterAvail = a; renderDoctors(); }

function deleteDoctor(id) {
  if (!confirm('Remove this doctor?')) return;
  DC.doctorsData = DC.doctorsData.filter(d => d.id !== id);
  renderDoctors();
  DC.showToast('Doctor removed.');
}

document.getElementById('add-doctor-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd   = new FormData(this);
  const name = fd.get('name');
  const av   = name.split(' ').filter(w => /^[A-Z]/i.test(w)).map(w => w[0].toUpperCase()).join('').substring(0, 2) || name.substring(0, 2).toUpperCase();
  const newD = {
    id:       'D-' + String(DC.doctorsData.length + 1).padStart(3, '0'),
    name,
    spec:     fd.get('specialty'),
    av,
    color:    DC.getColor(name),
    online:   fd.get('status') === 'available',
    patients: 0,
    appts:    0,
    rating:   parseFloat(fd.get('rating')) || 5.0,
    phone:    fd.get('phone') || '—',
    exp:      fd.get('experience') || '—',
  };
  DC.doctorsData.unshift(newD);
  renderDoctors();
  DC.closeModal('modal-add-doctor');
  this.reset();
  DC.showToast(`${name} added to the team!`);
});

document.addEventListener('DOMContentLoaded', renderDoctors);
