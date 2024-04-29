// selects all instances of the icon "cart"
let carts = document.querySelectorAll(".cart");

// an array of the products on the new arrivals page
let products = [
  // new arrivals stock products
  {
    name: "butterfly print cami top & zip up hoodie & sweatpants",
    tag: "cami set",
    price: 26,
    inCart: 0
  },
  {
    name: "sun & moon print high waist jeans",
    tag: "jeans",
    price: 24,
    inCart: 0
  },
  {
    name: "high neck solid tee",
    tag: "turtleneck",
    price: 5,
    inCart: 0
  },{
    name: "puff sleeve zip up dress",
    tag: "puff",
    price: 12,
    inCart: 0
  },
  {
    name: "striped & floral patched lettuce trim tee",
    tag: "flopo",
    price: 7,
    inCart: 0
  },
  {
    name: "mock neck letter embroidery top & trousers",
    tag: "brownie",
    price: 25,
    inCart: 0
  },
  {
    name: "camo print drop shoulder pullover & leggings",
    tag: "army",
    price: 14,
    inCart: 0
  },
  {
    name: "v neck ribbed knit dress with belt",
    tag: "dress",
    price: 11,
    inCart: 0
  },
  {
    name: "star print contrast tape side sweatpants",
    tag: "star sweatpants",
    price: 16,
    inCart: 0
  },
  {
    name: "high waist tie front flap pocket cargo jeans",
    tag: "cjeans",
    price: 25,
    inCart: 0
  },
  {
    name: "letter patched striped trim bomber jacket & sweatpants",
    tag: "bomber jacket",
    price: 27,
    inCart: 0
  },
  {
    name: "ripped cut out straight leg jeans",
    tag: "rjeans",
    price: 24,
    inCart: 0
  },
  {
    name: "solid ribbed knit crop knit top & knit leggings & duster cardigan",
    tag: "justbrown",
    price: 30,
    inCart: 0
  },
  {
    name: "figure graphic drop shoulder zip up drawstring hoodie",
    tag: "hoodie",
    price: 17,
    inCart: 0
  },
  {
    name: "letter graphic contrast collar crop tee",
    tag: "croptee",
    price: 15,
    inCart: 0
  },
  {
    name: "letter graphic drop shoulder tee",
    tag: "tee",
    price: 11,
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