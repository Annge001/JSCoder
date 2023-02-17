const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
    '.container-cart-products'
);

const btnProcesarPago = document.querySelector('.procesar-pago');
btnProcesarPago.addEventListener('click', () => {
    procesarPago();
});
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

//const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

const tituloprincipal = document.querySelector('.header-title');
const tituloConfirmacion = document.querySelector('.header-title-confirmacion');

const productsList = document.querySelector('.container-items');
const containerPago = document.querySelector('.container-pago');


let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');


const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const carrito = document.querySelector('.cart-empty');
const btnCarrito = document.querySelector('.btn-pagar');
btnCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('pagar')) {
     console.log("paso")
       mostrarConfirmacion();
    }
});

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(
            product => product.title === infoProduct.title
        );

        if (exits) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        mostrarCarrito();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );


        mostrarCarrito();
    }
});

const mostrarConfirmacion = () => {
    const tituloprincipal = document.querySelector('.header-title');
    const tituloConfirmacion = document.querySelector('.header-title-confirmacion');
    if (allProducts.length) {
        productsList.classList.add("display-none")
        containerPago.classList.remove("display-none")
        tituloprincipal.classList.add("display-none")
        tituloConfirmacion.classList.remove("display-none")
    } else {
        productsList.classList.remove("display-none")
        containerPago.classList.add("display-none")
        tituloprincipal.classList.remove("display-none")
        tituloConfirmacion.classList.add("display-none")
    }
    containerCartProducts.classList.toggle('hidden-cart');
    let products = [];
    products = JSON.parse(localStorage.getItem("allProducts"));

    const productosConfirmacion = document.querySelector('.resumen-compra');
    const rowDetalle = document.querySelector('.row-detalle');
    rowDetalle.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    products.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');


        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price} </span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowDetalle.append(containerProduct);
        const precioProducto = product.price.replace("$","")
        total = total + parseInt(product.quantity) * parseInt(precioProducto.replace(".",""));
        totalOfProducts = totalOfProducts + product.quantity;
    });
    const valorTotalPago = document.querySelector('.total-pagar-fin');
    valorTotalPago.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;



}


const procesarPago = () => {
    localStorage.clear();
    window.location.reload();
}

const mostrarCarrito = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
        carrito.classList.remove("display-none")

    } else {
        carrito.classList.add("display-none")
        btnCarrito.classList.remove("display-none")
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');


        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price} </span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);
        const precioProducto = product.price.replace("$","")
        total = total + parseInt(product.quantity) * parseInt(precioProducto.replace(".",""));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};
