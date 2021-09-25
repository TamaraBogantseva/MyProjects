import { Products } from './Products.js';
import { Cart } from "./Cart.js";
import { Search } from "./Search.js";
import { Error } from "./Error.js";

const Shop = {
    components: {
        Products,
        Cart,
        Search,
        Error
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson,
            postJson: this.postJson,
            putJson: this.putJson,
            deleteJson: this.deleteJson
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error));
        },
    }
};

Vue.createApp(Shop).mount('#app');

// let getData = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         // window.ActiveXObject -> new ActiveXObject();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//     });
// };

// class Item {
//     constructor(product, img = 'https://placehold.it/100x50') {
//         let { product_name, price = 0, id_product } = product;
//         this.title = product_name;
//         this.img = img;
//         this.price = price;
//         this.id = id_product;
//         this.rendered = false;
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="product-item" data-id="${this.id}">
//                   <img src="${this.img}" alt="${this.title}">
//                   <div class="desc">
//                       <h3>${this.title}</h3>
//                       <p>${this.price}</p>
//                       <button class="buy-btn" data-id="${this.id}">Купить</button>
//                   </div>
//               </div>`
//     }
// }
//
// class Product extends Item {}
//
// class CartItem extends Item {
//     constructor(el, img = 'https://placehold.it/50x100') {
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//
//     changeQuantity(count) {
//         this.quantity += count;
//         this._updateItem();
//     }
//
//     remove() {
//         document.querySelector(`.cart-item[data-id="${this.id}"]`).remove();
//     }
//
//     render() {
//         this.rendered = true;
//         return `<div class="cart-item" data-id="${this.id}">
//                 <div class="product-bio">
//                 <img src="${this.img}" alt="Some image">
//                 <div class="product-desc">
//                 <p class="product-title">${this.title}</p>
//                 <p class="product-quantity">Quantity: ${this.quantity}</p>
//                 <p class="product-single-price">$${this.price} each</p>
//                 </div>
//                 </div>
//                 <div class="right-block">
//                 <p class="product-price">$${this.quantity*this.price}</p>
//                 <button class="del-btn" data-id="${this.id}">&times;</button>
//                 </div>
//                 </div>`
//     }
//
//     _updateItem() {
//         const block = document.querySelector(`.cart-item[data-id="${this.id}"]`);
//         block.querySelector('.product-quantity').textContent = `Quantity: ${this.quantity}`;
//         block.querySelector('.product-price').textContent = `$${this.quantity*this.price}`;
//     }
// }
//
// class List {
//     static API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//     static itemsMap = {
//         List: Item,
//         Cart: CartItem,
//         ProductsList: Product
//     };
//
//
//     constructor(url, container = '.products') {
//         this.url = url;
//         this.products = [];
//         this.filtered = [];
//         this.container = document.querySelector(container);
//         this.init();
//     }
//
//     init() {
//         return false;
//     }
//
//     calcSum() {
//         return this.products.reduce((accum, item) => accum += item.price, 0);
//     }
//
//     getJson(url) {
//         return fetch(url ? url : `${List.API + this.url}`)
//             .then(result => result.json())
//             .catch(error => console.log(error));
//     }
//
//     handleData(data) {
//         for (let dataEl of data) {
//             const product = new List.itemsMap[this.constructor.name](dataEl);
//             this.products.push(product);
//         }
//
//         this._render();
//     }
//
//     getItem(id) {
//         return this.products.find(product => product.id === id);
//     }
//
//     filter(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.products.filter(product => regexp.test(product.title));
//         this.products.forEach(product => {
//             const block = document.querySelector(`.product-item[data-id="${product.id}"]`);
//
//             if (this.filtered.includes(product)) {
//                 block.classList.remove('invisible');
//             } else {
//                 block.classList.add('invisible');
//             }
//         })
//     }
//
//     _render() {
//         for (let product of this.products) {
//             if (product.rendered) {
//                 continue;
//             }
//
//             this.container.insertAdjacentHTML('beforeend', product.render())
//         }
//     }
// }
//
// class ProductsList extends List{
//     constructor(cart, url = '/catalogData.json', container = '.products') {
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then((data) => this.handleData(data));
//     }
//
//     init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('buy-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.cart.addProduct(this.getItem(id));
//             }
//         });
//
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector(`.search-field`).value);
//         })
//     }
// }
//
// class Cart extends List {
//     constructor(url = '/getBasket.json', container = '.cart-block') {
//         super(url, container);
//         this.getJson()
//             .then((data) => this.handleData(data.contents));
//     }
//
//     init() {
//         this.container.addEventListener('click', e => {
//             if (e.target.classList.contains('del-btn')) {
//                 const id = +e.target.dataset['id'];
//                 this.removeProduct(this.getItem(id));
//             }
//         });
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             this.container.classList.toggle('invisible');
//         })
//     }
//
//     addProduct(product) {
//         this.getJson(`${List.API}/addToBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     let find = this.products.find(el => el.id === product.id);
//                     if (find) {
//                         find.changeQuantity(1);
//                     } else {
//                         let prod = Object.assign({ quantity: 1, product_name: product.title, id_product: product.id }, product);
//                         this.handleData([prod]);
//                     }
//                 } else {
//                     console.log('error');
//                 }
//             })
//     }
//
//     removeProduct(product) {
//         this.getJson(`${List.API}/deleteFromBasket.json`)
//             .then(data => {
//                 if (data.result) {
//                     if (product.quantity > 1) {
//                         product.changeQuantity(-1)
//                     } else {
//                         this.products.splice(this.products.indexOf(product), 1);
//                         product.remove();
//                     }
//                 } else {
//                     console.log('error');
//                 }
//             })
//     }
// }
//
// let cart = new Cart();
// const list = new ProductsList(cart);
// list.getJson('getProducts.json').then(data => list.handleData(data));


// const products = [
//     { id: 1, title: 'Notebook', price: 2000 },
//     { id: 2, title: 'Keyboard', price: 200 },
//     { id: 3, title: 'Mouse', price: 100 },
//     { id: 4, title: 'Gamepad' },
// ];
//
// const renderProduct = (product, img = 'https://placehold.it/100x50') => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${product.title}">
//                  <div class="desc">
//                      <h3>${product.title}</h3>
//                      <p>${product.price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };

// const renderProduct = (product, img = 'https://placehold.it/100x50') => {
//     const { title, price = 10 } = product;
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };

// const renderPage = productsList => {
//     // document.querySelector(`.products`).innerHTML = productsList.map(product => renderProduct(product)).join('');
//     const element = document.querySelector(`.products`);
//     let strElements = '';
//     for (let product of productsList) {
//         element.insertAdjacentHTML('beforeend', renderProduct(product));
//     }
// };
//
// renderPage(products);