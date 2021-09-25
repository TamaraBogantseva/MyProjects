const add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

const changeQuant = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity = +req.body.quantity - 1;
    return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
    cart.contents.splice(cart.contents.indexOf(req.body, 1));
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    changeQuant,
    remove
};