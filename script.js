// select all instances of the icon "cart" and "delete"
let carts = document.querySelectorAll(".cart");
let deletes = document.querySelectorAll(".delete");

// an array of the products on the index page
let products = [
  {
    name: "floral & slogan graphic drawstring thermal lined hoodie",
    tag: "blue hoodie",
    price: 12,
    inCart: 0
  },
  {
    name: "buffalo plaid zip up dual pocket hooded teddy jacket",
    tag: "teddy front",
    price: 20,
    inCart: 0
  },
  {
    name: "letter & floral print jeans",
    tag: "flower jeans",
    price: 19,
    inCart: 0
  },
  {
    name: "letter print striped trim drop shoulder sweatshirt dress",
    tag: "brown",
    price: 15,
    inCart: 0
  },
  {
    name: "panda & heart embroidery drop shoulder teddy jacket",
    tag: "panda jacket",
    price: 21,
    inCart: 0
  },
  {
    name: "japanese letter & figure graphic hoodie dress",
    tag: "anime",
    price: 15,
    inCart: 0
  },
  {
    name: "letter graphic kangaroo pocket drawstring thermal hoodie",
    tag: "cool",
    price: 14,
    inCart: 0
  },
  {
    name: "brown plaid print mini skirt",
    tag: "skirt",
    price: 5,
    inCart: 0
  },
  {
    name: "letter patched striped trim cricket sweater vest",
    tag: "vest",
    price: 11,
    inCart: 0
  },
  {
    name: "letter graphic contrast collar thermal lined sweatshirt",
    tag: "blokecore",
    price: 17,
    inCart: 0
  },
  {
    name: "shawl collar contrast teddy PU leather coat",
    tag: "shawl",
    price: 40,
    inCart: 0
  },
  {
    name: "bear pattern teddy trousers",
    tag: "lol",
    price: 18,
    inCart: 0
  },
  {
    name: "drop shoulder 3D ear teddy hoodie",
    tag: "teddy",
    price: 11,
    inCart: 0
  },
  {
    name: "fuzzy trim open front coat",
    tag: "fuzzy",
    price: 35,
    inCart: 0
  },
  {
    name: "floral print straight leg jeans",
    tag: "floral",
    price: 15,
    inCart: 0
  },
  {
    name: "checkered & heart pattern sweater vest without tee",
    tag: "vestie",
    price: 10,
    inCart: 0
  }, 
]

function totalCost() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let cartCost = 0;

  if (cartItems) {
    for (let item in cartItems) {
      cartCost += cartItems[item].price * cartItems[item].inCart;
    }
  }

  localStorage.setItem("totalCost", cartCost.toFixed(2));
}

// adds a click event and for loop
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    // on click, the properties of the products in the array are accessed
    cartNumbers(products[i]);
    totalCost();
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".lecart span").textContent = productNumbers;
  }

  // count the total quantity of items in the cart
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let totalQuantity = 0;
  if (cartItems) {
    Object.values(cartItems).forEach(function(item) {
      totalQuantity += item.inCart;
    });
  }

  // update the number next to the shopping cart item
  let cartItem = document.querySelector(".lecart span");
  if (cartItem) {
    cartItem.innerHTML = `<span>${totalQuantity}</span>`;
  }

  totalCost();
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".lecart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".lecart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("my cart items are ", cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

let removeButtons = document.querySelectorAll(".delete");
// iterates over each element in the removeButtons array
for (let i = 0; i < removeButtons.length; i++) {
  // selects the current element and assigns it to the button variable
  let button = removeButtons[i];
  button.addEventListener("click", () => {
    let productTag = button.parentElement.parentElement.getAttribute("data-tag");
    removeItem(productTag);
    // removes the parent element of the button element (which is the row in the table) from the DOM
    button.parentElement.parentElement.remove();
    totalCost(); // call totalCost after removing an item from the cart
  });
}

function updateCartCountAndTotalCost() {
  // gets the "productsInCart" data from local storage and parses it into a JavaScript object, which is then stored in the cartItems variable
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let cartCount = 0;
  let totalCost = 0;
  if (cartItems) {
    for (let item in cartItems) {
      // dds the value of the "inCart" property of the current item to the cartCount variable
      cartCount += cartItems[item].inCart;
      totalCost += cartItems[item].price * cartItems[item].inCart;
    }
  }
  localStorage.setItem("cartNumbers", cartCount);
  // updates the number next to the shopping bag icon in the header to cartCount
  document.querySelector(".lecart span").textContent = cartCount;
  document.querySelector(".total-cost").textContent = "£" + (isNaN(parseFloat(localStorage.getItem("totalCost"))) ? 0 : parseFloat(localStorage.getItem("totalCost"))).toFixed(2);
}

function updateTotalCost(cartItems) {
  let cartCost = 0;

  // iterates through each item in the cartItems object and adds the product of item.inCart (the quantity of the item) and item.price (the price of the item) to cartCost
  Object.values(cartItems).forEach(function(item) {
    cartCost += item.inCart * item.price;
  });

  // sets the value of cartCost to the totalCost key in local storage, rounded to two decimal places
  localStorage.setItem("totalCost", cartCost.toFixed(2));
  const totalCostElement = document.querySelector(".totalCost span");
  if (totalCostElement) {
    totalCostElement.textContent = cartCost.toFixed(2);
  }
}

function updateCartNumbers() {
  // retrieves the productsInCart object from local storage and initializes an empty object if productsInCart is null or undefined
  const cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
  let totalItems = 0;
  for (let key in cartItems) {
    totalItems += cartItems[key].inCart;
  }
  // sets the text content of the number next to the shopping bag icon to totalItems
  document.querySelector('.lecart span').textContent = totalItems;
}

function removeItem(productTag) {
  // retrieves the current shopping cart data from local storage and assigns it to a variable, after parsing it from a JSON string to a JavaScript object
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  // checks if cartItems exists and if it contains an object with a key that matches the productTag parameter
  if (cartItems && cartItems[productTag]) {
    let item = cartItems[productTag];
    const itemPrice = item.price;

    // checks if the inCart property of the item object is greater than 1
    if (item.inCart > 1) {
      const quantity = item.inCart; // Save the quantity of the item
      item.inCart = 1; // Set the quantity to 1
      // updates the cartItems object with the modified item object
      cartItems[productTag] = item;
      // saves the updated cartItems object back to local storage as a JSON string
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      // retrieves the current value of the cartNumbers key from local storage, parses it as an integer, and assigns it to a variable
      let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
      // updates the cartNumbers key in local storage with the new quantity of items in the cart
      localStorage.setItem("cartNumbers", productNumbers - quantity + 1);
      // updates the text content of the shopping bag icon in the header with the new quantity of items in the cart
      document.querySelector(".lecart span").textContent = productNumbers - quantity + 1;

      displayCart();
    } else {
      delete cartItems[productTag];
      // saves the updated cartItems object back to local storage as a JSON string
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      // retrieves the current value of the cartNumbers key from local storage, parses it as an integer, and assigns it to a variable
      let productNumbers = parseInt(localStorage.getItem("cartNumbers"));
      localStorage.setItem("cartNumbers", productNumbers - 1);
      document.querySelector(".lecart span").textContent = productNumbers - 1;

      displayCart();
    }

    updateTotalCost(cartItems);
  }
}

// retrieves the items from local storage and returns them as an array
function getCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  return cartItems ? Object.values(cartItems) : [];
}



// displays cart on cart.html page
function displayCart() {
  // retrieves the items that have been added to the cart from local storage and parses them from a JSON string into a JavaScript object
  const cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  const cartTable = document.getElementById("cart-table");
  let cartCost = 0;

  if (cartItems && cartTable) { // checks if the cart has items and if the cart table HTML element exists
    cartTable.innerHTML = ''; // clears the existing HTML content of the cart table

    Object.values(cartItems).forEach(function(item) { // loops through each item in the cart using the forEach() method of the Object.values() function
      const row = cartTable.insertRow(); // creates a new row in the cart table
      row.dataset.tag = item.tag; // add data-tag attribute
      const removeCell = row.insertCell(0); // creates a new cell in the row for the remove button
      const imgCell = row.insertCell(1); // creates a new cell in the row for the item's image
      const proCell = row.insertCell(2); // creates a new cell in the row for the item's name
      proCell.classList.add('product-name'); // add class name to target with CSS
      const priCell = row.insertCell(3); // creates a new cell in the row for the item's price
      const quanCell = row.insertCell(4); // creates a new cell in the row for the item's quantity
      const subCell = row.insertCell(5); // creates a new cell in the row for the item's subtotal

      // sets the remove button cell's HTML content to an icon for a close circle with a CSS class "delete"
      removeCell.innerHTML = '<ion-icon name="close-circle" class="delete"></ion-icon>';
      //  sets the item image cell's HTML content to an image with a path based on the item's tag, with width and height styles
      imgCell.innerHTML = '<img src="./clothes/' + item.tag + '.jpg" style="width: 150px; height: 200px;">';
      // sets the name cell's text content to the item's name
      proCell.textContent = item.name;
      // sets the price cell's text content to the item's price with two decimal places
      priCell.textContent = item.price.toFixed(2);
      // sets the quantity cell's HTML content to the quantity of the item in the cart
      quanCell.innerHTML = item.inCart;
      // sets the subtotal cell's text content to the total cost of the item (quantity * price) with two decimal places
      subCell.textContent = (item.inCart * item.price).toFixed(2);

      // Add event listener to delete button
      removeCell.addEventListener("click", function() {
        // Remove item from cart in localStorage
        const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        delete productsInCart[item.tag];
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

        // Update cart table
        displayCart();
        onLoadCartNumbers();
      });

      // Update cart cost
      cartCost += item.price * item.inCart;
    });

    // Check if cart is empty and set cost accordingly
    if (Object.keys(cartItems).length === 0) {
      cartCost = 0;
    } else {
      cartCost = parseFloat(cartCost).toFixed(2);
    }

    cartTable.innerHTML += '<tr><td colspan="4"></td><td>basket total</td><td>£' + cartCost + '</td></tr>';
  }
}

// This function only runs if user is on cart.html page
if (window.location.pathname.includes("cart.html")) {
  displayCart();
}

onLoadCartNumbers();

// for choose charity button
var x, i, j, l, ll, selElmnt, a, b, c;

// looks for any elements with the class "charity-select"
x = document.getElementsByClassName("charity-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  // for each element, creates a new DIV that will act as the selected item
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  // for each element, creates a new DIV that will contain the option list
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    // for each option in the original select element create a new DIV that will act as an option item
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        // when an item is clicked, update the original select box and the selected item
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    // when the select box is clicked, close any other select boxes, and open/close the current select box
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  // closes all select boxes in the document, except the current select box
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

// if the user clicks anywhere outside the select box, then close all select boxes
document.addEventListener("click", closeAllSelect);