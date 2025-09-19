// script.js

// Dieu huong giua cac bai + tim kiem + kich hoat section theo hash
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const exercises = document.querySelectorAll('.exercise');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // ----- Kich hoat section theo id
    function activateSectionById(id) {
        if (!id) return;
        navLinks.forEach(item => item.classList.remove('active'));
        exercises.forEach(item => item.classList.remove('active'));

        const section = document.getElementById(id);
        if (section) {
            section.classList.add('active');
            const link = document.querySelector('.nav-link[data-target="' + id + '"]');
            if (link) link.classList.add('active');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ----- Click vao sidebar item -> cap nhat hash
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                // Cap nhat hash de ho tro reload/POST tro ve dung section
                window.location.hash = targetId;
                activateSectionById(targetId);
            }
        });
    });

    // ----- Kich hoat section tu hash khi tai trang
    if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        activateSectionById(hashId);
    } else {
        // Neu khong co hash, dam bao bai 1 active (neu index dat mac dinh)
        const firstActive = document.querySelector('.exercise.active');
        if (!firstActive && exercises.length) {
            activateSectionById(exercises[0].id);
        }
    }

    // ----- Theo doi khi hash thay doi (back/forward)
    window.addEventListener('hashchange', function() {
        const hashId = window.location.hash.replace('#', '');
        if (hashId) activateSectionById(hashId);
    });

    // ===========================
    //  Search (nut + Enter)
    // ===========================
    function performSearch() {
        const term = (searchInput && searchInput.value) ? searchInput.value.trim() : '';
        if (term) {
            alert('Dang tim kiem: "' + term + '"\nChuc nang tim kiem se duoc trien khai sau.');
        } else {
            alert('Vui long nhap tu khoa tim kiem!');
        }
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
    }
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // tranh submit form ngam
                performSearch();
            }
        });
    }

    // ===========================
    //  Bai 1: Nut "Ket qua" moi tinh
    // ===========================
    function isPrime(num) {
        if (num < 2) return false;
        // chi kiem den sqrt(num)
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    const btnB1 = document.getElementById('btnB1');
    if (btnB1) {
        btnB1.addEventListener('click', function() {
            let sumPrimes = 0;
            for (let i = 1; i <= 100; i++) {
                if (isPrime(i)) sumPrimes += i;
            }
            const r1 = document.getElementById('result1');
            if (r1) r1.textContent = 'Tong cac so nguyen to tu 1 den 100 la: ' + sumPrimes;
        });
    }

    // ===========================
    //  Bai 2: a) nhap n; b) nut rieng
    // ===========================
    function calculateSeriesA(n) {
        let s = 0;
        for (let i = 1; i <= n; i++) {
            s += i / (i + 1);
        }
        return s;
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

    const form2a = document.getElementById('form2a');
    if (form2a) {
        form2a.addEventListener('submit', function(e) {
            e.preventDefault();
            const nInput = document.getElementById('n2');
            const r2 = document.getElementById('result2');
            const nVal = nInput ? parseInt(nInput.value, 10) : NaN;

            if (!Number.isInteger(nVal) || nVal < 1) {
                if (r2) r2.textContent = 'Vui long nhap n la so nguyen duong.';
                return;
            }

            const sA = calculateSeriesA(nVal);
            if (r2) r2.innerHTML = 'Chuoi a voi n = ' + nVal + ': ' + sA.toFixed(4);
        });
    }

    const btnB2b = document.getElementById('btnB2b');
    if (btnB2b) {
        btnB2b.addEventListener('click', function() {
            const r2 = document.getElementById('result2');
            const result = calculateSeriesB();
            const line = 'Chuoi b (dung khi hang tu <= 0.0001): ' + result.sum.toFixed(4) + '<br>So phan tu: ' + result.terms;
            if (r2) {
                // Neu truoc do da tinh a), thi noi them dong moi
                if (r2.innerHTML && r2.innerHTML.trim() !== '') {
                    r2.innerHTML += '<br>' + line;
                } else {
                    r2.innerHTML = line;
                }
            }
        });
    }

    // ===========================
    //  Luu y: Bai 3 -> 11 su dung PHP xu ly (calculate.php)
    //  Khong can them JS o day, chi giu hash/action de tro lai dung section.
    // ===========================
});
