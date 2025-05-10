const API_BASE_URL = "http://172.20.10.7:8080/api";

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}
// ดึงข้อมูล jobs จาก API และแสดงใน jobsSection
function fetchJobs() {
    fetch(`${API_BASE_URL}/jobs`)
        .then(response => response.json())
        .then(data => {
            const jobsTable = document.getElementById("jobsTable");
            jobsTable.innerHTML = "";
            data.forEach(job => {
                const request = job.request || {}; // ตรวจสอบว่ามี request หรือไม่
                const technician = job.technician || {}; // ตรวจสอบว่ามี technician หรือไม่
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${job.id || "N/A"}</td>
                    <td>${request.requestedBy || "N/A"}</td>
                    <td>${request.location || "N/A"}</td>
                    <td>${request.symptom || "N/A"}</td>
                    <td>${request.preferredDateTime ? new Date(request.preferredDateTime).toLocaleString() : "N/A"}</td>
                    <td>${technician.name || "N/A"}</td>
                    <td>
                        <select class="styled-select"onchange="updateJobStatus('${job.id}', this.value)">
                            <option value="กำลังดำเนินการ" ${job.status === "กำลังดำเนินการ" ? "selected" : ""}>กำลังดำเนินการ</option>
                            <option value="เสร็จสิ้น" ${job.status === "เสร็จสิ้น" ? "selected" : ""}>เสร็จสิ้น</option>
                        </select>
                    </td>
                    <td>
                        <button onclick="deleteJob('${job.id}')">Delete</button>
                    </td>
                `;
                jobsTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching jobs:", error));
}

// อัปเดตสถานะของ job
function updateJobStatus(jobId, status) {
    fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update job status");
            }
            return response.json();
        })
        .then(() => {
            alert("Job status updated successfully!");
            fetchJobs();
        })
        .catch(error => console.error("Error updating job status:", error));
}

// ลบ job
function deleteJob(jobId) {
    fetch(`${API_BASE_URL}/jobs/${jobId}`, { method: "DELETE" })
        .then(() => {
            alert("Job deleted successfully!");
            fetchJobs(); // โหลดข้อมูล jobs ใหม่
        })
        .catch(error => console.error("Error deleting job:", error));
}

// เรียก fetchJobs เมื่อโหลดหน้าเว็บ
fetchJobs();

function fetchTechnicians() {
    fetch(`${API_BASE_URL}/technicians`)
        .then(response => response.json())
        .then(data => {
            const techniciansTable = document.getElementById("techniciansTable");
            techniciansTable.innerHTML = ""; // ล้างข้อมูลในตารางก่อน
            data.forEach(technician => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${technician.id || "N/A"}</td>
                    <td>${technician.name || "N/A"}</td>
                    <td>${technician.skills ? technician.skills.join(", ") : "N/A"}</td>
                    <td>${technician.phone || "N/A"}</td>
                `;
                techniciansTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching technicians:", error));
}

function deleteJob(jobId) {
    fetch(`${API_BASE_URL}/jobs/${jobId}`, { method: "DELETE" })
        .then(() => fetchJobs())
        .catch(error => console.error("Error deleting job:", error));
}

function deleteTechnician(technicianId) {
    fetch(`${API_BASE_URL}/technicians/${technicianId}`, { method: "DELETE" })
        .then(() => fetchTechnicians())
        .catch(error => console.error("Error deleting technician:", error));
}

// Function to show the selected section
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}


// Handle Feedback Request
function requestFeedback() {
    fetch(`${API_BASE_URL}/feedback-request`, {
        method: "POST"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to request feedback");
            }
            alert("Feedback form requested successfully!");
        })
        .catch(error => console.error("Error requesting feedback:", error));
}

// ดึงข้อมูล Requests และแสดงในตารางพร้อมฟอร์ม Assign Job
function fetchRequests() {
    fetch(`${API_BASE_URL}/requests`)
        .then(response => response.json())
        .then(data => {
            const requestsTable = document.getElementById("requestsTable");
            requestsTable.innerHTML = ""; // ล้างข้อมูลในตารางก่อน
            data.forEach(request => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${request.id || "N/A"}</td>
                    <td>${request.requestedBy || "N/A"}</td>
                    <td>${request.symptom || "N/A"}</td>
                    <td>${request.location || "N/A"}</td>
                    <td>${request.preferredDateTime ? new Date(request.preferredDateTime).toLocaleString() : "N/A"}</td>
                    
                    <td>
                        <select class="styled-select" id="jobTechnician-${request.id}">
                            <option value="">Select Technician</option>
                        </select>
                    </td>
                    <td>
                        <button onclick="assignJob('${request.id}')">Assign Job</button>
                    </td>
                `;
                requestsTable.appendChild(row);

                // ดึงรายชื่อช่างจาก API และเพิ่มใน dropdown
                fetch(`${API_BASE_URL}/technicians`)
                    .then(response => response.json())
                    .then(technicians => {
                        const technicianSelect = document.getElementById(`jobTechnician-${request.id}`);
                        technicians.forEach(technician => {
                            const option = document.createElement("option");
                            option.value = technician.id;
                            option.textContent = technician.name;
                            technicianSelect.appendChild(option);
                        });
                    })
                    .catch(error => console.error("Error fetching technicians:", error));
            });
        })
        .catch(error => console.error("Error fetching requests:", error));
}

// ฟังก์ชัน Assign Job
function assignJob(requestId) {
    const technicianId = document.getElementById(`jobTechnician-${requestId}`).value;

    Promise.all([
        fetch(`${API_BASE_URL}/requests/${requestId}`).then(response => response.json()),
        fetch(`${API_BASE_URL}/technicians/${technicianId}`).then(response => response.json())
    ])
        .then(([request, technician]) => {
            const jobData = {
                description: request.symptom,
                request: {
                    requestedBy: request.requestedBy,
                    symptom: request.symptom,
                    preferredDateTime: request.preferredDateTime,
                    location: request.location
                },
                technician: {
                    id: technician.id,
                    name: technician.name,
                    skills: technician.skills,
                    phone: technician.phone
                },
                status: "pending"
            };

            return fetch(`${API_BASE_URL}/jobs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to assign job");
            }
            return fetch(`${API_BASE_URL}/requests/${requestId}`, { method: "DELETE" });
        })
        .then(() => {
            alert("Job assigned successfully!");
            fetchRequests();
            fetchJobs();
        })
        .catch(error => console.error("Error assigning job:", error));
}

document.getElementById("requestAccessForm").addEventListener("submit", event => {
    event.preventDefault();

    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const technicianName = document.getElementById("technicianName").value;

    const requestData = {
        vehicleNumber: vehicleNumber,
        technicianName: technicianName
    };

    fetch("http://172.20.10.2:8080/api/permissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to submit access request");
            }
            return response.json();
        })
            .then(data => {
                alert("Access request submitted successfully!");
                console.log("Response from API:", data);
                document.getElementById("requestAccessForm").reset();
                showSection('accessRequestsSection'); // สลับไปยัง Section ที่แสดงตาราง
            })
        })


        function fetchAccessRequests() {
            fetch(`http://172.20.10.2:8080/api/permissions/approved`) // แทนที่ <API_BASE_URL> ด้วย URL ของ API เพื่อน
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch access requests");
                    }
                    return response.json();
                })
                .then(data => {
                    const cardsContainer = document.getElementById("accessRequestsCards");
                    cardsContainer.innerHTML = ""; // ล้างข้อมูลการ์ดก่อน
        
                    if (data.length === 0) {
                        // หากไม่มีข้อมูล ให้แสดงการ์ด "รอ Approved"
                        const noDataCard = document.createElement("div");
                        noDataCard.classList.add("card");
                        noDataCard.innerHTML = `
                            <h3>No Approved Requests</h3>
                            <p>Waiting for approval...</p>
                        `;
                        cardsContainer.appendChild(noDataCard);
                    } else {
                        // แสดงข้อมูลที่ได้รับจาก API
                        data.forEach(request => {
                            const card = document.createElement("div");
                            card.classList.add("card");
                            card.innerHTML = `
                                <h3>Vehicle Number: ${request.vehicleNumber || "N/A"}</h3>
                                <p><strong>Technician Name:</strong> ${request.technicianName || "N/A"}</p>
                                <p><strong>Approval Status:</strong> ${request.approvalStatus || "N/A"}</p>
                                <p><strong>Approval ID:</strong> ${request.approvedId || "N/A"}</p>
                            `;
                            cardsContainer.appendChild(card);
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching access requests:", error);
        
                    // แสดงการ์ด "รอ Approved" เมื่อเกิดข้อผิดพลาด
                    const cardsContainer = document.getElementById("accessRequestsCards");
                    cardsContainer.innerHTML = ""; // ล้างข้อมูลการ์ดก่อน
                    const errorCard = document.createElement("div");
                    errorCard.classList.add("card");
                    errorCard.innerHTML = `
                        <h3>No Approved Requests</h3>
                        <p> Waiting for approval...</p>
                    `;
                    cardsContainer.appendChild(errorCard);
                });
        }

        function toggleAccessRequestsCards() {
            const cardsContainer = document.getElementById("accessRequestsCards");
        
            if (cardsContainer.classList.contains("hidden")) {
                cardsContainer.classList.remove("hidden");
                fetchAccessRequests(); // ดึงข้อมูล Access Requests
            } else {
                cardsContainer.classList.add("hidden");
            }
        }

        function requestFeedback() {
            fetch(`http://172.20.10.2:8080/api/evaluations`)
                .then(response => response.json())
                .then(data => {
                    const feedbackContainer = document.getElementById("feedbackContainer");
                    feedbackContainer.innerHTML = "";
                    feedbackContainer.classList.remove("hidden");
        
                    data.forEach(feedback => {
                        const feedbackCard = document.createElement("div");
                        feedbackCard.classList.add("feedback-card");
                        feedbackCard.innerHTML = `
                            <h3>Feedback To: ${feedback.ename || "N/A"}</h3>
                            <p><strong>satisfaction :</strong> ${feedback.satisfaction || "N/A"}</p>
                            <p><strong>cleanliness :</strong> ${feedback.cleanliness || "N/A"}</p>
                            <p><strong>attention :</strong> ${feedback.attention || "N/A"}</p>
                        `;
                        feedbackContainer.appendChild(feedbackCard);
                    });
                })
                .catch(error => console.error("Error fetching feedbacks:", error));
        }
// เรียกใช้งานฟังก์ชันเมื่อโหลดหน้าเว็บ
fetchJobs();
fetchTechnicians();
fetchRequests();
showSection('jobsSection');