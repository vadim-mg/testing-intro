// const products = require("./data/products");

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
  if (quantity === 0 || quantity > product.stock) {
    throw new RangeError('Количество товара не верно');
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    return cart;
  }

  cart.push({ ...product, quantity });
  return cart;
}

/**
 * 
 * @param {array} cart 
 * @param {number} productId 
 * @param {number} quantity 
 * @returns array
 */
function changeQuantity(cart, productId, quantity) {
  const productInCart = cart.find(value => value.id === productId)
  if (!productInCart) {
    return cart;
  }
  if (quantity === 0 || quantity > productInCart.stock) {
    throw new RangeError('Количество товара не верно');
  }
  productInCart.quantity = quantity;
  return cart;
}

/**
 * 
 * @param {array} cart 
 * @param {number} productId 
 * @returns array
 */
function removeFromCart(cart, productId) {
  return cart.filter(val => val.id !== productId);
}


/**
 * 
 * @param {array} cart 
 * @returns array
 */
function calculateCartSubtotal(cart) {
  return cart.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0)
}


/**
 * 
 * @param {array} cart 
 * @param {string} promo 
 * @returns array
 */
function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  const delivery = subtotal >= 50000 ? 0 : 30000;
  const discount = (subtotal >= 20000 && promo === 'SAVE10') ? subtotal * 0.1 : 0;
  return {
    subtotal,
    discount,
    delivery,
    total: subtotal + delivery - discount,
  }
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
