let cart = JSON.parse(localStorage.getItem("gadmarketCart")) || [];
let total = Number(localStorage.getItem("gadmarketTotal")) || 0;
let quantity = 1;

function saveCart() {
  localStorage.setItem("gadmarketCart", JSON.stringify(cart));
  localStorage.setItem("gadmarketTotal", total);
}

function addToCart(name, price) {
  cart.push({
    name: name,
    price: price,
    quantity: 1
  });

  total += price;
  saveCart();
  updateCart();

  const panel = document.getElementById("cartPanel");
  if (panel) {
    panel.classList.add("active");
  }
}

function addToCartWithQuantity(name, price) {
  const itemQuantity = quantity;

  cart.push({
    name: name,
    price: price,
    quantity: itemQuantity
  });

  total += price * itemQuantity;
  saveCart();
  updateCart();

  const panel = document.getElementById("cartPanel");
  if (panel) {
    panel.classList.add("active");
  }
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !totalPrice || !cartCount) return;

  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <strong>${item.name}</strong>
      <p>Adet: ${item.quantity}</p>
      <p>₺${formatPrice(item.price * item.quantity)}</p>
      <button onclick="removeFromCart(${index})">Sil</button>
    `;

    cartItems.appendChild(div);
  });

  totalPrice.textContent = formatPrice(total);

  let count = 0;
  cart.forEach(function(item) {
    count += item.quantity;
  });

  cartCount.textContent = count;
}

function removeFromCart(index) {
  total -= cart[index].price * cart[index].quantity;
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function toggleCart() {
  const panel = document.getElementById("cartPanel");
  if (panel) {
    panel.classList.toggle("active");
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Sepetiniz boş!");
    return;
  }

  window.location.href = "checkout.html";
}

  let message = "Merhaba, GadMarket sitesinden sipariş vermek istiyorum:\n\n";

  cart.forEach(function(item) {
    message += "- " + item.name + " | Adet: " + item.quantity + " | ₺" + formatPrice(item.price * item.quantity) + "\n";
  });

  message += "\nToplam: ₺" + formatPrice(total);

  window.open("https://wa.me/905514753938?text=" + encodeURIComponent(message), "_blank");


function buyNow(name, price) {
  const message = `Merhaba, ${name} ürününü satın almak istiyorum. Fiyat: ₺${formatPrice(price)}`;
  window.open("https://wa.me/905514753938?text=" + encodeURIComponent(message), "_blank");
}

function searchProducts() {
  const inputElement = document.getElementById("searchInput");
  const products = document.querySelectorAll(".product-card");

  if (!inputElement || products.length === 0) return;

  const input = inputElement.value.toLowerCase();

  products.forEach(function(product) {
    const name = product.getAttribute("data-name").toLowerCase();

    if (name.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function filterCategory(category) {
  const products = document.querySelectorAll(".product-card");

  products.forEach(function(product) {
    const name = product.getAttribute("data-name").toLowerCase();

    if (name.includes(category)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView();
  }
}

function showAllProducts() {
  const products = document.querySelectorAll(".product-card");

  products.forEach(function(product) {
    product.style.display = "block";
  });

  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView();
  }
}

function increaseQuantity() {
  quantity++;
  const quantityElement = document.getElementById("quantity");

  if (quantityElement) {
    quantityElement.textContent = quantity;
  }
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
  }

  const quantityElement = document.getElementById("quantity");

  if (quantityElement) {
    quantityElement.textContent = quantity;
  }
}

function formatPrice(price) {
  return price.toLocaleString("tr-TR");
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.");

    this.reset();
  });
}

let timerSeconds = 5 * 60 * 60 + 2 * 60;

function updateTimer() {
  const timer = document.getElementById("timer");

  if (!timer) return;

  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;

  timer.textContent =
    String(hours).padStart(2, "0") + " : " +
    String(minutes).padStart(2, "0") + " : " +
    String(seconds).padStart(2, "0");

  if (timerSeconds > 0) {
    timerSeconds--;
  }
}

setInterval(updateTimer, 1000);
updateTimer();
updateCart();

let discount = 0;

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  if (menu && overlay) {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

function loadCheckoutPage() {
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutDiscount = document.getElementById("checkoutDiscount");
  const checkoutTotal = document.getElementById("checkoutTotal");

  if (!checkoutItems || !checkoutSubtotal || !checkoutDiscount || !checkoutTotal) return;

  checkoutItems.innerHTML = "";

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Sepetiniz boş.</p>";
    checkoutSubtotal.textContent = "0";
    checkoutDiscount.textContent = "0";
    checkoutTotal.textContent = "0";
    return;
  }

  cart.forEach(function(item) {
    const div = document.createElement("div");
    div.className = "checkout-item";

    div.innerHTML = `
      <strong>${item.name}</strong>
      <span>Adet: ${item.quantity}</span><br>
      <span>Fiyat: ₺${formatPrice(item.price * item.quantity)}</span>
    `;

    checkoutItems.appendChild(div);
  });

  checkoutSubtotal.textContent = formatPrice(total);
  checkoutDiscount.textContent = formatPrice(discount);
  checkoutTotal.textContent = formatPrice(total - discount);
}

function applyCoupon() {
  const couponInput = document.getElementById("couponInput");

  if (!couponInput) return;

  const coupon = couponInput.value.trim().toUpperCase();

  if (coupon === "GAD10") {
    discount = Math.floor(total * 0.10);
    alert("Promokod uygulandı: %10 indirim!");
  } else {
    discount = 0;
    alert("Geçersiz promokod.");
  }

  loadCheckoutPage();
}

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Sepetiniz boş!");
      return;
    }

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const email = document.getElementById("customerEmail").value;
    const deliveryMethod = document.getElementById("deliveryMethod").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const address = document.getElementById("customerAddress").value;
    const note = document.getElementById("customerNote").value;

    let message = "Merhaba, GadMarket sitesinden sipariş vermek istiyorum:\n\n";

    message += "Müşteri Bilgileri:\n";
    message += "Ad Soyad: " + name + "\n";
    message += "Telefon: " + phone + "\n";
    message += "E-posta: " + email + "\n";
    message += "Teslimat: " + deliveryMethod + "\n";
    message += "Ödeme: " + paymentMethod + "\n";
    message += "Adres: " + address + "\n";
    message += "Not: " + note + "\n\n";

    message += "Ürünler:\n";

    cart.forEach(function(item) {
      message += "- " + item.name + " | Adet: " + item.quantity + " | ₺" + formatPrice(item.price * item.quantity) + "\n";
    });

    message += "\nAra Toplam: ₺" + formatPrice(total);
    message += "\nİndirim: ₺" + formatPrice(discount);
    message += "\nToplam: ₺" + formatPrice(total - discount);

    window.open("https://wa.me/905514753938?text=" + encodeURIComponent(message), "_blank");
  });
}

loadCheckoutPage();