/* ================================
   DEFAULT USER ACCOUNTS
================================ */
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
        { email: "admin", password: "admin123" },
        { email: "user@gmail.com", password: "user123" }
    ]));
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
   LOGIN
================================ */
function login() {
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("password").value;

    if (!validateEmail(email) || !pass) {
        document.getElementById("error").innerText = "Please enter valid email and password.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let hashedPassword = CryptoJS.SHA256(pass).toString();
    let found = users.find(u => u.email === email && u.password === hashedPassword);

    if (found) {
        localStorage.setItem("loggedInUser", JSON.stringify({ email: found.email }));
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid email or password.";
    }
}

/* ================================
   REGISTER
================================ */
function register() {
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value;

    // Input validation
    if (!validateEmail(email)) {
        document.getElementById("regError").innerText = "Please enter a valid email address.";
        return;
    }

    if (!validatePassword(pass)) {
        document.getElementById("regError").innerText = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        document.getElementById("regError").innerText = "Email already exists.";
        return;
    }

    // Hash password before storing
    let hashedPassword = CryptoJS.SHA256(pass).toString();
    users.push({ email, password: hashedPassword });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "index.html";
}

/* ================================
   AUTH CHECK
================================ */
if (window.location.pathname.includes("dashboard.html")) {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "index.html";
    }
}

/* ================================
   LOGOUT
================================ */
function logout() {
    localStorage.removeItem("loggedInUser");
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
        let user = JSON.parse(localStorage.getItem("loggedInUser")) || { email: 'Guest' };
        userEl.innerText = "Welcome " + user.email;
    }

    // initialize patients table and doctors list if present
    if (document.getElementById("patientTable")) {
        showSection('patients');
        loadPatients();
    }

    if (document.getElementById('doctorsList')) {
        loadDoctors();
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
    const sections = ['patients','doctors','records'];
    sections.forEach(s=>{
        const el = document.getElementById(s + 'Section');
        if(el) el.style.display = (s===name) ? '' : 'none';
    });

    // load data for the shown section
    if(name === 'patients') loadPatients();
    if(name === 'doctors') loadDoctors();
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
