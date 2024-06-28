const getCart = () => {
    const cart = localStorage.getItem('cart');

    if (!cart) {
        return {};
    }

    return JSON.parse(cart);
}

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const addItem = (product) => {
    const cart = getCart();

    if (!cart.hasOwnProperty(product.id)) {
        cart[product.id] = {
            ...product,
            quantity: 1,
        };
    } else {
        cart[product.id].quantity++;
    }

    saveCart(cart);
}

export const clearCart = () => {
    localStorage.removeItem('cart');
}

const addItemTableRow = (item) => {
    const name = document.createElement('div');
    name.innerText = item.name;
    document.getElementById('item-name').append(name);

    const qty = document.createElement('div');
    qty.innerText = item.quantity;
    document.getElementById('item-qty').append(qty);

    const price = document.createElement('div');
    price.innerText = `${item.price} p.`;
    document.getElementById('item-price').append(price);

    const total = document.createElement('div');
    total.innerText = `${item.quantity * item.price} p.`;
    document.getElementById('item-total').append(total);
}

const notifyCartIsEmpty = () => {
    document.getElementById('item-table').remove();
    document.getElementById('item-totals').remove();
    document.getElementById('checkout').remove();
    document.getElementById('place-order').remove();

    const message = document.createElement('p');
    message.innerText = 'В корзине на данный момент нет товаров.';

    document.getElementById('cart-contents').append(message);
}

const fillItemTable = () => {
    const cart = getCart();

    if (!Object.values(cart).length) {
        notifyCartIsEmpty();

        return;
    }

    let grandTotal = 0;

    for (const item of Object.values(cart)) {
        addItemTableRow(item);

        grandTotal += item.price * item.quantity;
    }

    document.getElementById('grand-total').innerText = `${grandTotal} p.`
    document.getElementById('place-order-button').addEventListener('click', clearCart);
}

document.addEventListener('DOMContentLoaded', fillItemTable);