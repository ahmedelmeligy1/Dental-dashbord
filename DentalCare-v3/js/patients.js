/* ══ PATIENTS JS ══ */
let filterQ = '', filterStatus = '', filterGender = '';

function renderPatients() {
  const tbody = document.getElementById('pt-tbody');
  tbody.innerHTML = '';
  const list = DC.patientsData.filter(p => {
    const matchQ = !filterQ || p.name.toLowerCase().includes(filterQ) || p.id.toLowerCase().includes(filterQ);
    const matchS = !filterStatus || p.status === filterStatus;
    const matchG = !filterGender || p.gender === filterGender;
    return matchQ && matchS && matchG;
  });

  list.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="patient-cell">
        <div class="pt-av" style="background:${p.color || DC.getColor(p.name)}">${DC.initials(p.name)}</div>
        <div><div class="pt-name">${p.name}</div><div class="pt-id">#${p.id}</div></div>
      </div></td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.phone}</td>
      <td>${p.lastVisit}</td>
      <td>${p.treatment}</td>
      <td>${DC.statusBadge(p.status)}</td>
      <td><div class="row-actions">
        <button class="row-btn">View</button>
        <button class="row-btn">Edit</button>
        <button class="row-btn del" onclick="deletePatient('${p.id}')">Delete</button>
      </div></td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('pt-count').textContent =
    `Showing ${list.length} of ${DC.patientsData.length} patients`;
}

function filterPatients(q) { filterQ = q.toLowerCase(); renderPatients(); }
function filterByStatus(s)  { filterStatus = s; renderPatients(); }
function filterByGender(g)  { filterGender = g; renderPatients(); }

function deletePatient(id) {
  if (!confirm('Delete this patient?')) return;
  DC.patientsData = DC.patientsData.filter(p => p.id !== id);
  renderPatients();
  DC.showToast('Patient deleted.');
}

document.getElementById('add-patient-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const name = fd.get('name');
  const newP = {
    id:        'P-' + String(DC.patientsData.length + 1001).padStart(4, '0'),
    name,
    age:       fd.get('age'),
    gender:    fd.get('gender'),
    phone:     fd.get('phone') || '—',
    lastVisit: 'Today',
    treatment: fd.get('treatment') || '—',
    status:    fd.get('status'),
    color:     DC.getColor(name),
  };
  DC.patientsData.unshift(newP);
  renderPatients();
  DC.closeModal('modal-add-patient');
  this.reset();
  DC.showToast(`Patient "${name}" added successfully!`);
});

document.addEventListener('DOMContentLoaded', renderPatients);
