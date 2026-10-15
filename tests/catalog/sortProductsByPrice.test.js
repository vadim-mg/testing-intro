const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map(v => v.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products).map(v => v.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    expect(sortProductsByPrice(
      [products.find(val => val.id === 1),
      products.find(val => val.id === 3),
      products.find(val => val.id === 4)], 'asc')
      .map(v => v.id)).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map(v => v.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    expect(sortProductsByPrice(
      [products.find(val => val.id === 3),
      products.find(val => val.id === 1),
      products.find(val => val.id === 4)], 'desc').map(v => v.id)).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    expect(sortProductsByPrice(
      [products.find(val => val.id === 5),
      products.find(val => val.id === 2),
      products.find(val => val.id === 6)], 'desc').map(v => v.id)).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const testedArray = [products.find(val => val.id === 1),
    products.find(val => val.id === 3),
    products.find(val => val.id === 4)];

    const sortedArray = sortProductsByPrice(testedArray, 'asc');

    expect(testedArray).toEqual([products.find(val => val.id === 1),
    products.find(val => val.id === 3),
    products.find(val => val.id === 4)]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const testedArray = [products.find(val => val.id === 1),
    products.find(val => val.id === 3),
    products.find(val => val.id === 4)];

    const sortedArray = sortProductsByPrice(testedArray, 'desc');

    expect(testedArray).toEqual([products.find(val => val.id === 1),
    products.find(val => val.id === 3),
    products.find(val => val.id === 4)]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const deepCopy = [...products];
    const sortedArray = sortProductsByPrice(products);
    expect(products).toEqual(deepCopy);
  });
});
