var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#prev",
    prevEl: "#next",
  },
});

const cartIcon = document.querySelector(".card-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".cart-tab .close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cardValue=document.querySelector(".card-values");
const hamburger=document.querySelector(".hamburger");
const mobileMenu=document.querySelector(".mobile-menu")

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});
hamburger.addEventListener("click",()=>{
  mobileMenu.classList.toggle("mobile-menu-active");
})
let productList = [];
let cartProduct = [];

const updateTotals = () => {
  let totalprice = 0;
  let totalquantity=0

  document.querySelectorAll(".item").forEach((item) => {
    const price = parseFloat(
      item.querySelector(".item-total").textContent.replace("$", "")
    );
    const quantity=parseInt(item.querySelector(".quantity-value").textContent)
    totalprice += price;
    totalquantity+=quantity
  });

  cartTotal.textContent = `$${totalprice.toFixed(2)}`;
  cardValue.textContent= totalquantity

};

const showCard = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-cart", "text-center");

    orderCard.innerHTML = `
      <div class="card-image">
        <img src=${product.image} alt="Burger" />
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn">Add To Cart</a>
    `;

    cardList.appendChild(orderCard);

    let cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      addToCard(product);
    });
  });
};

const addToCard = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);

  if (existingProduct) {
    alert("Item Already in your Cart");
    return;
  }

  cartProduct.push(product);

  const cartItem = document.createElement("div");
  let quantity = 1;

  cartItem.classList.add("item");
  cartItem.innerHTML = `
    <div class="image-container">
      <img src="${product.image}" />
    </div>
    <div class="detail">
      <h4>${product.name}</h4>
      <div class="item-total">${product.price}</div>
    </div>
    <div>
      <div class="flex">
        <a href="#" class="quantity-btn minus">
          <i class="fa-solid fa-minus"></i>
        </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="#" class="quantity-btn plus">
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
    </div>
  `;

  cartList.appendChild(cartItem);
  updateTotals();

  const plusBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");
  let price = parseFloat(product.price.replace("$", ""));

  plusBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$ ${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  const minusBtn = cartItem.querySelector(".minus");

  minusBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `$ ${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        updateTotals();
        cartProduct = cartProduct.filter((item) => item.id !== product.id);
      }, 500);
      
    }
  });
};

const initApp = () => {
  fetch("product.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCard();
    });
};

initApp();
