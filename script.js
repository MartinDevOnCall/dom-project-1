// Select all card-body elements containing products
const cardBodies = document.querySelectorAll('.list-products .card-body');
const totalDisplay = document.querySelector('.total');

// Function to recalculate total price
function updateTotal() {
  let total = 0;
  document.querySelectorAll('.list-products .card-body').forEach(cardBody => {
    const quantity = parseInt(cardBody.querySelector('.quantity').textContent);
    const unitPriceText = cardBody.querySelector('.unit-price').textContent;
    const unitPrice = parseInt(unitPriceText.replace(' $', ''));
    total += quantity * unitPrice;
  });
  totalDisplay.textContent = total + ' $';
}

// Function to attach events to a card
function attachEvents(cardBody) {
  const plusBtn = cardBody.querySelector('.fa-plus-circle');
  const minusBtn = cardBody.querySelector('.fa-minus-circle');
  const trashBtn = cardBody.querySelector('.fa-trash-alt');
  const heartBtn = cardBody.querySelector('.fa-heart');
  const quantitySpan = cardBody.querySelector('.quantity');

  // Plus button: increase quantity
  plusBtn.addEventListener('click', () => {
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
    updateTotal();
  });

  // Minus button: decrease quantity (minimum 0)
  minusBtn.addEventListener('click', () => {
    const current = parseInt(quantitySpan.textContent);
    if (current > 0) {
      quantitySpan.textContent = current - 1;
      updateTotal();
    }
  });

  // Trash button: remove card from DOM and update total
  trashBtn.addEventListener('click', () => {
    cardBody.remove();
    updateTotal();
  });

  // Heart button: toggle liked state (color change)
  heartBtn.addEventListener('click', () => {
    heartBtn.classList.toggle('liked');
    if (heartBtn.classList.contains('liked')) {
      heartBtn.style.color = 'red';
    } else {
      heartBtn.style.color = 'black';
    }
  });
}

// Attach events to all existing cards
cardBodies.forEach(cardBody => attachEvents(cardBody));