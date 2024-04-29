function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  const cartTable = document.getElementById("cart-table-checkout");
  let cartCost = 0;

  if (cartItems && cartTable) {
    cartTable.innerHTML = '';
    
    // Create header row
    const headerRow = cartTable.insertRow(-1);
    const headerImageCell = headerRow.insertCell(0);
    headerImageCell.textContent = "image";
    const headerNameCell = headerRow.insertCell(1);
    headerNameCell.textContent = "product";
    const headerPriceCell = headerRow.insertCell(2);
    headerPriceCell.textContent = "price";
    const headerQuantityCell = headerRow.insertCell(3);
    headerQuantityCell.textContent = "quantity";
    const headerSubtotalCell = headerRow.insertCell(4);
    headerSubtotalCell.textContent = "subtotal";

    Object.values(cartItems).forEach(function(item) {
      const row = cartTable.insertRow(-1);
      row.dataset.tag = item.tag; // Add data-tag attribute
      const imageCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      nameCell.classList.add('product-name'); // add class name to target with CSS
      const priceCell = row.insertCell(2);
      const quanCell = row.insertCell(3);
      const subCell = row.insertCell(4);
      
      imageCell.innerHTML = '<img src="./clothes/' + item.tag + '.jpg" style="width: 150px; height: 200px;">';
      nameCell.textContent = item.name;
      priceCell.textContent = item.price.toFixed(2);
      quanCell.innerHTML = item.inCart;
      subCell.textContent = (item.inCart * item.price).toFixed(2);
    });
  }
}

displayCart();

function validateFirstName(firstName) {
  if (firstName.trim() == "") {
    return "please enter your first name.";
  } else if (!/^[a-zA-Z]+$/.test(firstName)) {
    return "please enter a valid first name.";
  }
  return true;
}

function validateLastName(lastName) {
  if (lastName.trim() == "") {
    return "please enter your last name.";
  } else if (!/^[a-zA-Z]+$/.test(lastName)) {
    return "please enter a valid last name.";
  }
  return true;
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/; // regular expression to match a 10-digit phone number
  if (!phoneNumber) {
    return "please enter a phone number.";
  } else if (!phoneRegex.test(phoneNumber)) {
    return "please enter a valid 10-digit phone number.";
  }
  return true;
}

// validate uk postcode using an API
function validateUKPostcode(postcode) {
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

  if (!postcodeRegex.test(postcode)) {
    return Promise.reject("please enter a valid UK postcode");
  }

  return fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`)
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        return Promise.reject("please enter a valid UK postcode");
      }
      return Promise.resolve(true);
    })
    .catch(error => {
      return Promise.reject("error validating UK postcode");
    });
}

// validate uk address using regex
function validateUKAddress(postcode, address1, town, city) {
  const addressRegex = /^[A-Za-z0-9\s\-,'&]*$/i;
  const townRegex = /^[A-Za-z\s]*$/i;
  const cityRegex = /^[A-Za-z\s]*$/i;

  if (!addressRegex.test(address1)) {
    throw new Error("please enter a valid street address");
  }

  if (!townRegex.test(town)) {
    throw new Error("please enter a valid town name");
  }

  if (!cityRegex.test(city)) {
    throw new Error("please enter a valid city name");
  }

  return true;
}

// validate email using regex
function validateEmail(email) {
  // Regular expression to validate the email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "please enter a valid email address";
  }
  return true;
}

function validateFormAndProceed(event) {
  // Get the input fields for the shipping address form
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");
  var phonenum = document.getElementById("phonenum");
  var address1 = document.getElementById("address1");
  var email = document.getElementById("email");
  var town = document.getElementById("town");
  var city = document.getElementById("city");
  var postcode = document.getElementById("postcode");

  // Validate the first name
  var firstNameValidation = validateFirstName(fname.value);
  if (firstNameValidation !== true) {
    alert(firstNameValidation);
    event.preventDefault();
    return;
  }

  // Validate the last name
  var lastNameValidation = validateLastName(lname.value);
  if (lastNameValidation !== true) {
    alert(lastNameValidation);
    event.preventDefault();
    return;
  }

  // Validate the phone number
  var phoneNumberValidation = validatePhoneNumber(phonenum.value);
  if (phoneNumberValidation !== true) {
    alert(phoneNumberValidation);
    event.preventDefault();
    return;
  }

  // validate the email
  var emailValidation = validateEmail(email.value);
  if (emailValidation !== true) {
    alert(emailValidation);
    event.preventDefault();
    return;
  }

  // Validate the postcode
  var postcodeValidation = validateUKPostcode(postcode.value);
  postcodeValidation.then(result => {
    // If the postcode is valid, continue with the form validation
    // Validate the address, town, and city
    // Use the regex validation function for the address validation
    var addressValidation = validateUKAddress(address1.value, town.value, city.value);
    if (addressValidation !== true) {
      alert(addressValidation);
      event.preventDefault();
      return;
    } else {
      // If the address, town, and city are valid, redirect to the next page
      window.location.href = "pay.html";
    }
  })
  .catch(error => {
    alert(error);
    event.preventDefault();
    return;
  });
}

// Attach the submit event listener to the form
document.querySelector('form').addEventListener('submit', function(event) {
  validateFormAndProceed(event);
});
