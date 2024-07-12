document.addEventListener("DOMContentLoaded", function() {
    // Select the left banner element
    const leftBanner = document.getElementById('tour-info');
    
    // Create the green panel at the bottom of the screen
    const greenPanel = document.createElement('div');
    greenPanel.classList.add('green-panel');
    document.body.appendChild(greenPanel);

    // Add event listeners to tour thumbnails
    const tourThumbnails = document.querySelectorAll('.tour-image');
    tourThumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
    // Toggle form visibility
    const form = document.querySelector('.booking-form');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        greenPanel.style.display = 'block'; // Show green panel
    } else {
        form.style.display = 'block'; // Always display form on click
        greenPanel.style.display = 'block'; // Show green panel
    }
});

        thumbnail.addEventListener('mouseover', function() {
            // Get the tour number from the data-label attribute
            const tourNumber = thumbnail.getAttribute('data-label');
            let imageSrc, tourText;

            // Determine the image source and tour text based on the tour number
            switch (tourNumber) {
                case 'Tour 1':
                    imageSrc = 'pirateship.jpg';
                    tourText = 'Golden Age Canal tour.\nStarting time: 10am';
                    break;
                case 'Tour 2':
                    imageSrc = 'girlinred.png';
                    tourText = 'Red Light Tour';
                    break;
                case 'Tour 3':
                    imageSrc = 'hallroyal.jpg';
                    tourText = 'Hall Royal Tour';
                    break;
                case 'Tour 4':
                    imageSrc = 'flowerbike.jpg';
                    tourText = 'flower Tour';
                    break;
                case 'Tour 5':
                    imageSrc = 'painter.jpg';
                    tourText = 'painter Tour';
                    break;
                default:
                    imageSrc = '';
                    tourText = '';
            }

          // Display the corresponding image and tour text in the left banner
leftBanner.innerHTML = `<img src="${imageSrc}" alt="${tourText}" style="width: 415px; height: auto;"> <span class="tour-description" style="color: white;">${tourText.replace('\n', '<br>')}</span>`;
        });

        thumbnail.addEventListener('mouseout', function() {
            // Reset the content of the left banner
            leftBanner.textContent = "Tour info here";
        });
    });

    // Create the booking form
    const form = createBookingForm();

    // Position the form inside the green panel
    greenPanel.appendChild(form);
});

// Function to create the booking form
function createBookingForm() {
    // Create the form element
    const form = document.createElement('form');
    form.classList.add('booking-form');
    
    // Create Dropdown selection for tour type
    const tourLabel = document.createElement('label');
    tourLabel.textContent = 'Tour:';
    const tourSelect = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select Tour';
    defaultOption.setAttribute('disabled', true);
    defaultOption.setAttribute('selected', true);
    tourSelect.appendChild(defaultOption);
    const tours = [
        'Golden Age Canal Tour 10am',
        'Golden Age Canal Tour 4pm',
        'Red Light Haunted History 6.30pm',
        'Red Light Haunted History 8.30pm',
        "Rembrandt's Art Tour - Min 4px on Demand",
        "Best of Amsterdam's City Centre 12pm",
        "Best of Amsterdam's City Centre 2pm",
        'Bike Tour - Min 4px on Demand'
    ];
    tours.forEach(function(tour) {
        const option = document.createElement('option');
        option.setAttribute('value', tour);
        option.textContent = tour;
        tourSelect.appendChild(option);
    });

   // Create Dropdown selection for dates
const dateLabel = document.createElement('label');
dateLabel.textContent = 'Select Date:';
const dateSelect = document.createElement('select');
const defaultDateOption = document.createElement('option');
defaultDateOption.textContent = 'Select Date';
defaultDateOption.setAttribute('disabled', true);
defaultDateOption.setAttribute('selected', true);
dateSelect.appendChild(defaultDateOption);

// Get today's date
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = today.getFullYear();
const currentDate = yyyy + '-' + mm + '-' + dd;

// Add date options for the next 7 days
for (let i = 0; i < 40; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const nextDateString = nextDate.toISOString().split('T')[0];
    const option = document.createElement('option');
    option.setAttribute('value', nextDateString);
    option.textContent = nextDateString;
    dateSelect.appendChild(option);
}

// Append date select to the form
form.appendChild(dateLabel);
form.appendChild(dateSelect);

    // Create form inputs
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Enter your name');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', 'Enter your email');
    
    const numberLabel = document.createElement('label');
    numberLabel.textContent = 'Phone Number:';
    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'tel');
    numberInput.setAttribute('placeholder', 'Enter your phone number');
    numberInput.setAttribute('id', 'phone');
    const countrySelect = document.createElement('select');
    const countries = ['+1', '+44', '+61', '+81']; // Example country codes
    countries.forEach(function(country) {
        const option = document.createElement('option');
        option.setAttribute('value', country);
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    const button = document.createElement('button');
    button.textContent = 'Confirm Booking';

    // Append form inputs to the form
    form.appendChild(tourLabel);
    form.appendChild(tourSelect);
    form.appendChild(dateLabel); // Add the label for date selection
    form.appendChild(dateSelect); // Add the dropdown for date selection
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(numberLabel);
    form.appendChild(countrySelect);
    form.appendChild(numberInput);
    form.appendChild(button);
    
 // Add event listener to handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const tour = tourSelect.value;
        const date = dateSelect.value;
        const name = nameInput.value;
        const email = emailInput.value;
        const number = numberInput.value;

        // Create request body
        const data = {
            tour: tour,
            date: date,
            name: name,
            email: email,
            number: number
        };

      // Send data to server
    fetch("http://localhost:3000/confirm-booking", { // Update the URL to match your server endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Booking confirmed successfully
            alert("Booking confirmed successfully!");
        } else {
            // Failed to confirm booking
            alert("Failed to confirm booking.");
        }
    })
    .catch(error => console.error("Error:", error));
});
    return form;
}



