/* ================================
   CRAZY-STORE MAIN SCRIPT
   ================================ */

// ==== DOM ELEMENTS ====
const authSection = document.getElementById('auth-section');
const app = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const logoutBtn = document.getElementById('logout-btn');

const servicesContainer = document.getElementById('services-container');
const streamingContainer = document.getElementById('streaming-container');
const gamingContainer = document.getElementById('gaming-container');
const boostContainer = document.getElementById('boost-container');
const webdevContainer = document.getElementById('webdev-container');

const cartContainer = document.getElementById('cart-items-container');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// ==== USER STATE ====
let currentUser = null;
let cart = [];

// ==== SERVICES DATA ====
const services = [
    // STREAMING
    {
        id: 'netflix',
        name: 'Netflix',
        category: 'streaming',
        price: 500,
        img: 'images/netflix.png',
        description: 'Abonnement Netflix HD'
    },
    {
        id: 'primevideo',
        name: 'Prime Video',
        category: 'streaming',
        price: 450,
        img: 'images/primevideo.png',
        description: 'Films et séries Prime Video'
    },
    {
        id: 'disney',
        name: 'Disney+',
        category: 'streaming',
        price: 450,
        img: 'images/disney+.png',
        description: 'Abonnement Disney+'
    },
    {
        id: 'spotify',
        name: 'Spotify',
        category: 'streaming',
        price: 300,
        img: 'images/spotify.png',
        description: 'Musique illimitée'
    },

    // GAMING
    {
        id: 'freefire',
        name: 'Free Fire',
        category: 'gaming',
        price: 200,
        img: 'images/freefire.png',
        description: 'Diamants Free Fire'
    },
    {
        id: 'pubg',
        name: 'PUBG Mobile',
        category: 'gaming',
        price: 250,
        img: 'images/store.png',
        description: 'UC PUBG Mobile'
    },

    // BOOST
    {
        id: 'instagram',
        name: 'Instagram Boost',
        category: 'boost',
        price: 300,
        img: 'images/instagram.png',
        description: 'Followers et likes Instagram'
    },
    {
        id: 'tiktok',
        name: 'TikTok Boost',
        category: 'boost',
        price: 300,
        img: 'images/tiktok.png',
        description: 'Followers et likes TikTok'
    },
    {
        id: 'youtube',
        name: 'YouTube Boost',
        category: 'boost',
        price: 350,
        img: 'images/youtube.png',
        description: 'Abonnés et vues YouTube'
    },

    // WEBDEV
    {
        id: 'webdev',
        name: 'Création de site Web',
        category: 'webdev',
        price: 5000,
        img: 'images/store.png',
        description: 'Site web personnalisé'
    }
];

// ==== AUTHENTICATION (LOCAL STORAGE SIMULATION) ====
function saveUser(user) {
    localStorage.setItem('crazyUser', JSON.stringify(user));
}
function getUser() {
    const u = localStorage.getItem('crazyUser');
    return u ? JSON.parse(u) : null;
}
function logout() {
    currentUser = null;
    localStorage.removeItem('crazyUser');
    authSection.classList.remove('hidden');
    app.classList.add('hidden');
}

// ==== SHOW NOTIFICATION ====
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2500);
}

// ==== RENDER SERVICES ====
function renderServices() {
    servicesContainer.innerHTML = '';
    streamingContainer.innerHTML = '';
    gamingContainer.innerHTML = '';
    boostContainer.innerHTML = '';
    webdevContainer.innerHTML = '';

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <img src="${service.img}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="price">${service.price} HTG</div>
            <button onclick="addToCart('${service.id}')">Ajouter</button>
        `;

        servicesContainer.appendChild(card);
        if (service.category === 'streaming') streamingContainer.appendChild(card.cloneNode(true));
        if (service.category === 'gaming') gamingContainer.appendChild(card.cloneNode(true));
        if (service.category === 'boost') boostContainer.appendChild(card.cloneNode(true));
        if (service.category === 'webdev') webdevContainer.appendChild(card.cloneNode(true));
    });
}

// ==== CART ====
function addToCart(id) {
    const item = services.find(s => s.id === id);
    if (!item) return;
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCart();
    showNotification('Ajouté au panier');
}

function updateCart() {
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
                <img src="${item.img}" alt="${item.name}">
                <strong>${item.name}</strong> x${item.qty}
            </div>
            <div>
                ${item.price * item.qty} HTG
                <button onclick="removeFromCart('${item.id}')">❌</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

// ==== CHECKOUT ====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Votre panier est vide');
        return;
    }

    // Demander infos comme pour une recharge
    const fullname = prompt('Entrez votre nom complet:');
    const whatsapp = prompt('Entrez votre numéro WhatsApp:');
    if (!fullname || !whatsapp) {
        showNotification('Informations requises');
        return;
    }

    showNotification('Commande envoyée ✅');
    cart = [];
    updateCart();
});

// ==== AUTH EVENTS ====
showRegister.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('register-form').classList.remove('hidden');
    loginForm.parentElement.classList.add('hidden');
});

showLogin.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    loginForm.parentElement.classList.remove('hidden');
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const storedUser = getUser();

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        currentUser = storedUser;
        authSection.classList.add('hidden');
        app.classList.remove('hidden');
        renderServices();
        showNotification('Bienvenue ' + currentUser.fullname);
    } else {
        showNotification('Email ou mot de passe invalide');
    }
});

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('new-email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('new-password').value;

    if (fullname && email && phone && password.length >= 6) {
        const newUser = { fullname, email, phone, password };
        saveUser(newUser);
        showNotification('Compte créé ✅');
        document.getElementById('register-form').classList.add('hidden');
        loginForm.parentElement.classList.remove('hidden');
    } else {
        showNotification('Veuillez remplir correctement le formulaire');
    }
});

logoutBtn.addEventListener('click', logout);

// ==== INIT ====
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = getUser();
    if (savedUser) {
        currentUser = savedUser;
        authSection.classList.add('hidden');
        app.classList.remove('hidden');
        renderServices();
    }
});