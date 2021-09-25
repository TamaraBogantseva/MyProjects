import { CartItem } from "./CartItem.js";

export const Cart = {
    inject: ['API', 'getJson', 'postJson', 'putJson', 'deleteJson'],
    components: {
        CartItem
    },
    data() {
        return {
            imgCart: 'https://placehold.it/50x150',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }

            let prod = Object.assign({ quantity: 1 }, product);
            this.postJson(`/api/cart`, prod)
                .then(data => {
                    if (data.result) {
                        this.cartItems.push(prod);
                    }
                });
        },
        remove(product) {
            if (product.quantity > 1) {
                this.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--
                        }
                    });
                return;
            }
            this.deleteJson(`/api/cart`, product)
                .then(data => {
                    if (data.result) {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    }
                });
        }
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data.contents) {
                    this.cartItems.push(product);
                }
            });
    },
    template: `
    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
               <CartItem 
               v-for="item of cartItems" 
               :key="item.id_product"
               :img="imgCart"
               :item="item"
               @remove="remove"
               ></CartItem>
            </div>
    `
}