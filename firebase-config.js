// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
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
const database = getDatabase(app);

// Check connection status
const connectedRef = ref(database, '.info/connected');
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    console.log('✅ Đã kết nối thành công với Firebase!');
  } else {
    console.log('❌ Mất kết nối với Firebase. Đang thử kết nối lại...');
  }
});

// Test write operation
async function testConnection() {
  try {
    const testRef = ref(database, 'test-connection');
    await set(testRef, {
      timestamp: new Date().toISOString(),
      status: 'connected'
    });
    console.log('✅ Kiểm tra ghi dữ liệu thành công!');
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra kết nối:', error);
  }
}

// Run test
testConnection();

export { database, ref, set, get, child };
