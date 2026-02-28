/* ══ PRESCRIPTIONS JS ══ */
let filterQ = '', filterStatus = '';
let medCount = 1;

// ── Render Table ──
function renderRx() {
  const tbody = document.getElementById('rx-tbody');
  tbody.innerHTML = '';

  const list = DC.rxData.filter(r => {
    const matchQ = !filterQ || r.patient.toLowerCase().includes(filterQ) || r.med.toLowerCase().includes(filterQ);
    const matchS = !filterStatus || r.status === filterStatus;
    return matchQ && matchS;
  });

  list.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="patient-cell">
        <div class="pt-av" style="background:${r.color}">${DC.initials(r.patient)}</div>
        <div><div class="pt-name">${r.patient}</div><div class="pt-id">#${r.id}</div></div>
      </div></td>
      <td style="max-width:160px;font-size:12px;">${r.med}</td>
      <td>${r.dosage}</td>
      <td>${r.doctor}</td>
      <td>${r.date}</td>
      <td>${DC.statusBadge(r.status)}</td>
      <td><div class="row-actions">
        <button class="row-btn" onclick="loadRx('${r.id}')">View</button>
        <button class="row-btn del" onclick="deleteRx('${r.id}')">Delete</button>
      </div></td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('rx-count').textContent =
    `Showing ${list.length} of ${DC.rxData.length} prescriptions`;

  // stats
  document.getElementById('s-total').textContent     = DC.rxData.length;
  document.getElementById('s-active').textContent    = DC.rxData.filter(r => r.status === 'active').length;
  document.getElementById('s-completed').textContent = DC.rxData.filter(r => r.status === 'completed').length;
  document.getElementById('s-expired').textContent   = DC.rxData.filter(r => r.status === 'expired').length;
}

function filterRx(q)       { filterQ = q.toLowerCase(); renderRx(); }
function filterRxStatus(s) { filterStatus = s; renderRx(); }

function deleteRx(id) {
  if (!confirm('Delete this prescription?')) return;
  DC.rxData = DC.rxData.filter(r => r.id !== id);
  renderRx();
  DC.showToast('Prescription deleted.');
}

// ── Load Rx into form ──
function loadRx(id) {
  const r = DC.rxData.find(x => x.id === id);
  if (!r) return;

  document.getElementById('rx-id-label').textContent = '#' + r.id;
  document.getElementById('rx-patient').value        = r.patient;
  document.getElementById('rx-diagnosis').value      = r.diagnosis || '';
  document.getElementById('rx-notes').value          = r.notes || '';

  // Rebuild med list from saved data
  document.getElementById('med-list').innerHTML = `
    <div class="med-row">
      <div class="med-num">1</div>
      <div class="med-fields">
        <input class="rx-input" placeholder="Medication name" value="${r.med}">
        <div class="med-sub-grid">
          <input class="rx-input" placeholder="Dosage" value="${r.dosage}">
          <input class="rx-input" placeholder="Duration" value="7 days">
        </div>
        <input class="rx-input" placeholder="Notes (optional)" style="margin-top:6px;" value="${r.notes||''}">
      </div>
      <button class="med-del" onclick="this.closest('.med-row').remove()">✕</button>
    </div>`;
  medCount = 1;

  document.getElementById('rx-form-card').scrollIntoView({ behavior: 'smooth' });
}

// ── New Rx ──
function newRx() {
  const nextId = '#Rx-' + String(DC.rxData.length + 1).padStart(4, '0');
  document.getElementById('rx-id-label').textContent = nextId;

  // Reset today's date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('rx-date').value      = today;
  document.getElementById('rx-diagnosis').value = '';
  document.getElementById('rx-notes').value     = '';
  document.getElementById('rx-patient').selectedIndex = 0;

  document.getElementById('med-list').innerHTML = `
    <div class="med-row">
      <div class="med-num">1</div>
      <div class="med-fields">
        <input class="rx-input" placeholder="Medication name">
        <div class="med-sub-grid">
          <input class="rx-input" placeholder="Dosage">
          <input class="rx-input" placeholder="Duration">
        </div>
        <input class="rx-input" placeholder="Notes (optional)" style="margin-top:6px;">
      </div>
      <button class="med-del" onclick="this.closest('.med-row').remove()">✕</button>
    </div>`;
  medCount = 1;

  document.getElementById('rx-form-card').scrollIntoView({ behavior: 'smooth' });
}

// ── Add Med Row ──
function addMedRow() {
  medCount++;
  const div = document.createElement('div');
  div.className = 'med-row';
  div.innerHTML = `
    <div class="med-num">${medCount}</div>
    <div class="med-fields">
      <input class="rx-input" placeholder="Medication name">
      <div class="med-sub-grid">
        <input class="rx-input" placeholder="Dosage">
        <input class="rx-input" placeholder="Duration">
      </div>
      <input class="rx-input" placeholder="Notes (optional)" style="margin-top:6px;">
    </div>
    <button class="med-del" onclick="this.closest('.med-row').remove()">✕</button>`;
  document.getElementById('med-list').appendChild(div);
}

// ── Save Rx ──
function saveRx() {
  const patient   = document.getElementById('rx-patient').value;
  const diagnosis = document.getElementById('rx-diagnosis').value.trim();

  if (!patient)   { alert('Please select a patient!'); return; }
  if (!diagnosis) { alert('Please enter a diagnosis!'); return; }

  const meds = [...document.querySelectorAll('#med-list .med-row')].map(row => {
    return row.querySelectorAll('.rx-input')[0].value.trim();
  }).filter(Boolean);

  const newRx = {
    id:        'Rx-' + String(DC.rxData.length + 1).padStart(4, '0'),
    patient,
    med:       meds.join(', ') || 'See notes',
    dosage:    'As prescribed',
    doctor:    'Dr. Smith',
    date:      'Today',
    status:    'active',
    color:     DC.getColor(patient),
    diagnosis,
    notes:     document.getElementById('rx-notes').value,
  };

  DC.rxData.unshift(newRx);
  renderRx();
  DC.showToast(`Prescription saved for ${patient}!`);
  newRx_reset();
}

function newRx_reset() {
  newRx();
}

// ── Print ──
function printRx() {
  const patient = document.getElementById('rx-patient').value;
  if (!patient) { alert('Please select a patient first!'); return; }
  DC.showToast(`Printing prescription for ${patient}...`);
  window.print();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  DC.updatePatientSelects();

  // Set today's date default
  document.getElementById('rx-date').value = new Date().toISOString().split('T')[0];

  renderRx();
});
