/**
 * Boitumelo's Tasteful Events Catering
 * Enhanced JavaScript Functionality - Part 3
 * Author: Tumelo Kola (ST10470592)
 * Version: 3.0
 */

// ===================================
// GLOBAL VARIABLES AND CONFIGURATION
// ===================================

const CONFIG = {
    apiEndpoint: '/api/enquiry',
    emailEndpoint: '/api/contact',
    animationDuration: 300,
    searchDebounce: 500,
    pricing: {
        wedding: {
            silver: 25000,
            gold: 50000,
            platinum: 100000
        },
        corporate: {
            breakfast: 350,
            lunch: 500,
            conference: 750,
            gala: 1200
        },
        private: {
            casual: 450,
            elegant: 800,
            intimate: 1500
        }
    }
};

// ===================================
// DOM CONTENT LOADED - INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c Boitumelo\'s Tasteful Events - Part 3 ', 'background: #d4a574; color: #fff; font-size: 16px; padding: 10px;');
    console.log('%c Enhanced with JavaScript functionality, SEO, and form validation ', 'background: #2c2416; color: #d4a574; font-size: 12px; padding: 5px;');
    
    // Initialize all functionality
    initNavigation();
    initGalleryLightbox();
    initInteractiveMap();
    initAccordions();
    initTabs();
    initModal();
    initSearchFunctionality();
    initDynamicContent();
    initFormValidation();
    initAnimations();
    initBackToTop();
    trackPageViews();
});

// ===================================
// NAVIGATION ENHANCEMENTS
// ===================================

function initNavigation() {
    setActiveNavLink();
    addSmoothScrolling();
    initMobileMenu();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

function initMobileMenu() {
    // Create mobile menu toggle if not exists
    const header = document.querySelector('header .container');
    let menuToggle = document.querySelector('.menu-toggle');
    
    if (!menuToggle && window.innerWidth <= 768) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '&#9776;';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        const nav = document.querySelector('nav');
        header.insertBefore(menuToggle, nav);
        
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            navMenu.classList.toggle('mobile-open');
            this.setAttribute('aria-expanded', !isExpanded);
            this.innerHTML = isExpanded ? '&#9776;' : '&#10005;';
        });
    }
}

// ===================================
// GALLERY LIGHTBOX FUNCTIONALITY
// ===================================

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    // Create lightbox overlay
    const lightbox = createLightboxElement();
    document.body.appendChild(lightbox);
    
    // Add click handlers to gallery items
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            openLightbox(index, galleryItems);
        });
        
        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index, galleryItems);
            }
        });
    });
}

function createLightboxElement() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
            <button class="lightbox-next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-image-container">
                <div class="lightbox-placeholder"></div>
                <div class="lightbox-caption"></div>
            </div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox-image-container {
            text-align: center;
        }
        
        .lightbox-placeholder {
            min-width: 300px;
            min-height: 300px;
            max-width: 1200px;
            max-height: 800px;
            background: var(--light-brown);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .lightbox-caption {
            color: white;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }
        
        .lightbox-counter {
            color: #d4a574;
            font-size: 1rem;
            margin-top: 0.5rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 3rem;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10001;
            transition: color 0.3s;
        }
        
        .lightbox-close:hover {
            color: #d4a574;
        }
        
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 3rem;
            color: white;
            background: rgba(212, 165, 116, 0.3);
            border: none;
            cursor: pointer;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            transition: background 0.3s;
        }
        
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(212, 165, 116, 0.6);
        }
        
        .lightbox-prev {
            left: 20px;
        }
        
        .lightbox-next {
            right: 20px;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev,
            .lightbox-next {
                font-size: 2rem;
                padding: 0.5rem 1rem;
            }
            
            .lightbox-close {
                font-size: 2rem;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    
    return lightbox;
}

let currentLightboxIndex = 0;
let lightboxItems = [];

function openLightbox(index, items) {
    const lightbox = document.querySelector('.lightbox');
    currentLightboxIndex = index;
    lightboxItems = items;
    
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Event listeners
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    closeBtn.onclick = closeLightbox;
    prevBtn.onclick = () => navigateLightbox(-1);
    nextBtn.onclick = () => navigateLightbox(1);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeyboard);
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxItems.length - 1;
    } else if (currentLightboxIndex >= lightboxItems.length) {
        currentLightboxIndex = 0;
    }
    
    updateLightboxContent();
}

function updateLightboxContent() {
    const item = lightboxItems[currentLightboxIndex];
    const placeholder = document.querySelector('.lightbox-placeholder');
    const caption = document.querySelector('.lightbox-caption');
    const counter = document.querySelector('.lightbox-counter');
    
    const title = item.querySelector('.gallery-overlay h3')?.textContent || 'Image';
    const description = item.querySelector('.gallery-overlay p')?.textContent || '';
    
    placeholder.textContent = title;
    caption.textContent = description;
    counter.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;
}

function handleLightboxKeyboard(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
}

// ===================================
// INTERACTIVE MAP FUNCTIONALITY
// ===================================

function initInteractiveMap() {
    const mapButtons = document.querySelectorAll('.map-btn');
    const mapInfos = document.querySelectorAll('.map-info');
    
    if (mapButtons.length === 0) return;
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            const targetMap = document.getElementById('map-' + location);
            
            // Hide all maps
            mapInfos.forEach(map => {
                map.classList.remove('active');
            });
            
            // Show selected map with animation
            if (targetMap) {
                targetMap.classList.add('active');
                targetMap.style.animation = 'fadeIn 0.5s ease';
                
                // Smooth scroll to map
                const mapSection = document.querySelector('.map-section');
                if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Update button states
                mapButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Initialize with first location
    if (mapButtons.length > 0) {
        mapButtons[0].click();
    }
}

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================

function initAccordions() {
    // Create accordion structure for FAQ section
    const faqSection = document.querySelector('.enquiry-faq');
    if (!faqSection) return;
    
    const faqItems = faqSection.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const heading = item.querySelector('h4');
        const content = item.querySelector('p');
        
        if (!heading || !content) return;
        
        // Wrap content for animation
        const wrapper = document.createElement('div');
        wrapper.className = 'faq-content';
        wrapper.style.maxHeight = '0';
        wrapper.style.overflow = 'hidden';
        wrapper.style.transition = 'max-height 0.3s ease';
        
        content.parentNode.insertBefore(wrapper, content);
        wrapper.appendChild(content);
        
        // Make heading clickable
        heading.style.cursor = 'pointer';
        heading.style.userSelect = 'none';
        heading.setAttribute('role', 'button');
        heading.setAttribute('aria-expanded', 'false');
        heading.setAttribute('tabindex', '0');
        
        // Add icon
        const icon = document.createElement('span');
        icon.className = 'faq-icon';
        icon.innerHTML = '+';
        icon.style.float = 'right';
        icon.style.fontSize = '1.5rem';
        icon.style.transition = 'transform 0.3s ease';
        heading.appendChild(icon);
        
        // Click handler
        heading.addEventListener('click', function() {
            toggleAccordion(this, wrapper, icon);
        });
        
        // Keyboard handler
        heading.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(this, wrapper, icon);
            }
        });
    });
}

function toggleAccordion(heading, wrapper, icon) {
    const isOpen = heading.getAttribute('aria-expanded') === 'true';
    
    // Close all other accordions
    document.querySelectorAll('.faq-item h4').forEach(h => {
        if (h !== heading && h.getAttribute('aria-expanded') === 'true') {
            const w = h.nextElementSibling;
            const i = h.querySelector('.faq-icon');
            h.setAttribute('aria-expanded', 'false');
            w.style.maxHeight = '0';
            if (i) i.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current accordion
    if (isOpen) {
        heading.setAttribute('aria-expanded', 'false');
        wrapper.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
        icon.innerHTML = '+';
    } else {
        heading.setAttribute('aria-expanded', 'true');
        wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
        icon.innerHTML = '×';
    }
}

// ===================================
// TABS FUNCTIONALITY
// ===================================

function initTabs() {
    // Create tabs for services page if not exists
    const servicesPage = document.querySelector('.service-detail');
    if (!servicesPage) return;
    
    // Check if we're on services page
    if (!window.location.pathname.includes('services.html')) return;
    
    // Create tab navigation
    const tabContainer = document.createElement('div');
    tabContainer.className = 'service-tabs';
    tabContainer.innerHTML = `
        <div class="tab-buttons">
            <button class="tab-btn active" data-tab="wedding">Weddings</button>
            <button class="tab-btn" data-tab="corporate">Corporate</button>
            <button class="tab-btn" data-tab="private">Private Parties</button>
        </div>
    `;
    
    // Add CSS for tabs
    const style = document.createElement('style');
    style.textContent = `
        .service-tabs {
            background: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
        }
        
        .tab-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .tab-btn {
            padding: 0.75rem 2rem;
            background: var(--cream);
            border: 2px solid var(--primary-color);
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-brown);
            transition: all 0.3s ease;
        }
        
        .tab-btn:hover {
            background: var(--secondary-color);
            color: white;
        }
        
        .tab-btn.active {
            background: var(--primary-color);
            color: white;
        }
        
        .service-detail {
            display: none;
        }
        
        .service-detail.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Insert tabs before first service section
    const firstService = document.querySelector('.service-detail');
    if (firstService) {
        firstService.parentNode.insertBefore(tabContainer, firstService);
    }
    
    // Add data attributes to service sections
    const services = document.querySelectorAll('.service-detail');
    const serviceTypes = ['wedding', 'corporate', 'private'];
    services.forEach((service, index) => {
        service.setAttribute('data-service', serviceTypes[index] || 'wedding');
        if (index === 0) service.classList.add('active');
    });
    
    // Tab click handlers
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update button states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update service visibility
    document.querySelectorAll('.service-detail').forEach(service => {
        service.classList.remove('active');
        if (service.getAttribute('data-service') === tabName) {
            service.classList.add('active');
        }
    });
}

// ===================================
// MODAL FUNCTIONALITY
// ===================================

function initModal() {
    // Create modal for success messages
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <div class="modal-icon"></div>
            <h3 class="modal-title"></h3>
            <p class="modal-message"></p>
            <button class="modal-btn">OK</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        
        .custom-modal.active {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 2.5rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 2rem;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--light-brown);
            transition: color 0.3s;
        }
        
        .modal-close:hover {
            color: var(--primary-color);
        }
        
        .modal-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        .modal-title {
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .modal-message {
            color: var(--dark-brown);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .modal-btn {
            padding: 0.75rem 2.5rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            transition: background 0.3s;
        }
        
        .modal-btn:hover {
            background: var(--accent-color);
        }
    `;
    document.head.appendChild(style);
    
    // Modal event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-btn');
    
    closeBtn.onclick = closeModal;
    okBtn.onclick = closeModal;
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

function showModal(title, message, type = 'success') {
    const modal = document.querySelector('.custom-modal');
    const icon = modal.querySelector('.modal-icon');
    const titleEl = modal.querySelector('.modal-title');
    const messageEl = modal.querySelector('.modal-message');
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        icon.innerHTML = '✓';
        icon.style.color = '#4caf50';
    } else if (type === 'error') {
        icon.innerHTML = '✕';
        icon.style.color = '#d64545';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.custom-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function initSearchFunctionality() {
    // Add search to services and gallery pages
    if (window.location.pathname.includes('services.html')) {
        createSearchBar('.menu-highlights', searchMenuItems);
    }
    
    if (window.location.pathname.includes('gallery.html')) {
        // Gallery already has filter, enhance it with search
        enhanceGalleryFilter();
    }
}

function createSearchBar(targetSelector, searchFunction) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="search" 
               class="search-input" 
               placeholder="Search menu items..." 
               aria-label="Search menu items">
        <button class="search-clear" aria-label="Clear search">✕</button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            max-width: 500px;
            margin: 0 auto 2rem;
            position: relative;
        }
        
        .search-input {
            width: 100%;
            padding: 0.75rem 3rem 0.75rem 1rem;
            font-size: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 25px;
            transition: border-color 0.3s;
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .search-clear {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--light-brown);
            display: none;
        }
        
        .search-clear.visible {
            display: block;
        }
        
        .search-highlight {
            background-color: yellow;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    target.parentNode.insertBefore(searchContainer, target);
    
    const searchInput = searchContainer.querySelector('.search-input');
    const clearBtn = searchContainer.querySelector('.search-clear');
    
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchFunction(this.value);
            clearBtn.classList.toggle('visible', this.value.length > 0);
        }, CONFIG.searchDebounce);
    });
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchFunction('');
        this.classList.remove('visible');
        searchInput.focus();
    });
}

function searchMenuItems(query) {
    const menuCategories = document.querySelectorAll('.menu-category');
    const searchTerm = query.toLowerCase().trim();
    
    menuCategories.forEach(category => {
        const items = category.querySelectorAll('li');
        let hasVisibleItems = false;
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                item.style.display = '';
                hasVisibleItems = true;
                
                // Highlight matching text
                if (searchTerm !== '') {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    item.innerHTML = item.textContent.replace(regex, '<span class="search-highlight">$1</span>');
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // Hide category if no visible items
        category.style.display = hasVisibleItems ? '' : 'none';
    });
}

function enhanceGalleryFilter() {
    const filterSection = document.querySelector('.gallery-filter .container');
    if (!filterSection) return;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search gallery...';
    searchInput.style.marginBottom = '1rem';
    searchInput.style.maxWidth = '400px';
    searchInput.style.margin = '0 auto 1rem';
    searchInput.style.display = 'block';
    
    filterSection.insertBefore(searchInput, filterSection.firstChild);
    
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchGallery(this.value);
        }, CONFIG.searchDebounce);
    });
}

function searchGallery(query) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const searchTerm = query.toLowerCase().trim();
    
    galleryItems.forEach(item => {
        const title = item.querySelector('.gallery-overlay h3')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.gallery-overlay p')?.textContent.toLowerCase() || '';
        
        if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===================================
// DYNAMIC CONTENT LOADING
// ===================================

function initDynamicContent() {
    // Simulate loading recent blog posts or testimonials
    loadRecentTestimonials();
    updateEventCounter();
}

function loadRecentTestimonials() {
    const testimonialsSection = document.querySelector('.testimonials-grid');
    if (!testimonialsSection) return;
    
    // Simulate async data loading
    const testimonials = [
        {
            text: "Absolutely phenomenal service! Every detail was perfect, and our guests are still raving about the food weeks later.",
            author: "Emily & James, Wedding Clients",
            date: "2025-01-15"
        }
    ];
    
    // Add loading indicator
    testimonials.forEach((testimonial, index) => {
        setTimeout(() => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.style.opacity = '0';
            card.innerHTML = `
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.author}</p>
                <p class="testimonial-date" style="font-size: 0.85rem; color: var(--light-brown);">${formatDate(testimonial.date)}</p>
            `;
            
            // Fade in animation
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease';
                card.style.opacity = '1';
            }, 100);
        }, index * 200);
    });
}

function updateEventCounter() {
    // Display events catered counter on homepage
    const intro = document.querySelector('.intro');
    if (!intro || !window.location.pathname.includes('index.html')) return;
    
    const counter = document.createElement('div');
    counter.className = 'event-counter';
    counter.innerHTML = `
        <div style="text-align: center; margin: 2rem 0; padding: 2rem; background: linear-gradient(135deg, var(--primary-color), var(--accent-color)); border-radius: 10px; color: white;">
            <h3 style="margin-bottom: 1rem;">Events Catered in 2024</h3>
            <p style="font-size: 3rem; font-weight: bold; margin: 0;" id="event-count">0</p>
        </div>
    `;
    
    intro.appendChild(counter);
    
    // Animate counter
    animateCounter('event-count', 0, 347, 2000);
}

function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===================================
// FORM VALIDATION AND SUBMISSION
// ===================================

function initFormValidation() {
    const enquiryForm = document.querySelector('.enquiry-form');
    const contactForm = document.querySelector('.contact-form');
    
    if (enquiryForm) {
        setupEnquiryForm(enquiryForm);
    }
    
    if (contactForm) {
        setupContactForm(contactForm);
    }
}

function setupEnquiryForm(form) {
    // Prevent default form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEnquiryForm(this)) {
            processEnquiry(this);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error state on input
            this.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    // Phone number formatting
    const phoneInput = form.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Date validation
    const dateInput = form.querySelector('#event-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function validateEnquiryForm(form) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Full Name validation
    const fullname = form.querySelector('#fullname');
    if (!fullname.value.trim()) {
        showError(fullname, 'Full name is required');
        isValid = false;
    } else if (fullname.value.trim().length < 2) {
        showError(fullname, 'Name must be at least 2 characters');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullname.value)) {
        showError(fullname, 'Name can only contain letters and spaces');
        isValid = false;
    }
    
    // Email validation
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
        showError(email, 'Email address is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phone = form.querySelector('#phone');
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError(phone, 'Please enter a valid South African phone number');
        isValid = false;
    }
    
    // Event type validation
    const eventType = form.querySelector('#event-type');
    if (!eventType.value) {
        showError(eventType, 'Please select an event type');
        isValid = false;
    }
    
    // Event date validation
    const eventDate = form.querySelector('#event-date');
    if (!eventDate.value) {
        showError(eventDate, 'Event date is required');
        isValid = false;
    } else {
        const selectedDate = new Date(eventDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(eventDate, 'Event date must be in the future');
            isValid = false;
        }
        
        // Check if date is at least 2 weeks away
        const twoWeeks = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
        if (selectedDate < twoWeeks) {
            showError(eventDate, 'Events require minimum 2 weeks notice', 'warning');
        }
    }
    
    // Venue validation
    const venue = form.querySelector('#venue');
    if (!venue.value.trim()) {
        showError(venue, 'Venue/location is required');
        isValid = false;
    } else if (venue.value.trim().length < 5) {
        showError(venue, 'Please provide a complete venue address');
        isValid = false;
    }
    
    // Guest count validation
    const guestCount = form.querySelector('#guest-count');
    if (!guestCount.value) {
        showError(guestCount, 'Number of guests is required');
        isValid = false;
    } else if (parseInt(guestCount.value) < 10) {
        showError(guestCount, 'Minimum 10 guests required');
        isValid = false;
    } else if (parseInt(guestCount.value) > 1000) {
        showError(guestCount, 'For events over 1000 guests, please call us directly');
        isValid = false;
    }
    
    // Terms checkbox validation
    const terms = form.querySelector('input[name="terms"]');
    if (!terms.checked) {
        showError(terms, 'You must agree to the terms to proceed');
        isValid = false;
    }
    
    return isValid;
}

function processEnquiry(form) {
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Gather form data
    const formData = {
        fullname: form.querySelector('#fullname').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        eventType: form.querySelector('#event-type').value,
        eventDate: form.querySelector('#event-date').value,
        eventTime: form.querySelector('#event-time').value,
        venue: form.querySelector('#venue').value,
        guestCount: parseInt(form.querySelector('#guest-count').value),
        budget: form.querySelector('#budget').value,
        serviceStyle: form.querySelector('#service-style').value,
        dietary: form.querySelector('#dietary').value,
        message: form.querySelector('#message').value
    };
    
    // Calculate pricing estimate
    const estimate = calculatePricing(formData);
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success modal with pricing
        const message = `
            Thank you for your enquiry, ${formData.fullname}!
            
            Event Type: ${formData.eventType}
            Date: ${formatDate(formData.eventDate)}
            Guests: ${formData.guestCount}
            
            Estimated Cost: R${estimate.toLocaleString()}
            (Final quote will be provided after consultation)
            
            We will contact you within 24 hours at ${formData.email} to discuss your requirements in detail.
        `;
        
        showModal('Enquiry Received!', message, 'success');
        
        // Reset form
        form.reset();
        
        // Track conversion
        trackEvent('enquiry_submitted', {
            event_type: formData.eventType,
            guest_count: formData.guestCount
        });
    }, 1500);
}

function calculatePricing(data) {
    let basePrice = 0;
    
    // Calculate based on event type
    if (data.eventType === 'wedding') {
        if (data.budget === '50k-100k') {
            basePrice = CONFIG.pricing.wedding.silver;
        } else if (data.budget === '100k-200k') {
            basePrice = CONFIG.pricing.wedding.gold;
        } else {
            basePrice = CONFIG.pricing.wedding.platinum;
        }
    } else if (data.eventType === 'corporate') {
        basePrice = CONFIG.pricing.corporate.conference * data.guestCount;
    } else {
        basePrice = CONFIG.pricing.private.elegant * data.guestCount;
    }
    
    // Adjust for guest count
    if (data.guestCount > 200) {
        basePrice *= 0.9; // 10% discount for large events
    }
    
    return Math.round(basePrice);
}

function setupContactForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm(this)) {
            processContactForm(this);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
}

function validateContactForm(form) {
    let isValid = true;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(msg => msg.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Name validation
    const name = form.querySelector('#contact-name');
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    // Email validation
    const email = form.querySelector('#contact-email');
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Invalid email format');
        isValid = false;
    }
    
    // Subject validation
    const subject = form.querySelector('#contact-subject');
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    const message = form.querySelector('#contact-message');
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function processContactForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Gather form data
    const formData = {
        name: form.querySelector('#contact-name').value,
        email: form.querySelector('#contact-email').value,
        phone: form.querySelector('#contact-phone')?.value || 'Not provided',
        subject: form.querySelector('#contact-subject').value,
        location: form.querySelector('#preferred-location')?.value || 'No preference',
        message: form.querySelector('#contact-message').value
    };
    
    // Create email body
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Preferred Location: ${formData.location}

Message:
${formData.message}
    `.trim();
    
    // Simulate sending email
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Create mailto link
        const mailtoLink = `mailto:info@tastefuleventscatering.co.za?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showModal(
            'Message Prepared!',
            'Your email client will open with your message. Please click send to complete.',
            'success'
        );
        
        // Reset form
        form.reset();
        
        // Track event
        trackEvent('contact_form_submitted', {
            subject: formData.subject
        });
    }, 1000);
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    
    // Remove existing error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showError(field, 'Invalid email format');
        return false;
    }
    
    // Phone validation
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showError(field, 'Invalid phone number');
        return false;
    }
    
    // Number validation
    if (field.type === 'number' && value) {
        const num = parseInt(value);
        const min = parseInt(field.getAttribute('min'));
        const max = parseInt(field.getAttribute('max'));
        
        if (!isNaN(min) && num < min) {
            showError(field, `Minimum value is ${min}`);
            return false;
        }
        
        if (!isNaN(max) && num > max) {
            showError(field, `Maximum value is ${max}`);
            return false;
        }
    }
    
    return isValid;
}

function showError(field, message, type = 'error') {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = type === 'warning' ? 'warning-message' : 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = type === 'warning' ? '#ff9800' : '#d64545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentElement.appendChild(errorDiv);
    
    // Add error styling to input
    const style = document.createElement('style');
    if (!document.querySelector('#error-styles')) {
        style.id = 'error-styles';
        style.textContent = `
            input.error,
            select.error,
            textarea.error {
                border-color: #d64545 !important;
                background-color: #fff5f5;
            }
        `;
        document.head.appendChild(style);
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format as South African number
    if (value.length > 0) {
        if (!value.startsWith('27') && !value.startsWith('0')) {
            value = '27' + value;
        }
        
        if (value.startsWith('0')) {
            value = '27' + value.substring(1);
        }
        
        // Format: +27 XX XXX XXXX
        let formatted = '+27 ';
        if (value.length > 2) {
            formatted += value.substring(2, 4);
        }
        if (value.length > 4) {
            formatted += ' ' + value.substring(4, 7);
        }
        if (value.length > 7) {
            formatted += ' ' + value.substring(7, 11);
        }
        
        e.target.value = formatted.trim();
    }
}

// Validation helper functions
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function isValidPhone(phone) {
    // South African format: +27 XX XXX XXXX
    const pattern = /^\+?27\s?\d{2}\s?\d{3}\s?\d{4}$/;
    return pattern.test(phone.replace(/\s/g, ''));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-ZA', options);
}

// ===================================
// ANIMATIONS AND SCROLL EFFECTS
// ===================================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .team-member, .location-card, ' +
        '.method-card, .mv-card, .value-item, .menu-category, .extra-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    initParallax();
}

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(212, 165, 116, 0.5)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
}

// ===================================
// ANALYTICS AND TRACKING
// ===================================

function trackPageViews() {
    // Track page view
    const page = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Page view:', page);
    
    // You can integrate with Google Analytics here
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
        });
    }
}

function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // You can also send to your own analytics endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     body: JSON.stringify({ event: eventName, data: eventData })
    // });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

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

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Skip to main content
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
        main.setAttribute('tabindex', '-1');
    }
}

// Initialize skip link
addSkipLink();

// ===================================
// ERROR HANDLING
// ===================================

window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send errors to your logging service here
});

// ===================================
// EXPORT FOR TESTING (Optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        formatDate,
        calculatePricing
    };
}

// ===================================
// END OF SCRIPT
// ===================================

console.log('✓ All JavaScript functionality loaded successfully');