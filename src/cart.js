function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

/**
 * 
 * @param {array} cart 
 * @param {object} product 
 * @param {number} quantity 
 * @returns array
 */
function addToCart(cart, product, quantity) {
  if(quantity <= 0 || quantity > product.stock) {
    throw new RangeError('Количество товара не может быть отрицательным');
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    return cart;
  }

  cart.push({ ...product, quantity });
  return cart;
}


function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
