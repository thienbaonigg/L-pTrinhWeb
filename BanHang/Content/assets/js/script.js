'use strict';

// Mobile Menu Variables
const mobileMenuOpenBtn = document.querySelector('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

// Mobile Menu Functions
mobileMenuOpenBtn.addEventListener('click', function () {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
});

mobileMenuCloseBtn.addEventListener('click', function () {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', function () {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
});

// Modal Variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalDisplay = document.getElementById('cartTotal');

// Modal Function
const modalCloseFunc = function () { modal.classList.add('closed'); }

// Modal Event Listeners
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

// Notification Toast Variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');
const toastMessage = document.getElementById('toastMessage');

// Toast Function
function showToast(message) {
  toastMessage.textContent = message;
  notificationToast.classList.remove('closed');
  setTimeout(() => notificationToast.classList.add('closed'), 3000);
}

// Close Toast Event Listener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});

// Shopping Cart Variables
let cart = [];
let totalAmount = 0;

// Update Cart Function
function updateCart() {
  cartItemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = <p>${item.name} - $${item.price}</p><button onclick="removeFromCart(${index})">Remove</button>;
    cartItemsContainer.appendChild(cartItem);
  });

  totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
  cartTotalDisplay.textContent = totalAmount;
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  showToast('Item removed from cart');
}

// Add to Cart Event Listener
document.querySelectorAll('[data-add-to-cart]').forEach((button, index) => {
  button.addEventListener('click', function () {
    const product = button.closest('.product-item');
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
    
    cart.push({ name, price });
    updateCart();
    showToast(${name} added to cart);
  });
});

// Product Search
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function () {
  const filter = searchBar.value.toLowerCase();
  document.querySelectorAll('.product-item').forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = productName.includes(filter) ? '' : 'none';
  });
});

// View Details Modal (Example)
document.querySelectorAll('[data-view-details]').forEach((button) => {
  button.addEventListener('click', function () {
    modal.classList.remove('closed');
  });
});