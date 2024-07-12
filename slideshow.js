//slideshow
document.addEventListener("DOMContentLoaded", function() {
    const slideshow = document.querySelector('.slideshow');
    const slides = slideshow.querySelectorAll('img');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        slides[n].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Show the first slide initially
    showSlide(currentSlide);

    // Automatically switch to the next slide every 3 seconds
    setInterval(nextSlide, 3000);
});

