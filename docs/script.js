document.addEventListener('DOMContentLoaded', () => {
    // 1. 導覽列滾動變色 (Navbar scroll effect)
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. 頁面滾動動畫 (Scroll Reveal with Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 元素出現 15% 時觸發
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 觸發後取消監聽，以維持動畫停留狀態
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 選取所有需要動畫的元素
    const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .slide-in-left, .slide-in-right'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // 3. 平滑滾動 (Smooth Scrolling for Navigation Links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 扣除 fixed navbar 的高度
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // 行動版點擊後收合選單
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    isMenuOpen = false;
                }
            }
        });
    });

    // 4. 手機版選單切換 (Mobile Menu Toggle)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // 動態加上基礎的手機版選單樣式
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
            navLinks.style.padding = '2rem 5%';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // 當視窗放大時，重置 nav-links 樣式以避免手機版樣式殘留
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
            isMenuOpen = false;
        } else if (!isMenuOpen) {
            navLinks.style.display = 'none';
        }
    });
});
