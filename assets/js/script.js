// Sri Lanka Travel Website - Main JavaScript File

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initPackageFiltering();
    initMapInteractions();
    initImageGallery();
    initSmoothScrolling();
    initMobileMenu();
    initScrollToTop();
    initTestimonialSlider();
});

// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(
        '.journey-card, .destination-card, .tour-card, .testimonial-card, ' +
        '.package-card, .service-item, .feature-item, .value-card, .team-member'
    );

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (formObject[key]) {
                    // Handle multiple values (like checkboxes)
                    if (Array.isArray(formObject[key])) {
                        formObject[key].push(value);
                    } else {
                        formObject[key] = [formObject[key], value];
                    }
                } else {
                    formObject[key] = value;
                }
            }
            
            // Validate required fields
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            showFormLoading(true);
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showFormLoading(false);
                showFormMessage('Thank you for your inquiry! We will get back to you within 2 hours.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Form Validation
function validateForm(formData) {
    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'message'];
    let isValid = true;
    
    // Clear previous error messages
    clearFormErrors();
    
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#dc3545';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

// Clear form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.style.borderColor = '#e0e0e0';
    });
}

// Show form loading state
function showFormLoading(isLoading) {
    const submitBtn = document.querySelector('form button[type="submit"]');
    if (submitBtn) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    }
}

// Show form message
function showFormMessage(message, type) {
    const form = document.getElementById('contactForm');
    if (form) {
        // Remove existing messages
        const existingMessage = form.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the form
        form.insertBefore(messageDiv, form.firstChild);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Package Filtering
function initPackageFiltering() {
    const categoryCards = document.querySelectorAll('.category-card');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (categoryCards.length === 0 || packageCards.length === 0) return;
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Filter packages
            packageCards.forEach(packageCard => {
                const packageCategories = packageCard.getAttribute('data-category');
                
                if (category === 'all' || packageCategories.includes(category)) {
                    packageCard.style.display = 'block';
                    packageCard.classList.add('fade-in');
                } else {
                    packageCard.style.display = 'none';
                }
            });
        });
    });
}

// Map Interactions
function initMapInteractions() {
    const mapPointers = document.querySelectorAll('.map-pointer');
    
    mapPointers.forEach(pointer => {
        pointer.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            showLocationInfo(location);
        });
        
        pointer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        pointer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Show location information
function showLocationInfo(location) {
    const locationData = {
        'Colombo': {
            title: 'Colombo',
            description: 'The vibrant capital city of Sri Lanka, offering modern attractions, shopping, and cultural experiences.',
            highlights: ['Shopping malls', 'Colonial architecture', 'Beaches', 'Nightlife']
        },
        'Kandy': {
            title: 'Kandy',
            description: 'The cultural heart of Sri Lanka, home to the sacred Temple of the Tooth Relic.',
            highlights: ['Temple of the Tooth', 'Botanical Gardens', 'Cultural shows', 'Lake Kandy']
        },
        'Galle': {
            title: 'Galle',
            description: 'Historic fort city with UNESCO World Heritage status and beautiful coastal views.',
            highlights: ['Galle Fort', 'Lighthouse', 'Museums', 'Beaches']
        },
        'Sigiriya': {
            title: 'Sigiriya',
            description: 'Ancient rock fortress with stunning frescoes and panoramic views.',
            highlights: ['Rock fortress', 'Ancient frescoes', 'Water gardens', 'Mirror wall']
        },
        'Ella': {
            title: 'Ella',
            description: 'Picturesque hill station known for its tea plantations and scenic train rides.',
            highlights: ['Nine Arch Bridge', 'Ella Rock', 'Tea plantations', 'Waterfalls']
        }
    };
    
    const data = locationData[location];
    if (data) {
        showModal(data);
    }
}

// Modal functionality
function showModal(data) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('locationModal');
    if (!modal) {
        modal = createModal();
    }
    
    // Update modal content
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalHighlights = modal.querySelector('.modal-highlights');
    
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalHighlights.innerHTML = data.highlights.map(highlight => `<li>${highlight}</li>`).join('');
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Create modal
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'locationModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2 class="modal-title"></h2>
            <p class="modal-description"></p>
            <ul class="modal-highlights"></ul>
            <div class="modal-actions">
                <a href="packages.html" class="btn btn-primary">View Packages</a>
                <a href="contact.html" class="btn btn-outline">Contact Us</a>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        .modal-close:hover {
            color: #333;
        }
        .modal-title {
            color: #2c5f2d;
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        .modal-description {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        .modal-highlights {
            list-style: none;
            margin-bottom: 2rem;
        }
        .modal-highlights li {
            color: #666;
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 20px;
        }
        .modal-highlights li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #97bc62;
            font-weight: bold;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.body.appendChild(modal);
    return modal;
}

// Image Gallery
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery img, .destination-item img, .package-card img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt);
        });
        
        // Add cursor pointer
        img.style.cursor = 'pointer';
    });
}

// Show image in modal
function showImageModal(src, alt) {
    let imageModal = document.getElementById('imageModal');
    
    if (!imageModal) {
        imageModal = document.createElement('div');
        imageModal.id = 'imageModal';
        imageModal.className = 'image-modal';
        imageModal.innerHTML = `
            <div class="image-modal-content">
                <span class="image-modal-close">&times;</span>
                <img class="image-modal-img" src="" alt="">
                <div class="image-modal-caption"></div>
            </div>
        `;
        
        // Add styles
        const imageModalStyles = `
            .image-modal {
                display: none;
                position: fixed;
                z-index: 10001;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                align-items: center;
                justify-content: center;
            }
            .image-modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .image-modal-img {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
            .image-modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 2rem;
                cursor: pointer;
            }
            .image-modal-caption {
                color: white;
                text-align: center;
                padding: 1rem 0;
                font-size: 1.1rem;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = imageModalStyles;
        document.head.appendChild(styleSheet);
        
        // Close functionality
        const closeBtn = imageModal.querySelector('.image-modal-close');
        closeBtn.addEventListener('click', function() {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        document.body.appendChild(imageModal);
    }
    
    // Update modal content
    const modalImg = imageModal.querySelector('.image-modal-img');
    const modalCaption = imageModal.querySelector('.image-modal-caption');
    
    modalImg.src = src;
    modalImg.alt = alt;
    modalCaption.textContent = alt;
    
    // Show modal
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2c5f2d;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#97bc62';
        this.style.transform = 'translateY(-2px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2c5f2d';
        this.style.transform = 'translateY(0)';
    });
}

// Testimonial Slider (if needed for future enhancement)
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 3) {
        // Convert static testimonials to slider for mobile
        // This can be enhanced in the future
    }
}

// Utility Functions

// Debounce function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format phone number for WhatsApp links
function formatPhoneForWhatsApp(phone) {
    return phone.replace(/[^\d]/g, '');
}

// Add WhatsApp functionality
function initWhatsAppIntegration() {
    const whatsappLinks = document.querySelectorAll('[href*="whatsapp"], [href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phone = formatPhoneForWhatsApp(this.textContent);
            const message = encodeURIComponent('Hello! I am interested in Sri Lanka travel packages.');
            const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
            
            // Open in new window
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Initialize WhatsApp integration on load
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppIntegration();
});

// Performance optimizations
window.addEventListener('load', function() {
    // Remove loading classes
    document.body.classList.remove('loading');
    
    // Initialize lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker registration for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker when available
        // navigator.serviceWorker.register('/sw.js');
    });
}