/* ═══════════════════════════════════════
   DentalCare — Shared JS (data + helpers)
═══════════════════════════════════════ */

// ══ SHARED DATA ══
const COLORS = ['#3b82f6','#7c3aed','#22c55e','#f97316','#ec4899','#0d9488','#f59e0b','#6366f1'];

window.DC = window.DC || {};

DC.patientsData = [
  { id:'P-1001', name:'Sarah Johnson',  age:32, gender:'Female', phone:'555-0101', lastVisit:'Feb 24', treatment:'Root Canal',    status:'treatment', color:'#7c3aed' },
  { id:'P-1002', name:'Ryan White',     age:27, gender:'Male',   phone:'555-0102', lastVisit:'Feb 26', treatment:'Dental Veneer', status:'active',    color:'#3b82f6' },
  { id:'P-1003', name:'Mona Ibrahim',   age:45, gender:'Female', phone:'555-0103', lastVisit:'Feb 26', treatment:'Cleaning',      status:'active',    color:'#22c55e' },
  { id:'P-1004', name:'Omar Farouk',    age:28, gender:'Male',   phone:'555-0104', lastVisit:'Feb 20', treatment:'Orthodontics',  status:'treatment', color:'#f97316' },
  { id:'P-1005', name:'Nadia Hassan',   age:39, gender:'Female', phone:'555-0105', lastVisit:'Feb 15', treatment:'Extraction',    status:'active',    color:'#ec4899' },
  { id:'P-1006', name:'Karim Mahmoud',  age:35, gender:'Male',   phone:'555-0106', lastVisit:'Jan 30', treatment:'Filling',       status:'inactive',  color:'#0d9488' },
  { id:'P-1007', name:'Amira Said',     age:52, gender:'Female', phone:'555-0107', lastVisit:'Feb 10', treatment:'Crown',         status:'treatment', color:'#f59e0b' },
  { id:'P-1008', name:'Hassan Ali',     age:41, gender:'Male',   phone:'555-0108', lastVisit:'Feb 01', treatment:'Whitening',     status:'active',    color:'#6366f1' },
];

DC.appointmentsData = [
  { id:'A-001', patient:'Ryan White',    treat:'Dental Veneer',    doctor:'Dr. Smith',  date:'Feb 26', time:'09:00 AM', status:'done',      color:'#3b82f6' },
  { id:'A-002', patient:'Brian Clark',   treat:'Teeth Whitening',  doctor:'Dr. Lee',    date:'Feb 26', time:'10:00 AM', status:'done',      color:'#22c55e' },
  { id:'A-003', patient:'Mona Ibrahim',  treat:'Dental Cleaning',  doctor:'Dr. Smith',  date:'Feb 26', time:'10:30 AM', status:'confirmed', color:'#f97316' },
  { id:'A-004', patient:'Sarah Johnson', treat:'Root Canal',        doctor:'Dr. Patel',  date:'Feb 26', time:'02:30 PM', status:'confirmed', color:'#7c3aed' },
  { id:'A-005', patient:'Omar Farouk',   treat:'Orthodontics',     doctor:'Dr. Kim',    date:'Feb 26', time:'03:00 PM', status:'pending',   color:'#0d9488' },
  { id:'A-006', patient:'Nadia Hassan',  treat:'Tooth Extraction', doctor:'Dr. Smith',  date:'Feb 26', time:'04:00 PM', status:'pending',   color:'#ec4899' },
  { id:'A-007', patient:'Karim Mahmoud', treat:'Tooth Filling',    doctor:'Dr. Lee',    date:'Feb 27', time:'09:30 AM', status:'confirmed', color:'#f59e0b' },
  { id:'A-008', patient:'Amira Said',    treat:'Crown Placement',  doctor:'Dr. Patel',  date:'Feb 27', time:'11:00 AM', status:'cancelled', color:'#6366f1' },
];

DC.doctorsData = [
  { id:'D-001', name:'Dr. James Smith',  spec:'General Dentistry',  av:'JS', color:'#3b82f6', online:true,  patients:312, appts:48, rating:4.9, phone:'555-2001', exp:'8 yrs'  },
  { id:'D-002', name:'Dr. Lisa Lee',     spec:'Cosmetic Dentistry', av:'LL', color:'#ec4899', online:true,  patients:245, appts:36, rating:4.8, phone:'555-2002', exp:'6 yrs'  },
  { id:'D-003', name:'Dr. Raj Patel',    spec:'Oral Surgery',       av:'RP', color:'#7c3aed', online:true,  patients:198, appts:29, rating:4.7, phone:'555-2003', exp:'12 yrs' },
  { id:'D-004', name:'Dr. Amy Kim',      spec:'Orthodontics',       av:'AK', color:'#f97316', online:false, patients:276, appts:41, rating:4.9, phone:'555-2004', exp:'9 yrs'  },
  { id:'D-005', name:'Dr. Omar Hassan',  spec:'Pediatric Dentistry',av:'OH', color:'#22c55e', online:true,  patients:187, appts:22, rating:4.6, phone:'555-2005', exp:'5 yrs'  },
  { id:'D-006', name:'Dr. Sara Wilson',  spec:'Endodontics',        av:'SW', color:'#0d9488', online:false, patients:154, appts:18, rating:4.8, phone:'555-2006', exp:'7 yrs'  },
];

DC.rxData = [
  { id:'Rx-0001', patient:'Sarah Johnson',  med:'Amoxicillin 500mg + Ibuprofen 400mg', dosage:'3×/day', doctor:'Dr. Smith', date:'Feb 26', status:'active',    color:'#7c3aed', diagnosis:'Root Canal Infection', notes:'Avoid hard foods for 3 days.' },
  { id:'Rx-0002', patient:'Ryan White',     med:'Chlorhexidine Mouthwash',             dosage:'2×/day', doctor:'Dr. Lee',   date:'Feb 26', status:'active',    color:'#3b82f6', diagnosis:'Post-op Veneer',        notes:'Rinse for 30 seconds.' },
  { id:'Rx-0003', patient:'Mona Ibrahim',   med:'Fluoride Gel',                        dosage:'1×/day', doctor:'Dr. Smith', date:'Feb 24', status:'active',    color:'#22c55e', diagnosis:'Cavity Prevention',     notes:'Apply before bed.' },
  { id:'Rx-0004', patient:'Omar Farouk',    med:'Paracetamol 500mg',                   dosage:'3×/day', doctor:'Dr. Kim',   date:'Feb 22', status:'completed', color:'#f97316', diagnosis:'Orthodontic Pain',      notes:'Take after meals.' },
  { id:'Rx-0005', patient:'Nadia Hassan',   med:'Amoxicillin 250mg',                   dosage:'2×/day', doctor:'Dr. Smith', date:'Feb 20', status:'completed', color:'#ec4899', diagnosis:'Post-extraction',       notes:'Complete the full course.' },
  { id:'Rx-0006', patient:'Karim Mahmoud',  med:'Metronidazole 400mg',                 dosage:'3×/day', doctor:'Dr. Lee',   date:'Feb 15', status:'expired',   color:'#0d9488', diagnosis:'Gum Infection',         notes:'Avoid alcohol.' },
];

// ══ HELPERS ══
DC.getColor = function(name) {
  let h = 0; for (let c of name) h += c.charCodeAt(0);
  return COLORS[h % COLORS.length];
};

DC.initials = function(name) {
  return name.split(' ').map(w => w[0]).join('');
};

DC.statusBadge = function(status) {
  const map = {
    active:    ['badge-active',    'Active'],
    inactive:  ['badge-inactive',  'Inactive'],
    treatment: ['badge-treatment', 'In Treatment'],
    done:      ['badge-completed', 'Done'],
    confirmed: ['badge-confirmed', 'Confirmed'],
    pending:   ['badge-pending',   'Pending'],
    cancelled: ['badge-cancelled', 'Cancelled'],
    completed: ['badge-completed', 'Completed'],
    expired:   ['badge-expired',   'Expired'],
  };
  const [cls, label] = map[status] || ['badge-inactive', status];
  return `<span class="badge ${cls}">${label}</span>`;
};

DC.showToast = function(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = '✅ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
};

// ══ MODAL ══
DC.openModal = function(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
};
DC.closeModal = function(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) DC.closeModal(this.id);
    });
  });
});

// ══ POPULATE SELECTS ══
DC.updatePatientSelects = function() {
  document.querySelectorAll('.patient-select').forEach(sel => {
    const val = sel.value;
    sel.innerHTML = '<option value="">Select patient...</option>' +
      DC.patientsData.map(p => `<option value="${p.name}"${p.name===val?' selected':''}>${p.name}</option>`).join('');
  });
};
DC.updateDoctorSelects = function() {
  document.querySelectorAll('.doctor-select').forEach(sel => {
    const val = sel.value;
    sel.innerHTML = '<option value="">Select doctor...</option>' +
      DC.doctorsData.map(d => `<option value="${d.name}"${d.name===val?' selected':''}>${d.name}</option>`).join('');
  });
};

// ══ ACTIVE NAV ══
DC.setActiveNav = function(page) {
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === page);
  });
};

// ══ APPLY SAVED PREFERENCES ON EVERY PAGE ══
(function applyPreferences() {
  // Theme
  const theme = localStorage.getItem('dc_theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else if (theme === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.body.classList.add('dark');
  }

  // Accent color
  const color = localStorage.getItem('dc_color');
  if (color) document.documentElement.style.setProperty('--blue', color);

  // Font size
  const font = localStorage.getItem('dc_font') || 'md';
  document.body.classList.add('font-' + font);
})();
