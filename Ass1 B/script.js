
// Sample city data for each state
const citiesByState = {
    andhra_pradesh: ["CityA1", "CityA2", "CityA3"],
    maharashtra: ["Pune", "Sangli", "Kolhapur","Mumbai","Nagpur"],
    west_bengal: ["CityW1", "CityW2", "CityW3"],
    // Add more cities for other states as needed
};

function updateCityOptions() {
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    // Clear existing city options
    citySelect.innerHTML = "";

    // Get selected state
    const selectedState = stateSelect.value;

    // Add cities for the selected state to the city dropdown
    citiesByState[selectedState].forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.text = city;
        citySelect.add(option);
    });
}

function validateForm(event) {
    // Validate ID
    const idInput = document.getElementById('id');
    const idPattern = /^\d{5}$/;
    if (!idPattern.test(idInput.value)) {
        alert('Please enter a valid 5-digit ID.');
        event.preventDefault();
        return false;
    }

    // Validate Name
    const nameInput = document.getElementById('name');
    const namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(nameInput.value)) {
        alert('Name should not contain any number or symbol.');
        event.preventDefault();
        return false;
    }

    // Validate Email
    const emailInput = document.getElementById('email');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return false;
    }

    // Additional validations can be added for other fields if needed

    return true;
}
function validateForm2(event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form fields
    if (!validateForm(event)) {
        return;
    }

    // Get form data
    const formData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        state: document.getElementById('state').value,
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value,
        hobbies: getSelectedHobbies(),
    };

    // Store the registration data in localStorage
    localStorage.setItem('registrationData', JSON.stringify(formData));

    // Redirect to the second page
    window.location.href = 'display-registration.html';
}

// Helper function to get selected hobbies
function getSelectedHobbies() {
    const checkboxes = document.getElementsByName('hobby');
    const selectedHobbies = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedHobbies.push(checkbox.value);
        }
    });

    return selectedHobbies;
}

// Additional functions and code as needed

function validateLogin(event) {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Example: Check if username is not empty
    if (usernameInput.value.trim() === '') {
        alert('Please enter a username.');
        event.preventDefault();
        return false;
    }

    // Example: Check if password is not empty
    if (passwordInput.value.trim() === '') {
        alert('Please enter a password.');
        event.preventDefault();
        return false;
    }

    // Additional validations can be added as needed

    return true;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm()) {

            var id = document.getElementById("iD").value;
            var name = document.getElementById("name").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            var email = document.getElementById("email").value;
            var dob = document.getElementById("dob").value;
            var gender = document.querySelector('input[name="Gender:"]:checked') ? document.querySelector('input[name="Gender"]:checked').value : "";
            var address = document.getElementById("address").value;
            var city = document.getElementById("city").value;
            var pincode = document.getElementById("pincode").value;
            var state = document.getElementById("state").value;
            
            var checkboxes = document.getElementsByTagName('hobbies');



            var user = {
                id: id,
                name: name,
                username: username,
                password: password,
                email: email,
                dob: dob,
                gender: gender,
                address: address,
                city: city,
                pincode: pincode,
                state: state,
                checkboxes:hobbies
            };


            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:5500", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    console.log(xhr.responseText);
                }
            };


            var userJSON = JSON.stringify(user);

            // Send the POST request with user data
            xhr.send(userJSON);


            var users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));


            window.location.href = "display-registration.html";
        }
    });
});
























