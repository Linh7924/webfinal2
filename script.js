// Xử lý chuyển đổi giữa các bài tập + tìm kiếm + định tuyến theo hash
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const exercises = document.querySelectorAll('.exercise');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function activateSectionById(id) {
        // Xóa active
        navLinks.forEach(item => item.classList.remove('active'));
        exercises.forEach(item => item.classList.remove('active'));
        // Kích hoạt
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('active');
            // đồng bộ sidebar
            const link = document.querySelector(`.nav-link[data-target="${id}"]`);
            if (link) link.classList.add('active');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Click sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            // Cập nhật hash để hỗ trợ reload/POST
            if (targetId) {
                window.location.hash = targetId;
                activateSectionById(targetId);
            }
        });
    });

    // Kích hoạt theo hash khi load trang
    if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        activateSectionById(hashId);
    }

    // Theo dõi khi hash thay đổi (back/forward)
    window.addEventListener('hashchange', () => {
        const hashId = window.location.hash.replace('#', '');
        if (hashId) activateSectionById(hashId);
    });

    // ----- Search: click & Enter -----
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Đang tìm kiếm: "${searchTerm}"\nChức năng tìm kiếm sẽ được triển khai đầy đủ sau.`);
        } else {
            alert('Vui lòng nhập từ khóa tìm kiếm!');
        }
    }
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // tránh submit form ngầm
                performSearch();
            }
        });
    }

    // ----- Tính toán kết quả bài 1 -----
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        if (isPrime(i)) sum += i;
    }
    const r1 = document.getElementById('result1');
    if (r1) r1.textContent = `Tổng các số nguyên tố từ 1 đến 100 là: ${sum}`;

    // ----- Tính toán kết quả bài 2 -----
    function calculateSeriesA(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i / (i + 1);
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
    const r2 = document.getElementById('result2');
    if (r2) r2.innerHTML = `Tổng chuỗi a với n = 10 là: ${resultA.toFixed(4)}<br>Tổng chuỗi b là: ${resultB.sum.toFixed(4)}<br>Số phần tử: ${resultB.terms}`;
});
