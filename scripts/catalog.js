const createProductImage = (productImage) => {
    const image = document.createElement('div');
    image.className = 'product-image';
    image.style.backgroundImage = `url('${productImage}')`;

    return image;
}

const createProductInfo = (productData) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'product-info';

    const name = document.createElement('div');
    name.innerText = productData.name;

    const price = document.createElement('div');
    price.innerText = `${productData.price} р.`;

    wrapper.append(name, price);

    return wrapper;
}

const createProductButton = (product) => {
    const button = document.createElement('a');
    button.className = 'product-button';
    button.href = 'product.html';
    button.innerText = 'Купить';

    button.addEventListener('click', () => {
        localStorage.setItem('currentProduct', JSON.stringify(product));
    })

    return button;
}

const createProduct = (productData) => {
    const product = document.createElement('div');
    product.className = 'product';

    const image = createProductImage(productData.image);
    const productInfo = createProductInfo(productData);
    const buyButton = createProductButton(productData);

    product.append(image, productInfo, buyButton);

    return product;
}

const createProducts = (products) => {
    const productsContainer = document.getElementById('products');

    for (const product of products.values()) {
        productsContainer.append(createProduct(product));
    }
}

void fetch('data/products.json')
    .then(response => response.json())
    .then(products => createProducts(products));