import { addItem } from "./cart.js";

const setTitle = (productName) => {
    document.title = `Чешем Языком - ${productName}`;
}

const fillImage = (imageLink) => {
    document.getElementById('product-image').style.backgroundImage = `url('${imageLink}')`;
}

const fillData = (productData) => {
    document.getElementById('product-name').innerText = productData.name;
    document.getElementById('short-description').innerText = productData.shortDescription;
    document.getElementById('description').innerText = productData.description;
    document.getElementById('buy-button').addEventListener('click', () => addItem(productData));
}

const fillProductData = (product) => {
    setTitle(product.name);
    fillImage(product.image);
    fillData(product);
}

const currentProductJSON = localStorage.getItem('currentProduct');

if (!currentProductJSON) {
    window.location.replace('404.html');
} else {
    fillProductData(JSON.parse(currentProductJSON));
}
