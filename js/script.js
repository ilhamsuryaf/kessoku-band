// navbar
const navbarNav = document.querySelector(".navbar-nav");

document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    } else {
      entry.target.classList.remove("reveal");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// member
const memberBtn = document.querySelectorAll(".member-button");
const memberShow = document.querySelectorAll(".member-showcase");
const bandMember = document.querySelector("#band-member");

for (let i = 0; i < memberBtn.length; i++) {
  memberBtn[i].onclick = () => {
    memberShow[i].classList.toggle("show");
  };

  document.addEventListener("click", function (e) {
    if (!memberBtn[i].contains(e.target)) {
      memberShow[i].classList.remove("show");
    }
  });
}

let currentShow = 0;
let memberSlides;
let isMemberShow = false;
function memberSlideShow() {
  memberShow.forEach((memberShow) => memberShow.classList.remove("show"));
  memberShow[currentShow].classList.toggle("show");
  currentShow++;
  if (currentShow >= memberShow.length) {
    currentShow = 0;
  }
}

function memberStartSlides() {
  if (!isMemberShow) {
    isMemberShow = true;
    memberSlides = setInterval(memberSlideShow, 2000);
  }
}

function memberStopSlides() {
  clearInterval(memberSlides);
  isMemberShow = false;
}

memberStartSlides();

memberBtn.forEach((btn) => {
  btn.addEventListener("click", memberStopSlides);
});

bandMember.addEventListener("click", memberStartSlides);

// gig

let today = new Date();
const gigDate = document.querySelectorAll(".gig-date");

let futureDate = new Date(today);
futureDate.setDate(today.getDate() + 5);

let options = {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
};
let dateString = futureDate.toLocaleDateString("en-GB", options);

for (let i = 0; i < gigDate.length; i++) {
  gigDate[i].textContent = dateString;
}

// sidecart

const ITEMS = [
  {
    id: 1,
    name: "Kessoku Band 1<sup>st</sup> Album Vinyl",
    price: "30",
    image: "image/merch-vinyl.jpg",
    qty: 1,
  },
  {
    id: 2,
    name: "Kessoku Band 1<sup>st</sup> Album CD",
    price: "15",
    image: "image/merch-cd.jpg",
    qty: 1,
  },
  {
    id: 3,
    name: "Kessoku Band 1<sup>st</sup> Album Tape",
    price: "15",
    image: "image/merch-cassette.jpg",
    qty: 1,
  },
  {
    id: 4,
    name: "Kessoku Band T-shirt",
    price: "25",
    image: "image/merch-tshirt.jpg",
    qty: 1,
  },
  {
    id: 5,
    name: "Kessoku Band Bracelet",
    price: "10",
    image: "image/merch-zip.jpg",
    qty: 1,
  },
];

const cartBtn = document.getElementById("cart");
const cartClose = document.getElementById("cart-close");
const cart = document.getElementById("sidecart");
const merchItems = document.querySelector(".merch-items");
const cartItems = document.querySelector(".cart-items");
const itemNum = document.getElementById("items-num");
const subtotalPrice = document.getElementById("subtotal-price");

let cartData = [];

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
renderMerch();
renderCartItems();

// add items to cart

function addItem(idx, itemId) {
  // find same item
  const foundedItem = cartData.find(
    (item) => item.id.toString() === itemId.toString()
  );

  if (foundedItem) {
    // increase item qty
    increaseQty(itemId);
  } else {
    cartData.push(ITEMS[idx]);
  }
  updateCart();
  openCart();
}
// remove cart item

function removeCartItem(itemId) {
  cartData = cartData.filter((item) => item.id != itemId);
  updateCart();
}

// increase qty
function increaseQty(itemId) {
  cartData = cartData.map((item) =>
    item.id.toString() === itemId.toString()
      ? { ...item, qty: item.qty + 1 }
      : item
  );
  updateCart();
}
// decrease qty
function decreaseQty(itemId) {
  cartData = cartData.map((item) =>
    item.id.toString() === itemId.toString()
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty }
      : item
  );
  updateCart();
}

// calculate items number
function calcItemsNum() {
  let itemsCount = 0;

  cartData.forEach((item) => (itemsCount += item.qty));

  itemNum.innerText = itemsCount;
}

// calculate subtotal price
function calcSubtotal() {
  let subtotal = 0;
  cartData.forEach((item) => (subtotal += item.price * item.qty));

  subtotalPrice.innerText = subtotal;
}

// render merch
function renderMerch() {
  ITEMS.forEach((item, idx) => {
    const merchItem = document.createElement("div");
    merchItem.classList.add("merch-item");
    merchItem.innerHTML = `
    <img src="${item.image}" alt="" />
    <p>${item.name}</p>
    <p>$ ${item.price}</p>
    <button class="cart-add" onclick="addItem(${idx}, '${item.id}')">Add to Cart</button>
    `;
    merchItems.appendChild(merchItem);
    const AddToCart = document.querySelectorAll(".cart-add");
    for (let i = 0; i < AddToCart.length; i++) {
      AddToCart[i].addEventListener("click", (e) => {
        cart.classList.add("open");
      });
    }
  });
}

// open cart

function openCart() {
  cart.classList.toggle("open");
}

// close cart

function closeCart() {
  cart.classList.remove("open");
}

// render cart

function renderCartItems() {
  cartItems.innerHTML = "";
  cartData.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
    <div class="remove-item" onclick="removeCartItem(${item.id})">
                <span>&times;</span>
              </div>
              <div class="item-img">
                <img src="${item.image}" alt="" />
              </div>
              <div class="item-details">
                <p>${item.name}</p>
                <strong>$ ${item.price}</strong>
                <div class="qty">
                  <span onclick="decreaseQty(${item.id})">-</span>
                  <strong>${item.qty}</strong>
                  <span onclick="increaseQty(${item.id})">+</span>
                </div>
              </div>
    `;
    cartItems.appendChild(cartItem);
  });
}

function updateCart() {
  renderCartItems();
  calcItemsNum();
  calcSubtotal();
}
