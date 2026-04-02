/* ─────────────────────────────────────────────
 *  1. Product class
 * ───────────────────────────────────────────── */
class Product {
  constructor(id, name, price) {
    this.id    = id;
    this.name  = name;
    this.price = price;
  }
}

/* ─────────────────────────────────────────────
 *  2. ShoppingCartItem class
 * ───────────────────────────────────────────── */
class ShoppingCartItem {
  constructor(product, quantity = 1) {
    this.product  = product;
    this.quantity = quantity;
  }

  totalPrice() {
    return this.product.price * this.quantity;
  }
}

/* ─────────────────────────────────────────────
 *  3. ShoppingCart class
 * ───────────────────────────────────────────── */
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(product, quantity = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateTotal();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.updateTotal();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.totalPrice(), 0);
  }

  updateTotal() {
    document.querySelector('.total').textContent = this.getTotal() + ' $';
  }

  displayCart() {
    console.log('── Cart contents ──');
    this.items.forEach(item => {
      console.log(`  ${item.product.name} × ${item.quantity} = ${item.totalPrice()} $`);
    });
    console.log(`  TOTAL: ${this.getTotal()} $ (${this.getTotalItems()} items)`);
  }
}

/* ─────────────────────────────────────────────
 *  DOM wiring
 * ───────────────────────────────────────────── */
const cart = new ShoppingCart();

document.querySelectorAll('.list-products .card-body').forEach((cardBody, index) => {
  // Read name and price directly from YOUR HTML class names
  const name  = cardBody.querySelector('.card-title').textContent.trim();
  const price = parseInt(cardBody.querySelector('.unit-price').textContent);
  const id    = index + 1; // assign id by position since HTML has none

  const product = new Product(id, name, price);
  cart.items.push(new ShoppingCartItem(product, 0));

  attachEvents(cardBody, product);
});

function attachEvents(cardBody, product) {
  const plusBtn      = cardBody.querySelector('.fa-plus-circle');
  const minusBtn     = cardBody.querySelector('.fa-minus-circle');
  const trashBtn     = cardBody.querySelector('.fa-trash-alt');
  const heartBtn     = cardBody.querySelector('.fa-heart');
  const quantitySpan = cardBody.querySelector('.quantity');

  plusBtn.addEventListener('click', () => {
    const item = cart.items.find(i => i.product.id === product.id);
    item.quantity++;
    quantitySpan.textContent = item.quantity;
    cart.updateTotal();
  });

  minusBtn.addEventListener('click', () => {
    const item = cart.items.find(i => i.product.id === product.id);
    if (item.quantity > 0) {
      item.quantity--;
      quantitySpan.textContent = item.quantity;
      cart.updateTotal();
    }
  });

  trashBtn.addEventListener('click', () => {
    cart.removeItem(product.id);
    cardBody.remove();
  });

  heartBtn.addEventListener('click', () => {
    heartBtn.classList.toggle('liked');
    heartBtn.style.color = heartBtn.classList.contains('liked') ? 'red' : 'black';
  });
}