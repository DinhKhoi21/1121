// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQkuqhpQN_FUkJNK_PFTwxvlbBEGxGD_I",
    authDomain: "dinhkhoi121-3ec40.firebaseapp.com",
    databaseURL: "https://dinhkhoi121-3ec40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dinhkhoi121-3ec40",
    storageBucket: "dinhkhoi121-3ec40.appspot.com",
    messagingSenderId: "1098355216138",
    appId: "1:1098355216138:web:b2b1b3b3b3b3b3b3b3b3b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function submitAnswers() {
    const name = document.getElementById('name').value;
    const feeling = document.getElementById('feeling').value;
    const message = document.getElementById('message').value;

    if (!name || !feeling || !message) {
        alert('Vui lòng điền đầy đủ thông tin! 😊');
        return;
    }

    try {
        // Create a new response entry in Firebase
        const responsesRef = ref(db, 'responses');
        const newResponseRef = push(responsesRef);
        
        await set(newResponseRef, {
            name: name,
            feeling: feeling,
            message: message,
            timestamp: new Date().toISOString()
        });

        // Ẩn phần câu hỏi
        document.getElementById('question-container').style.display = 'none';
        
        // Hiển thị phần kết quả
        const result = document.getElementById('result');
        result.style.display = 'block';
        
        // Tạo tin nhắn phản hồi tùy theo cảm xúc
        let responseMessage = `Cảm ơn ${name} đã chia sẻ! `;
        switch(feeling) {
            case 'happy':
                responseMessage += 'Thật vui khi biết bạn đang vui vẻ! 😊';
                break;
            case 'love':
                responseMessage += 'Cảm ơn tình cảm của bạn! ❤️';
                break;
            case 'excited':
                responseMessage += 'Thật tuyệt vời khi thấy bạn đang phấn khích! 🎉';
                break;
            case 'grateful':
                responseMessage += 'Cảm ơn bạn rất nhiều! 🙏';
                break;
            case 'blessed':
                responseMessage += 'Chúc bạn luôn hạnh phúc và may mắn! ✨';
                break;
        }

        document.getElementById('response-message').textContent = responseMessage;
        
        // Tạo hiệu ứng trái tim
        createHearts();
    } catch (error) {
        console.error('Error saving response:', error);
        alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!');
    }
}

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const numberOfHearts = 15;
    
    for (let i = 0; i < numberOfHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 150);
    }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', submitAnswers);
    }
});
