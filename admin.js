import { database, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5kMZ7rGQWgHKFj3Jq-YQ5y0K9T6Y1xmY",
  authDomain: "love-letter-2024.firebaseapp.com",
  databaseURL: "https://love-letter-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "love-letter-2024",
  storageBucket: "love-letter-2024.appspot.com",
  messagingSenderId: "485134113871",
  appId: "1:485134113871:web:9d4af3ea2f9a6fa595a8c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = database(app);

// Admin credentials (in a real app, this should be stored securely)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'love2024'; 

// Login function
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadResponses();
        localStorage.setItem('adminLoggedIn', 'true');
    } else {
        alert('Sai thông tin đăng nhập!');
    }
}

// Load responses from Firebase
async function loadResponses() {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'responses'));
        
        if (snapshot.exists()) {
            const responses = snapshot.val();
            updateDashboardStats(responses);
            displayResponses(responses);
        } else {
            console.log("No data available");
            document.getElementById('responsesContainer').innerHTML = '<p class="text-center">Chưa có phản hồi nào.</p>';
        }
    } catch (error) {
        console.error("Error loading responses:", error);
        alert('Có lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
    }
}

// Update dashboard statistics
function updateDashboardStats(responses) {
    const responsesArray = Object.values(responses);
    const today = new Date().toISOString().split('T')[0];
    
    document.getElementById('totalResponses').textContent = responsesArray.length;
    
    const todayResponses = responsesArray.filter(response => 
        response.created_at && response.created_at.startsWith(today)
    ).length;
    document.getElementById('todayResponses').textContent = todayResponses;
}

// Display responses in the container
function displayResponses(responses) {
    const container = document.getElementById('responsesContainer');
    container.innerHTML = '';
    
    Object.entries(responses)
        .sort((a, b) => new Date(b[1].created_at) - new Date(a[1].created_at))
        .forEach(([key, response]) => {
            const card = document.createElement('div');
            card.className = 'card response-card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title"> ${escapeHtml(response.name)}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        Cảm xúc: ${getFeelingEmoji(response.feeling)} ${escapeHtml(response.feeling)}
                    </h6>
                    <p class="card-text">${escapeHtml(response.message)}</p>
                    <div class="timestamp">
                        ${new Date(response.created_at).toLocaleString('vi-VN')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
}

function getFeelingEmoji(feeling) {
    const emojis = {
        'happy': '😊',
        'normal': '😐',
        'sad': '😢',
        'excited': '🤩'
    };
    return emojis[feeling] || '❓';
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Check if admin is already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadResponses();
    }
});

// Make login function globally available
window.login = login;

// Auto-refresh responses every minute
setInterval(loadResponses, 60000);
