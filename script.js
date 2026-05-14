// --- Tema oscuro/claro ---
const body    = document.body;
const toggle  = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark');

toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Burger menu ---
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('.navbar__link').forEach(l =>
    l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// --- Reveal on scroll (IntersectionObserver) ---
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// --- Skill bars animation ---
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-card__bar');
        if (bar) {
        const w = parseFloat(bar.dataset.width);
        bar.style.width = (w * 100) + '%';
        setTimeout(() => bar.classList.add('animated'), 100);
        }
        barObserver.unobserve(entry.target);
    }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

// Inicializa anchos de las barras
document.querySelectorAll('.skill-card__bar').forEach(bar => {
    bar.style.width = (parseFloat(bar.dataset.width) * 100) + '%';
});

// --- Cursor personalizado (solo desktop) ---
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
    cursor.style.left     = e.clientX - 5 + 'px';
    cursor.style.top      = e.clientY - 5 + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform     = 'scale(2)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
        cursorRing.style.borderColor = 'var(--color-wine)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform     = 'scale(1)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.borderColor = 'var(--accent)';
    });
    });
} else {
    cursor.style.display     = 'none';
    cursorRing.style.display = 'none';
}

// --- Contadores animados en stats ---
const statNumbers = document.querySelectorAll('.stat__number');
const counterObs  = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const el      = entry.target;
        const target  = parseInt(el.textContent);
        const suffix  = el.textContent.replace(/[0-9]/g, '');
        let current   = 0;
        const step    = Math.ceil(target / 40);
        const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(interval);
        }, 35);
        counterObs.unobserve(el);
    }
    });
}, { threshold: 0.5 });
statNumbers.forEach(el => counterObs.observe(el));

// --- Submit form ---
function handleSubmit(btn) {
    const nombre  = document.getElementById('nombre').value.trim();
    const email   = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
    btn.textContent = '¡Completa todos los campos!';
    btn.style.background = 'var(--color-blush)';
    setTimeout(() => {
        btn.textContent = 'Enviar mensaje →';
        btn.style.background = '';
    }, 2000);
    return;
    }

    btn.textContent = '✓ ¡Mensaje enviado!';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    setTimeout(() => {
    btn.textContent = 'Enviar mensaje →';
    btn.disabled = false;
    btn.style.opacity = '';
    document.getElementById('nombre').value  = '';
    document.getElementById('email').value   = '';
    document.getElementById('asunto').value  = '';
    document.getElementById('mensaje').value = '';
    }, 3000);
}

// --- Smooth active link en navbar ---
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.navbar__link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--accent)';
    }
    });
});