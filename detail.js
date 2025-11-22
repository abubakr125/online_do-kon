// Batafsil sahifada mahsulotni ko'rsatish
function displayProductDetail() {
    // URL dan mahsulot ID sini olish
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        document.getElementById('product-detail').innerHTML = 
            '<p style="text-align: center; color: #dc3545; font-size: 1.2rem;">Mahsulot topilmadi!</p>';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-detail').innerHTML = 
            '<p style="text-align: center; color: #dc3545; font-size: 1.2rem;">Mahsulot topilmadi!</p>';
        return;
    }
    
    const productDetailContainer = document.getElementById('product-detail');
    
    productDetailContainer.innerHTML = `
        <div class="product-detail-content">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image"
                 onerror="this.src='https://via.placeholder.com/500x500?text=No+Image'">
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                <p class="product-detail-description">${product.description}</p>
                <button class="btn-add-cart" onclick="addToCart(${product.id})" style="max-width: 300px;">
                    Savatchaga Qo'shish
                </button>
            </div>
        </div>
    `;
}

// Sahifa yuklanganda mahsulotni ko'rsatish
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayProductDetail);
} else {
    displayProductDetail();
}

