
const GOOGLE_FORM_URL = "PASTE_GOOGLE_FORM_LINK_HERE";

document.addEventListener('DOMContentLoaded', async () => {
    // Canvas Background Animation
    initCanvas();

    // Theme Toggle
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    // Default to dark for premium feel
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }

    // Set initial custom property for theme
    // We already have [data-theme] in CSS, just need to toggle attribute
    const savedTheme = localStorage.getItem('theme');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Data Load
    try {
        const res = await fetch('profile.json');
        if (res.ok) {
            const data = await res.json();
            renderProfile(data);
        }
    } catch (e) {
        console.log("Using placeholder data due to fetch error");
    }

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-el');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.hidden-el').forEach(el => observer.observe(el));

    // Sticky Nav active link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

function renderProfile(data) {
    // Hero
    const name = data.name || "Creator";
    document.title = `${name} | Portfolio`;
    document.querySelector('.nav-logo').textContent = name;
    document.getElementById('display-name').textContent = name;

    // Typewriter effect for headline if desired, or simple text
    document.getElementById('display-headline').textContent = data.headline || "Building Digital Experiences";

    // About
    document.getElementById('display-about').textContent = data.about || "";

    // Skills
    const skillsContainer = document.getElementById('skills-list');
    if (data.skills) {
        skillsContainer.innerHTML = data.skills.map(s => `<div class="skill-pill hidden-el">${s}</div>`).join('');
    }

    // Experience
    const expContainer = document.getElementById('experience-list');
    let expData = (data.experience && data.experience.length) ? data.experience : data.education;

    if (expData) {
        expContainer.innerHTML = expData.map(item => `
            <div class="experience-card hidden-el">
                <div class="exp-header">
                    <div class="exp-role">${item.title || item.degree || 'Role'}</div>
                    <div class="exp-date">${item.dates || 'Present'}</div>
                </div>
                <div class="exp-company">${item.company || item.school || 'Company'}</div>
                <ul class="exp-bullets">
                    ${(item.bullets || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Projects
    const projContainer = document.getElementById('projects-list');
    if (data.projects) {
        projContainer.innerHTML = data.projects.map(p => `
            <div class="project-card hidden-el">
                <div class="project-img-placeholder">
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-content">
                    <div class="project-title">${p.name}</div>
                    <div class="project-tech">
                        ${(p.tech || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-desc">${p.description}</div>
                    ${p.link ? `<a href="${p.link}" target="_blank" class="project-link">View Project <i class="fas fa-arrow-right" style="font-size:0.8em"></i></a>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Socials
    const socialContainer = document.getElementById('social-links');
    const icons = {
        linkedin: 'fab fa-linkedin',
        github: 'fab fa-github',
        instagram: 'fab fa-instagram',
        topmate: 'fas fa-link'
    };

    if (data.links) {
        socialContainer.innerHTML = Object.entries(data.links)
            .filter(([_, url]) => url)
            .map(([key, url]) => `<a href="${url}" target="_blank" class="social-icon"><i class="${icons[key] || 'fas fa-link'}"></i></a>`)
            .join('');
    }
}

// Contact Button
document.getElementById('contact-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (GOOGLE_FORM_URL.includes('http')) {
        window.open(GOOGLE_FORM_URL, '_blank');

        if (GOOGLE_FORM_URL.includes('docs.google.com')) {
            const container = document.getElementById('form-embed');
            container.innerHTML = `<iframe src="${GOOGLE_FORM_URL}?embedded=true" width="100%" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>`;
            container.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        alert("Please configure the Google Form URL in script.js");
    }
});

/* Canvas Animation - Constellation Effect */
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles();
    }

    function createParticles() {
        particles = [];
        const count = Math.floor(width * height / 15000); // density
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-muted');
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--primary');

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connect
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.globalAlpha = 0.1 * (1 - dist / 100);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}
