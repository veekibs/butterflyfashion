// selects all instances of the icon "cart"
let carts = document.querySelectorAll(".cart");

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

// adds a click event and for loop 
for (let i=0; i < carts.length; i++){
  carts[i].addEventListener("click", () => {
    // on click, the properties of the products in the array are accessed
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

// adds a local storage function so when the page is reloaded the cart number loads as well so it stays consistently the same no matter what page/reloading
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem("cartNumbers");

  if(productNumbers){
    document.querySelector(".lecart span").textContent = productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".lecart span").textContent = productNumbers + 1;
  }else{
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".lecart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  console.log("my cart items are ", cartItems);
  if(cartItems != null){
    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// total cost function to work out the price of everything in the cart
function totalCost(product){
  //console.log("the product price is ", product.price);
  let cartCost = localStorage.getItem("totalCost");
  console.log("my cart cost is ", cartCost);
  console.log(typeof cartCost);
  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }else{
    localStorage.setItem("totalCost", product.price);
  }
}

onLoadCartNumbers();