document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile menu toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMobileMenu = document.querySelector('.navbar-mobile-menu');
    if (navbarToggle && navbarMobileMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('open');
            navbarMobileMenu.classList.toggle('open');
        });
    }

    // 3. Smooth scroll
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // If target section element doesn't exist on the current page (e.g. clicked from dashboard.html), navigate to index.html with anchor
                e.preventDefault();
                window.location.href = 'index.html' + targetId;
            }
        });
    });

    // 4. Scroll animations (IntersectionObserver)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animateElements.forEach(el => animationObserver.observe(el));

    // 5. Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const targetValue = parseInt(targetEl.getAttribute('data-target'), 10);
                const duration = 2000;
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    targetEl.textContent = Math.floor(progress * targetValue);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
                observer.unobserve(targetEl);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Typing effect
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        const phrases = ['Project Management', 'Team Collaboration', 'Task Tracking', 'Sprint Planning', 'Resource Management'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        };
        
        setTimeout(type, 1000); // Initial delay
    }

    // 7. FAQ Accordion
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.closest('.accordion-item');
            const currentContent = currentItem.querySelector('.accordion-content');
            
            const isOpen = currentItem.classList.contains('open');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('open');
            });

            if (!isOpen) {
                currentItem.classList.add('open');
            }
        });
    });

    // 8. Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            const nameInput = contactForm.querySelector('[name="name"]');
            const emailInput = contactForm.querySelector('[name="email"]');
            const messageInput = contactForm.querySelector('[name="message"]');
            
            // Clear previous errors
            contactForm.querySelectorAll('.form-error').forEach(el => el.textContent = '');
            contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            // Validate Name
            if (nameInput && !nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
                const errorSpan = nameInput.nextElementSibling;
                if(errorSpan && errorSpan.classList.contains('form-error')) errorSpan.textContent = 'Name is required';
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim()))) {
                isValid = false;
                emailInput.classList.add('error');
                const errorSpan = emailInput.nextElementSibling;
                if(errorSpan && errorSpan.classList.contains('form-error')) errorSpan.textContent = 'Valid email is required';
            }

            // Validate Message
            if (messageInput && (messageInput.value.trim().length < 10)) {
                isValid = false;
                messageInput.classList.add('error');
                const errorSpan = messageInput.nextElementSibling;
                if(errorSpan && errorSpan.classList.contains('form-error')) errorSpan.textContent = 'Message must be at least 10 characters';
            }

            if (isValid) {
                window.showToast('Message sent successfully!', 'success');
                contactForm.reset();
            }
        });
    }

    // 10. Toast notifications
    window.showToast = function(message, type = 'info') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            
            // Optional basic styling if CSS isn't present
            Object.assign(toastContainer.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '9999',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            });
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        Object.assign(toast.style, {
            padding: '12px 20px',
            background: type === 'success' ? '#10B981' : (type === 'error' ? '#EF4444' : '#3B82F6'),
            color: 'white',
            borderRadius: '4px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
        });

        toastContainer.appendChild(toast);
        
        // Trigger fade in
        setTimeout(() => toast.style.opacity = '1', 10);

        // Remove after 4s
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };

    // 11. Sidebar mobile toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
});
