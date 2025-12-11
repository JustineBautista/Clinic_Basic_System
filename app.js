
/* DEFAULT ACCOUNTS */
const adminHash = CryptoJS.SHA256("admin123").toString();
const staffHash = CryptoJS.SHA256("clinic123").toString();


localStorage.setItem("users", JSON.stringify([
    { email: "admin@clinic.com", password: adminHash },
    { email: "clinic@school.com", password: staffHash }
]));

/* LOGIN FUNCTION */
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let error = document.getElementById("error");

    if (!email || !password) {
        error.innerText = "Please enter email and password.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users"));
    const hashed = CryptoJS.SHA256(password).toString();

    const found = users.find(u => u.email === email && u.password === hashed);

    if (!found) {
        error.innerText = "Invalid email or password.";
        return;
    }

    // store current user
    localStorage.setItem("currentUser", email);

    // redirect
    window.location.href = "dashboard.html";
}

/* ================================
   DEFAULT DOCTORS
================================ */
function generatePhilippinesPhone(){
    const prefix = ['+63917','+63918','+63919','+63920','+63921'];
    const p = prefix[Math.floor(Math.random() * prefix.length)];
    const num = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
    return p + num;
}

if (!localStorage.getItem("doctors")) {
    localStorage.setItem("doctors", JSON.stringify([
        {
            name: "Dr. Amina Yusuf",
            specialty: "General Practitioner",
            phone: generatePhilippinesPhone(),
            email: "amina.y@clinic.com",
            bio: "Experienced GP treating common illnesses and preventive care. MBBS from University of Nairobi, 15+ years in family medicine.",
            availability: "Mon-Fri 9:00-16:00",
            photo: "",
            education: "MBBS - University of Nairobi (2008)",
            experience: "15+ years",
            certifications: "ACLS, BLS Certified",
            languages: "English, Swahili"
        },
        {
            name: "Dr. Peter Mwangi",
            specialty: "Pediatrics",
            phone: generatePhilippinesPhone(),
            email: "peter.m@clinic.com",
            bio: "Child health specialist with 10+ years experience. Specializes in newborn care, vaccinations, and childhood development.",
            availability: "Tue, Thu 10:00-14:00",
            photo: "",
            education: "MD Pediatrics - Kenyatta University (2012)",
            experience: "10+ years",
            certifications: "PALS, Pediatric Advanced Life Support",
            languages: "English, Swahili"
        },
        {
            name: "Dr. Grace Otieno",
            specialty: "Dentistry",
            phone: generatePhilippinesPhone(),
            email: "grace.o@clinic.com",
            bio: "Dental surgeon offering restorative and cosmetic treatments. Expert in dental implants, orthodontics, and oral surgery.",
            availability: "Mon, Wed 11:00-17:00",
            photo: "",
            education: "DDS - University of Nairobi Dental School (2010)",
            experience: "12+ years",
            certifications: "Fellow of Kenya Dental Association",
            languages: "English, Swahili, Luo"
        },
        {
            name: "Dr. James Kiprop",
            specialty: "Cardiology",
            phone: generatePhilippinesPhone(),
            email: "james.k@clinic.com",
            bio: "Interventional cardiologist specializing in heart disease treatment, angioplasty, and cardiac rehabilitation.",
            availability: "Mon, Wed, Fri 8:00-15:00",
            photo: "",
            education: "MD Cardiology - Moi University (2009)",
            experience: "13+ years",
            certifications: "FACC, Interventional Cardiology Board Certified",
            languages: "English, Swahili"
        },
        {
            name: "Dr. Sarah Wanjiku",
            specialty: "Obstetrics & Gynecology",
            phone: generatePhilippinesPhone(),
            email: "sarah.w@clinic.com",
            bio: "OB/GYN specialist providing comprehensive women's health care, prenatal care, and gynecological procedures.",
            availability: "Tue, Thu, Sat 9:00-16:00",
            photo: "",
            education: "MD OB/GYN - University of Nairobi (2011)",
            experience: "11+ years",
            certifications: "Fellow ACOG, Laparoscopic Surgery Certified",
            languages: "English, Swahili, Kikuyu"
        },
        {
            name: "Dr. Michael Oduya",
            specialty: "Orthopedics",
            phone: generatePhilippinesPhone(),
            email: "michael.o@clinic.com",
            bio: "Orthopedic surgeon specializing in joint replacements, sports injuries, and fracture management.",
            availability: "Mon-Fri 10:00-17:00",
            photo: "",
            education: "MD Orthopedics - Kenyatta University (2007)",
            experience: "16+ years",
            certifications: "AAOS Member, Sports Medicine Certified",
            languages: "English, Swahili"
        },
        {
            name: "Dr. Elizabeth Njoroge",
            specialty: "Dermatology",
            phone: generatePhilippinesPhone(),
            email: "elizabeth.n@clinic.com",
            bio: "Dermatologist treating skin conditions, cosmetic procedures, and skin cancer screening.",
            availability: "Wed, Fri 9:00-14:00",
            photo: "",
            education: "MD Dermatology - University of Nairobi (2013)",
            experience: "9+ years",
            certifications: "AAD Member, Cosmetic Dermatology Certified",
            languages: "English, Swahili, Kikuyu"
        },
        {
            name: "Dr. David Kiprotich",
            specialty: "Psychiatry",
            phone: generatePhilippinesPhone(),
            email: "david.k@clinic.com",
            bio: "Psychiatrist providing mental health treatment, therapy, and medication management for various conditions.",
            availability: "Mon, Tue, Thu 11:00-18:00",
            photo: "",
            education: "MD Psychiatry - Moi University (2010)",
            experience: "12+ years",
            certifications: "APA Member, CBT Certified",
            languages: "English, Swahili"
        }
    ]));
}

/* ================================
   LOGOUT
================================ */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

/* ================================
   PATIENT CRUD SYSTEM
================================ */
if (!localStorage.getItem("patients")) {
    localStorage.setItem("patients", JSON.stringify([
        {
            name: "John Doe",
            address: "123 Main St, Nairobi",
            phone: "+254712345678"
        },
        {
            name: "Jane Smith",
            address: "456 Oak Ave, Nairobi",
            phone: "+254798765432"
        },
        {
            name: "Alice Johnson",
            address: "789 Pine Rd, Nairobi",
            phone: "+254711111111"
        }
    ]));
}

if (!localStorage.getItem("patientRecords")) {
    localStorage.setItem("patientRecords", JSON.stringify([]));
}

let editIndex = -1;

function loadPatients() {
    let table = document.getElementById("patientTable");
    let patients = JSON.parse(localStorage.getItem("patients"));

    table.innerHTML = `
        <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Phone</th><th>Action</th>
        </tr>
    `;

    patients.forEach((p, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.address}</td>
                <td>${p.phone}</td>
                <td>
                    <button class="action-btn edit" onclick="editPatient(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deletePatient(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}


/* LOAD TABLE ON START */
window.onload = () => {
    let userEl = document.getElementById("welcomeUser");
    if (userEl) {
        let user = localStorage.getItem("currentUser") || 'Guest';
        userEl.innerText = "Welcome " + user;
    }

    // initialize patients table and doctors list if present
    if (document.getElementById("patientTable")) {
        showSection('patients');
        loadPatients();
    }

    if (document.getElementById('doctorsList')) {
        loadDoctors();
    }

    // Load dashboard data if on dashboard
    if (document.getElementById("dashboardSection")) {
        showSection('dashboard');
    }
};

/* ================================
   DOCTORS: RENDER & SEARCH
================================ */
function loadDoctors() {
    let container = document.getElementById("doctorsList");
    if (!container) return;

    let doctors = [];
    try {
        let data = localStorage.getItem("doctors");
        if (data) {
            doctors = JSON.parse(data);
            if (!Array.isArray(doctors)) doctors = [];
        }
    } catch (e) {
        doctors = [];
    }

    if (doctors.length === 0) {
        doctors = [
            {
                name: "Dr. Amina Yusuf",
                specialty: "General Practitioner",
                phone: generatePhilippinesPhone(),
                email: "amina.y@clinic.com",
                bio: "Experienced GP treating common illnesses and preventive care. MBBS from University of Nairobi, 15+ years in family medicine.",
                availability: "Mon-Fri 9:00-16:00",
                photo: "",
                education: "MBBS - University of Nairobi (2008)",
                experience: "15+ years",
                certifications: "ACLS, BLS Certified",
                languages: "English, Swahili"
            },
            {
                name: "Dr. Peter Mwangi",
                specialty: "Pediatrics",
                phone: generatePhilippinesPhone(),
                email: "peter.m@clinic.com",
                bio: "Child health specialist with 10+ years experience. Specializes in newborn care, vaccinations, and childhood development.",
                availability: "Tue, Thu 10:00-14:00",
                photo: "",
                education: "MD Pediatrics - Kenyatta University (2012)",
                experience: "10+ years",
                certifications: "PALS, Pediatric Advanced Life Support",
                languages: "English, Swahili"
            },
            {
                name: "Dr. Grace Otieno",
                specialty: "Dentistry",
                phone: generatePhilippinesPhone(),
                email: "grace.o@clinic.com",
                bio: "Dental surgeon offering restorative and cosmetic treatments. Expert in dental implants, orthodontics, and oral surgery.",
                availability: "Mon, Wed 11:00-17:00",
                photo: "",
                education: "DDS - University of Nairobi Dental School (2010)",
                experience: "12+ years",
                certifications: "Fellow of Kenya Dental Association",
                languages: "English, Swahili, Luo"
            },
            {
                name: "Dr. James Kiprop",
                specialty: "Cardiology",
                phone: generatePhilippinesPhone(),
                email: "james.k@clinic.com",
                bio: "Interventional cardiologist specializing in heart disease treatment, angioplasty, and cardiac rehabilitation.",
                availability: "Mon, Wed, Fri 8:00-15:00",
                photo: "",
                education: "MD Cardiology - Moi University (2009)",
                experience: "13+ years",
                certifications: "FACC, Interventional Cardiology Board Certified",
                languages: "English, Swahili"
            },
            {
                name: "Dr. Sarah Wanjiku",
                specialty: "Obstetrics & Gynecology",
                phone: generatePhilippinesPhone(),
                email: "sarah.w@clinic.com",
                bio: "OB/GYN specialist providing comprehensive women's health care, prenatal care, and gynecological procedures.",
                availability: "Tue, Thu, Sat 9:00-16:00",
                photo: "",
                education: "MD OB/GYN - University of Nairobi (2011)",
                experience: "11+ years",
                certifications: "Fellow ACOG, Laparoscopic Surgery Certified",
                languages: "English, Swahili, Kikuyu"
            },
            {
                name: "Dr. Michael Oduya",
                specialty: "Orthopedics",
                phone: generatePhilippinesPhone(),
                email: "michael.o@clinic.com",
                bio: "Orthopedic surgeon specializing in joint replacements, sports injuries, and fracture management.",
                availability: "Mon-Fri 10:00-17:00",
                photo: "",
                education: "MD Orthopedics - Kenyatta University (2007)",
                experience: "16+ years",
                certifications: "AAOS Member, Sports Medicine Certified",
                languages: "English, Swahili"
            },
            {
                name: "Dr. Elizabeth Njoroge",
                specialty: "Dermatology",
                phone: generatePhilippinesPhone(),
                email: "elizabeth.n@clinic.com",
                bio: "Dermatologist treating skin conditions, cosmetic procedures, and skin cancer screening.",
                availability: "Wed, Fri 9:00-14:00",
                photo: "",
                education: "MD Dermatology - University of Nairobi (2013)",
                experience: "9+ years",
                certifications: "AAD Member, Cosmetic Dermatology Certified",
                languages: "English, Swahili, Kikuyu"
            },
            {
                name: "Dr. David Kiprotich",
                specialty: "Psychiatry",
                phone: generatePhilippinesPhone(),
                email: "david.k@clinic.com",
                bio: "Psychiatrist providing mental health treatment, therapy, and medication management for various conditions.",
                availability: "Mon, Tue, Thu 11:00-18:00",
                photo: "",
                education: "MD Psychiatry - Moi University (2010)",
                experience: "12+ years",
                certifications: "APA Member, CBT Certified",
                languages: "English, Swahili"
            }
        ];
        localStorage.setItem("doctors", JSON.stringify(doctors));
    }

    container.innerHTML = "";

    doctors.forEach((d, i) => {
        let card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div class="doc-avatar">${getInitials(d.name)}</div>
            <div class="doc-main">
                <div class="doc-name">${d.name}</div>
                <div class="doc-specialty">${d.specialty}</div>
                <div class="doc-info">
                    <div class="doc-info-row"><strong>Availability:</strong> ${d.availability}</div>
                    <div class="doc-info-row"><strong>Phone:</strong> ${d.phone}</div>
                    <div class="doc-info-row"><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></div>
                    <div class="doc-info-row"><strong>Bio:</strong> ${d.bio}</div>
                </div>
            </div>
            <div class="doc-actions">
                <button class="doc-contact-btn" onclick="contactDoctor(${i})">Contact</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function getInitials(name){
    return (name || '').split(' ').map(s=>s.charAt(0)).slice(0,2).join('').toUpperCase();
}

function filterDoctors(){
    let q = (document.getElementById('searchDoctors')?.value || '').toLowerCase();
    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    let container = document.getElementById('doctorsList');
    if (!container) return;
    container.innerHTML = '';

    doctors.forEach((d, i) => {
        if (!q || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) {
            let card = document.createElement('div');
            card.className = 'doc-card';
            card.innerHTML = `
                <div class="doc-avatar">${getInitials(d.name)}</div>
                <div class="doc-main">
                    <div class="doc-name">${d.name}</div>
                    <div class="doc-specialty">${d.specialty}</div>
                    <div class="doc-info">
                        <div class="doc-info-row"><strong>Availability:</strong> ${d.availability}</div>
                        <div class="doc-info-row"><strong>Phone:</strong> ${d.phone}</div>
                        <div class="doc-info-row"><strong>Email:</strong> <a href="mailto:${d.email}">${d.email}</a></div>
                        <div class="doc-info-row"><strong>Bio:</strong> ${d.bio}</div>
                    </div>
                </div>
                <div class="doc-actions">
                    <button class="doc-contact-btn" onclick="contactDoctor(${i})">Contact</button>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

function contactDoctor(index){
    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    let d = doctors[index];
    if(!d) return alert('Doctor not found');
    alert(`Contacting ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}`);
}


function showSection(name){
    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event?.target?.classList?.add('active');

    const sections = ['dashboard','patients','doctors','appointments','medicine','records'];
    sections.forEach(s=>{
        const el = document.getElementById(s + 'Section');
        if(el) el.style.display = (s===name) ? '' : 'none';
    });

    // load data for the shown section
    if(name === 'dashboard') updateDashboard();
    if(name === 'patients') loadPatients();
    if(name === 'doctors') loadDoctors();
    if(name === 'appointments') loadAppointments();
    if(name === 'medicine') loadMedicine();
    if(name === 'records') loadPatientRecords();
}

/* ================================
   MODAL
================================ */
function openModal() {
    editIndex = -1;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalTitle").innerText = "Add Patient";
    document.getElementById("pName").value = "";
    document.getElementById("pAddress").value = "";
    document.getElementById("pPhone").value = "";
}

function editPatient(index) {
    editIndex = index;

    let patients = JSON.parse(localStorage.getItem("patients"));
    let p = patients[index];

    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalTitle").innerText = "Edit Patient";

    document.getElementById("pName").value = p.name;
    document.getElementById("pAddress").value = p.address;
    document.getElementById("pPhone").value = p.phone;
}

function savePatient() {
    let name = document.getElementById("pName").value;
    let address = document.getElementById("pAddress").value;
    let phone = document.getElementById("pPhone").value;

    if (!name || !address || !phone) {
        alert("All fields required.");
        return;
    }

    let patients = JSON.parse(localStorage.getItem("patients"));

    if (editIndex === -1) {
        patients.push({ name, address, phone });
    } else {
        patients[editIndex] = { name, address, phone };
    }

    localStorage.setItem("patients", JSON.stringify(patients));
    document.getElementById("modal").style.display = "none";
    loadPatients();
}

function deletePatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients"));
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatients();
}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */
window.onclick = function(e) {
    if (e.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
    if (e.target === document.getElementById("recordModal")) {
        document.getElementById("recordModal").style.display = "none";
    }
    if (e.target === document.getElementById("appointmentModal")) {
        document.getElementById("appointmentModal").style.display = "none";
    }
    if (e.target === document.getElementById("medicineModal")) {
        document.getElementById("medicineModal").style.display = "none";
    }
};

/* ================================
   SEARCH
================================ */
function searchPatient() {
    let value = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#patientTable tr");

    rows.forEach((r, i) => {
        if (i === 0) return;
        r.style.display = r.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}


/* ================================
   DASHBOARD FUNCTIONS
================================ */
function updateDashboard() {
    // Update dashboard counters
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    document.getElementById("countPatients").textContent = patients.length;
    document.getElementById("countDoctors").textContent = doctors.length;
    document.getElementById("countRecords").textContent = records.length;
    document.getElementById("countMedicine").textContent = medicines.length;

    // Update recent activity
    const recentActivity = document.getElementById("recentActivity");
    if (records.length > 0) {
        const recentRecords = records.slice(-3).reverse();
        recentActivity.innerHTML = recentRecords.map(record => {
            const patient = patients[record.patientIndex];
            return `<div style="padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${patient ? patient.name : 'Unknown Patient'}</strong> - ${record.diagnosis}
                <br><small>${new Date(record.date).toLocaleDateString()}</small>
            </div>`;
        }).join('');
    } else {
        recentActivity.innerHTML = '<p class="doc-info">No recent activity to display.</p>';
    }
}

/* ================================
   APPOINTMENTS FUNCTIONS
================================ */
if (!localStorage.getItem("appointments")) {
    localStorage.setItem("appointments", JSON.stringify([]));
}

function loadAppointments() {
    const table = document.getElementById("appointmentsTable");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];

    table.innerHTML = `
        <tr>
            <th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th>
        </tr>
    `;

    appointments.forEach((appointment, index) => {
        const patient = patients[appointment.patientIndex] || { name: 'Unknown Patient' };
        const doctor = doctors[appointment.doctorIndex] || { name: 'Unknown Doctor' };
        
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${patient.name}</td>
                <td>${doctor.name}</td>
                <td>${new Date(appointment.date).toLocaleDateString()}</td>
                <td>${appointment.time}</td>
                <td><span class="status-badge status-${appointment.status}">${appointment.status}</span></td>
                <td>
                    <button class="action-btn edit" onclick="editAppointment(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteAppointment(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openAppointmentModal(editIndex = -1) {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    
    if (patients.length === 0) {
        alert("Please add patients first before scheduling appointments.");
        return;
    }
    
    if (doctors.length === 0) {
        alert("No doctors available. Please check doctor directory.");
        return;
    }

    const modal = document.getElementById("appointmentModal");
    const title = document.getElementById("appointmentModalTitle");
    
    // Populate patient dropdown
    const patientSelect = document.getElementById("appointmentPatient");
    patientSelect.innerHTML = '<option value="">Select Patient</option>' +
        patients.map((p, i) => `<option value="${i}">${p.name}</option>`).join('');
    
    // Populate doctor dropdown
    const doctorSelect = document.getElementById("appointmentDoctor");
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>' +
        doctors.map((d, i) => `<option value="${i}">${d.name} - ${d.specialty}</option>`).join('');
    
    if (editIndex === -1) {
        title.innerText = "Schedule Appointment";
        document.getElementById("appointmentForm")?.reset();
    } else {
        title.innerText = "Edit Appointment";
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const appointment = appointments[editIndex];
        document.getElementById("appointmentPatient").value = appointment.patientIndex;
        document.getElementById("appointmentDoctor").value = appointment.doctorIndex;
        document.getElementById("appointmentDate").value = appointment.date;
        document.getElementById("appointmentTime").value = appointment.time;
        document.getElementById("appointmentStatus").value = appointment.status;
    }
    
    document.getElementById("appointmentEditIndex").value = editIndex;
    modal.style.display = "flex";
}

function saveAppointment() {
    const patientIndex = document.getElementById("appointmentPatient").value;
    const doctorIndex = document.getElementById("appointmentDoctor").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const status = document.getElementById("appointmentStatus").value;
    
    if (!patientIndex || !doctorIndex || !date || !time) {
        alert("Please fill in all required fields.");
        return;
    }
    
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const editIndex = parseInt(document.getElementById("appointmentEditIndex").value);
    
    const appointment = {
        patientIndex: parseInt(patientIndex),
        doctorIndex: parseInt(doctorIndex),
        date,
        time,
        status
    };
    
    if (editIndex === -1) {
        appointments.push(appointment);
    } else {
        appointments[editIndex] = appointment;
    }
    
    localStorage.setItem("appointments", JSON.stringify(appointments));
    document.getElementById("appointmentModal").style.display = "none";
    loadAppointments();
}

function editAppointment(index) {
    openAppointmentModal(index);
}

function deleteAppointment(index) {
    if (confirm("Are you sure you want to delete this appointment?")) {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        loadAppointments();
    }
}

function searchAppointments() {
    const value = document.getElementById("searchAppointments").value.toLowerCase();
    const rows = document.querySelectorAll("#appointmentsTable tr");
    
    rows.forEach((r, i) => {
        if (i === 0) return;
        r.style.display = r.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}

/* ================================
   MEDICINE INVENTORY FUNCTIONS
================================ */
if (!localStorage.getItem("medicines")) {
    localStorage.setItem("medicines", JSON.stringify([
        {
            name: "Paracetamol",
            category: "Pain Relief",
            stock: 100,
            expiryDate: "2024-12-31"
        },
        {
            name: "Amoxicillin",
            category: "Antibiotic",
            stock: 50,
            expiryDate: "2024-11-30"
        },
        {
            name: "Ibuprofen",
            category: "Anti-inflammatory",
            stock: 75,
            expiryDate: "2025-01-15"
        }
    ]));
}

function loadMedicine() {
    const table = document.getElementById("medicineTable");
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];

    table.innerHTML = `
        <tr>
            <th>ID</th><th>Medicine Name</th><th>Category</th><th>Stock</th><th>Expiry Date</th><th>Action</th>
        </tr>
    `;

    medicines.forEach((medicine, index) => {
        const isExpiringSoon = new Date(medicine.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const stockClass = medicine.stock < 10 ? 'low-stock' : '';
        
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${medicine.name}</td>
                <td>${medicine.category}</td>
                <td class="${stockClass}">${medicine.stock}</td>
                <td class="${isExpiringSoon ? 'expiring-soon' : ''}">${new Date(medicine.expiryDate).toLocaleDateString()}</td>
                <td>
                    <button class="action-btn edit" onclick="editMedicine(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteMedicine(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openMedicineModal(editIndex = -1) {
    const modal = document.getElementById("medicineModal");
    const title = document.getElementById("medicineModalTitle");
    
    if (editIndex === -1) {
        title.innerText = "Add Medicine";
        document.getElementById("medicineForm")?.reset();
    } else {
        title.innerText = "Edit Medicine";
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        const medicine = medicines[editIndex];
        document.getElementById("medicineName").value = medicine.name;
        document.getElementById("medicineCategory").value = medicine.category;
        document.getElementById("medicineStock").value = medicine.stock;
        document.getElementById("medicineExpiry").value = medicine.expiryDate;
    }
    
    document.getElementById("medicineEditIndex").value = editIndex;
    modal.style.display = "flex";
}

function saveMedicine() {
    const name = document.getElementById("medicineName").value;
    const category = document.getElementById("medicineCategory").value;
    const stock = parseInt(document.getElementById("medicineStock").value);
    const expiryDate = document.getElementById("medicineExpiry").value;
    
    if (!name || !category || !stock || !expiryDate) {
        alert("Please fill in all fields.");
        return;
    }
    
    if (stock < 0) {
        alert("Stock quantity cannot be negative.");
        return;
    }
    
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const editIndex = parseInt(document.getElementById("medicineEditIndex").value);
    
    const medicine = { name, category, stock, expiryDate };
    
    if (editIndex === -1) {
        medicines.push(medicine);
    } else {
        medicines[editIndex] = medicine;
    }
    
    localStorage.setItem("medicines", JSON.stringify(medicines));
    document.getElementById("medicineModal").style.display = "none";
    loadMedicine();
}

function editMedicine(index) {
    openMedicineModal(index);
}

function deleteMedicine(index) {
    if (confirm("Are you sure you want to delete this medicine?")) {
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        medicines.splice(index, 1);
        localStorage.setItem("medicines", JSON.stringify(medicines));
        loadMedicine();
    }
}

function searchMedicine() {
    const value = document.getElementById("searchMedicine").value.toLowerCase();
    const rows = document.querySelectorAll("#medicineTable tr");
    
    rows.forEach((r, i) => {
        if (i === 0) return;
        r.style.display = r.innerText.toLowerCase().includes(value) ? "" : "none";
    });
}

/* ================================
   PATIENT RECORDS FUNCTIONS
================================ */
function loadPatientRecords() {
    let container = document.getElementById("recordsSection");
    if (!container) return;

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    container.innerHTML = `
        <div class="header">
            <h2>Patient Records</h2>
            <div style="display:flex;gap:10px;align-items:center;">
                <select id="patientSelect" onchange="filterRecordsByPatient()">
                    <option value="">All Patients</option>
                    ${patients.map((p, i) => `<option value="${i}">${p.name}</option>`).join('')}
                </select>
                <button class="add-btn" onclick="openRecordModal()">+ Add Record</button>
            </div>
        </div>
        <div class="table-container">
            <div id="recordsList"></div>
        </div>
    `;

    displayRecords(records);
}

function displayRecords(records) {
    let container = document.getElementById("recordsList");
    if (!records || records.length === 0) {
        container.innerHTML = '<p class="doc-info">No records found. Add a new patient record to get started.</p>';
        return;
    }

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    container.innerHTML = records.map((record, index) => {
        let patient = patients[record.patientIndex] || { name: 'Unknown Patient' };
        return `
            <div class="record-card">
                <div class="record-header">
                    <div class="record-patient">${patient.name}</div>
                    <div class="record-date">${new Date(record.date).toLocaleDateString()}</div>
                </div>
                <div class="record-details">
                    <div class="record-diagnosis"><strong>Diagnosis:</strong> ${record.diagnosis}</div>
                    <div class="record-treatment"><strong>Treatment:</strong> ${record.treatment}</div>
                    <div class="record-notes"><strong>Notes:</strong> ${record.notes}</div>
                </div>
                <div class="record-actions">
                    <button class="action-btn edit" onclick="editRecord(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteRecord(${index})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function filterRecordsByPatient() {
    let patientIndex = document.getElementById("patientSelect").value;
    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    if (patientIndex === "") {
        displayRecords(records);
    } else {
        let filteredRecords = records.filter(r => r.patientIndex == patientIndex);
        displayRecords(filteredRecords);
    }
}

function openRecordModal(editIndex = -1) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    if (patients.length === 0) {
        alert("Please add patients first before creating records.");
        return;
    }

    let modal = document.getElementById("recordModal");
    let title = document.getElementById("recordModalTitle");
    let form = document.getElementById("recordForm");
    let patientSelect = document.getElementById("recordPatient");

    // Populate patient select
    patientSelect.innerHTML = '<option value="">Select Patient</option>' +
        patients.map((p, i) => `<option value="${i}">${p.name}</option>`).join('');

    if (editIndex === -1) {
        title.innerText = "Add Patient Record";
        form.reset();
    } else {
        title.innerText = "Edit Patient Record";
        let records = JSON.parse(localStorage.getItem("patientRecords")) || [];
        let record = records[editIndex];
        document.getElementById("recordPatient").value = record.patientIndex;
        document.getElementById("recordDate").value = record.date;
        document.getElementById("recordDiagnosis").value = record.diagnosis;
        document.getElementById("recordTreatment").value = record.treatment;
        document.getElementById("recordNotes").value = record.notes;
    }

    document.getElementById("recordEditIndex").value = editIndex;
    modal.style.display = "flex";
}

function saveRecord() {
    let patientIndex = document.getElementById("recordPatient").value;
    let date = document.getElementById("recordDate").value;
    let diagnosis = document.getElementById("recordDiagnosis").value;
    let treatment = document.getElementById("recordTreatment").value;
    let notes = document.getElementById("recordNotes").value;

    if (!patientIndex || !date || !diagnosis || !treatment) {
        alert("Please fill in all required fields.");
        return;
    }

    let records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    let editIndex = parseInt(document.getElementById("recordEditIndex").value);

    let record = { patientIndex: parseInt(patientIndex), date, diagnosis, treatment, notes };

    if (editIndex === -1) {
        records.push(record);
    } else {
        records[editIndex] = record;
    }

    localStorage.setItem("patientRecords", JSON.stringify(records));
    document.getElementById("recordModal").style.display = "none";
    loadPatientRecords();
}

function editRecord(index) {
    openRecordModal(index);
}

function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        let records = JSON.parse(localStorage.getItem("patientRecords")) || [];
        records.splice(index, 1);
        localStorage.setItem("patientRecords", JSON.stringify(records));
        loadPatientRecords();
    }
}


/* ================================
   VALIDATION FUNCTIONS
================================ */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
}

/* ================================
   ADVANCED DASHBOARD FEATURES
================================ */

// Initialize dashboard with charts and analytics
let appointmentsChart, patientsChart;

function initializeDashboard() {
    if (document.getElementById("dashboardSection")) {
        updateDashboard();
        initializeCharts();
        updateDashboardAnalytics();
    }
}

// Initialize Chart.js charts
function initializeCharts() {
    const appointmentsCtx = document.getElementById('appointmentsChart');
    const patientsCtx = document.getElementById('patientsChart');

    if (appointmentsCtx) {
        appointmentsChart = new Chart(appointmentsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Appointments',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#6e0f0f',
                    backgroundColor: 'rgba(110, 15, 15, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }

    if (patientsCtx) {
        patientsChart = new Chart(patientsCtx, {
            type: 'doughnut',
            data: {
                labels: ['General Medicine', 'Pediatrics', 'Cardiology', 'Others'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#6e0f0f',
                        '#8B0000',
                        '#A52A2A',
                        '#CD853F'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

// Update dashboard with enhanced analytics
function updateDashboardAnalytics() {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Update basic counters
    document.getElementById("countPatients").textContent = patients.length;
    document.getElementById("countDoctors").textContent = doctors.length;
    document.getElementById("countRecords").textContent = records.length;
    document.getElementById("countMedicine").textContent = medicines.length;

    // Today's appointments
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    document.getElementById("countTodayAppointments").textContent = todayAppointments.length;

    // Low stock alert
    const lowStockItems = medicines.filter(med => med.stock < 10);
    document.getElementById("countLowStock").textContent = lowStockItems.length;

    // Update charts with real data
    updateChartsWithRealData();

    // Update recent activity with enhanced details
    updateRecentActivity();
}

// Update charts with real data from the system
function updateChartsWithRealData() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const records = JSON.parse(localStorage.getItem("patientRecords")) || [];

    // Update appointments chart (last 6 months)
    if (appointmentsChart && appointments.length > 0) {
        const monthlyData = getMonthlyAppointments();
        appointmentsChart.data.datasets[0].data = monthlyData;
        appointmentsChart.update();
    }

    // Update patients chart (by specialty)
    if (patientsChart) {
        const specialtyData = getPatientsBySpecialty();
        patientsChart.data.datasets[0].data = specialtyData.values;
        patientsChart.data.labels = specialtyData.labels;
        patientsChart.update();
    }
}

// Get monthly appointments for chart
function getMonthlyAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const monthlyData = [0, 0, 0, 0, 0, 0]; // Last 6 months
    
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        monthlyData[5 - i] = appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate.getFullYear() === date.getFullYear() && 
                   aptDate.getMonth() === date.getMonth();
        }).length;
    }
    
    return monthlyData;
}

// Get patient distribution by doctor specialty
function getPatientsBySpecialty() {
    const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
    const specialtyCount = {};
    
    doctors.forEach(doctor => {
        const specialty = doctor.specialty || 'General';
        specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });
    
    const labels = Object.keys(specialtyCount);
    const values = Object.values(specialtyCount);
    
    return { labels, values };
}

// Update recent activity section
function updateRecentActivity() {
    const recentActivity = document.getElementById("recentActivity");
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const activities = [];
    
    // Recent records
    records.slice(-3).reverse().forEach(record => {
        const patient = patients[record.patientIndex];
        activities.push({
            type: 'record',
            text: `${patient ? patient.name : 'Unknown Patient'} - ${record.diagnosis}`,
            date: record.date,
            icon: 'fas fa-file-medical'
        });
    });
    
    // Recent appointments
    appointments.slice(-2).reverse().forEach(appointment => {
        const patient = patients[appointment.patientIndex];
        const doctor = JSON.parse(localStorage.getItem("doctors"))[appointment.doctorIndex];
        activities.push({
            type: 'appointment',
            text: `${patient ? patient.name : 'Unknown Patient'} with ${doctor ? doctor.name : 'Unknown Doctor'}`,
            date: appointment.date,
            icon: 'fas fa-calendar'
        });
    });
    
    // Sort by date and take latest 5
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestActivities = activities.slice(0, 5);
    
    if (latestActivities.length === 0) {
        recentActivity.innerHTML = '<p class="doc-info">No recent activity to display.</p>';
    } else {
        recentActivity.innerHTML = latestActivities.map(activity => `
            <div style="padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;">
                <i class="${activity.icon}" style="color: #6e0f0f; width: 16px;"></i>
                <div>
                    <div>${activity.text}</div>
                    <small style="color: #666;">${new Date(activity.date).toLocaleDateString()}</small>
                </div>
            </div>
        `).join('');
    }
}

/* ================================
   EXPORT FUNCTIONALITY
================================ */

// Export dashboard data to PDF
function exportDashboardPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(20);
        doc.setTextColor(110, 15, 15);
        doc.text('Clinic Management Dashboard Report', 20, 30);
        
        // Date
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
        
        // Statistics
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
        const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        
        doc.setFontSize(16);
        doc.text('Statistics Summary', 20, 65);
        
        doc.setFontSize(12);
        const stats = [
            `Total Patients: ${patients.length}`,
            `Total Doctors: ${doctors.length}`,
            `Medical Records: ${records.length}`,
            `Medicine Items: ${medicines.length}`,
            `Total Appointments: ${appointments.length}`
        ];
        
        stats.forEach((stat, index) => {
            doc.text(stat, 20, 85 + (index * 10));
        });
        
        // Recent Records
        doc.setFontSize(16);
        doc.text('Recent Medical Records', 20, 145);
        
        doc.setFontSize(10);
        records.slice(-5).forEach((record, index) => {
            const patient = patients[record.patientIndex];
            const yPos = 165 + (index * 15);
            doc.text(`${patient ? patient.name : 'Unknown Patient'} - ${record.diagnosis}`, 20, yPos);
            doc.text(`Date: ${new Date(record.date).toLocaleDateString()}`, 20, yPos + 5);
        });
        
        doc.save(`clinic-dashboard-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF report. Please try again.');
    }
}

// Export dashboard data to Excel
function exportDashboardExcel() {
    try {
        const wb = XLSX.utils.book_new();
        
        // Prepare data for different sheets
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
        const records = JSON.parse(localStorage.getItem("patientRecords")) || [];
        const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        
        // Dashboard Summary Sheet
        const summaryData = [
            ['Clinic Management Dashboard Summary'],
            [''],
            ['Generated on:', new Date().toLocaleDateString()],
            [''],
            ['Statistics'],
            ['Total Patients', patients.length],
            ['Total Doctors', doctors.length],
            ['Medical Records', records.length],
            ['Medicine Items', medicines.length],
            ['Total Appointments', appointments.length],
            [''],
            ['Today\'s Appointments', appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length],
            ['Low Stock Items', medicines.filter(med => med.stock < 10).length]
        ];
        
        const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summaryWS, 'Dashboard Summary');
        
        // Patients Sheet
        const patientsData = [
            ['ID', 'Name', 'Address', 'Phone'],
            ...patients.map((p, i) => [i + 1, p.name, p.address, p.phone])
        ];
        const patientsWS = XLSX.utils.aoa_to_sheet(patientsData);
        XLSX.utils.book_append_sheet(wb, patientsWS, 'Patients');
        
        // Doctors Sheet
        const doctorsData = [
            ['Name', 'Specialty', 'Phone', 'Email', 'Availability'],
            ...doctors.map(d => [d.name, d.specialty, d.phone, d.email, d.availability])
        ];
        const doctorsWS = XLSX.utils.aoa_to_sheet(doctorsData);
        XLSX.utils.book_append_sheet(wb, doctorsWS, 'Doctors');
        
        // Medical Records Sheet
        const recordsData = [
            ['Patient', 'Date', 'Diagnosis', 'Treatment', 'Notes'],
            ...records.map(r => {
                const patient = patients[r.patientIndex];
                return [
                    patient ? patient.name : 'Unknown',
                    new Date(r.date).toLocaleDateString(),
                    r.diagnosis,
                    r.treatment,
                    r.notes
                ];
            })
        ];
        const recordsWS = XLSX.utils.aoa_to_sheet(recordsData);
        XLSX.utils.book_append_sheet(wb, recordsWS, 'Medical Records');
        
        // Appointments Sheet
        const appointmentsData = [
            ['Patient', 'Doctor', 'Date', 'Time', 'Status'],
            ...appointments.map(a => {
                const patient = patients[a.patientIndex];
                const doctor = doctors[a.doctorIndex];
                return [
                    patient ? patient.name : 'Unknown',
                    doctor ? doctor.name : 'Unknown',
                    new Date(a.date).toLocaleDateString(),
                    a.time,
                    a.status
                ];
            })
        ];
        const appointmentsWS = XLSX.utils.aoa_to_sheet(appointmentsData);
        XLSX.utils.book_append_sheet(wb, appointmentsWS, 'Appointments');
        
        // Medicines Sheet
        const medicinesData = [
            ['Name', 'Category', 'Stock', 'Expiry Date'],
            ...medicines.map(m => [m.name, m.category, m.stock, new Date(m.expiryDate).toLocaleDateString()])
        ];
        const medicinesWS = XLSX.utils.aoa_to_sheet(medicinesData);
        XLSX.utils.book_append_sheet(wb, medicinesWS, 'Medicines');
        
        // Save file
        XLSX.writeFile(wb, `clinic-dashboard-${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
        console.error('Error generating Excel file:', error);
        alert('Error generating Excel report. Please try again.');
    }
}

/* ================================
   QUICK ACTIONS
================================ */

// Quick action functions for dashboard widgets
function openRecordModal() {
    openRecordModal(-1);
}

/* ================================
   ENHANCED DASHBOARD UPDATE
================================ */

// Override the original updateDashboard function
const originalUpdateDashboard = updateDashboard;
updateDashboard = function() {
    originalUpdateDashboard();
    updateDashboardAnalytics();
};

// Initialize charts when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("dashboardSection")) {
        setTimeout(initializeDashboard, 500); // Small delay to ensure DOM is ready
    }
});

// Add CSS for status badges and enhanced styling
const additionalCSS = `
.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
}

.status-scheduled {
    background-color: #17a2b8;
    color: white;
}

.status-completed {
    background-color: #28a745;
    color: white;
}

.status-cancelled {
    background-color: #dc3545;
    color: white;
}

.low-stock {
    color: #dc3545;
    font-weight: bold;
}

.expiring-soon {
    color: #ffc107;
    font-weight: bold;
}

.header-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

@media (max-width: 768px) {
    .header-controls {
        flex-direction: column;
        width: 100%;
    }
    
    .header-controls .add-btn {
        width: 100%;
        margin-bottom: 5px;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
