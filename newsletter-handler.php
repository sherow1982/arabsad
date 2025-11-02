<?php
// Newsletter Subscription Handler - ArabSad.com
// Simple and reliable newsletter subscription system

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://arabsad.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Validate and sanitize input
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false, 
        'message' => 'يرجى إدخال بريد إلكتروني صحيح'
    ]);
    exit;
}

// Simple bot protection
if (isset($_POST['honeypot']) && !empty($_POST['honeypot'])) {
    echo json_encode(['success' => false, 'message' => 'Bot detected']);
    exit;
}

// Rate limiting - simple file-based approach
$ip = $_SERVER['REMOTE_ADDR'];
$rate_limit_file = 'rate_limit_' . md5($ip) . '.txt';

if (file_exists($rate_limit_file)) {
    $last_submission = (int)file_get_contents($rate_limit_file);
    if (time() - $last_submission < 60) { // 1 minute cooldown
        echo json_encode([
            'success' => false,
            'message' => 'يرجى الانتظار دقيقة قبل المحاولة مرة أخرى'
        ]);
        exit;
    }
}

// Save subscription to CSV file
$csv_file = 'newsletter_subscriptions.csv';
$timestamp = date('Y-m-d H:i:s');
$ip_address = $_SERVER['REMOTE_ADDR'];
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

// Create CSV header if file doesn't exist
if (!file_exists($csv_file)) {
    $header = "timestamp,email,ip_address,user_agent,status\n";
    file_put_contents($csv_file, $header, LOCK_EX);
}

// Check if email already exists
if (file_exists($csv_file)) {
    $existing_emails = file_get_contents($csv_file);
    if (strpos($existing_emails, $email) !== false) {
        echo json_encode([
            'success' => true,
            'message' => 'هذا البريد مسجل مسبقاً، شكراً لك!'
        ]);
        exit;
    }
}

// Add new subscription
$data = sprintf(
    "%s,\"%s\",\"%s\",\"%s\",active\n",
    $timestamp,
    $email,
    $ip_address,
    addslashes($user_agent)
);

if (file_put_contents($csv_file, $data, FILE_APPEND | LOCK_EX) !== false) {
    // Update rate limiting
    file_put_contents($rate_limit_file, time(), LOCK_EX);
    
    // Send notification email (optional)
    $to = 'sherow1982@gmail.com';
    $subject = 'اشتراك جديد في نشرة إعلانات العرب';
    $message = "اشتراك جديد:\n\nالبريد: $email\nالتوقيت: $timestamp\nIP: $ip_address";
    $headers = 'From: noreply@arabsad.com' . "\r\n" .
               'Content-Type: text/plain; charset=UTF-8' . "\r\n";
    
    @mail($to, $subject, $message, $headers);
    
    echo json_encode([
        'success' => true,
        'message' => 'تم الاشتراك بنجاح! ستصلك أحدث النصائح والعروض قريباً'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'حدث خطأ، يرجى المحاولة لاحقاً'
    ]);
}

// Clean up old rate limit files (cleanup)
if (rand(1, 100) <= 5) { // 5% chance to cleanup
    $files = glob('rate_limit_*.txt');
    foreach ($files as $file) {
        if (file_exists($file) && (time() - filemtime($file)) > 3600) { // 1 hour old
            unlink($file);
        }
    }
}
?>