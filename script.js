// --- 1. DATA ->
let books = [
    { id: 101, title: "HTML & CSS", author: "Jon Duckett", status: "Available", issuedTo: null },
    { id: 102, title: "JavaScript", author: "Mark Myers", status: "Available", issuedTo: null },
    { id: 103, title: "Python Crash Course", author: "Eric Matthes", status: "Available", issuedTo: null },
    { id: 104, title: "Clean Code", author: "Robert Martin", status: "Issued", issuedTo: "Bharat Kumar" }
];

let students = [
    { id: 1, name: "Bharat Kumar", course: "BCA" },
    { id: 2, name: "Ashu Singh", course: "BTech" },
    { id: 3, name: "Suraj Madheshiya", course: "MCA" },
    { id: 3, name: "Shivam Kumar Jha", course: "BBA" }
];

// --- 2. LOAD FUNCTIONS ->
function loadDashboard() {
    document.getElementById("total-books").innerText = books.length;
    document.getElementById("total-students").innerText = students.length;
    document.getElementById("books-issued").innerText = books.filter(b => b.status === "Issued").length;
}

function loadBooksTable() {
    let tableBody = document.getElementById("book-table-body");
    tableBody.innerHTML = "";
    books.forEach(book => {
        let color = book.status === "Issued" ? "text-danger" : "text-success";
        let issuedTo = book.issuedTo ? `<b>${book.issuedTo}</b>` : "-";
        
        // Note: onclick calls returnBook(), which must be in global scope
        let action = book.status === "Issued" 
            ? `<button class="btn btn-danger btn-return" onclick="returnBook(${book.id})">Return</button>` 
            : `<span class="text-secondary">--</span>`;

        tableBody.innerHTML += `<tr>
            <td>${book.id}</td><td>${book.title}</td><td>${book.author}</td>
            <td class="${color} fw-bold">${book.status}</td><td>${issuedTo}</td><td>${action}</td>
        </tr>`;
    });
}

function loadStudentsTable() {
    let tableBody = document.getElementById("student-table-body");
    tableBody.innerHTML = "";
    students.forEach(s => {
        tableBody.innerHTML += `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.course}</td></tr>`;
    });
}

function refreshUI() {
    loadDashboard();
    loadBooksTable();
    loadStudentsTable();
}

// --- 3. ADD NEW BOOK LOGIC ->
document.getElementById("add-book-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let title = document.getElementById("new-book-title").value.trim();
    let author = document.getElementById("new-book-author").value.trim();

    // Generate new ID (Last ID + 1)
    let newId = books.length > 0 ? books[books.length - 1].id + 1 : 101;

    books.push({ id: newId, title: title, author: author, status: "Available", issuedTo: null });
    
    alert("✅ Book Added Successfully!");
    document.getElementById("add-book-form").reset();
    refreshUI();
});

// --- 4. ADD NEW STUDENT LOGIC ->
document.getElementById("add-student-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("new-student-name").value.trim();
    let course = document.getElementById("new-student-course").value.trim();

    // Generate new ID (Last ID + 1)
    let newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;

    students.push({ id: newId, name: name, course: course });

    alert("✅ Student Added Successfully!");
    document.getElementById("add-student-form").reset();
    refreshUI();
});

// --- 5. ISSUE BOOK LOGIC ->
document.getElementById("issue-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let studentName = document.getElementById("issue-student").value.trim();
    let bookName = document.getElementById("issue-book").value.trim();

    let studentExists = students.some(s => s.name.toLowerCase() === studentName.toLowerCase());
    if (!studentExists) { alert("❌ Student not found!"); return; }

    let book = books.find(b => b.title.toLowerCase() === bookName.toLowerCase());
    if (!book) { alert("❌ Book not found!"); return; }
    if (book.status === "Issued") { alert(`⚠️ Already issued to ${book.issuedTo}`); return; }

    book.status = "Issued";
    book.issuedTo = studentName;
    alert(`✅ Issued to ${studentName}`);
    document.getElementById("issue-form").reset();
    refreshUI();
});

// --- 6. RETURN BOOK LOGIC ->
// This function needs to be accessible globally for the onclick attribute
window.returnBook = function(id) {
    let book = books.find(b => b.id === id);
    if (confirm(`Return "${book.title}"?`)) {
        book.status = "Available";
        book.issuedTo = null;
        refreshUI();
    }
};

// Initialize
refreshUI();