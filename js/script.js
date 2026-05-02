document.addEventListener('DOMContentLoaded', () => {

    // Set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // ─── NAVBAR SCROLL ───
    const navbar = document.getElementById('mainNav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // ─── SMOOTH SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const collapse = document.querySelector('.navbar-collapse');
                if (collapse && collapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── SCROLL PROGRESS BAR ───
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
        background: linear-gradient(90deg, #4F8CFF, #3b76e5);
        transition: width 0.1s linear; width: 0%;
    `;
    document.body.appendChild(progressBar);

    // ─── PARALLAX HERO ───
    const heroSection = document.querySelector('.hero-section');
    const heroVisual = document.querySelector('.hero-visual');
    const heroBg = heroSection;

    // ─── SCROLL-CONTROLLED ANIMATIONS ───
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                try {
                    const scrollY = window.scrollY;
                    const windowH = window.innerHeight;
                    const docH = document.documentElement.scrollHeight - windowH;

                    // Progress bar
                    if (docH > 0) {
                        progressBar.style.width = `${Math.min((scrollY / docH) * 100, 100)}%`;
                    }

                    // Hero parallax only
                    if (scrollY < windowH && heroVisual) {
                        const ratio = scrollY / windowH;
                        heroVisual.style.transform = `translateY(${scrollY * 0.2}px)`;
                        heroVisual.style.opacity = Math.max(0, 1 - ratio * 0.5);
                    }
                } catch(e) {}

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── INTERSECTION OBSERVER — fade-in-up ───
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    // ─── STAGGERED CARD REVEAL ───
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all sibling cards in the same row
                const parent = entry.target.closest('.row');
                if (parent) {
                    const cards = parent.querySelectorAll('.service-card, .pricing-card, .project-card, .metric-card');
                    cards.forEach((card, i) => {
                        card.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Set initial state for cards and observe their containers
    document.querySelectorAll('.service-card, .pricing-card, .project-card, .metric-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });

    document.querySelectorAll('.row').forEach(row => {
        if (row.querySelector('.service-card, .pricing-card, .project-card, .metric-card')) {
            cardObserver.observe(row);
        }
    });

    // ─── COUNTER ANIMATION ───
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();

                // Parse number and prefix/suffix
                const match = text.match(/([<>+]?)(\d+)(.*)/);
                if (match) {
                    const prefix = match[1];
                    const target = parseInt(match[2]);
                    const suffix = match[3];
                    let current = 0;
                    const duration = 1500;
                    const step = target / (duration / 16);

                    function count() {
                        current += step;
                        if (current >= target) {
                            el.textContent = `${prefix}${target}${suffix}`;
                        } else {
                            el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                            requestAnimationFrame(count);
                        }
                    }
                    count();
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    // Observe metric values and display numbers
    document.querySelectorAll('.metric-value, .sobre-section .display-5').forEach(el => {
        counterObserver.observe(el);
    });

    // ─── TYPING CODE BACKGROUND ───
    const codeBg = document.getElementById('codeBg');
    if (codeBg) {
        const tokens = [
            { text: '// CommandZ Site Engine v3.0\n', color: '#52525B' },
            { text: 'const ', color: '#4F8CFF' },
            { text: 'site ', color: '#e4e4e7' },
            { text: '= ', color: '#52525B' },
            { text: 'new ', color: '#4F8CFF' },
            { text: 'CommandZ', color: '#e4e4e7' },
            { text: '({\n', color: '#52525B' },
            { text: '    design: ', color: '#e4e4e7' },
            { text: "'premium'", color: '#4F8CFF' },
            { text: ',\n', color: '#52525B' },
            { text: '    responsive: ', color: '#e4e4e7' },
            { text: 'true', color: '#4F8CFF' },
            { text: ',\n', color: '#52525B' },
            { text: '    seo: ', color: '#e4e4e7' },
            { text: "'optimized'", color: '#4F8CFF' },
            { text: '\n});\n\n', color: '#52525B' },
            { text: 'site', color: '#e4e4e7' },
            { text: '.deploy()', color: '#4F8CFF' },
            { text: ';', color: '#52525B' },
            { text: '\n> Build complete_', color: '#3F3F46' }
        ];

        let tokenIndex = 0, charIndex = 0, currentSpan = null;

        function typeCode() {
            if (tokenIndex < tokens.length) {
                const token = tokens[tokenIndex];
                if (charIndex === 0) {
                    currentSpan = document.createElement('span');
                    currentSpan.style.color = token.color;
                    codeBg.appendChild(currentSpan);
                }
                currentSpan.textContent += token.text.charAt(charIndex);
                charIndex++;
                if (charIndex >= token.text.length) {
                    tokenIndex++;
                    charIndex = 0;
                }
                setTimeout(typeCode, Math.random() * 25 + 8);
            } else if (currentSpan) {
                currentSpan.innerHTML = currentSpan.innerHTML.replace('_', '<span class="blink">_</span>');
            }
        }

        setTimeout(typeCode, 600);
    }

    // ─── ACTIVE NAV LINK ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => navObserver.observe(section));

});
