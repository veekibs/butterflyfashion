const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvvInput = document.getElementById('cvv');
const validateCardBtn = document.getElementById('validate-card');
const cartCountSpan = document.querySelector('.lecart span');

validateCardBtn.addEventListener('click', function() {
  const cardNumberValue = cardNumberInput.value;
  const expiryDateValue = expiryDateInput.value;
  const cvvValue = cvvInput.value;
  
  // Validate card number
  if (!isValidCardNumber(cardNumberValue)) {
    alert('please enter a valid card number.');
    return;
  }
  
  // Validate expiry date
  if (expiryDateValue === "") {
    alert('please enter an expiry date.');
    return;
  }
  
  if (!isValidExpiryDate(expiryDateValue)) {
    alert('please enter a valid expiry date.');
    return;
  }
  
  // Validate CVV
  if (!isValidCVV(cvvValue)) {
    alert('please enter a valid CVV.');
    return;
  }
  
  alert('payment complete!');

  // Redirect to ordercomplete.html
  window.location.href = "ordercomplete.html";
  
});

function isValidCardNumber(cardNumber) {
  // Remove any spaces from the card number
  cardNumber = cardNumber.replace(/\s+/g, '');

  // Validate card number using Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return (sum % 10) == 0;
}

function isValidExpiryDate(expiryDate) {
  // Validate expiry date is in the format MM/YY and is not in the past
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11
  const currentYear = today.getFullYear() % 100; // getFullYear() returns 4-digit year
  const [expiryMonth, expiryYear] = expiryDate.split('/');
  if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
    return false;
  }
  if (parseInt(expiryYear) < currentYear || (parseInt(expiryYear) == currentYear && parseInt(expiryMonth) < currentMonth)) {
    return false;
  }
  return true;
}

function isValidCVV(cvv) {
  // Validate CVV is a 3 or 4-digit number
  const cvvRegex = /^[0-9]{3,4}$/;
  return cvvRegex.test(cvv);
}

const validateCardButton = document.getElementById("validate-card");
validateCardButton.addEventListener("click", function(event) {
  event.preventDefault(); // prevent form submission
  const cardNumber = document.getElementById("card-number").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const cvv = document.getElementById("cvv").value;
  let isValid = true;
  if (!isValidCardNumber(cardNumber)) {
    isValid = false;
    alert("invalid card number");
  }
  if (!isValidExpiryDate(expiryDate)) {
    isValid = false;
    alert("invalid expiry date");
  }
  if (!isValidCVV(cvv)) {
    isValid = false;
    alert("invalid CVV");
  }
  if (isValid) {
    alert("card is valid!");
  }
});
