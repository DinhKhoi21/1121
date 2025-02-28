function submitAnswers() {
    const name = document.getElementById('name').value;
    const feeling = document.getElementById('feeling').value;
    const message = document.getElementById('message').value;

    if (!name || !feeling || !message) {
        alert('Vui lòng điền đầy đủ thông tin! 😊');
        return;
    }

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
        case 'normal':
            responseMessage += 'Chúc bạn sẽ có một ngày tuyệt vời hơn! 🌟';
            break;
        case 'sad':
            responseMessage += 'Đừng buồn nhé, mọi chuyện rồi sẽ ổn thôi! 🤗';
            break;
        case 'excited':
            responseMessage += 'Thật tuyệt vời khi thấy bạn đang phấn khích! 🎉';
            break;
    }

    document.getElementById('response-message').textContent = responseMessage;
    
    // Tạo hiệu ứng trái tim
    createHearts();
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
            
            // Xóa trái tim sau khi animation kết thúc
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 150);
    }
}
