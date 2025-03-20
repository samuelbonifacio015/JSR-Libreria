
// Estado del carrito
let cart = [];

// Referencias a elementos del DOM
const cartDropdown = document.getElementById('cartDropdown');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cartTotal');
const cartIcon = document.querySelector('.cart-icon');
const cartClose = document.querySelector('.cart-close');

// Función para abrir/cerrar el carrito
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

cartClose.addEventListener('click', () => {
    cartDropdown.style.display = 'none';
});

// Cerrar el carrito al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.style.display = 'none';
    }
});

// Función para añadir un producto al carrito
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCart();
        }
    }
}

// Función para actualizar el carrito en el DOM
function updateCart() {
    // Limpiar el contenedor
    cartItemsContainer.innerHTML = '';

    // Mostrar los ítems
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item-entry');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item-details">
                <div class="brand">${item.brand}</div>
                <div class="name">${item.name}</div>
                <div class="price">S/. ${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="increase">+</button>
            </div>
            <button class="cart-item-remove">Quitar</button>
        `;

        // Añadir eventos a los botones de cantidad y eliminación
        itemElement.querySelector('.increase').addEventListener('click', () => {
            updateQuantity(item.name, 1);
        });

        itemElement.querySelector('.decrease').addEventListener('click', () => {
            updateQuantity(item.name, -1);
        });

        itemElement.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeFromCart(item.name);
        });

        cartItemsContainer.appendChild(itemElement);
    });

    // Actualizar el contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Actualizar el total
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = totalPrice.toFixed(2);
}

// Añadir eventos a los botones "Añadir al carrito" de cada producto
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const product = {
            name: productCard.querySelector('.product-name').textContent,
            brand: productCard.querySelector('.brand').textContent,
            price: parseFloat(productCard.querySelector('.discounted').textContent.replace('S/. ', '')),
            image: productCard.querySelector('img').src
        };
        addToCart(product);
        cartDropdown.style.display = 'block'; // Mostrar el carrito al añadir un producto
    });
});



// Añadir evento al modal de vista rápida
document.querySelector('.modal-right .add-to-cart').addEventListener('click', () => {
    const product = {
        name: document.getElementById('modalProductTitle').textContent,
        brand: document.getElementById('modalBrand').textContent,
        price: parseFloat(document.getElementById('modalDiscountedPrice').textContent.replace('S/. ', '')),
        image: document.getElementById('modalMainImage').src,
        quantity: parseInt(document.getElementById('modalQuantity').value)
    };
    addToCart(product);
    cartDropdown.style.display = 'block';
});

// Función para manejar la vista rápida (ya existente, pero aseguramos compatibilidad)
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        document.getElementById('modalMainImage').src = productCard.querySelector('img').src;
        document.getElementById('modalProductTitle').textContent = productCard.querySelector('.product-name').textContent;
        document.getElementById('modalBrand').textContent = productCard.querySelector('.brand').textContent;
        document.getElementById('modalOriginalPrice').textContent = productCard.querySelector('.original').textContent;
        document.getElementById('modalDiscountedPrice').textContent = productCard.querySelector('.discounted').textContent;
        document.getElementById('modalDiscount').textContent = productCard.querySelector('.discount').textContent;
        document.getElementById('quickViewModal').style.display = 'flex';
    });
});

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('quickViewModal').style.display = 'none';
});


//ocultar y mostrar los contenidos
const filterHeaders = document.querySelectorAll('.sidebar h3');
filterHeaders.forEach(header => {
    header.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('rotated');
        const ul = this.nextElementSibling;
        if (ul && ul.tagName === 'UL') {
            ul.classList.toggle('collapsed');
        }
    });
});



//funcion de vista previa
document.addEventListener('DOMContentLoaded', function() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');
    const modalMainImage = document.getElementById('modalMainImage');
    const modalThumbnails = document.getElementById('modalThumbnails');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalBrand = document.getElementById('modalBrand');
    const modalDiscount = document.getElementById('modalDiscount');
    const modalOriginalPrice = document.getElementById('modalOriginalPrice');
    const modalDiscountedPrice = document.getElementById('modalDiscountedPrice');
    const modalQuantity = document.getElementById('modalQuantity');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const imgSrc = productCard.querySelector('img').src;
            const productName = productCard.querySelector('.product-name').textContent;
            const brand = productCard.querySelector('.brand').textContent;
            const discount = productCard.querySelector('.discount').textContent;
            const originalPrice = productCard.querySelector('.price .original').textContent;
            const discountedPrice = productCard.querySelector('.price .discounted').textContent;

            // Rellenar el modal con la información del producto
            modalMainImage.src = imgSrc;
            modalProductTitle.textContent = productName;
            modalBrand.textContent = brand;
            modalDiscount.textContent = discount;
            modalOriginalPrice.textContent = originalPrice;
            modalDiscountedPrice.textContent = discountedPrice;
            modalQuantity.value = 1;

            // Generar miniaturas (para este ejemplo, usamos la misma imagen varias veces)
            modalThumbnails.innerHTML = '';
            for (let i = 0; i < 4; i++) {
                const thumbnail = document.createElement('img');
                thumbnail.src = imgSrc;
                thumbnail.alt = 'Miniatura';
                modalThumbnails.appendChild(thumbnail);
            }

            // Mostrar el modal
            modal.style.display = 'flex';
        });
    });

    // Cerrar el modal
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Función para cambiar la cantidad
    window.changeQuantity = function(change) {
        let currentQuantity = parseInt(modalQuantity.value);
        currentQuantity += change;
        if (currentQuantity < 1) currentQuantity = 1;
        modalQuantity.value = currentQuantity;
    };
});

//para volver arriba
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    // Función para desplazarse al inicio de la página
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    // Mostrar u ocultar el botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // Mostrar después de 300px de scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});