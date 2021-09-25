export const CartItem = {
    props: ['img', 'item'],
    emits: ['remove'],
    template: `
            <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" :alt="item.product_name">
                        <div class="product-desc">
                            <p class="product-title">{{ item.product_name }}</p>
                            <p class="product-quantity">Quantity: {{ item.quantity }}</p>
                            <p class="product-single-price">$ {{ item.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$ {{item.quantity*item.price}}</p>
                        <button class="del-btn" @click="$emit('remove', item)">&times;</button>
                    </div>
                </div>
    `
}