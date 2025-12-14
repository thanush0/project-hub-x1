/* ================================
   MyFlix - JavaScript Application
   ================================ */

// ================================
// GLOBAL STATE
// ================================
let searchTimeout = null;

// ================================
// NAVBAR SCROLL EFFECT
// ================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// SEARCH FUNCTIONALITY
// ================================
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchBtn = document.getElementById('searchBtn');
const searchClose = document.getElementById('searchClose');

// Open search overlay
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
    });
}

// Close search overlay
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Real-time search with debouncing
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Debounce search - wait 500ms after user stops typing
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 500);
    });
}

// Perform search via API
async function performSearch(query) {
    try {
        showSearchLoading();
        
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            displaySearchResults(data.results);
        } else {
            showSearchError(data.error);
        }
    } catch (error) {
        console.error('Search error:', error);
        showSearchError('Failed to perform search');
    }
}

// Display search results
function displaySearchResults(movies) {
    if (movies.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">
                <div style="font-size: 3em; margin-bottom: 10px;">🔍</div>
                <p>No movies found</p>
            </div>
        `;
        return;
    }
    
    searchResults.innerHTML = movies.map(movie => `
        <div class="movie-card" data-movie-id="${movie.message_id}">
            <a href="/watch/${movie.message_id}">
                <div class="movie-poster">
                    ${movie.thumbnail ? 
                        `<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'><rect fill='%23141414' width='300' height='450'/><text x='50%' y='50%' fill='%23e50914' font-size='60' text-anchor='middle' dominant-baseline='middle'>🎬</text></svg>" alt="${movie.title}">` :
                        `<div class="poster-placeholder">
                            <span class="poster-icon">🎬</span>
                            <span class="poster-text">${movie.title}</span>
                        </div>`
                    }
                    <div class="movie-overlay">
                        <div class="overlay-content">
                            <button class="play-button">▶</button>
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-meta">
                                <span class="meta-item">⭐ ${movie.rating}</span>
                                <span class="meta-item">🕐 ${formatDuration(movie.duration)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div class="movie-info">
                <h3 class="movie-title-small">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
            </div>
        </div>
    `).join('');
}

// Show loading state
function showSearchLoading() {
    searchResults.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner"></div>
        </div>
    `;
}

// Show error state
function showSearchError(message) {
    searchResults.innerHTML = `
        <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">
            <div style="font-size: 3em; margin-bottom: 10px;">⚠️</div>
            <p>${message}</p>
        </div>
    `;
}

// ================================
// CACHE REFRESH FUNCTIONALITY
// ================================
async function refreshCache() {
    const confirmed = confirm('This will refresh the movie cache from Telegram. Continue?');
    if (!confirmed) return;
    
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
    
    try {
        const response = await fetch('/api/refresh');
        const data = await response.json();
        
        if (data.success) {
            alert(`Cache refreshed successfully! Found ${data.total} movies.`);
            window.location.reload();
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Refresh error:', error);
        alert('Failed to refresh cache. Please try again.');
    } finally {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Format duration from seconds to readable string
function formatDuration(seconds) {
    if (!seconds) return 'Unknown';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

// Format file size from bytes
function formatFileSize(bytes) {
    if (!bytes) return 'Unknown';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

// ================================
// MOBILE MENU TOGGLE
// ================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// PAGE LOAD ANIMATIONS
// ================================
document.addEventListener('DOMContentLoaded', () => {
    // Fade in movie cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all movie cards
    document.querySelectorAll('.movie-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });
});

// ================================
// ERROR HANDLING
// ================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ================================
// SERVICE WORKER REGISTRATION (Optional)
// ================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker for offline support
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.error('Service Worker registration failed:', err));
    // });
}

// ================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ================================
window.refreshCache = refreshCache;
window.formatDuration = formatDuration;
window.formatFileSize = formatFileSize;
