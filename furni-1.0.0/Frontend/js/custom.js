(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();
	document.addEventListener("DOMContentLoaded", function () {
		const filterButtons = document.querySelectorAll(".product-filters ul li");
		const products = document.querySelectorAll(".product-item");
	
		filterButtons.forEach(button => {
			button.addEventListener("click", function () {
				// Remove active class from all buttons
				filterButtons.forEach(btn => btn.classList.remove("active"));
				this.classList.add("active");
	
				const filterValue = this.getAttribute("data-filter");
	
				products.forEach(product => {
					if (filterValue === "*" || product.parentElement.classList.contains(filterValue.substring(1))) {
						product.parentElement.style.display = "block";
					} else {
						product.parentElement.style.display = "none";
					}
				});
			});
		});
	});
	document.addEventListener("DOMContentLoaded", function () {
		let cartCount = 0;
		const cartCountElement = document.getElementById("cart-count");
		const addToCartButtons = document.querySelectorAll(".add-to-cart");
	
		// Create the notification element
		const notification = document.createElement("div");
		notification.classList.add("cart-notification");
		notification.textContent = "Item added to cart!";
		document.body.appendChild(notification);
	
		addToCartButtons.forEach(button => {
			button.addEventListener("click", function () {
				// Update Cart Count
				cartCount++;
				cartCountElement.textContent = cartCount;
				cartCountElement.style.opacity = "1"; // Show badge
	
				// Show Notification
				notification.classList.add("show");
	
				// Hide Notification After 2 Seconds
				setTimeout(() => {
					notification.classList.remove("show");
				}, 2000);
			});
		});
	});
	document.getElementById("contact-form").addEventListener("submit", function(event) {
		event.preventDefault(); // Prevent the form from submitting normally

		// Get form field values (optional, you can use these values to process the form)
		var fname = document.getElementById("fname").value;
		var lname = document.getElementById("lname").value;
		var email = document.getElementById("email").value;
		var message = document.getElementById("message").value;

		// You can process these values here (e.g., send them via AJAX or log to the console)
		console.log("First Name:", fname);
		console.log("Last Name:", lname);
		console.log("Email:", email);
		console.log("Message:", message);
		document.getElementById("contact-form").reset();  // This will clear all form fields

		// Display notification
		const notification = document.getElementById("notification");
		notification.style.display = "block";  // Show the notification

		// Hide the notification after 3 seconds
		setTimeout(() => {
			notification.style.display = "none";  // Hide the notification
		}, 3000);
	});
	document.addEventListener("DOMContentLoaded", function () {
		const cartItemsContainer = document.getElementById("cart-items");
		if (!cartItemsContainer) {
			console.error("Cart items container not found!");
			return;
		}
		const subtotalElement = document.getElementById("subtotal");
		const totalElement = document.getElementById("total");
		const updateCartButton = document.getElementById("update-cart");
	
		let cart = [];
	
		// Function to update the totals
		function updateTotals() {
			let subtotal = 0;
			cartItemsContainer.innerHTML = ""; // Clear the table before adding updated items
	
			cart.forEach(item => {
				const row = document.createElement("tr");
	
				row.innerHTML = `
					<td class="product-thumbnail"><img src="${item.image}" alt="Product Image" class="img-fluid"></td>
					<td class="product-name"><h2 class="h5 text-black">${item.name}</h2></td>
					<td class="product-price">$${item.price}</td>
					<td class="product-quantity">
						<div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
							<div class="input-group-prepend">
								<button class="btn btn-outline-black decrease" type="button">&minus;</button>
							</div>
							<input type="text" class="form-control text-center quantity-amount" value="${item.quantity}" readonly>
							<div class="input-group-append">
								<button class="btn btn-outline-black increase" type="button">&plus;</button>
							</div>
						</div>
					</td>
					<td class="product-total">$${(item.price * item.quantity).toFixed(2)}</td>
					<td class="product-remove"><a href="#" class="btn btn-black btn-sm remove-item">X</a></td>
				`;
	
				// Add event listeners for quantity change buttons and removal
				row.querySelector(".increase").addEventListener("click", () => updateQuantity(item, 1));
				row.querySelector(".decrease").addEventListener("click", () => updateQuantity(item, -1));
				row.querySelector(".remove-item").addEventListener("click", () => removeItem(item));
	
				cartItemsContainer.appendChild(row);
	
				subtotal += item.price * item.quantity;
			});
	
			subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
			totalElement.textContent = `$${subtotal.toFixed(2)}`;
		}
	
		// Function to update the quantity of a cart item
		function updateQuantity(item, change) {
			item.quantity += change;
			if (item.quantity < 1) item.quantity = 1;
			updateTotals();
		}
	
		// Function to remove an item from the cart
		function removeItem(item) {
			cart = cart.filter(cartItem => cartItem !== item);
			updateTotals();
		}
	
		// Simulating adding a product to the cart
		function addToCart(product) {
			const existingItem = cart.find(item => item.name === product.name);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				cart.push(product);
			}
			updateTotals();
		}
	
		// Example product data for adding to the cart
		const productExample = {
			name: "Kruzo Aero Chair",
			price: 180,
			quantity: 1,
			image: "../images/product-1.png"
		};
	
		// Add an example product to the cart
		addToCart(productExample);
	
		// Update cart when clicking on "Update Cart" button
		updateCartButton.addEventListener("click", function () {
			// You can implement further logic for cart updates here if needed.
			updateTotals();
		});
	
		// Initial update of totals when page is loaded
		updateTotals();
	});
	
	

})()