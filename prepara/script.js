////////////////// 🔴 PREPARA IA | PDV Básico //////////////////
/////// Copyright © 2026 | Todos os direitos reservados ////////
/////////// Altere somente o código da função buy()! ///////////
////////////////////////////////////////////////////////////////

// Finaliza a compra
function buy() {
    if (cart.length === 0) {
        // A linha abaixo exibe a mensagem de alerta de cesta vazia:
        alert('Cesta vazia. Adicione produtos antes de finalizar a compra.');
        return;
    }
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    // A linha abaixo exibe a mensagem de alerta de compra finalizada:
    alert(`✅ Compra finalizada!\nTotal: ${formatCurrency(total)}\nObrigado pela preferência!`);

    // Limpa o carrinho
    cart = [];
    renderCart();
}

//////////////////////////////////////
///////// ↓↓↓ DANGER ZONE ↓↓↓ /////////
//////////////////////////////////////

// Lista predefinida de 10 produtos
const products = [
    { code: "123456", name: "Arroz 5kg", price: 22.90 },
    { code: "234567", name: "Feijão 1kg", price: 8.50 },
    { code: "345678", name: "Óleo de Soja 900ml", price: 7.20 },
    { code: "456789", name: "Açúcar 2kg", price: 10.30 },
    { code: "567890", name: "Café 500g", price: 18.90 },
    { code: "678901", name: "Leite 1L", price: 4.50 },
    { code: "789012", name: "Pão de Forma", price: 8.99 },
    { code: "890123", name: "Manteiga 200g", price: 12.50 },
    { code: "901234", name: "Farinha de Trigo 1kg", price: 6.80 },
    { code: "012345", name: "Sabonete", price: 2.30 }
];

// Estado da aplicação
let cart = []; // Array de objetos { product, quantity }

// Elementos DOM
const searchInput = document.getElementById('barcode-search');
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const totalSpan = document.getElementById('total');
const buyButton = document.getElementById('buy-button');
const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});


// Formata valor para moeda BRL
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderiza a lista de produtos com base no filtro
function renderProducts(filterText = '') {
    productsContainer.innerHTML = ''; // Limpa container

    const filterLower = filterText.toLowerCase();
    const filteredProducts = products.filter(p =>
        p.code.toLowerCase().includes(filterLower)
    );

    if (filteredProducts.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Nenhum produto encontrado.';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = 'var(--text-secondary)';
        productsContainer.appendChild(emptyMessage);
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('role', 'listitem');

        card.innerHTML = `
            <span class="product-code">Cód.: ${product.code}</span>
            <h3 class="product-name">${product.name}</h3>
            <span class="product-price">${formatCurrency(product.price)}</span>
            <button class="add-button" data-code="${product.code}">Adicionar</button>
        `;

        const addBtn = card.querySelector('.add-button');
        addBtn.addEventListener('click', () => addToCart(product.code));

        productsContainer.appendChild(card);
    });
}

// Adiciona produto ao carrinho
function addToCart(productCode) {
    const product = products.find(p => p.code === productCode);
    if (!product) return;

    const existingItem = cart.find(item => item.product.code === productCode);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    renderCart();
}

// Remove um item do carrinho (quando a quantidade chega a zero)
function removeFromCart(productCode) {
    cart = cart.filter(item => item.product.code !== productCode);
    renderCart();
}

// Incrementa quantidade de um item
function incrementItem(productCode) {
    const item = cart.find(i => i.product.code === productCode);
    if (item) {
        item.quantity += 1;
        renderCart();
    }
}

// Decrementa quantidade de um item (remove se chegar a zero)
function decrementItem(productCode) {
    const item = cart.find(i => i.product.code === productCode);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productCode);
            return;
        }
        renderCart();
    }
}

// Renderiza o carrinho
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        const emptyCart = document.createElement('p');
        emptyCart.textContent = 'Cesta vazia. Adicione produtos.';
        emptyCart.style.textAlign = 'center';
        emptyCart.style.color = 'var(--text-secondary)';
        cartItemsContainer.appendChild(emptyCart);
        updateTotal();
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.setAttribute('role', 'listitem');

        const subtotal = item.product.price * item.quantity;

        cartItemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-code">Cód.: ${item.product.code}</div>
                <div class="cart-item-price">${formatCurrency(item.product.price)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" data-code="${item.product.code}" data-action="decrement">−</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" data-code="${item.product.code}" data-action="increment">+</button>
            </div>
            <span class="cart-item-subtotal">${formatCurrency(subtotal)}</span>
        `;

        // Adiciona eventos aos botões de quantidade
        const decrementBtn = cartItemDiv.querySelector('[data-action="decrement"]');
        const incrementBtn = cartItemDiv.querySelector('[data-action="increment"]');

        decrementBtn.addEventListener('click', () => decrementItem(item.product.code));
        incrementBtn.addEventListener('click', () => incrementItem(item.product.code));

        cartItemsContainer.appendChild(cartItemDiv);
    });

    updateTotal();
}

// Atualiza o total da compra
function updateTotal() {
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    totalSpan.textContent = formatCurrency(total);
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    renderProducts(e.target.value);
});

buyButton.addEventListener('click', buy);

// Renderização inicial
renderProducts();
renderCart();