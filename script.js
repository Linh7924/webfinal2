// Xử lý chuyển đổi giữa các bài tập
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const exercises = document.querySelectorAll('.exercise');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Xóa lớp active từ tất cả các liên kết và bài tập
            navLinks.forEach(item => item.classList.remove('active'));
            exercises.forEach(item => item.classList.remove('active'));
            
            // Thêm lớp active vào liên kết được nhấp
            this.classList.add('active');
            
            // Hiển thị bài tập tương ứng
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Cuộn đến bài tập
            document.getElementById(targetId).scrollIntoView({behavior: 'smooth'});
        });
    });
    
    // Tính toán kết quả bài 1
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    document.getElementById('result1').textContent = `Tổng các số nguyên tố từ 1 đến 100 là: ${sum}`;
    
    // Tính toán kết quả bài 2
    function calculateSeriesA(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i / (i + 1);
        }
        return sum;
    }
    
    function calculateSeriesB() {
        let sum = 0;
        let n = 2;
        let term = 1 / n;
        let termsCount = 0;
        
        while (term > 0.0001) {
            sum += term;
            n += 2;
            term = 1 / n;
            termsCount++;
        }
        
        return { sum: sum, terms: termsCount };
    }
    
    const resultA = calculateSeriesA(10);
    const resultB = calculateSeriesB();
    document.getElementById('result2').innerHTML = `Tổng chuỗi a với n = 10 là: ${resultA.toFixed(4)}<br>Tổng chuỗi b là: ${resultB.sum.toFixed(4)}<br>Số phần tử: ${resultB.terms}`;
});

// Xử lý tìm kiếm
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        alert(`Đang tìm kiếm: "${searchTerm}"\nChức năng tìm kiếm sẽ được triển khai đầy đủ sau.`);
        // Trong thực tế, bạn có thể triển khai tìm kiếm thực sự ở đây
    } else {
        alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
}

// Xử lý sự kiện nhấn Enter trong ô tìm kiếm
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});
