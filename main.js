// Crazy-Store - Application JavaScript
// Initialisation des éléments DOM
const authSection = document.getElementById('auth-section');
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');
const menuBtn = document.querySelector('.menu-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');
const menuItems = document.querySelectorAll('.menu-item[data-page]');
const pages = document.querySelectorAll('main > section');
const themeToggle = document.querySelector('.theme-toggle');
const cartCount = document.querySelector('.cart-count');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const searchInput = document.getElementById('search-input');
const cartIcon = document.querySelector('.cart-icon');
const checkoutBtn = document.getElementById('checkout-btn');
const rechargeBtn = document.getElementById('recharge-btn');
const rechargeOptions = document.getElementById('recharge-options');
const paymentSection = document.getElementById('payment-section');
const confirmPayment = document.getElementById('confirm-payment');
const logoutBtn = document.getElementById('logout-btn');
const servicesContainer = document.getElementById('services-container');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const userNameElement = document.getElementById('user-name');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const balanceAmount = document.getElementById('balance-amount');
const ordersCount = document.getElementById('orders-count');
const totalSpent = document.getElementById('total-spent');
const memberSince = document.getElementById('member-since');
const filterButtons = document.querySelectorAll('.filter-btn');
const saveProfileBtn = document.getElementById('save-profile-btn');
const creatorMenu = document.querySelector('.creator-only');
const usersTableBody = document.getElementById('users-table-body');
const pendingRechargesBody = document.getElementById('pending-recharges-body');
const rechargeHistory = document.getElementById('recharge-history');

// Éléments des modals
const freefireModal = document.getElementById('freefire-modal');
const closeFreefireModal = document.querySelector('#freefire-modal .close-modal');
const cancelFreefire = document.getElementById('cancel-freefire');
const confirmFreefire = document.getElementById('confirm-freefire');
const diamondOptions = document.querySelectorAll('.diamond-option');
const freefireIdInput = document.getElementById('freefire-id');
const freefireNameInput = document.getElementById('freefire-name');
const selectedDiamonds = document.getElementById('selected-diamonds');
const selectedPrice = document.getElementById('selected-price');

const boostModal = document.getElementById('boost-modal');
const closeBoostModal = document.querySelector('#boost-modal .close-modal');
const cancelBoost = document.getElementById('cancel-boost');
const confirmBoost = document.getElementById('confirm-boost');
const boostTypeSelect = document.getElementById('boost-type');
const boostQuantitySelect = document.getElementById('boost-quantity');
const boostUsernameField = document.getElementById('username-field');
const boostLinkField = document.getElementById('link-field');
const boostLinkInput = document.getElementById('boost-link');
const boostUsernameInput = document.getElementById('boost-username');
const boostEmailInput = document.getElementById('boost-email');
const selectedBoost = document.getElementById('selected-boost');
const selectedBoostPrice = document.getElementById('selected-boost-price');
const boostModalTitle = document.getElementById('boost-modal-title');

const paymentModal = document.getElementById('payment-modal');
const closePaymentModal = document.querySelector('#payment-modal .close-modal');
const cancelPayment = document.getElementById('cancel-payment');
const confirmCartPayment = document.getElementById('confirm-cart-payment');

// État de l'application
let currentUser = null;
let cart = [];
let selectedRechargeAmount = 0;
let selectedPaymentMethod = '';
let currentBoostPlatform = '';
let selectedDiamondOption = null;
let selectedBoostOption = null;

// Fonctions de sécurité
function hashPassword(password) {
    const salt = "CRAZYSTORE_SALT_2024";
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return (hash * salt.length).toString();
}

function encryptData(data) {
    return btoa(encodeURIComponent(JSON.stringify(data)));
}

function decryptData(encryptedData) {
    try {
        return JSON.parse(decodeURIComponent(atob(encryptedData)));
    } catch (e) {
        return null;
    }
}

// Données des services avec icônes optimisées
const servicesData = [
    { 
        id: 1, 
        name: "Netflix Premium", 
        description: "Abonnement mensuel complet - 4K Ultra HD", 
        price: 500, 
        category: "streaming", 
        icon: "fas fa-film" 
    },
    { 
        id: 2, 
        name: "YouTube Premium", 
        description: "Sans publicité + YouTube Music", 
        price: 700, 
        category: "streaming", 
        icon: "fab fa-youtube" 
    },
    { 
        id: 3, 
        name: "Spotify Premium", 
        description: "Musique sans pub - Téléchargement offline", 
        price: 400, 
        category: "streaming", 
        icon: "fab fa-spotify" 
    },
    { 
        id: 4, 
        name: "Disney+", 
        description: "Films Disney, Marvel, Star Wars", 
        price: 600, 
        category: "streaming", 
        icon: "fas fa-crown" 
    },
    { 
        id: 5, 
        name: "Amazon Prime", 
        description: "Films, séries et livraison gratuite", 
        price: 550, 
        category: "streaming", 
        icon: "fab fa-amazon" 
    },
    { 
        id: 6, 
        name: "Free Fire Diamants", 
        description: "Diamants pour Free Fire - Livraison instantanée", 
        price: 0, 
        category: "gaming", 
        icon: "fas fa-gamepad", 
        hasOptions: true 
    },
    { 
        id: 7, 
        name: "Call of Duty Points", 
        description: "Points COD Mobile - Packs exclusifs", 
        price: 0, 
        category: "gaming", 
        icon: "fas fa-crosshairs", 
        hasOptions: true 
    },
    { 
        id: 8, 
        name: "Fortnite V-Bucks", 
        description: "V-Bucks Fortnite - Skins et accessoires", 
        price: 0, 
        category: "gaming", 
        icon: "fas fa-meteor", 
        hasOptions: true 
    },
    { 
        id: 9, 
        name: "Instagram Followers", 
        description: "Abonnés réels - Garantie 30 jours", 
        price: 0, 
        category: "boost", 
        icon: "fab fa-instagram", 
        platform: "instagram", 
        hasOptions: true 
    },
    { 
        id: 10, 
        name: "TikTok Followers", 
        description: "Abonnés TikTok - Démarrage rapide", 
        price: 0, 
        category: "boost", 
        icon: "fab fa-tiktok", 
        platform: "tiktok", 
        hasOptions: true 
    },
    { 
        id: 11, 
        name: "YouTube Abonnés", 
        description: "Abonnés organiques - Croissance naturelle", 
        price: 0, 
        category: "boost", 
        icon: "fab fa-youtube", 
        platform: "youtube", 
        hasOptions: true 
    },
    { 
        id: 12, 
        name: "Site Web Personnel", 
        description: "Site responsive - Design moderne", 
        price: 3500, 
        category: "webdev", 
        icon: "fas fa-laptop-code" 
    },
    { 
        id: 13, 
        name: "Site E-commerce", 
        description: "Boutique en ligne complète", 
        price: 7500, 
        category: "webdev", 
        icon: "fas fa-shopping-cart" 
    }
];

// Prix des services boost
const boostPricing = {
    instagram: {
        followers: { 100: 500, 500: 2000, 1000: 3500, 5000: 15000, 10000: 28000 },
        likes: { 100: 300, 500: 1200, 1000: 2000, 5000: 8500, 10000: 16000 },
        views: { 500: 400, 1000: 700, 5000: 3000, 10000: 5500 }
    },
    tiktok: {
        followers: { 100: 600, 500: 2500, 1000: 4500, 5000: 20000, 10000: 38000 },
        likes: { 100: 350, 500: 1500, 1000: 2500, 5000: 10000, 10000: 19000 },
        views: { 500: 500, 1000: 900, 5000: 4000, 10000: 7500 }
    },
    youtube: {
        followers: { 100: 1528, 500: 7640, 1000: 15280, 5000: 76400, 10000: 152800 },
        likes: { 100: 800, 500: 3500, 1000: 6000, 5000: 25000, 10000: 48000 },
        views: { 500: 600, 1000: 1000, 5000: 4500, 10000: 8500 }
    }
};

// Initialisation de l'application
function initApp() {
    loadCart();
    
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userData = localStorage.getItem('userData');
    
    if (userLoggedIn === 'true' && userData) {
        try {
            currentUser = decryptData(userData);
            if (currentUser) {
                authSection.classList.add('hidden');
                app.classList.remove('hidden');
                updateUserInterface();
                
                if (currentUser.email === 'crackfreefire.gantt@gmail.com') {
                    creatorMenu.classList.remove('hidden');
                }
            }
        } catch (error) {
            console.error("Erreur chargement utilisateur:", error);
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');
        }
    }
    
    loadServices();
    setupEventListeners();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    showNotification('Application chargée avec succès!', 'success');
}

// Gestion du localStorage
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const decrypted = decryptData(savedCart);
            if (decrypted && Array.isArray(decrypted)) {
                cart = decrypted;
            }
        }
    } catch (error) {
        console.error("Erreur chargement panier:", error);
        cart = [];
        saveCart();
    }
    updateCartCount();
}

function saveCart() {
    try {
        localStorage.setItem('cart', encryptData(cart));
    } catch (error) {
        console.error("Erreur sauvegarde panier:", error);
    }
}

function loadUsers() {
    try {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            const decrypted = decryptData(savedUsers);
            return decrypted && Array.isArray(decrypted) ? decrypted : [];
        }
    } catch (error) {
        console.error("Erreur chargement utilisateurs:", error);
    }
    return [];
}

function saveUsers(users) {
    try {
        localStorage.setItem('users', encryptData(users));
    } catch (error) {
        console.error("Erreur sauvegarde utilisateurs:", error);
    }
}

function loadRecharges() {
    try {
        const savedRecharges = localStorage.getItem('recharges');
        if (savedRecharges) {
            const decrypted = decryptData(savedRecharges);
            return decrypted && Array.isArray(decrypted) ? decrypted : [];
        }
    } catch (error) {
        console.error("Erreur chargement recharges:", error);
    }
    return [];
}

function saveRecharges(recharges) {
    try {
        localStorage.setItem('recharges', encryptData(recharges));
    } catch (error) {
        console.error("Erreur sauvegarde recharges:", error);
    }
}

// Gestion des services
function loadServices() {
    renderServices(servicesData, servicesContainer);
    renderServices(servicesData.filter(s => s.category === 'streaming'), 'streaming-container');
    renderServices(servicesData.filter(s => s.category === 'gaming'), 'gaming-container');
    renderServices(servicesData.filter(s => s.category === 'boost'), 'boost-container');
    renderServices(servicesData.filter(s => s.category === 'webdev'), 'webdev-container');
}

function renderServices(services, containerId) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-card" data-category="${service.category}" data-platform="${service.platform || ''}">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <span class="price">${service.hasOptions ? 'Options disponibles' : service.price + ' HTG'}</span>
                <button class="btn add-to-cart" data-id="${service.id}">
                    ${service.hasOptions ? 'Voir options' : 'Ajouter au panier'}
                </button>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const service = services.find(s => s.id === parseInt(btn.dataset.id));
            if (service) {
                if (service.hasOptions) {
                    service.category === 'gaming' ? openFreeFireModal(service) : openBoostModal(service);
                } else {
                    addToCart(service, 1);
                    showNotification(`"${service.name}" ajouté au panier!`, 'success');
                }
            }
        });
    });
}

// Gestion du panier
function addToCart(item, quantity, options = {}) {
    const existingIndex = cart.findIndex(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.options) === JSON.stringify(options)
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.hasOptions ? options.price : item.price,
            quantity,
            options: item.hasOptions ? options : null,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

function updateCartDisplay() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Panier vide</h3>
                <p>Ajoutez des services pour commencer</p>
            </div>
        `;
        cartTotalElement.textContent = '0';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const optionsHTML = item.options ? `
            <div class="cart-item-details">
                ${item.options.diamonds ? `${item.options.diamonds} diamants | ID: ${item.options.gameId}` : ''}
                ${item.options.platform ? `${item.options.quantity} ${item.options.type} | ${item.options.platform}` : ''}
            </div>
        ` : '';
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${optionsHTML}
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <div class="cart-item-quantity">${item.quantity}</div>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                    <div class="cart-item-price">${itemTotal} HTG</div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotalElement.textContent = total;
    
    // Gestion des événements du panier
    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.index)));
    });
    
    cartItemsContainer.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => adjustQuantity(parseInt(btn.dataset.index), -1));
    });
    
    cartItemsContainer.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => adjustQuantity(parseInt(btn.dataset.index), 1));
    });
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        updateCartDisplay();
        showNotification('Service retiré du panier', 'success');
    }
}

function adjustQuantity(index, change) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

// Modals
function openFreeFireModal(service) {
    selectedDiamondOption = null;
    freefireIdInput.value = '';
    freefireNameInput.value = '';
    selectedDiamonds.textContent = 'Aucune option sélectionnée';
    selectedPrice.textContent = 'Prix: 0 HTG';
    
    diamondOptions.forEach(opt => opt.classList.remove('selected'));
    freefireModal.classList.remove('hidden');
}

function openBoostModal(service) {
    selectedBoostOption = null;
    currentBoostPlatform = service.platform;
    boostModalTitle.textContent = `Boost ${service.name}`;
    boostTypeSelect.value = 'followers';
    boostUsernameInput.value = '';
    boostLinkInput.value = '';
    boostEmailInput.value = '';
    selectedBoost.textContent = 'Aucune option sélectionnée';
    selectedBoostPrice.textContent = 'Prix: 0 HTG';
    
    updateBoostOptions();
    boostModal.classList.remove('hidden');
}

function updateBoostOptions() {
    const type = boostTypeSelect.value;
    const platform = currentBoostPlatform;
    
    if (boostPricing[platform] && boostPricing[platform][type]) {
        boostQuantitySelect.innerHTML = Object.keys(boostPricing[platform][type])
            .map(qty => `<option value="${qty}">${qty}</option>`).join('');
        updateBoostSelection();
    }
    
    // Afficher/masquer les champs appropriés
    boostUsernameField.classList.toggle('hidden', type !== 'followers');
    boostLinkField.classList.toggle('hidden', type === 'followers');
}

function updateBoostSelection() {
    const type = boostTypeSelect.value;
    const quantity = parseInt(boostQuantitySelect.value);
    const platform = currentBoostPlatform;
    
    if (boostPricing[platform] && boostPricing[platform][type] && boostPricing[platform][type][quantity]) {
        const price = boostPricing[platform][type][quantity];
        selectedBoost.textContent = `${quantity} ${type} pour ${platform}`;
        selectedBoostPrice.textContent = `Prix: ${price} HTG`;
        selectedBoostOption = { platform, type, quantity, price };
    }
}

// Gestion des paiements
function openPaymentModal() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = total;
    document.getElementById('cart-total-amount-nat').textContent = total;
    document.getElementById('cart-payment-amount').value = total;
    
    // Réinitialiser le formulaire
    ['cart-moncash-info', 'cart-natcash-info', 'cart-payment-form'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    confirmCartPayment.classList.add('hidden');
    
    paymentModal.classList.remove('hidden');
}

function handlePaymentSelection(method, isCartPayment = false) {
    const prefix = isCartPayment ? 'cart-' : '';
    
    // Masquer toutes les infos
    document.getElementById(`${prefix}moncash-info`).style.display = 'none';
    document.getElementById(`${prefix}natcash-info`).style.display = 'none';
    
    // Afficher la méthode sélectionnée
    document.getElementById(`${prefix}${method}-info`).style.display = 'block';
    document.getElementById(`${prefix}payment-form`).classList.remove('hidden');
    
    // Afficher le bouton de confirmation
    if (isCartPayment) {
        confirmCartPayment.classList.remove('hidden');
    } else {
        confirmPayment.classList.remove('hidden');
    }
    
    // Mettre à jour le montant affiché
    const amount = isCartPayment ? 
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 
        selectedRechargeAmount;
    
    document.getElementById(`${prefix}payment-amount`).value = amount;
}

function submitPaymentProof(isCartPayment = false) {
    const prefix = isCartPayment ? 'cart-' : '';
    const form = document.getElementById(`${prefix}payment-form`);
    
    const formData = {
        fullname: document.getElementById(`${prefix}payment-fullname`).value.trim(),
        whatsapp: document.getElementById(`${prefix}payment-whatsapp`).value.trim(),
        amount: parseInt(document.getElementById(`${prefix}payment-amount`).value),
        proof: document.getElementById(`${prefix}payment-proof`).files[0],
        method: selectedPaymentMethod
    };
    
    // Validation
    if (!formData.fullname || !formData.whatsapp || !formData.amount || !formData.proof) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (formData.proof.size > 2 * 1024 * 1024) {
        showNotification('L\'image ne doit pas dépasser 2MB', 'error');
        return;
    }
    
    // Conversion de l'image en base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const rechargeData = {
            id: Date.now(),
            userId: currentUser.id,
            userName: currentUser.name,
            userEmail: currentUser.email,
            ...formData,
            proof: e.target.result,
            date: new Date().toISOString(),
            status: 'pending',
            type: isCartPayment ? 'cart' : 'recharge',
            cartItems: isCartPayment ? [...cart] : null,
            cartTotal: isCartPayment ? cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) : null
        };
        
        const recharges = loadRecharges();
        recharges.push(rechargeData);
        saveRecharges(recharges);
        
        // Fermer le modal et réinitialiser
        if (isCartPayment) {
            paymentModal.classList.add('hidden');
            cart = [];
            saveCart();
            updateCartCount();
        } else {
            paymentSection.classList.add('hidden');
            rechargeOptions.classList.add('hidden');
        }
        
        // Réinitialiser le formulaire
        form.reset();
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
        document.querySelectorAll('.recharge-option').forEach(o => o.classList.remove('selected'));
        
        selectedRechargeAmount = 0;
        selectedPaymentMethod = '';
        
        showNotification(
            isCartPayment ? 
            'Preuve de paiement soumise! Votre commande sera traitée après validation.' :
            'Preuve de recharge soumise! Votre solde sera crédité après validation.',
            'success'
        );
        
        updateRechargeHistory();
    };
    
    reader.readAsDataURL(formData.proof);
}

// Gestion de l'historique des recharges
function updateRechargeHistory() {
    if (!rechargeHistory) return;
    
    const recharges = loadRecharges();
    const userRecharges = recharges.filter(r => r.userId === currentUser.id);
    
    if (userRecharges.length === 0) {
        rechargeHistory.innerHTML = '<p style="text-align: center; color: #666;">Aucune recharge effectuée</p>';
        return;
    }
    
    rechargeHistory.innerHTML = userRecharges
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(recharge => {
            const statusClass = recharge.status === 'approved' ? 'approved' : 
                              recharge.status === 'rejected' ? 'rejected' : 'pending';
            const statusText = recharge.status === 'approved' ? 'Approuvé' : 
                             recharge.status === 'rejected' ? 'Rejeté' : 'En attente';
            
            return `
                <div class="recharge-history-item">
                    <div>
                        <strong>${recharge.amount} HTG</strong>
                        <div>${recharge.method} • ${new Date(recharge.date).toLocaleDateString()}</div>
                    </div>
                    <div class="recharge-status ${statusClass}">${statusText}</div>
                </div>
            `;
        }).join('');
}

// Espace créateur
function loadCreatorData() {
    loadUsersTable();
    loadPendingRechargesTable();
}

function loadUsersTable() {
    if (!usersTableBody) return;
    
    const users = loadUsers();
    usersTableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td>${user.balance || 0} HTG</td>
        </tr>
    `).join('');
}

function loadPendingRechargesTable() {
    if (!pendingRechargesBody) return;
    
    const recharges = loadRecharges();
    const pending = recharges.filter(r => r.status === 'pending');
    
    if (pending.length === 0) {
        pendingRechargesBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #666;">Aucune recharge en attente</td>
            </tr>
        `;
        return;
    }
    
    pendingRechargesBody.innerHTML = pending.map(recharge => `
        <tr>
            <td>${recharge.id}</td>
            <td>${recharge.userName}<br><small>${recharge.userEmail}</small></td>
            <td>${recharge.amount} HTG</td>
            <td>${recharge.method}</td>
            <td>${new Date(recharge.date).toLocaleDateString()}</td>
            <td>
                <img src="${recharge.proof}" alt="Preuve" class="proof-image" 
                     onclick="viewProofImage('${recharge.proof}')">
            </td>
            <td class="action-buttons">
                <button class="action-btn approve" onclick="approveRecharge(${recharge.id})">Approuver</button>
                <button class="action-btn reject" onclick="rejectRecharge(${recharge.id})">Rejeter</button>
            </td>
        </tr>
    `).join('');
}

function viewProofImage(proofBase64) {
    const modal = document.createElement('div');
    modal.className = 'modal proof-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Preuve de Paiement</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${proofBase64}" alt="Preuve de paiement" style="max-width: 100%; border-radius: 10px;">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function approveRecharge(rechargeId) {
    const recharges = loadRecharges();
    const recharge = recharges.find(r => r.id === rechargeId);
    
    if (recharge) {
        recharge.status = 'approved';
        
        // Créditer le solde si c'est une recharge
        if (recharge.type === 'recharge') {
            const users = loadUsers();
            const user = users.find(u => u.id === recharge.userId);
            if (user) {
                user.balance = (user.balance || 0) + recharge.amount;
                saveUsers(users);
                
                // Mettre à jour l'utilisateur courant si nécessaire
                if (currentUser && currentUser.id === recharge.userId) {
                    currentUser.balance = user.balance;
                    localStorage.setItem('userData', encryptData(currentUser));
                    updateUserInterface();
                }
            }
        }
        
        saveRecharges(recharges);
        loadPendingRechargesTable();
        showNotification('Recharge approuvée avec succès!', 'success');
    }
}

function rejectRecharge(rechargeId) {
    const recharges = loadRecharges();
    const recharge = recharges.find(r => r.id === rechargeId);
    
    if (recharge) {
        recharge.status = 'rejected';
        saveRecharges(recharges);
        loadPendingRechargesTable();
        showNotification('Recharge rejetée.', 'warning');
    }
}

// Mise à jour de l'interface utilisateur
function updateUserInterface() {
    if (!currentUser) return;
    
    userNameElement.textContent = currentUser.name;
    profileName.textContent = currentUser.name;
    profileEmail.textContent = currentUser.email;
    
    if (currentUser.phone) {
        document.getElementById('profile-phone').value = currentUser.phone;
    }
    if (currentUser.address) {
        document.getElementById('profile-address').value = currentUser.address;
    }
    
    balanceAmount.textContent = `${currentUser.balance || 0} HTG`;
    ordersCount.textContent = currentUser.orders || 0;
    totalSpent.textContent = `${currentUser.totalSpent || 0} HTG`;
    memberSince.textContent = new Date(currentUser.joinDate || Date.now()).getFullYear();
    
    updateRechargeHistory();
}

// Système de notifications
function showNotification(message, type = 'success') {
    if (!notification || !notificationText) return;
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Navigation et authentification
    setupAuthListeners();
    setupNavigationListeners();
    setupCartListeners();
    setupModalListeners();
    setupPaymentListeners();
    setupThemeListener();
    setupSearchAndFilters();
}

function setupAuthListeners() {
    showRegisterBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthForms();
    });

    showLoginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthForms(false);
    });

    loginForm?.addEventListener('submit', handleLogin);
    registerForm?.addEventListener('submit', handleRegister);
    logoutBtn?.addEventListener('click', handleLogout);
    saveProfileBtn?.addEventListener('click', saveProfile);
}

function setupNavigationListeners() {
    menuBtn?.addEventListener('click', () => dropdownMenu?.classList.toggle('show'));
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = `${item.dataset.page}-page`;
            showPage(pageId);
            dropdownMenu?.classList.remove('show');
        });
    });

    cartIcon?.addEventListener('click', () => showPage('cart-page'));
    
    // Fermer le dropdown en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu') && dropdownMenu?.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
        }
    });
}

function setupCartListeners() {
    checkoutBtn?.addEventListener('click', openPaymentModal);
}

function setupModalListeners() {
    // Free Fire Modal
    diamondOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            diamondOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedDiamondOption = {
                diamonds: parseInt(opt.dataset.diamonds),
                price: parseInt(opt.dataset.price)
            };
            selectedDiamonds.textContent = `${opt.dataset.diamonds} diamants`;
            selectedPrice.textContent = `Prix: ${opt.dataset.price} HTG`;
        });
    });

    confirmFreefire?.addEventListener('click', confirmFreeFirePurchase);
    cancelFreefire?.addEventListener('click', () => freefireModal.classList.add('hidden'));

    // Boost Modal
    boostTypeSelect?.addEventListener('change', updateBoostOptions);
    boostQuantitySelect?.addEventListener('change', updateBoostSelection);
    confirmBoost?.addEventListener('click', confirmBoostPurchase);
    cancelBoost?.addEventListener('click', () => boostModal.classList.add('hidden'));

    // Payment Modal
    cancelPayment?.addEventListener('click', () => paymentModal.classList.add('hidden'));

    // Fermer les modals en cliquant à l'extérieur
    [freefireModal, boostModal, paymentModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
        }
    });
}

function setupPaymentListeners() {
    rechargeBtn?.addEventListener('click', () => rechargeOptions?.classList.toggle('hidden'));
    
    // Options de recharge
    document.querySelectorAll('.recharge-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.recharge-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedRechargeAmount = parseInt(opt.dataset.amount);
            paymentSection?.classList.remove('hidden');
            resetPaymentForm();
        });
    });

    // Sélection des méthodes de paiement
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', () => {
            const isCartPayment = method.closest('#payment-modal');
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
            selectedPaymentMethod = method.dataset.method;
            handlePaymentSelection(selectedPaymentMethod, isCartPayment);
        });
    });

    confirmPayment?.addEventListener('click', () => submitPaymentProof(false));
    confirmCartPayment?.addEventListener('click', () => submitPaymentProof(true));
}

function setupThemeListener() {
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function setupSearchAndFilters() {
    // Recherche
    searchInput?.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.service-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });

    // Filtres
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            const platform = btn.dataset.platform;
            
            document.querySelectorAll('.service-card').forEach(card => {
                const show = 
                    (category === 'all' || card.dataset.category === category) &&
                    (!platform || platform === 'all' || card.dataset.platform === platform);
                card.style.display = show ? 'flex' : 'none';
            });
        });
    });
}

// Fonctions auxiliaires
function toggleAuthForms(showRegister = true) {
    document.getElementById('login-form').parentElement.classList.toggle('hidden', showRegister);
    registerForm.classList.toggle('hidden', !showRegister);
}

function showPage(pageId) {
    pages.forEach(page => page.classList.add('hidden'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        
        if (pageId === 'cart-page') updateCartDisplay();
        if (pageId === 'balance-page') updateRechargeHistory();
        if (pageId === 'creator-page' && currentUser?.email === 'crackfreefire.gantt@gmail.com') {
            loadCreatorData();
        }
    }
}

function resetPaymentForm() {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    document.getElementById('moncash-info').style.display = 'none';
    document.getElementById('natcash-info').style.display = 'none';
    document.getElementById('payment-form').classList.add('hidden');
    confirmPayment.classList.add('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === hashPassword(password));
    
    if (user) {
        currentUser = user;
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userData', encryptData(user));
        
        authSection.classList.add('hidden');
        app.classList.remove('hidden');
        updateUserInterface();
        
        if (user.email === 'crackfreefire.gantt@gmail.com') {
            creatorMenu.classList.remove('hidden');
        }
        
        showNotification(`Bienvenue ${user.name}!`, 'success');
    } else {
        showNotification('Email ou mot de passe incorrect', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('new-email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('new-password').value
    };
    
    if (Object.values(formData).some(value => !value)) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (formData.password.length < 6) {
        showNotification('Le mot de passe doit contenir au moins 6 caractères', 'error');
        return;
    }
    
    const users = loadUsers();
    if (users.some(user => user.email === formData.email)) {
        showNotification('Cet email est déjà utilisé', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        ...formData,
        password: hashPassword(formData.password),
        joinDate: new Date().toISOString(),
        balance: 0,
        orders: 0,
        totalSpent: 0
    };
    
    users.push(newUser);
    saveUsers(users);
    
    toggleAuthForms(false);
    document.getElementById('email').value = formData.email;
    
    showNotification('Inscription réussie! Vous pouvez maintenant vous connecter.', 'success');
}

function handleLogout() {
    localStorage.removeItem('userLoggedIn');
    authSection.classList.remove('hidden');
    app.classList.add('hidden');
    showNotification('Déconnexion réussie', 'success');
}

function saveProfile() {
    if (!currentUser) return;
    
    currentUser.phone = document.getElementById('profile-phone').value;
    currentUser.address = document.getElementById('profile-address').value;
    
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        saveUsers(users);
        localStorage.setItem('userData', encryptData(currentUser));
    }
    
    showNotification('Profil mis à jour avec succès!', 'success');
}

function confirmFreeFirePurchase() {
    if (!selectedDiamondOption || !freefireIdInput.value || !freefireNameInput.value) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    const service = servicesData.find(s => s.id === 6);
    addToCart(service, 1, {
        ...selectedDiamondOption,
        gameId: freefireIdInput.value,
        gameName: freefireNameInput.value
    });
    
    freefireModal.classList.add('hidden');
    showNotification('Diamants Free Fire ajoutés au panier!', 'success');
}

function confirmBoostPurchase() {
    if (!selectedBoostOption || !boostEmailInput.value) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    const usernameOrLink = boostTypeSelect.value === 'followers' ? 
        boostUsernameInput.value : boostLinkInput.value;
    
    if (!usernameOrLink) {
        showNotification(
            boostTypeSelect.value === 'followers' ? 
            'Veuillez entrer le nom d\'utilisateur' : 
            'Veuillez entrer le lien du post',
            'error'
        );
        return;
    }
    
    const service = servicesData.find(s => s.platform === currentBoostPlatform && s.category === 'boost');
    addToCart(service, 1, {
        ...selectedBoostOption,
        usernameOrLink,
        email: boostEmailInput.value
    });
    
    boostModal.classList.add('hidden');
    showNotification('Service boost ajouté au panier!', 'success');
}

// Rendre les fonctions globales pour HTML
window.viewProofImage = viewProofImage;
window.approveRecharge = approveRecharge;
window.rejectRecharge = rejectRecharge;

// Initialisation
document.addEventListener('DOMContentLoaded', initApp);
