// Mahsulotlarni sahifada ko'rsatish
function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card" onclick="goToDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/500x500?text=No+Image'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Savatchaga Qo'shish
                </button>
            </div>
        </div>
    `).join('');
}

// Batafsil sahifaga o'tish
function goToDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Sahifa yuklanganda mahsulotlarni ko'rsatish
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayProducts);
} else {
    displayProducts();
}

