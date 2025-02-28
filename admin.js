// Hardcoded credentials (in production, this should be handled securely on the server)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'love2024';

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        loadResponses();
    } else {
        alert('Sai thông tin đăng nhập!');
    }
}

function loadResponses() {
    // In a real application, this would fetch from your backend API
    fetch('api/responses.php')
        .then(response => response.json())
        .then(data => {
            updateDashboardStats(data);
            displayResponses(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        });
}

function updateDashboardStats(data) {
    document.getElementById('totalResponses').textContent = data.length;
    
    const today = new Date().toISOString().split('T')[0];
    const todayResponses = data.filter(response => 
        response.created_at.startsWith(today)
    ).length;
    
    document.getElementById('todayResponses').textContent = todayResponses;
}

function displayResponses(responses) {
    const container = document.getElementById('responsesContainer');
    container.innerHTML = '';

    responses.forEach(response => {
        const card = document.createElement('div');
        card.className = 'card response-card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">👤 ${escapeHtml(response.name)}</h5>
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

// Auto-refresh responses every minute
setInterval(loadResponses, 60000);
