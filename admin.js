import { getDatabase, ref, get, child, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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
const db = getDatabase(app);

// Admin credentials (in a real app, this should be stored securely)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'love2024'; 

// Login function
export function login(event) {
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
            document.getElementById('responseContainer').innerHTML = '<p class="text-center">Chưa có phản hồi nào.</p>';
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
        response.timestamp && response.timestamp.startsWith(today)
    ).length;
    document.getElementById('todayResponses').textContent = todayResponses;
}

// Display responses in the container
function displayResponses(responses) {
    const container = document.getElementById('responseContainer');
    container.innerHTML = '';
    
    Object.entries(responses).reverse().forEach(([key, response]) => {
        const card = document.createElement('div');
        card.className = 'card response-card';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${escapeHtml(response.name)} ${getFeelingEmoji(response.feeling)}</h5>
                <p class="card-text">${escapeHtml(response.message)}</p>
                <p class="timestamp">${new Date(response.timestamp).toLocaleString('vi-VN')}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function getFeelingEmoji(feeling) {
    const emojis = {
        'happy': '😊',
        'love': '❤️',
        'excited': '🥳',
        'grateful': '🙏',
        'blessed': '✨'
    };
    return emojis[feeling] || '';
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
