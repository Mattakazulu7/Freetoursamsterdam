document.addEventListener('DOMContentLoaded', function() {
    // Select all tour links
    const tourLinks = document.querySelectorAll('.tour-link');

    // Add event listener to each tour link
    tourLinks.forEach(function(tourLink) {
        tourLink.addEventListener('click', function(event) {
            // Prevent default behavior of anchor element
            event.preventDefault();

            // Get the tour text from the data-text attribute
            const tourText = tourLink.getAttribute('data-text');

            // Send AJAX request to server-side script
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/addTourEntry', true); // Adjust the URL as per your server-side script
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('Tour entry added to the database successfully.');
                } else {
                    console.error('Failed to add tour entry to the database.');
                }
            };
            xhr.send(JSON.stringify({ tourText: tourText }));
        });
    });
});
