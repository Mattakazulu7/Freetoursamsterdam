document.addEventListener("DOMContentLoaded", function() {
    // Select the left banner element
    const leftBanner = document.getElementById('tour-info');
    const carouselContainer = document.querySelector('.carousel-container');

    // Add event listener for mouseover on tour thumbnails
    const tourThumbnails = document.querySelectorAll('.tour-image');
    tourThumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('mouseover', function() {
            displayTourInfo(thumbnail, leftBanner);
        });
    });
});

// Function to display tour information on mouseover
function displayTourInfo(thumbnail, leftBanner) {
    // Get the tour number from the data-label attribute
    const tourNumber = thumbnail.getAttribute('data-label');
    let imageSrc, tourText;

    // Determine the image source and tour text based on the tour number
    switch (tourNumber) {
      case 'Canal Tour':
    imageSrc = 'pirateship.jpg';
    tourText = '<h2>Golden Age Canal Tour</h2>\n'
             + '<ul>'
             + '<li>Starting time: 10am</li>'
             + '<li>Meeting point: Canal Tours Office</li>'
             + '<li>Tour type: Canal Tour</li>'
             + '<li>Duration: 2 hours</li>'
             + '</ul>';
    break;



        case 'Red Light Tour':
            imageSrc = 'girlinred.png';
            tourText = 'Red Light Tour';
            break;
        case 'City Tour':
            imageSrc = 'hallroyal.jpg';
            tourText = 'Hall Royal Tour';
            break;
        case 'Bike Tour':
            imageSrc = 'flowerbike.jpg';
            tourText = 'flower Tour';
            break;
        case 'Art Tour':
            imageSrc = 'painter.jpg';
            tourText = 'painter Tour';
            break;
        default:
            imageSrc = '';
            tourText = '';
    }

    // Display the corresponding image and tour text in the left banner
    leftBanner.innerHTML = `
        <img src="${imageSrc}" alt="${tourText}" class="banner-image">
        <ul class="tour-text">
            <li>${tourText}</li>
        </ul>
    `;

    // Make the left banner and carousel container visible
    leftBanner.style.visibility = 'visible';
    leftBanner.style.opacity = 1;
    carouselContainer.style.visibility = 'visible';
    carouselContainer.style.opacity = 1;
}

