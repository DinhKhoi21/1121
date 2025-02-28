document.addEventListener('DOMContentLoaded', function() {
    const wrongAnswer = document.querySelector('.wrong-answer');
    const correctAnswer = document.querySelector('.correct-answer');
    const btn1 = document.querySelector('.btn1');
    const input2 = document.querySelector('.btn2');
    
    // Xử lý khi click nút sai
    btn1.addEventListener('click', function() {
        showWrongAnswer();
    });

    // Xử lý khi nhấn Enter trong input
    input2.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const answer = input2.value.trim().toLowerCase();
            if (answer === '8/3' || answer === '8-3' || answer === '8 3' || 
                answer === 'ngày 8/3' || answer === 'ngày 8-3' || answer === 'ngày 8 3' ||
                answer === 'ngay 8/3' || answer === 'ngay 8-3' || answer === 'ngay 8 3'
                || answer === 'ngày 8 tháng 3') {
                showCorrectAnswer();
            } else {
                showWrongAnswer();
            }
        }
    });

    function showWrongAnswer() {
        // Hiển thị overlay và chạy animation
        wrongAnswer.style.display = 'flex';
        wrongAnswer.classList.add('animate');
        
        // Phát âm thanh sai
        const wrongSound = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA');
        wrongSound.play();

        // Xóa animation sau khi nó kết thúc
        setTimeout(() => {
            wrongAnswer.style.display = 'none';
            wrongAnswer.classList.remove('animate');
        }, 1000);
    }

    function showCorrectAnswer() {
        // Hiển thị overlay và chạy animation
        correctAnswer.style.display = 'flex';
        correctAnswer.classList.add('animate');
        
        // Đợi animation kết thúc rồi mới chuyển trang
        setTimeout(() => {
            window.location.href = 'end.html';
        }, 1500); // Đợi 1.5 giây để animation hoàn thành
    }
});
