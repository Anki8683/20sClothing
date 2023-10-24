// common.js

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons with class 'btn__buy' on all pages
    var buyButtons = document.querySelectorAll(".btn__buy");
    
    // Attach the event listener to each button
    buyButtons.forEach(function (button) {
        button.addEventListener("click", () => {
            fetch('https://two0sclothing.onrender.com:3000/checkout', {
                method: 'post',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    items: JSON.parse(localStorage.getItem('cartItems')),
                      
                }),
            })
                .then((res) => res.json())
                .then((url) => {
                    location.href = url;
                    clearCart();
                })
                .catch((err) => console.log(err));
        });

});
});
