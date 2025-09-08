<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $exercise = $_POST['exercise'] ?? '';
    
    switch ($exercise) {
        case '3':
            // Bài 3: Tính giá trị biểu thức S = 1 + 1/2 + 1/3 + ... + 1/n
            if (isset($_POST['n']) && is_numeric($_POST['n'])) {
                $n = intval($_POST['n']);
                if ($n > 0) {
                    $sum = 0;
                    for ($i = 1; $i <= $n; $i++) {
                        $sum += 1 / $i;
                    }
                    echo "Tổng S với n = $n là: " . round($sum, 4);
                } else {
                    echo "Vui lòng nhập số nguyên dương lớn hơn 0";
                }
            }
            break;
            
        case '4':
            // Bài 4: Nhập số cho đến khi nhập số 0 thì dừng
            session_start();
            if (!isset($_SESSION['numbers'])) {
                $_SESSION['numbers'] = [];
            }
            
            if (isset($_POST['number']) && is_numeric($_POST['number'])) {
                $number = floatval($_POST['number']);
                
                if ($number != 0) {
                    $_SESSION['numbers'][] = $number;
                    echo "Đã thêm số: $number. Danh sách số: " . implode(', ', $_SESSION['numbers']);
                } else {
                    $total = count($_SESSION['numbers']);
                    $sum = array_sum($_SESSION['numbers']);
                    echo "Kết thúc. Tổng số đã nhập: $total. Tổng giá trị: $sum";
                    $_SESSION['numbers'] = [];
                }
            }
            break;
            
        case '5':
            // Bài 5: Kiểm tra số hoàn hảo
            if (isset($_POST['number']) && is_numeric($_POST['number'])) {
                $num = intval($_POST['number']);
                if ($num > 0) {
                    $sum = 0;
                    for ($i = 1; $i <= $num / 2; $i++) {
                        if ($num % $i == 0) {
                            $sum += $i;
                        }
                    }
                    
                    if ($sum == $num) {
                        echo "$num là số hoàn hảo";
                    } else {
                        echo "$num không phải là số hoàn hảo";
                    }
                } else {
                    echo "Vui lòng nhập số nguyên dương";
                }
            }
            break;
            
        case '6':
            // Bài 6: Tính giai thừa
            if (isset($_POST['number']) && is_numeric($_POST['number'])) {
                $n = intval($_POST['number']);
                if ($n >= 0) {
                    $factorial = 1;
                    for ($i = 1; $i <= $n; $i++) {
                        $factorial *= $i;
                    }
                    echo "$n! = $factorial";
                } else {
                    echo "Vui lòng nhập số không âm";
                }
            }
            break;
            
        case '7':
            // Bài 7: Liệt kê ước số
            if (isset($_POST['number']) && is_numeric($_POST['number'])) {
                $n = intval($_POST['number']);
                if ($n > 0) {
                    $divisors = [];
                    for ($i = 1; $i <= $n; $i++) {
                        if ($n % $i == 0) {
                            $divisors[] = $i;
                        }
                    }
                    echo "Ước số của $n là: " . implode(', ', $divisors);
                } else {
                    echo "Vui lòng nhập số nguyên dương";
                }
            }
            break;
            
        case '8':
            // Bài 8: Mảng số nguyên
            if (isset($_POST['array'])) {
                $array = explode(',', $_POST['array']);
                $numbers = array_map('intval', $array);
                
                $positive = [];
                $negative = [];
                
                foreach ($numbers as $num) {
                    if ($num > 0) {
                        $positive[] = $num;
                    } elseif ($num < 0) {
                        $negative[] = $num;
                    }
                }
                
                echo "Số dương: " . implode(', ', $positive) . " (" . count($positive) . " số)<br>";
                echo "Số âm: " . implode(', ', $negative) . " (" . count($negative) . " số)";
            }
            break;
            
        case '9':
            // Bài 9: Chuyển đổi thời gian
            if (isset($_POST['seconds']) && is_numeric($_POST['seconds'])) {
                $seconds = intval($_POST['seconds']);
                if ($seconds >= 0) {
                    $hours = floor($seconds / 3600);
                    $minutes = floor(($seconds % 3600) / 60);
                    $secs = $seconds % 60;
                    
                    // Định dạng thành 2 chữ số
                    $hours = str_pad($hours, 2, '0', STR_PAD_LEFT);
                    $minutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
                    $secs = str_pad($secs, 2, '0', STR_PAD_LEFT);
                    
                    echo "$seconds giây = $hours:$minutes:$secs";
                } else {
                    echo "Vui lòng nhập số giây không âm";
                }
            }
            break;
            
        case '10':
            // Bài 10: Class Person và SinhVien
            if (isset($_POST['name']) && isset($_POST['birthday']) && isset($_POST['hometown']) && isset($_POST['class'])) {
                $name = htmlspecialchars($_POST['name']);
                $birthday = htmlspecialchars($_POST['birthday']);
                $hometown = htmlspecialchars($_POST['hometown']);
                $class = htmlspecialchars($_POST['class']);
                
                echo "<strong>Thông tin sinh viên:</strong><br>";
                echo "Họ tên: $name<br>";
                echo "Ngày sinh: $birthday<br>";
                echo "Quê quán: $hometown<br>";
                echo "Lớp: $class";
            }
            break;
            
        case '11_login':
            // Bài 11: Form đăng nhập
            if (isset($_POST['username']) && isset($_POST['password'])) {
                $username = htmlspecialchars($_POST['username']);
                $password = htmlspecial
