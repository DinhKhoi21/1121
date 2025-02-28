<?php
header('Content-Type: application/json');

// Database configuration
$db_host = 'sqlXXX.epizy.com';  // InfinityFree MySQL server
$db_user = 'if0_38414599';      // InfinityFree MySQL username
$db_pass = 'your_database_password';  // Your InfinityFree MySQL password
$db_name = 'if0_38414599_love_responses';

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'error' => 'Connection failed: ' . $conn->connect_error
    ]));
}

// Set character set
$conn->set_charset("utf8mb4");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all responses
    $sql = "SELECT * FROM responses ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $responses = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $responses[] = $row;
        }
    }
    
    echo json_encode($responses);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['feeling'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    // Prepare and execute INSERT statement
    $stmt = $conn->prepare("INSERT INTO responses (name, feeling, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['name'], $data['feeling'], $data['message']);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save response']);
    }
    
    $stmt->close();
}

$conn->close();
?>
