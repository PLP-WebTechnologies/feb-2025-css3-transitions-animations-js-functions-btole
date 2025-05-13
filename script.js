document.addEventListener('DOMContentLoaded', function() {
    // Load saved preferences
    loadPreferences();
    
    // Animation button
    const animateBtn = document.getElementById('animateBtn');
    const animatedBox = document.querySelector('.animated-box');
    
    animateBtn.addEventListener('click', function() {
        // Trigger CSS animation
        animatedBox.classList.add('animate');
        
        // Remove the class after animation completes to allow re-triggering
        setTimeout(() => {
            animatedBox.classList.remove('animate');
        }, 1500);
    });
    
    // Save preferences
    const savePrefBtn = document.getElementById('savePref');
    const themeSelect = document.getElementById('theme');
    
    savePrefBtn.addEventListener('click', function() {
        const selectedTheme = themeSelect.value;
        localStorage.setItem('userTheme', selectedTheme);
        applyTheme(selectedTheme);
        alert('Preferences saved!');
    });
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedTheme = localStorage.getItem('userTheme');
        if (savedTheme) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }
    }
    
    // Apply theme to the page
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'blue');
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Add interactive animations to gallery images
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        // Store original transform for reset
        const originalTransform = img.style.transform;
        
        img.addEventListener('mouseenter', () => {
            // Add a slight delay to make it more interactive
            setTimeout(() => {
                img.style.transition = 'all 0.5s ease';
            }, 50);
        });
        
        img.addEventListener('mouseleave', () => {
            // Reset to original state more slowly
            img.style.transition = 'all 0.8s ease';
            img.style.transform = originalTransform;
            img.style.boxShadow = 'none';
        });
        
        img.addEventListener('click', () => {
            // Create a ripple effect on click
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            img.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Bonus: Add a simple counter with localStorage persistence
    const visitCount = localStorage.getItem('visitCount') || 0;
    localStorage.setItem('visitCount', parseInt(visitCount) + 1);
    console.log(`Page visits: ${parseInt(visitCount) + 1}`);
});
