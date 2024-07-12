document.addEventListener("DOMContentLoaded", function() {
    // Create the green panel at the bottom of the screen
    const greenPanel = document.createElement('div');
    greenPanel.classList.add('green-panel');
    document.body.appendChild(greenPanel);

    // Create the booking form
    const form = createBookingForm();

    // Position the form inside the green panel
    greenPanel.appendChild(form);

  
    // Always display the green panel and booking form
    greenPanel.style.display = 'block';
    form.style.display = 'block';
});
// Function to create the booking form
function createBookingForm() {
    // Create the form element
    const form = document.createElement('form');
    form.classList.add('booking-form');
   
   
    
    // Create the "Book Here" button
    const bookButton = document.createElement('button');
    bookButton.textContent = 'Book Here';
    form.appendChild(bookButton);

    // Add event listener for the "Book Here" button
    bookButton.addEventListener('click', () => {
        // Remove the "Book Here" button
        form.removeChild(bookButton);
        
     
 // Create the "Close" button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('close-button');
    form.appendChild(closeButton);
   
        
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

const numberInputContainer = document.createElement('div');
numberInputContainer.classList.add('phone-input-container');

const numberInput = document.createElement('input');
numberInput.setAttribute('type', 'tel');
numberInput.setAttribute('placeholder', 'Enter your phone number');
numberInput.setAttribute('id', 'phone');
numberInputContainer.appendChild(numberInput);

const countrySelect = document.createElement('select');
countrySelect.setAttribute('id', 'country-code');
const countries = ['+1', '+44', '+61', '+81'];
countries.forEach(function(country) {
    const option = document.createElement('option');
    option.setAttribute('value', country);
    option.textContent = country;
    countrySelect.appendChild(option);
});

   
   // Create Dropdown selection for number of people
const peopleLabel = document.createElement('label');
peopleLabel.textContent = 'Number of People: please select';
const peopleSelect = document.createElement('select');
const defaultPeopleOption = document.createElement('option');
defaultPeopleOption.textContent = 'number of people';
defaultPeopleOption.setAttribute('disabled', true);
defaultPeopleOption.setAttribute('selected', true);
peopleSelect.appendChild(defaultPeopleOption);
const peopleOptions = [1, 2, 3, 4, 5]; // Example options, adjust as needed
peopleOptions.forEach(function(num) {
    const option = document.createElement('option');
    option.setAttribute('value', num);
    option.textContent = num;
    peopleSelect.appendChild(option);
});
    // Create Dropdown selection for language
    const languageLabel = document.createElement('label');
    languageLabel.textContent = 'Language:';
    const languageSelect = document.createElement('select');
    const languageOptions = ['English', 'Dutch', 'Spanish', 'French']; 
    // Example options, adjust as needed
    languageOptions.forEach(function(lang) {
        const option = document.createElement('option');
        option.setAttribute('value', lang);
        option.textContent = lang;
        languageSelect.appendChild(option);
    });
    
// Create the "Confirm Booking" button
const button = document.createElement('button');
// Set the text content of the button to "Confirm Booking"
button.textContent = 'Confirm Booking';
   
    // Append all form elements to the form
    form.appendChild(tourLabel);
    form.appendChild(tourSelect);
    form.appendChild(dateLabel);
    form.appendChild(dateSelect);
    form.appendChild(peopleLabel);
    form.appendChild(peopleSelect);
    form.appendChild(languageLabel);
    form.appendChild(languageSelect);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(numberLabel);
    form.appendChild(countrySelect);
    form.appendChild(numberInput);
    form.appendChild(button);
    
    // Add event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3000/submit-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObj)
        });
        if (response.ok) {
            alert('Booking Submitted Successfully');
            form.reset();
        } else {
            throw new Error('Failed to submit booking');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to submit booking. Please try again later.');
    }
});
   
    
    // Add event listener for the "Close" button
    closeButton.addEventListener('click', () => {
    
        // Remove all previous form elements
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
        // Re-add the "Book Here" button when the "Close" button is clicked
        form.appendChild(bookButton);
        
        // Remove the "Close" button
        form.removeChild(closeButton);
        
     
        
        
    });
  });
  
    
    return form;
    
}

