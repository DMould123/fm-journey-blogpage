document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const logo = document.querySelector('.logo');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Create wrapper for logo and menu button to position them side by side
        const headerWrapper = document.createElement('div');
        headerWrapper.classList.add('header-wrapper');
        
        // Move existing elements to new structure
        header.insertBefore(headerWrapper, logo);
        headerWrapper.appendChild(logo);
        headerWrapper.appendChild(mobileMenuBtn);
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Add media query styles
        const style = document.createElement('style');
        style.textContent = `
            .header-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
            
            @media (max-width: 900px) {
                header {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                nav {
                    display: none;
                    width: 100%;
                    padding: 20px 0;
                }
                
                nav.active {
                    display: block;
                }
                
                nav ul {
                    flex-direction: column;
                    align-items: center;
                }
                
                nav li {
                    margin: 10px 0;
                }
                
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--primary-color);
                    padding: 5px 10px;
                }
                
                .mobile-menu-btn:hover {
                    color: var(--secondary-color);
                }
            }
            
            @media (min-width: 901px) {
                .mobile-menu-btn {
                    display: none;
                }
                
                .header-wrapper {
                    display: block;
                    width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Only create mobile menu if screen width is below threshold
    if (window.innerWidth <= 900) {
        createMobileMenu();
    }
    
    // Create mobile menu when resizing below threshold
    let isMobileMenuCreated = window.innerWidth <= 900;
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 900 && !isMobileMenuCreated) {
            createMobileMenu();
            isMobileMenuCreated = true;
        }
    });

    // Newsletter subscription form handling
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate form submission (would be replaced with actual API call)
                const formContainer = this.parentElement;
                formContainer.innerHTML = '<h3>Thank You!</h3><p>You have successfully subscribed to our newsletter.</p>';
                
                // Reset after 5 seconds for demo purposes
                setTimeout(() => {
                    formContainer.innerHTML = `
                        <h3>Subscribe to Newsletter</h3>
                        <p>Get the latest FM tactics and tips directly to your inbox!</p>
                        <form class="subscribe-form">
                            <input type="email" placeholder="Your email address" required>
                            <button type="submit" class="btn">Subscribe</button>
                        </form>
                    `;
                    // Reattach event listener to new form
                    document.querySelector('.subscribe-form').addEventListener('submit', this);
                }, 5000);
            }
        });
    }
    
    // Add footer newsletter form handlers
    const footerForm = document.querySelector('.footer-newsletter form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate form submission
                const formContainer = this.parentElement;
                const originalContent = formContainer.innerHTML;
                formContainer.innerHTML = '<h3>Thank You!</h3><p>You have successfully subscribed to our newsletter.</p>';
                
                // Reset after 5 seconds for demo purposes
                setTimeout(() => {
                    formContainer.innerHTML = originalContent;
                    // Reattach event listener to new form
                    document.querySelector('.footer-newsletter form').addEventListener('submit', this);
                }, 5000);
            }
        });
    }
    
    // Fade in elements as they scroll into view
    const fadeInElements = document.querySelectorAll('.post, .post-item, .widget');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Add initial styles for fade-in animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        .post, .post-item, .widget {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(fadeStyle);
    
    // Observe elements for fade-in
    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // Initialize current year for footer copyright
    const yearElement = document.querySelector('.footer-bottom p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}); 