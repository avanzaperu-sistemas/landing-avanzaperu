const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const prevBtn = document.querySelector('.hero-nav.prev');
const nextBtn = document.querySelector('.hero-nav.next');

let currentSlide = 0;
let slideInterval;

if (slides.length > 0) {
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    showSlide(0);
    startAutoSlide();
}

function smoothScrollTo(targetId, offset = 80) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            smoothScrollTo(href);
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    }

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (menuIcon && closeIcon) {
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        }
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            if (menuIcon && closeIcon) {
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    });
}

const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
    });
}

function scrollToTop() {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    const duration = 1200;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalClose = document.querySelector('.modal-close');

if (modal) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay p').textContent;
            const category = this.querySelector('.gallery-overlay span').textContent;
            
            modalImg.src = img.src;
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}