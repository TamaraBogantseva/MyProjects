import {Product} from "./Product.js";

export const Products = {
    inject: ['API', 'getJson'],
    components: {
        Product
    },
    data() {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    computed: {
        filtered() {
            return this.products.filter(item => new RegExp(this.$root.$refs.search.userSearch, 'i').test(item.product_name));
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    template: `<div class="products">
                    <Product
                    v-for="el of filtered" 
                    :key="el.id_product" 
                    :img="imgCatalog"
                    :product="el"
                    ></Product>
                </div>`
};