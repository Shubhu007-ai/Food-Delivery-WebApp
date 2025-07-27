import { foodItems, discounts, foodCategories } from './data.js';

export const navbarComponent = () => {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="#home" class="navbar-brand">
            <img src="images/foodiedelight_logo.png" alt="FoodieDelight Logo" class="navbar-logo">
            FoodieDelight
        </a>
        <div class="search-bar">
            <i class="fas fa-search"></i> 
            <input type="text" id="food-search-input" placeholder="Search for food...">
        </div>
        <div class="navbar-links" id="navbar-links">
            <a href="#home" class="nav-link" data-page="home">Home</a>
            <a href="#about" class="nav-link" data-page="about">About</a>
            <a href="#ordertypes" class="nav-link" data-page="ordertypes">Order Types</a>
            <a href="#discounts" class="nav-link" data-page="discounts">Discounts</a>
            <a href="#contact" class="nav-link" data-page="contact">Contact Us</a>
            <a href="#login" class="nav-link" data-page="login">Login</a>
            <a href="#signup" class="nav-link" data-page="signup">Sign Up</a>
        </div>
        <button class="navbar-toggler" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
    `;
    return nav;
};

export const foodCardComponent = (food) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <div class="food-card-content">
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <div class="food-card-price">₹${food.price.toFixed(2)}</div>
            <button class="btn primary add-to-cart-btn" data-id="${food.id}">Add to Cart</button>
        </div>
    `;
    return card;
};

export const cartItemComponent = (item) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
            <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
        </div>
    `;
    return cartItem;
};

export const renderAboutPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content about-page';
    content.innerHTML = `
        <div class="about-hero">
            <h1>About FoodieDelight</h1>
            <p>Your journey to deliciousness starts here!</p>
        </div>
        <div class="about-details">
            <div class="about-vision-mission">
                <h2>Our Vision & Mission</h2>
                <p>At FoodieDelight, we believe that great food should be accessible to everyone, effortlessly. Our mission is to connect you with the finest local restaurants and deliver culinary excellence right to your doorstep, ensuring every bite is a delight.</p>
                <p>We strive to be more than just a delivery service; we aim to be your trusted partner in discovering new flavors and enjoying your favorite meals with unparalleled convenience.</p>
            </div>
            <div class="about-why-choose-us">
                <h2>Why Choose FoodieDelight?</h2>
                <ul>
                    <li><strong>Curated Selection:</strong> Hand-picked restaurants ensuring quality and taste.</li>
                    <li><strong>Speedy Delivery:</strong> Fresh and hot meals delivered in record time.</li>
                    <li><strong>Seamless Experience:</strong> Easy ordering, tracking, and customer support.</li>
                    <li><strong>Variety of Cuisines:</strong> A world of flavors at your fingertips.</li>
                </ul>
            </div>
            <div class="about-call-to-action">
                <p>Ready to explore a world of flavors?</p>
                <button class="btn primary nav-link" data-page="home">Start Ordering Now!</button>
            </div>
        </div>
    `;
    return content;
};

export const renderOrderTypesPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content order-types-page';
    content.innerHTML = `
        <h1>Our Order Types</h1>
        <p>FoodieDelight offers various convenient ways to get your food:</p>
        <ul>
            <li class="delivery-option-card">
                <img src="images/delivery_standard.png" alt="Standard Delivery">
                <h3>Standard Delivery</h3>
                <p>Get your food delivered directly to your home or office. Our standard delivery ensures your meal arrives fresh and on time.</p>
                <button class="btn primary">Learn More</button>
            </li>
            <li class="delivery-option-card">
                <img src="images/delivery_express.png" alt="Express Delivery">
                <h3>Express Delivery</h3>
                <p>Need your food faster? Choose express delivery for priority service and quicker arrival times.</p>
                <button class="btn primary">Learn More</button>
            </li>
            <li class="delivery-option-card">
                <img src="images/delivery_scheduled.png" alt="Scheduled Orders">
                <h3>Scheduled Orders</h3>
                <p>Plan ahead! Schedule your orders for a specific date and time, perfect for meal prepping or future events.</p>
                <button class="btn primary">Learn More</button>
            </li>
            <li class="delivery-option-card">
                <img src="images/pickup_option.png" alt="Pickup Option">
                <h3>Pickup Option</h3>
                <p>Prefer to pick up your order yourself? Select the pickup option and collect your meal directly from the restaurant.</p>
                <button class="btn primary">Learn More</button>
            </li>
        </ul>
    `;
    return content;
};

export const renderDiscountsPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content discounts-page';
    content.innerHTML = `
        <h1>Exclusive Discounts & Offers</h1>
        <p>Check out our latest deals to save on your next delicious meal!</p>
    `;

    discounts.forEach(discount => {
        const discountCard = document.createElement('div');
        discountCard.className = 'discount-card';
        discountCard.innerHTML = `
            <h3>${discount.name}</h3>
            <p>${discount.description}</p>
            ${discount.code ? `<p>Use code: <strong>${discount.code}</strong></p>` : ''}
            <button class="btn primary">Learn More</button>
        `;
        content.appendChild(discountCard);
    });

    return content;
};

export const renderContactPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content contact-page';
    content.innerHTML = `
        <div class="contact-hero">
            <h1>Get in Touch with FoodieDelight</h1>
            <p>We're here to help! Reach out to us for any questions, feedback, or support.</p>
        </div>
        <div class="contact-details-container">
            <div class="contact-card">
                <i class="fas fa-headset icon-large"></i>
                <h3>Customer Support</h3>
                <p>Our friendly support team is ready to assist you.</p>
                <p><i class="fas fa-envelope icon-small"></i> Email: <a href="mailto:support@foodiedelight.com">support@foodiedelight.com</a></p>
                <p><i class="fas fa-phone-alt icon-small"></i> Phone: <a href="tel:+1234567890">+91 98765 XXXXX</a></p>
                <p class="availability"><i class="fas fa-clock icon-small"></i> Available: Mon-Sun, 9:00 AM - 10:00 PM EST</p>
            </div>
            <div class="contact-card">
                <i class="fas fa-briefcase icon-large"></i>
                <h3>Business Inquiries</h3>
                <p>For partnerships, media, or other business-related matters.</p>
                <p><i class="fas fa-envelope icon-small"></i> Email: <a href="mailto:partnerships@foodiedelight.com">partnerships@foodiedelight.com</a></p>
            </div>
            <div class="contact-card">
                <i class="fas fa-map-marker-alt icon-large"></i>
                <h3>Visit Our Headquarters</h3>
                <p>Although we're an online service, our main office is located here.</p>
                <p>FoodieDelight Headquarters<br>
                123 Delicious Lane, Flavor Town, FL 12345</p>
            </div>
        </div>
    `;
    return content;
};

export const renderOrderReviewPage = (cartItems, subtotal, appliedCoupon) => {
    let deliveryFee = 80.00; 
    let discountAmount = 0.00;
    let discountDescription = '₹0.00';

    if (appliedCoupon) {
        if (appliedCoupon.deliveryDiscount) {
            deliveryFee = 0.00;
            discountDescription = 'Free Delivery';
        }
        if (appliedCoupon.discountPercent) {
            discountAmount = subtotal * (appliedCoupon.discountPercent / 100);
            discountDescription = `-₹${discountAmount.toFixed(2)} (${appliedCoupon.discountPercent}%)`;
        }
    }

    const estimatedTotal = subtotal + deliveryFee - discountAmount;

    const content = document.createElement('div');
    content.className = 'order-review';
    content.innerHTML = `
        <h2>Order Review</h2>
        <div class="order-review-summary">
            <p>Subtotal: <span>₹${subtotal.toFixed(2)}</span></p>
            <p>Delivery Fee: <span>₹${deliveryFee.toFixed(2)}</span></p>
            <p>Discount: <span class="discount-value">${discountDescription}</span></p>
            <div class="discount-input-area">
                <input type="text" id="coupon-code-input" placeholder="Enter coupon code" value="${appliedCoupon && appliedCoupon.code ? appliedCoupon.code : ''}">
                <button id="apply-coupon-btn" class="btn primary">Apply</button>
            </div>
            <p><strong>Estimated Total:</strong> <strong>₹${estimatedTotal.toFixed(2)}</strong></p>
            <div class="order-review-items">
                <h3>Items in Your Order:</h3>
                <div id="review-items-list">
                    ${cartItems.length > 0 ? 
                        cartItems.map(item => `
                            <div class="order-review-item">
                                <span class="item-name">${item.name}</span>
                                <span>₹${item.price.toFixed(2)} x ${item.quantity}</span>
                            </div>
                        `).join('')
                        : '<p>Your cart is empty. Please add items to review your order.</p>'
                    }
                </div>
            </div>
        </div>
        <div class="btn-group">
            <button id="back-to-menu-btn" class="btn ghost nav-link" data-page="home">Back to Menu</button>
            <button id="place-order-btn" class="btn primary" ${cartItems.length === 0 ? 'disabled' : ''}>Place Order</button>
        </div>
    `;

    return content;
};

export const renderCartPage = (cartItems) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const content = document.createElement('div');
    content.className = 'page-content cart-page';
    content.innerHTML = `
        <h1>Your Shopping Cart</h1>
        <div class="cart-page-content">
            <div id="cart-page-items">
                ${cartItems.length > 0 ? 
                    cartItems.map(item => `
                        <div class="cart-item-full">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <div class="cart-item-price-quantity">
                                    <span class="item-price">₹${item.price.toFixed(2)}</span>
                                    <span class="item-quantity">Qty: ${item.quantity}</span>
                                </div>
                            </div>
                            <button class="btn ghost remove-from-cart-btn" data-id="${item.id}">Remove</button>
                        </div>
                    `).join('')
                    : '<p class="empty-cart-message">Your cart is empty. Start adding some delicious food!</p>'
                }
            </div>
            <div class="cart-page-summary">
                <h2>Cart Summary</h2>
                <p>Subtotal: <span>₹${subtotal.toFixed(2)}</span></p>
                <p class="tax-info">Taxes and delivery calculated at checkout.</p>
                <div class="btn-group-cart">
                    <button id="continue-shopping-btn" class="btn ghost nav-link" data-page="home">Continue Shopping</button>
                    <button id="proceed-to-checkout-btn" class="btn primary" ${cartItems.length === 0 ? 'disabled' : ''}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    `;

    return content;
};

export const categoryFilterDropdownComponent = (activeCategory, categories) => {
    const container = document.createElement('div');
    container.className = 'category-filter-dropdown';

    const toggleButton = document.createElement('button');
    toggleButton.className = 'category-dropdown-toggle';
    toggleButton.innerHTML = `Category: <span>${activeCategory}</span> <span class="dropdown-arrow">&#9662;</span>`; // Down arrow
    toggleButton.dataset.toggle = 'category-dropdown';

    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'category-dropdown-content';

    categories.forEach(category => {
        const item = document.createElement('div');
        item.className = 'category-dropdown-item';
        item.textContent = category;
        item.dataset.category = category;
        if (activeCategory === category) {
            item.classList.add('active');
        }
        dropdownContent.appendChild(item);
    });

    container.appendChild(toggleButton);
    container.appendChild(dropdownContent);

    return container;
};

export const renderLoginPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content login-page';
    content.innerHTML = `
        <div class="auth-card">
            <h1>Login to FoodieDelight</h1>
            <p>Access your orders, saved addresses, and exclusive offers.</p>
            <form class="auth-form">
                <div class="form-group">
                    <label for="login-email">Email:</label>
                    <input type="email" id="login-email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password:</label>
                    <input type="password" id="login-password" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="btn primary">Login</button>
            </form>
            <p class="auth-switch">Don't have an account? <a href="#signup" class="nav-link" data-page="signup">Sign Up</a></p>
        </div>
    `;
    return content;
};

export const renderSignupPage = () => {
    const content = document.createElement('div');
    content.className = 'page-content signup-page';
    content.innerHTML = `
        <div class="auth-card">
            <h1>Join FoodieDelight Today!</h1>
            <p>Create an account to start enjoying delicious food delivered to your door.</p>
            <form class="auth-form">
                <div class="form-group">
                    <label for="signup-name">Full Name:</label>
                    <input type="text" id="signup-name" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="signup-email">Email:</label>
                    <input type="email" id="signup-email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label for="signup-password">Password:</label>
                    <input type="password" id="signup-password" placeholder="Create a password" required>
                </div>
                <div class="form-group">
                    <label for="signup-confirm-password">Confirm Password:</label>
                    <input type="password" id="signup-confirm-password" placeholder="Confirm your password" required>
                </div>
                <button type="submit" class="btn primary">Sign Up</button>
            </form>
            <p class="auth-switch">Already have an account? <a href="#login" class="nav-link" data-page="login">Login</a></p>
        </div>
    `;
    return content;
};