document.addEventListener('DOMContentLoaded', function() {
    const suggestionsBtn = document.getElementById('FAQs-btn');
    const leftBanner = document.querySelector('.left-banner');

    suggestionsBtn.addEventListener('click', function() {
        // Clear the left banner
        leftBanner.innerHTML = '';

        // Display 3 specific FAQs
        const faqs = [
            "What if it rains?",
            "Which city am I in?",
            "Is it safe?"
        ];

        faqs.forEach((faq, index) => {
            if (index < 3) {
                const faqElement = document.createElement('div');
                faqElement.textContent = faq;
                leftBanner.appendChild(faqElement);
            }
        });
    });
});
