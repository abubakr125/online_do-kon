// Savatcha funksionalligi
let cart = [];

// localStorage dan savatchani yuklash
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartSummary();
        displayCart();
    }
}

// localStorage ga savatchani saqlash
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
    displayCart();
}

// Savatchaga mahsulot qo'shish
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification('Mahsulot savatchaga qo\'shildi!');
}

// Savatchadan mahsulotni olib tashlash
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('Mahsulot savatchadan olib tashlandi!');
}

// Savatcha xulosasini yangilash
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

// Savatchani ko'rsatish
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Savatcha bo\'sh</p>';
        return;
    }
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Narx: $${item.price.toFixed(2)}</p>
                <p>Miqdor: ${item.quantity}</p>
                <p class="cart-item-total">Jami: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Olib Tashlash</button>
        </div>
    `).join('');
}

// Xabarnoma ko'rsatish
function showNotification(message) {
    // Agar xabarnoma elementi mavjud bo'lmasa, yaratamiz
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Sahifa yuklanganda savatchani yuklash
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCart);
} else {
    loadCart();
}

