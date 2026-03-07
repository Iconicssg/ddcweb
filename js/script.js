/**
 * Day Dream Consultancy - Main JavaScript File
 * Features: Navigation, Animations, Counters, Chatbot, Form Validation, Sliders
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounters();
    initTestimonialSlider();
    initChatbot();
    initFormValidation();
    initLazyLoading();
    initSmoothScroll();
    initNavbarScroll();
});

/* ============================================
   Navigation & Mobile Menu
   ============================================ */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            toggleHamburgerAnimation();
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            resetHamburgerAnimation();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            resetHamburgerAnimation();
        }
    });
}

function toggleHamburgerAnimation() {
    const spans = document.querySelectorAll('.hamburger span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
}

function resetHamburgerAnimation() {
    const spans = document.querySelectorAll('.hamburger span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   Scroll Reveal Animations
   ============================================ */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

/* ============================================
   Animated Counters
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                animateCounter(counter, target, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

/* ============================================
   Testimonial Slider
   ============================================ */
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
}

/* ============================================
   Chatbot Widget
   ============================================ */
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotOptions = document.querySelectorAll('.chatbot-option');

    if (!chatbotToggle || !chatbotWindow) return;

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        const icon = chatbotToggle.querySelector('i');
        if (chatbotWindow.classList.contains('active')) {
            icon.classList.remove('fa-comments');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-comments');
        }
    });

    // Handle chatbot options
    chatbotOptions.forEach(option => {
        option.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleChatbotAction(action);
        });
    });
}

function handleChatbotAction(action) {
    const whatsappNumber = '919156710633';
    const baseMessage = 'Hello Day Dream Consultancy, I am interested in your services';
    
    switch(action) {
        case 'hiring':
            window.location.href = 'services.html';
            break;
        case 'job':
            window.location.href = 'career.html';
            break;
        case 'training':
            window.location.href = 'services.html#training';
            break;
        case 'hr':
            const message = encodeURIComponent(baseMessage + ' - I would like to talk to HR');
            window.open(`https://wa.me/${919156710633}?text=${message}`, '_blank');
            break;
        default:
            window.location.href = 'contact.html';
    }
}

/* ============================================
   Form Validation
   ============================================ */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(form)) {
                showMessage(form, 'Form submitted successfully!', 'success');
                // Here you would normally submit the form data
                // form.submit();
            }
        });
    });

    // Career form specific validation
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCareerForm(this)) {
                showMessage(this, 'Your application has been submitted successfully! We will contact you soon.', 'success');
                this.reset();
            }
        });
    }

    // Contact form specific validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm(this)) {
                showMessage(this, 'Thank you for contacting us! We will get back to you soon.', 'success');
                this.reset();
            }
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        }
    });

    // Validate email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        showFieldError(emailField, 'Please enter a valid email address');
    }

    // Validate phone
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
        isValid = false;
        showFieldError(phoneField, 'Please enter a valid phone number');
    }

    return isValid;
}

function validateCareerForm(form) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate full name
    const fullName = form.querySelector('#fullName');
    if (!fullName.value.trim()) {
        isValid = false;
        showFieldError(fullName, 'Please enter your full name');
    }

    // Validate email
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
        isValid = false;
        showFieldError(email, 'Please enter your email');
    } else if (!isValidEmail(email.value)) {
        isValid = false;
        showFieldError(email, 'Please enter a valid email address');
    }

    // Validate phone
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        isValid = false;
        showFieldError(phone, 'Please enter your phone number');
    } else if (!isValidPhone(phone.value)) {
        isValid = false;
        showFieldError(phone, 'Please enter a valid 10-digit phone number');
    }

    // Validate city
    const city = form.querySelector('#city');
    if (!city.value.trim()) {
        isValid = false;
        showFieldError(city, 'Please enter your city');
    }

    // Validate position
    const position = form.querySelector('#position');
    if (!position.value) {
        isValid = false;
        showFieldError(position, 'Please select a position');
    }

    // Validate resume
    const resume = form.querySelector('#resume');
    if (resume.files.length > 0) {
        const file = resume.files[0];
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            isValid = false;
            showFieldError(resume, 'Please upload a PDF, DOC, or DOCX file');
        } else if (file.size > maxSize) {
            isValid = false;
            showFieldError(resume, 'File size should be less than 5MB');
        }
    }

    return isValid;
}

function validateContactForm(form) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate name
    const name = form.querySelector('#name');
    if (!name.value.trim()) {
        isValid = false;
        showFieldError(name, 'Please enter your name');
    }

    // Validate email
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
        isValid = false;
        showFieldError(email, 'Please enter your email');
    } else if (!isValidEmail(email.value)) {
        isValid = false;
        showFieldError(email, 'Please enter a valid email address');
    }

    // Validate phone
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        isValid = false;
        showFieldError(phone, 'Please enter your phone number');
    } else if (!isValidPhone(phone.value)) {
        isValid = false;
        showFieldError(phone, 'Please enter a valid phone number');
    }

    // Validate service
    const service = form.querySelector('#service');
    if (!service.value) {
        isValid = false;
        showFieldError(service, 'Please select a service');
    }

    // Validate message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
        isValid = false;
        showFieldError(message, 'Please enter your message');
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.fontSize = '13px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function showMessage(form, message, type) {
    // Remove existing messages
    form.querySelectorAll('.message').forEach(el => el.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/* ============================================
   Lazy Loading Images
   ============================================ */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Client Logo Slider Animation
   ============================================ */
function initClientSlider() {
    const slider = document.querySelector('.clients-slider');
    if (!slider) return;

    // Clone items for infinite scroll effect
    const items = slider.innerHTML;
    slider.innerHTML = items + items;
}

// Initialize client slider if exists
if (document.querySelector('.clients-slider')) {
    initClientSlider();
}

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Back to Top Button
   ============================================ */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 45px;
        height: 45px;
        background: var(--royal-blue);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 997;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }, 100));
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

/* ============================================
   Preloader
   ============================================ */
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--royal-blue);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div class="spinner" style="
                width: 50px;
                height: 50px;
                border: 4px solid var(--powder-blue);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="color: white; font-family: Poppins, sans-serif;">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(function() {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Initialize preloader
initPreloader();

/* ============================================
   Active Navigation Link
   ============================================ */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active nav link on page load
setActiveNavLink();

/* ============================================
   Console Message
   ============================================ */
console.log('%c Day Dream Consultancy ', 'background: #162660; color: #fff; font-size: 24px; padding: 10px 20px; border-radius: 8px;');
console.log('%c Connecting Talent With Opportunity ', 'color: #162660; font-size: 14px;');
