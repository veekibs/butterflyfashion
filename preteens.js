// selects all instances of the icon "cart"
let carts = document.querySelectorAll(".cart");

let products = [
  // preteens stock products
  {
    name: "buckle strap flap pocket cargo pants",
    tag: "cargo",
    price: 13,
    inCart: 0
  },
  {
    name: "sun & moon print high waist jeans",
    tag: "jeans",
    price: 24,
    inCart: 0
  },
  {
    name: "butterfly print sweatpants",
    tag: "sweat",
    price: 9,
    inCart: 0
  },
  {
    name: "knot front cargo trousers",
    tag: "poople",
    price: 13,
    inCart: 0
  },
  {
    name: "camo print straight leg jeans",
    tag: "camosplit",
    price: 21,
    inCart: 0
  },
  {
    name: "2pcs contrast tape pleated skirt",
    tag: "yuigoh",
    price: 20,
    inCart: 0
  },
  {
    name: "heart print jeans",
    tag: "heartprintj",
    price: 21,
    inCart: 0
  },
  {
    name: "allover heart print flare leg pants",
    tag: "heartflare",
    price: 8,
    inCart: 0
  },
  {
    name: "plaid & letter graphic drop shoulder shirt",
    tag: "greenplaid",
    price: 16,
    inCart: 0
  },
  {
    name: "colourblock raglan tee",
    tag: "bp",
    price: 11,
    inCart: 0
  },
  {
    name: "turtleneck lantern sleeve sweater",
    tag: "sweater",
    price: 14,
    inCart: 0
  },
  {
    name: "skull & floral print drop shoulder drawstring thermal costume hoodie",
    tag: "shood",
    price: 13,
    inCart: 0
  },
  {
    name: "ditsy floral print frill trim cami top",
    tag: "ditsy",
    price: 11,
    inCart: 0
  },
  {
    name: "2 in 1 graphic printed tee",
    tag: "animegal",
    price: 7,
    inCart: 0
  },
  {
    name: "floral & letter graphic drop shoulder zip up hoodie",
    tag: "ghood",
    price: 12,
    inCart: 0
  },
  {
    name: "mock neck crisscross hem tee",
    tag: "smile",
    price: 7,
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