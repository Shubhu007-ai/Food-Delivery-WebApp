import { navbarComponent, foodCardComponent, cartItemComponent, renderAboutPage, renderOrderTypesPage, renderDiscountsPage, renderContactPage, renderOrderReviewPage, renderCartPage, categoryFilterDropdownComponent, renderLoginPage, renderSignupPage } from './components.js';
import { foodItems, foodCategories, discounts } from './data.js';

const appContent = document.getElementById('app-content');
const navbarContainer = document.getElementById('navbar-container');
const foodGridContainer = document.getElementById('food-grid-container');
const categoryFiltersContainer = document.getElementById('category-filters');
const backToTopBtn = document.getElementById('back-to-top-btn'); 
const fixedCartBtn = document.getElementById('fixed-cart-btn'); 
const fixedCartCountSpan = document.getElementById('fixed-cart-count'); 

let state = {
    cart: [],
    currentView: 'home',
    searchTerm: '',
    activeCategory: 'All', 
    allFoodItems: [...foodItems], 
    displayedFoodItems: [], 
    appliedCoupon: null 
};

const updateCartUI = () => {
    const totalItemsInCart = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    fixedCartCountSpan.textContent = totalItemsInCart; 
    fixedCartBtn.classList.toggle('has-items', totalItemsInCart > 0); 
};

const addToCart = (foodId) => {
    const food = foodItems.find(item => item.id === foodId); 
    if (food) {
        const existingItem = state.cart.find(item => item.id === foodId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push({ ...food, quantity: 1 });
        }
        state.appliedCoupon = null; 
        updateCartUI();
        console.log('Cart:', state.cart);
    }
};

const removeFromCart = (foodId) => {
    const itemIndex = state.cart.findIndex(item => item.id === foodId);
    if (itemIndex > -1) {
        if (state.cart[itemIndex].quantity > 1) {
            state.cart[itemIndex].quantity--;
        } else {
            state.cart.splice(itemIndex, 1);
        }
        state.appliedCoupon = null; 
        updateCartUI();
        if (state.currentView === 'cart') {
            renderView('cart');
        }
        console.log('Cart:', state.cart);
    }
};

const applyFiltersAndSearch = () => {
    let tempItems = [...state.allFoodItems];

    if (state.searchTerm) {
        const lowerCaseSearchTerm = state.searchTerm.toLowerCase();
        tempItems = tempItems.filter(item =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    if (state.activeCategory !== 'All') {
        tempItems = tempItems.filter(item =>
            item.category && item.category.split('/').some(cat => cat.trim().toLowerCase() === state.activeCategory.toLowerCase())
        );
    }
    
    state.displayedFoodItems = tempItems;
};

const renderFoodList = () => {
    foodGridContainer.innerHTML = '';
    if (state.displayedFoodItems.length === 0) {
        foodGridContainer.innerHTML = '<p style="text-align: center; width: 100%;">No items found matching your criteria.</p>';
    } else {
        state.displayedFoodItems.forEach(food => {
            foodGridContainer.appendChild(foodCardComponent(food));
        });
    }
};

const renderCategoryFilters = () => {
    categoryFiltersContainer.innerHTML = '';
    const dropdown = categoryFilterDropdownComponent(state.activeCategory, foodCategories);
    categoryFiltersContainer.appendChild(dropdown);
};

const renderView = (view) => {
    appContent.innerHTML = ''; 
    state.currentView = view; 
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${view}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    const navbarLinks = document.getElementById('navbar-links');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarLinks && navbarToggler && navbarLinks.classList.contains('show')) {
        navbarLinks.classList.remove('show');
        navbarToggler.classList.remove('active');
    }

    if (view === 'home') {
        appContent.appendChild(categoryFiltersContainer); 
        appContent.appendChild(foodGridContainer); 
    
        const searchInput = document.getElementById('food-search-input');
        if (searchInput) {
            searchInput.value = state.searchTerm;
        }

        renderCategoryFilters();
        applyFiltersAndSearch(); 
        renderFoodList(); 
    } else {
        foodGridContainer.innerHTML = '';
        categoryFiltersContainer.innerHTML = ''; 
        switch (view) {
            case 'about':
                appContent.appendChild(renderAboutPage());
                break;
            case 'ordertypes':
                appContent.appendChild(renderOrderTypesPage());
                break;
            case 'discounts':
                appContent.appendChild(renderDiscountsPage());
                break;
            case 'contact':
                appContent.appendChild(renderContactPage());
                break;
            case 'cart': 
                appContent.appendChild(renderCartPage(state.cart));
                break;
            case 'review':
                const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                appContent.appendChild(renderOrderReviewPage(state.cart, subtotal, state.appliedCoupon));
                break;
            case 'login':
                appContent.appendChild(renderLoginPage());
                break;
            case 'signup':
                appContent.appendChild(renderSignupPage());
                break;
            default:
               
                break;
        }
    }
};

const handleSearch = (searchTerm) => {
    state.searchTerm = searchTerm;
    renderView('home');
};

const applyCoupon = (couponCode) => {
    if (!couponCode) {
        alert('Please enter a coupon code.');
        state.appliedCoupon = null; 
        renderView('review'); 
        return;
    }

    if (state.cart.length === 0) {
        alert('Your cart is empty. Please add items before applying a coupon.');
        state.appliedCoupon = null;
        renderView('review');
        return;
    }

    const discount = discounts.find(d => d.code && d.code.toLowerCase() === couponCode.toLowerCase());

    if (!discount) {
        alert('Invalid coupon code. Please try again.');
        state.appliedCoupon = null; 
        renderView('review'); 
        return;
    }

    const currentSubtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (discount.minOrder && currentSubtotal < discount.minOrder) {
        alert(`This coupon requires a minimum order of ₹${discount.minOrder.toFixed(2)}.`);
        state.appliedCoupon = null;
        renderView('review');
        return;
    }

    if (discount.discountPercent || discount.deliveryDiscount) {
        state.appliedCoupon = discount; 
        alert(`Coupon "${discount.name}" applied successfully!`);
    } else {
        alert(`Coupon "${discount.name}" applied, but it's a special offer (e.g., Buy One Get One) not visible here.`);
        state.appliedCoupon = discount; 
    }
    
    renderView('review'); 
};

const placeOrder = () => {
    if (state.cart.length > 0) {
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let deliveryFee = 80.00; 
        let discountAmount = 0.00;

        if (state.appliedCoupon) {
            if (state.appliedCoupon.deliveryDiscount) {
                deliveryFee = 0.00;
            }
            if (state.appliedCoupon.discountPercent) {
                discountAmount = subtotal * (state.appliedCoupon.discountPercent / 100);
            }
        }
        
        const finalTotal = subtotal + deliveryFee - discountAmount;
        alert('Order Placed Successfully! Your total was ₹' + finalTotal.toFixed(2) + '. Thank you for your purchase.'); 
        state.cart = []; 
        state.appliedCoupon = null;
        updateCartUI();
        state.searchTerm = '';
        state.activeCategory = 'All'; 
        renderView('home'); 
    } else {
        alert('Your cart is empty. Please add items before placing an order.');
    }
};

// --- Event Listeners and Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    const navbar = navbarComponent();
    navbarContainer.appendChild(navbar);

    renderView('home');
    updateCartUI(); 

    const navbarLinks = document.getElementById('navbar-links');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navbarContainer.addEventListener('click', (event) => {
        if (event.target.matches('.nav-link')) {
            event.preventDefault(); 
            const page = event.target.dataset.page;
            if (page) {
                if (page !== 'cart') { 
                    state.searchTerm = '';
                    state.activeCategory = 'All';
                }
                state.appliedCoupon = null; 
                renderView(page);
            }
        } else if (event.target.matches('.navbar-brand')) {
             event.preventDefault();
             state.searchTerm = ''; 
             state.activeCategory = 'All';
             state.appliedCoupon = null;
             renderView('home');
        } else if (event.target.closest('.navbar-toggler')) { 
            navbarLinks.classList.toggle('show');
            navbarToggler.classList.toggle('active');
        }
    });

    const searchInput = document.getElementById('food-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            handleSearch(event.target.value);
        });
    }

    categoryFiltersContainer.addEventListener('click', (event) => {
        const toggleButton = categoryFiltersContainer.querySelector('.category-dropdown-toggle');
        const dropdownContent = categoryFiltersContainer.querySelector('.category-dropdown-content');

        if (event.target.closest('.category-dropdown-toggle')) {
            dropdownContent.classList.toggle('show');
            toggleButton.classList.toggle('active');
        } else if (event.target.matches('.category-dropdown-item')) {
            const category = event.target.dataset.category;
            if (category) {
                state.activeCategory = category; 
                state.searchTerm = '';
                renderView('home'); 
                dropdownContent.classList.remove('show'); 
                toggleButton.classList.remove('active');
            }
        }
    });

    document.addEventListener('click', (event) => {
        const categoryDropdownContainer = categoryFiltersContainer.querySelector('.category-filter-dropdown');
        const categoryDropdownContent = categoryFiltersContainer.querySelector('.category-dropdown-content');
        const categoryToggleButton = categoryFiltersContainer.querySelector('.category-dropdown-toggle');
        if (categoryDropdownContainer && !categoryDropdownContainer.contains(event.target)) {
            if (categoryDropdownContent && categoryDropdownContent.classList.contains('show')) {
                categoryDropdownContent.classList.remove('show');
                categoryToggleButton.classList.remove('active');
            }
        }

        if (navbarLinks && navbarToggler && !navbarContainer.contains(event.target) && navbarLinks.classList.contains('show')) {
            navbarLinks.classList.remove('show');
            navbarToggler.classList.remove('active');
        }
    });

    appContent.addEventListener('click', (event) => {
        if (event.target.matches('.add-to-cart-btn')) {
            const foodId = event.target.dataset.id;
            addToCart(foodId);
        } else if (event.target.id === 'place-order-btn') {
            placeOrder();
        } else if (event.target.id === 'proceed-to-checkout-btn') { 
            renderView('review');
        } else if (event.target.matches('.remove-from-cart-btn')) { 
            const foodId = event.target.dataset.id;
            removeFromCart(foodId);
        } else if (event.target.matches('.nav-link[data-page="home"]')) {
            event.preventDefault();
            const page = event.target.dataset.page;
            if (page) {
                state.searchTerm = ''; 
                state.activeCategory = 'All';
                state.appliedCoupon = null; 
                renderView(page);
            }
        } else if (event.target.matches('.about-call-to-action .nav-link')) { 
            event.preventDefault(); 
            const page = event.target.dataset.page;
            if (page) {
                state.searchTerm = ''; 
                state.activeCategory = 'All'; 
                state.appliedCoupon = null; 
                renderView(page);
            }
        } else if (event.target.id === 'apply-coupon-btn') { 
            const couponInput = document.getElementById('coupon-code-input');
            const couponCode = couponInput ? couponInput.value.trim() : '';
            applyCoupon(couponCode);
        } else if (event.target.matches('.auth-switch .nav-link')) { 
            event.preventDefault();
            const page = event.target.dataset.page;
            if (page) {
                renderView(page);
            }
        }
    });

    fixedCartBtn.addEventListener('click', () => {
        state.searchTerm = ''; 
        state.activeCategory = 'All'; 
        renderView('cart');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
});