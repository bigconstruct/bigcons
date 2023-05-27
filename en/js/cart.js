
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};


if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {

  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("To pick up the order, call the number that will be redirected automatically after confirmation");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("The product already exists in the basket");
      return;
    }
  }
  var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  // adaugam elementele cosului intr un array
  var cartArray = [];
  var cartItems = document.querySelectorAll(".cart-box");
  cartItems.forEach((item) => {
    var cartItem = {
      title: item.querySelector(".cart-product-title").textContent,
      price: item.querySelector(".cart-price").textContent,
      img: item.querySelector(".cart-img").src,
      quantity: item.querySelector(".cart-quantity").value,
    };
    cartArray.push(cartItem);
  });

  // salvam array-ul in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartArray));
}
if (localStorage.getItem("cartItems")) {
  var cartArray = JSON.parse(localStorage.getItem("cartItems"));
  cartArray.forEach((item) => {
    addProductToCart(item.title, item.price, item.img);
    var cartQuantityInputs = document.querySelectorAll(".cart-quantity");
    cartQuantityInputs.forEach((input) => {
      if (input.previousSibling.previousSibling.textContent == item.title) {
        input.value = item.quantity;
      }
    });
  });
  updatetotal();
}
    
function removeCartItem(event) {
  var buttonClicked = event.target;
  var cartItem = buttonClicked.parentElement;
  var title = cartItem.getElementsByClassName("cart-product-title")[0].innerText;
  cartItem.remove();
  removeFromCart(title);
  updatetotal();
}

function removeFromCart(title) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].title == title) {
      cartItems.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}