/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER PRODUCTS ===============*/
let swiperProducts = new Swiper(".products__container", {
    spaceBetween: 32,
    grabCursor: false,
    centerSlide: true,
    loop:false,
    slidesPreView: 2,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPreView:1,
        },
        520: {
            slidesPreView: 2,
        },
        950: {
            slidesPreView: 3,
        },
        1024: {
            spaceBetween:72,
        },
    },
    
    
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/ 

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
/*=============== SWIPER PRODUCTS ===============*/
let swiperProduct = new Swiper(".product__container", {
    spaceBetween: 12,
    grabCursor: true,
    centerSlide: true,
    loop: true,
    slidesPreView: 'auto',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPreView: 1,
        },
        520: {
            slidesPreView: 2,
        },
        950: {
            slidesPreView: 3,
        },
        1024: {
            spaceBetween:72,
        },
    },
    
});

// Size Selection
const sizeElements = document.querySelectorAll('.size');

// Add a click event listener to each size element
sizeElements.forEach(sizeElement => {
  sizeElement.addEventListener('click', () => {
    // Remove the 'active_link' class from all size elements
    sizeElements.forEach(element => {
      element.classList.remove('active-link');
    });

    // Add the 'active_link' class to the clicked size element
    sizeElement.classList.add('active-link');

    // Get the id of the clicked size element and store it in a 'size' variable
    const size = sizeElement.id;

    // You can now use the 'size' variable for further processing
    console.log('Selected size: ' + size);
  });
});

// Cart open close 
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closecart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("cart-active");
};
closecart.onclick = () => {
    cart.classList.remove("cart-active");
}

//Add to cart

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart__remove');
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change",quantityChanged)
        
    }
    
    var addCart = document.querySelectorAll(".add__to__cart")
    for (let i = 0; i < addCart.length; i++) {
        var inp = addCart[i];
        inp.addEventListener('click',addCartClicked)
        // inp.addEventListener('click',updateTotal)
        
    }

    loadCartItems();
}



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
}

// Add to Cart 
function addCartClicked(event) {
    // console.log(event)
    var button = event.target;
    // console.log("ho")
    var shopProducts = button.parentNode;
    console.log(shopProducts)
    var title = shopProducts.getElementsByClassName('product__title')[0].innerText;
    var price = shopProducts.getElementsByClassName("product__price")[0].innerText;
    var productImg = shopProducts.querySelectorAll(".main_img")[0].src
    var sizeele = shopProducts.querySelector(".size.active-link")
    if (sizeele !== null) {
    size = size.id;
} else {
    
    alert("Select Your desired Size");
}
    // console.log(title,price,size,productImg)
    addProductsToCart(title, price, size, productImg);
    updateTotal();
    saveCartItems();
}
function quantityChanged(event) {
    console.log(event)
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
}
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart__content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart__box");
    var total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart__price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace('Rs.',''))
        var quantity = quantityElement.value;
        total += price*quantity;
        console.log(total)

    }
    document.getElementsByClassName("total__price")[0].innerText = 'Rs.' + total;
    localStorage.setItem('cartTotal', total);
    
}


function addProductsToCart(title, price, size, image) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart__box')
    var cartItems = document.getElementsByClassName('cart__content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart__product__title');
    var cartItemsizes = cartItems.getElementsByClassName('cart__size');
    // console.log(title,price,size,image)
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title && cartItemsizes == size ) {
            alert('You have already added this item to cart');
            return;
        }
    
        
    }
    var cartBoxContent = `<img src="${image}" alt="" class="cart__img">
                        <div class="detail__box">
                            <div class="cart__product__title">${title}</div>
                            <div class="cart__price">${price}</div>
                            <div class="cart__size">${size}</div>
                            <input type="number" name="" id="" value="1" class="cart-quantity">
                            
                        </div>
                        <i class="ri-delete-bin-2-line cart__remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart__remove')[0]
    .addEventListener('click',removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
    updateTotal();
    saveCartItems();
}

// Using localStorage
function saveCartItems() {
    var cartContent = document.getElementsByClassName('cart__content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart__box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('cart__product__title')[0];
        var priceElement = cartBox.getElementsByClassName('cart__price')[0];
        var quantityElemnt = cartBox.getElementsByClassName('cart-quantity')[0];
        var productImg = cartBox.getElementsByClassName('cart__img')[0].src;
        var productsize = cartBox.getElementsByClassName('cart__size')[0];

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElemnt.value,
            size: productsize.innerText,
            image: productImg
        };
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}

// Loading from local Storage 
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        for (let i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductsToCart(item.title, item.price, item.size, item.image)
            
            var cartBoxes = document.getElementsByClassName('cart__box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity
            
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementsByClassName('total__price')[0].innerText = "Rs." + cartTotal;
    }
    
}

// Remove after Successfull payment 
function clearCart(){
    var cartContent = document.getElementsByClassName('cart__content')[0];
    cartContent.innerHTML = '';
    updateTotal();
    localStorage.removeItem("cartItems")
}

