/* ══ APPOINTMENTS JS ══ */
let filterQ = '', filterStatus = '';

function renderAppts() {
  const tbody = document.getElementById('appt-tbody');
  tbody.innerHTML = '';

  const list = DC.appointmentsData.filter(a => {
    const matchQ = !filterQ || a.patient.toLowerCase().includes(filterQ) || a.treat.toLowerCase().includes(filterQ);
    const matchS = !filterStatus || a.status === filterStatus;
    return matchQ && matchS;
  });

  list.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="patient-cell">
        <div class="pt-av" style="background:${a.color || DC.getColor(a.patient)}">${DC.initials(a.patient)}</div>
        <div><div class="pt-name">${a.patient}</div><div class="pt-id">#${a.id}</div></div>
      </div></td>
      <td>${a.treat}</td>
      <td>${a.doctor}</td>
      <td>${a.date} · ${a.time}</td>
      <td>${DC.statusBadge(a.status)}</td>
      <td><div class="row-actions">
        <button class="row-btn">View</button>
        <button class="row-btn del" onclick="deleteAppt('${a.id}')">Cancel</button>
      </div></td>`;
    tbody.appendChild(tr);
  });

  document.getElementById('appt-count').textContent =
    `Showing ${list.length} of ${DC.appointmentsData.length} appointments`;

  // Update stats
  document.getElementById('s-today').textContent     = DC.appointmentsData.length;
  document.getElementById('s-confirmed').textContent = DC.appointmentsData.filter(a => a.status === 'confirmed').length;
  document.getElementById('s-pending').textContent   = DC.appointmentsData.filter(a => a.status === 'pending').length;
  document.getElementById('s-cancelled').textContent = DC.appointmentsData.filter(a => a.status === 'cancelled').length;
}

function filterAppts(q)      { filterQ = q.toLowerCase(); renderAppts(); }
function filterApptStatus(s) { filterStatus = s; renderAppts(); }

function deleteAppt(id) {
  if (!confirm('Cancel this appointment?')) return;
  const idx = DC.appointmentsData.findIndex(a => a.id === id);
  if (idx !== -1) DC.appointmentsData[idx].status = 'cancelled';
  renderAppts();
  DC.showToast('Appointment cancelled.');
}

document.getElementById('add-appt-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const fd = new FormData(this);
  const patient = fd.get('patient');
  const date    = fd.get('date');
  const time    = fd.get('time');
  const newA = {
    id:      'A-' + String(DC.appointmentsData.length + 1).padStart(3, '0'),
    patient,
    treat:   fd.get('treatment'),
    doctor:  fd.get('doctor'),
    date:    date ? new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'TBD',
    time:    time ? new Date('1970-01-01T'+time).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}) : 'TBD',
    status:  'confirmed',
    color:   DC.getColor(patient),
  };
  DC.appointmentsData.unshift(newA);
  renderAppts();
  DC.closeModal('modal-add-appt');
  this.reset();
  DC.updatePatientSelects();
  DC.showToast(`Appointment for "${patient}" booked!`);
});

document.addEventListener('DOMContentLoaded', () => {
  DC.updatePatientSelects();
  DC.updateDoctorSelects();
  renderAppts();
});
