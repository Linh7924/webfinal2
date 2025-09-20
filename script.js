// script.js - chay 100% tren GitHub Pages (khong can PHP)

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

    // =====================================================
    //  BAI 1: Nhan nut "Ket qua" moi tinh (JS client-side)
    // =====================================================
    function isPrime(num) {
        if (num < 2) return false;
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

    // =====================================================
    //  BAI 2: a) nhap n; b) nut rieng (JS client-side)
    // =====================================================
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
                if (r2.innerHTML && r2.innerHTML.trim() !== '') {
                    r2.innerHTML += '<br>' + line;
                } else {
                    r2.innerHTML = line;
                }
            }
        });
    }

    // =====================================================
    //  BAI 3 -> 11: viet lai bang JS (khong can PHP)
    //  Ta chan submit, tu xu ly va do ket qua vao hop ket qua tuong ung
    // =====================================================

    // B3: S = 1 + 1/2 + ... + 1/n
    (function() {
        const section = document.getElementById('exercise3');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result3');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const n = parseInt(section.querySelector('#n3').value, 10);
                if (!Number.isInteger(n) || n < 1) {
                    out.textContent = 'Vui long nhap so nguyen duong lon hon 0';
                    return;
                }
                let sum = 0;
                for (let i = 1; i <= n; i++) sum += 1 / i;
                out.textContent = 'Tong S voi n = ' + n + ' la: ' + sum.toFixed(4);
            });
        }
    })();

    // B4: Nhap so den 0 thi dung -> dung localStorage de thay session
    (function() {
        const section = document.getElementById('exercise4');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result4');
        const KEY = 'bai4_numbers';

        function getNumbers() {
            try {
                const raw = localStorage.getItem(KEY);
                return raw ? JSON.parse(raw) : [];
            } catch(_) { return []; }
        }
        function setNumbers(arr) {
            localStorage.setItem(KEY, JSON.stringify(arr));
        }

        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const val = parseFloat(section.querySelector('#number').value);
                if (isNaN(val)) {
                    out.textContent = 'Vui long nhap so hop le';
                    return;
                }
                let arr = getNumbers();
                if (val !== 0) {
                    arr.push(val);
                    setNumbers(arr);
                    out.textContent = 'Da them so: ' + val + '. Danh sach so: ' + arr.join(', ');
                } else {
                    const total = arr.length;
                    const sum = arr.reduce((a,b)=>a+b, 0);
                    out.textContent = 'Ket thuc. Tong so da nhap: ' + total + '. Tong gia tri: ' + sum;
                    setNumbers([]); // reset
                }
                form.reset();
                section.querySelector('#number').focus();
            });
        }
    })();

    // B5: Kiem tra so hoan hao
    (function() {
        const section = document.getElementById('exercise5');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result5');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const num = parseInt(section.querySelector('#num5').value, 10);
                if (!Number.isInteger(num) || num <= 0) {
                    out.textContent = 'Vui long nhap so nguyen duong';
                    return;
                }
                let sum = 0;
                for (let i = 1; i <= Math.floor(num/2); i++) {
                    if (num % i === 0) sum += i;
                }
                out.textContent = (sum === num) ? (num + ' la so hoan hao') : (num + ' khong phai la so hoan hao');
            });
        }
    })();

    // B6: Giai thua
    (function() {
        const section = document.getElementById('exercise6');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result6');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const n = parseInt(section.querySelector('#num6').value, 10);
                if (!Number.isInteger(n) || n < 0) {
                    out.textContent = 'Vui long nhap so khong am';
                    return;
                }
                if (n > 170) { // tranh Infinity voi Number JS
                    out.textContent = 'n qua lon de hien ket qua chinh xac (n <= 170)';
                    return;
                }
                let fact = 1;
                for (let i = 1; i <= n; i++) fact *= i;
                out.textContent = n + '! = ' + fact;
            });
        }
    })();

    // B7: Liet ke uoc so
    (function() {
        const section = document.getElementById('exercise7');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result7');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const n = parseInt(section.querySelector('#num7').value, 10);
                if (!Number.isInteger(n) || n <= 0) {
                    out.textContent = 'Vui long nhap so nguyen duong';
                    return;
                }
                const divisors = [];
                for (let i = 1; i <= n; i++) if (n % i === 0) divisors.push(i);
                out.textContent = 'Uoc so cua ' + n + ' la: ' + divisors.join(', ');
            });
        }
    })();

    // B8: Mang so nguyen (tach duong/am)
    (function() {
        const section = document.getElementById('exercise8');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result8');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const raw = section.querySelector('input[name="array"]').value || '';
                const parts = raw.split(',').map(s => s.trim());
                const numbers = parts.map(v => parseInt(v, 10)).filter(v => !isNaN(v));
                const positive = numbers.filter(v => v > 0);
                const negative = numbers.filter(v => v < 0);
                out.innerHTML =
                    'So duong: ' + (positive.join(', ') || '(khong co)') + ' (' + positive.length + ' so)<br>' +
                    'So am: ' + (negative.join(', ') || '(khong co)') + ' (' + negative.length + ' so)';
            });
        }
    })();

    // B9: Chuyen doi thoi gian giay -> HH:MM:SS
    (function() {
        const section = document.getElementById('exercise9');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result9');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const s = parseInt(section.querySelector('#seconds').value, 10);
                if (!Number.isInteger(s) || s < 0) {
                    out.textContent = 'Vui long nhap so giay khong am';
                    return;
                }
                const hours = String(Math.floor(s / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
                const secs = String(s % 60).padStart(2, '0');
                out.textContent = s + ' giay = ' + hours + ':' + minutes + ':' + secs;
            });
        }
    })();

    // B10: Hien thong tin sinh vien
    (function() {
        const section = document.getElementById('exercise10');
        if (!section) return;
        const form = section.querySelector('form');
        const out = document.getElementById('result10');
        if (form && out) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = section.querySelector('#name').value.trim();
                const birthday = section.querySelector('#birthday').value.trim();
                const hometown = section.querySelector('#hometown').value.trim();
                const cls = section.querySelector('#class').value.trim();
                out.innerHTML =
                    '<strong>Thong tin sinh vien:</strong><br>' +
                    'Ho ten: ' + escapeHtml(name) + '<br>' +
                    'Ngay sinh: ' + escapeHtml(birthday) + '<br>' +
                    'Que quan: ' + escapeHtml(hometown) + '<br>' +
                    'Lop: ' + escapeHtml(cls);
            });
        }
    })();

    // B11: Login / Register (hien lai du lieu)
    (function() {
        const section = document.getElementById('exercise11');
        if (!section) return;
        const loginForm = section.querySelector('form[action="#exercise11"] input[name="exercise"][value="11_login"]')
            ? section.querySelector('form[action="#exercise11"]') : null;
        const forms = section.querySelectorAll('form');
        const out = document.getElementById('result11');

        // Co 2 form: login va register. Bat ca 2.
        forms.forEach(form => {
            const exInput = form.querySelector('input[name="exercise"]');
            if (!exInput) return;
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const exVal = (exInput.value || '').toLowerCase();
                if (!out) return;

                if (exVal === '11_login') {
                    const username = (form.querySelector('#username')?.value || '').trim();
                    const remember = form.querySelector('input[name="remember"]')?.checked ? 'Co' : 'Khong';
                    out.innerHTML =
                        '<strong>Thong tin dang nhap:</strong><br>' +
                        'Username: ' + escapeHtml(username) + '<br>' +
                        'Password: ********<br>' +
                        'Remember Me: ' + remember;
                } else if (exVal === '11_register') {
                    const username = (form.querySelector('#new-username')?.value || '').trim();
                    const email = (form.querySelector('#email')?.value || '').trim();
                    const title = (form.querySelector('#title')?.value || '').trim();
                    const fullname = (form.querySelector('#fullname')?.value || '').trim();
                    const company = (form.querySelector('#company')?.value || '').trim();
                    const agree = form.querySelector('input[name="agree"]')?.checked ? 'Dong y' : 'Khong dong y';
                    out.innerHTML =
                        '<strong>Thong tin dang ky:</strong><br>' +
                        'Username: ' + escapeHtml(username) + '<br>' +
                        'Email: ' + escapeHtml(email) + '<br>' +
                        'Title: ' + escapeHtml(title) + '<br>' +
                        'Fullname: ' + escapeHtml(fullname) + '<br>' +
                        'Company: ' + escapeHtml(company) + '<br>' +
                        'Agree: ' + agree;
                }
            });
        });
    })();

    // Helper: escape HTML
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#039;');
    }
});
